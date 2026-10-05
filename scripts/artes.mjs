/**
 * Exporta as artes do Instagram em PNG, com o Chrome que ja esta na maquina —
 * sem dependencia nova, como o scripts/proposta.mjs. O vite precisa estar no
 * ar (npm run dev), porque a pagina usa as fontes e os tokens do site.
 *
 *   node scripts/artes.mjs                 # todas as artes
 *   node scripts/artes.mjs p10 p11         # so os quadros desses posts
 *   node scripts/artes.mjs p10-1 s-preco-2 # so esses quadros
 *   node scripts/artes.mjs --folha         # a grade inteira numa imagem so
 *
 * O tamanho sai do proprio id, porque o Instagram so tem tres formatos: post
 * 1080x1350, story 1080x1920 (`s-`) e capa de destaque 1080x1080
 * (`destaque-`). Destino: midia/instagram/{artes,stories}/<id>.png.
 *
 * Por que CDP e nao o `--screenshot` da linha de comando: no Windows o
 * `--window-size` conta a moldura da janela, entao o quadro saia com ~16px
 * de largura e ~85px de altura em branco. Com Emulation.setDeviceMetricsOverride
 * o viewport e exatamente o tamanho da arte, sem compensacao chutada.
 */
import { execFile } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const CHROME = process.env.CHROME ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL_BASE = 'http://localhost:5173/midia/instagram/posts.html';
const PORTA = 9334;
const PAGINA = fileURLToPath(new URL('../midia/instagram/posts.html', import.meta.url));

/** Os ids vivem no array `slides` da propria pagina — ler de la evita uma
 *  segunda lista que envelhece sozinha. */
const declarados = [...readFileSync(PAGINA, 'utf8').matchAll(/\bid: '([^']+)'/g)].map((m) => m[1]);

/* ponytail: os ids montados dentro de .map() na pagina (s-prazo-N,
   s-trabalhos-N, destaque-X) nao aparecem no regex, por isso estao a mao.
   Se um dia virarem muitos, exportar a lista da pagina em vez de repetir. */
const GERADOS = [
  's-prazo-1', 's-prazo-2', 's-prazo-3', 's-prazo-4',
  's-trabalhos-1', 's-trabalhos-2', 's-trabalhos-3',
  'destaque-preco', 'destaque-prazo', 'destaque-trabalhos', 'destaque-dupla', 'destaque-pedir',
];

const formato = (id) =>
  id.startsWith('destaque-') ? [1080, 1080] : id.startsWith('s-') ? [1080, 1920] : [1080, 1350];
const pasta = (id) => (id.startsWith('s-') ? 'stories' : 'artes');

const pedidos = process.argv.slice(2).filter((a) => a !== '--folha');
const folha = process.argv.includes('--folha');
const lista = folha ? [] : [...new Set([...declarados, ...GERADOS])].filter(
  (id) => pedidos.length === 0 || pedidos.some((p) => id === p || id.startsWith(p + '-')),
);

if (!folha && lista.length === 0) {
  console.error(`Nenhum quadro casa com: ${pedidos.join(' ')}`);
  process.exit(1);
}

/* A folha de contato: a pagina inteira numa imagem so, para conferir a
   colecao de uma vez. Quatro colunas (4x1080 + os vaos) e escala 1/4,
   porque em tamanho real a altura passa do limite de textura do Chrome. */
const FOLHA_LARGURA = 4600;
const FOLHA_ESCALA = 0.25;

const espera = (ms) => new Promise((r) => setTimeout(r, ms));

/** Conexao CDP: um socket so, sessao achatada (`flatten`) para falar com a
 *  aba pelo mesmo canal do navegador. */
function conectar(url) {
  const ws = new WebSocket(url);
  const pendentes = new Map();
  let proximo = 0;
  ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data);
    const p = pendentes.get(msg.id);
    if (!p) return; // evento solto: nao usamos nenhum, a espera e por polling
    pendentes.delete(msg.id);
    msg.error ? p.rejeita(new Error(msg.error.message)) : p.resolve(msg.result);
  });
  const pronto = new Promise((r, j) => {
    ws.addEventListener('open', r, { once: true });
    ws.addEventListener('error', () => j(new Error('CDP nao conectou')), { once: true });
  });
  const manda = (method, params = {}, sessionId) =>
    new Promise((resolve, rejeita) => {
      const id = ++proximo;
      pendentes.set(id, { resolve, rejeita });
      ws.send(JSON.stringify({ id, method, params, ...(sessionId && { sessionId }) }));
    });
  return { pronto, manda, fecha: () => ws.close() };
}

const perfil = mkdtempSync(join(tmpdir(), 'id-artes-'));
const chrome = execFile(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--user-data-dir=${perfil}`,
  `--remote-debugging-port=${PORTA}`,
  'about:blank',
]);

/** Espera o Chrome subir a porta de depuracao. */
async function alvoDoNavegador() {
  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORTA}/json/version`);
      return (await r.json()).webSocketDebuggerUrl;
    } catch {
      await espera(100);
    }
  }
  throw new Error('Chrome nao abriu a porta de depuracao');
}

const cdp = conectar(await alvoDoNavegador());
await cdp.pronto;

const { targetId } = await cdp.manda('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await cdp.manda('Target.attachToTarget', { targetId, flatten: true });
await cdp.manda('Page.enable', {}, sessionId);

/** Espera a pagina montar e as fontes carregarem (a propria pagina marca
 *  data-fontes="ok" quando document.fonts.ready resolve). Sem isso o quadro
 *  sai no fallback e a tipografia da marca muda. */
async function esperarPronta(condicao) {
  for (let i = 0; i < 100; i++) {
    await espera(100);
    const { result } = await cdp.manda('Runtime.evaluate', {
      expression: `document.documentElement.dataset.fontes === 'ok' && (${condicao})`,
    }, sessionId);
    if (result.value === true) return;
  }
  throw new Error('a pagina nao ficou pronta em 10s');
}

try {
  if (folha) {
    await cdp.manda('Emulation.setDeviceMetricsOverride',
      { width: FOLHA_LARGURA, height: 2000, deviceScaleFactor: 1, mobile: false }, sessionId);
    await cdp.manda('Page.navigate', { url: URL_BASE }, sessionId);
    await esperarPronta('true');
    const { result } = await cdp.manda('Runtime.evaluate',
      { expression: 'document.documentElement.scrollHeight' }, sessionId);
    const altura = result.value;
    const { data } = await cdp.manda('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: FOLHA_LARGURA, height: altura, scale: FOLHA_ESCALA },
      captureBeyondViewport: true,
    }, sessionId);
    const saida = fileURLToPath(new URL('../midia/instagram/folha-de-contato.png', import.meta.url));
    writeFileSync(saida, Buffer.from(data, 'base64'));
    console.log(`folha-de-contato  ${FOLHA_LARGURA * FOLHA_ESCALA}x${Math.round(altura * FOLHA_ESCALA)}`);
  }

  for (const id of lista) {
    const [width, height] = formato(id);
    await cdp.manda('Emulation.setDeviceMetricsOverride',
      { width, height, deviceScaleFactor: 1, mobile: false }, sessionId);
    await cdp.manda('Page.navigate', { url: `${URL_BASE}?id=${id}` }, sessionId);

    await esperarPronta(`!!document.getElementById(${JSON.stringify(id)})`);

    const { data } = await cdp.manda('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width, height, scale: 1 },
      captureBeyondViewport: true,
    }, sessionId);

    const saida = fileURLToPath(new URL(`../midia/instagram/${pasta(id)}/${id}.png`, import.meta.url));
    writeFileSync(saida, Buffer.from(data, 'base64'));
    console.log(`${id}  ${width}x${height}`);
  }
} finally {
  await cdp.manda('Browser.close').catch(() => {});
  cdp.fecha();
  chrome.kill();
}
