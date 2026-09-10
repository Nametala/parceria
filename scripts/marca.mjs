/**
 * Exporta a marca iD em SVG e PNG.
 *
 * A geometria e a mesma do componente React (src/components/Marca.tsx): grade
 * 134x100, traco unico 22, terminacoes retas. Como as formas sao quatro
 * primitivas, o PNG sai daqui por amostragem — sem navegador, sem Inkscape,
 * sem dependencia nova. Rodar de novo depois de mexer na marca:
 *
 *   node scripts/marca.mjs
 */
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';

const SAIDA = new URL('../public/marca/', import.meta.url);

// cores do tema (assets/theme.css)
const AZUL = '#1B3BFF';
const TINTA = '#14130F';
const PAPEL = '#F2EFE7';
const AZUL_CLARO = '#7B90FF';

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

// ── geometria, na grade 134x100 ─────────────────────────────────────────
const dentroI = (x, y) =>
  (x - 11) ** 2 + (y - 11) ** 2 <= 121 || (x >= 0 && x <= 22 && y >= 32 && y <= 100);

const dentroD = (x, y) => {
  if (y < 0 || y > 100) return false;
  if (x >= 44 && x <= 66) return true; // haste
  if (x >= 55 && x <= 83 && (y <= 22 || y >= 78)) return true; // barras
  if (x >= 83) {
    const r = Math.hypot(x - 83, y - 50); // bojo: meia coroa circular
    return r >= 28 && r <= 50;
  }
  return false;
};

/** Cobertura 0..1 do pixel, por supersampling 4x4. */
function cobertura(dentro, x0, y0, passo) {
  const N = 4;
  let n = 0;
  for (let i = 0; i < N; i++)
    for (let j = 0; j < N; j++)
      if (dentro(x0 + ((i + 0.5) / N) * passo, y0 + ((j + 0.5) / N) * passo)) n++;
  return n / (N * N);
}

// ── PNG cru, sem dependencia ────────────────────────────────────────────
const TABELA = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = TABELA[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const bloco = (tipo, dados) => {
  const corpo = Buffer.concat([Buffer.from(tipo, 'ascii'), dados]);
  const tam = Buffer.alloc(4);
  tam.writeUInt32BE(dados.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(corpo));
  return Buffer.concat([tam, corpo, crc]);
};
function png(w, h, rgba) {
  const linha = w * 4 + 1;
  const cru = Buffer.alloc(linha * h);
  for (let y = 0; y < h; y++) rgba.copy(cru, y * linha + 1, y * w * 4, (y + 1) * w * 4);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bits por canal
  ihdr[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    bloco('IHDR', ihdr),
    bloco('IDAT', deflateSync(cru, { level: 9 })),
    bloco('IEND', Buffer.alloc(0)),
  ]);
}

/**
 * Desenha a marca num canvas de w x h, com a largura da marca em `larguraMarca`
 * e centralizada. `fundo` nulo = transparente.
 */
function desenhar({ arquivo, w, h, larguraMarca, corI, corD, fundo }) {
  const escala = larguraMarca / 134;
  const dx = (w - larguraMarca) / 2;
  const dy = (h - (100 * escala)) / 2;
  const passo = 1 / escala;
  const [fr, fg, fb] = fundo ? rgb(fundo) : [0, 0, 0];
  const tintas = [
    { dentro: dentroI, cor: rgb(corI) },
    { dentro: dentroD, cor: rgb(corD) },
  ];

  const rgba = Buffer.alloc(w * h * 4);
  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      const gx = (px - dx) / escala;
      const gy = (py - dy) / escala;
      let r = fr,
        g = fg,
        b = fb,
        a = fundo ? 1 : 0;
      for (const t of tintas) {
        const c = cobertura(t.dentro, gx, gy, passo);
        if (!c) continue;
        // "source over" com fundo possivelmente transparente
        const aNova = c + a * (1 - c);
        r = (t.cor[0] * c + r * a * (1 - c)) / aNova;
        g = (t.cor[1] * c + g * a * (1 - c)) / aNova;
        b = (t.cor[2] * c + b * a * (1 - c)) / aNova;
        a = aNova;
      }
      const i = (py * w + px) * 4;
      rgba[i] = Math.round(r);
      rgba[i + 1] = Math.round(g);
      rgba[i + 2] = Math.round(b);
      rgba[i + 3] = Math.round(a * 255);
    }
  }
  writeFileSync(new URL(arquivo, SAIDA), png(w, h, rgba));
  console.log(`${arquivo}  ${w}x${h}`);
}

const svg = (corI, corD, fundo) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 134 100" role="img" aria-label="iD">
  <title>iD</title>
${fundo ? `  <rect x="-13" y="-15" width="160" height="130" fill="${fundo}"/>\n` : ''}  <circle cx="11" cy="11" r="11" fill="${corI}"/>
  <path d="M11 32V100" stroke="${corI}" stroke-width="22" fill="none"/>
  <g fill="none" stroke="${corD}" stroke-width="22">
    <path d="M55 0V100"/>
    <path d="M55 11H83A39 39 0 0 1 83 89H55"/>
  </g>
</svg>
`;

mkdirSync(SAIDA, { recursive: true });

writeFileSync(new URL('marca-id.svg', SAIDA), svg(AZUL, TINTA, null));
writeFileSync(new URL('marca-id-claro.svg', SAIDA), svg(AZUL_CLARO, PAPEL, null));
writeFileSync(new URL('marca-id-mono.svg', SAIDA), svg(TINTA, TINTA, null));
console.log('marca-id.svg / -claro.svg / -mono.svg');

// solta, fundo transparente
desenhar({ arquivo: 'marca-id.png', w: 2010, h: 1500, larguraMarca: 2010, corI: AZUL, corD: TINTA, fundo: null });
desenhar({ arquivo: 'marca-id-claro.png', w: 2010, h: 1500, larguraMarca: 2010, corI: AZUL_CLARO, corD: PAPEL, fundo: null });
desenhar({ arquivo: 'marca-id-mono.png', w: 2010, h: 1500, larguraMarca: 2010, corI: TINTA, corD: TINTA, fundo: null });

// perfil de rede social: quadrado, marca a 62% da largura
desenhar({ arquivo: 'marca-id-perfil.png', w: 1024, h: 1024, larguraMarca: 635, corI: AZUL, corD: TINTA, fundo: PAPEL });
desenhar({ arquivo: 'marca-id-perfil-escuro.png', w: 1024, h: 1024, larguraMarca: 635, corI: AZUL_CLARO, corD: PAPEL, fundo: TINTA });
