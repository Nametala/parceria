/**
 * O elo, em WebGL cru — sem three.js, sem biblioteca.
 *
 * Duas correntes de ruido: uma vem da esquerda (o negocio), outra da direita
 * (o mundo). Onde elas se encontram, no meio, a energia sobe e a cor vira do
 * vermelho para o azul da marca. E a ideia do logotipo em movimento.
 *
 * Custa ~2 KB. O three.js custaria 87 KB gzip para o mesmo efeito percebido.
 */

const VERTICE = `
attribute vec2 pos;
void main() { gl_Position = vec4(pos, 0.0, 1.0); }
`;

const FRAGMENTO = `
precision mediump float;
uniform vec2  uRes;
uniform float uTempo;
uniform float uProg;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float ruido(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;

  // as duas correntes, em sentidos opostos
  float esquerda = ruido(vec2(uv.x * 7.0 - uTempo * 0.85, uv.y * 2.5));
  float direita  = ruido(vec2(-uv.x * 7.0 - uTempo * 0.70, uv.y * 2.5 + 9.0));

  // onde elas se cruzam a energia sobe
  float encontro = pow(max(1.0 - abs(uv.x - 0.5) * 2.0, 0.0), 1.6);
  float energia = mix(esquerda, direita, uv.x) * 0.6 + encontro * 0.7;

  // a faixa e fina: concentra no centro vertical
  float faixa = smoothstep(0.0, 0.9, 1.0 - abs(uv.y - 0.5) * 2.0);

  // revela da esquerda para a direita, acompanhando a linha que cresce
  float revela = smoothstep(0.0, 0.08, uProg * 1.08 - uv.x);

  vec3 vermelho = vec3(1.0, 0.231, 0.078);
  vec3 azul     = vec3(0.106, 0.231, 1.0);
  vec3 cor = mix(vermelho, azul, smoothstep(0.55, 0.95, energia));

  gl_FragColor = vec4(cor, clamp(energia * faixa * revela, 0.0, 1.0));
}
`;

function compilar(gl: WebGLRenderingContext, tipo: number, fonte: string) {
  const s = gl.createShader(tipo);
  if (!s) return null;
  gl.shaderSource(s, fonte);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export type ControleElo = { progresso: (v: number) => void; destruir: () => void };

/**
 * Liga o shader num canvas. Devolve null se o WebGL nao estiver disponivel —
 * quem chama mantem a barra solida e nada quebra.
 */
export function ligarElo(canvas: HTMLCanvasElement): ControleElo | null {
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false });
  if (!gl) return null;

  const vs = compilar(gl, gl.VERTEX_SHADER, VERTICE);
  const fs = compilar(gl, gl.FRAGMENT_SHADER, FRAGMENTO);
  if (!vs || !fs) return null;

  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, 'uRes');
  const uTempo = gl.getUniformLocation(prog, 'uTempo');
  const uProg = gl.getUniformLocation(prog, 'uProg');

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  let progresso = 1;
  let rodando = false;
  let quadro = 0;
  const inicio = performance.now();

  // DPR limitado: a faixa e fina, nao vale queimar fill rate em tela retina
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  const medir = () => {
    const l = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const a = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== l || canvas.height !== a) {
      canvas.width = l;
      canvas.height = a;
      gl.viewport(0, 0, l, a);
    }
    gl.uniform2f(uRes, canvas.width, canvas.height);
  };

  const desenhar = () => {
    if (!rodando) return;
    medir();
    gl.uniform1f(uTempo, (performance.now() - inicio) / 1000);
    gl.uniform1f(uProg, progresso);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    quadro = requestAnimationFrame(desenhar);
  };

  const tocar = () => {
    if (rodando) return;
    rodando = true;
    quadro = requestAnimationFrame(desenhar);
  };
  const pausar = () => {
    rodando = false;
    cancelAnimationFrame(quadro);
  };

  // so gasta GPU enquanto o elo esta na tela e a aba esta visivel
  const observador = new IntersectionObserver(
    ([e]) => (e?.isIntersecting && !document.hidden ? tocar() : pausar()),
    { threshold: 0 }
  );
  observador.observe(canvas);

  const aoTrocarAba = () => (document.hidden ? pausar() : tocar());
  document.addEventListener('visibilitychange', aoTrocarAba);

  return {
    progresso: (v) => {
      progresso = v;
    },
    destruir: () => {
      pausar();
      observador.disconnect();
      document.removeEventListener('visibilitychange', aoTrocarAba);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
