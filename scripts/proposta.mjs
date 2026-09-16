/**
 * Imprime a proposta (midia/proposta/proposta.html) em PDF com o Chrome que
 * ja esta na maquina — sem dependencia nova. O vite precisa estar no ar
 * (npm run dev), porque a pagina importa src/config/site.ts e as fontes.
 *
 *   node scripts/proposta.mjs
 *   node scripts/proposta.mjs --cliente "Padaria do Zé" --plano identidade
 *
 * Opcoes: --cliente, --plano (pagina|identidade), --data AAAA-MM-DD, --validade dias.
 * Sai em midia/proposta/proposta.pdf (ou proposta-<cliente>.pdf).
 */
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const CHROME = process.env.CHROME ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL_BASE = 'http://localhost:5173/midia/proposta/proposta.html';

const args = process.argv.slice(2);
const opcao = (nome) => {
  const i = args.indexOf(`--${nome}`);
  return i === -1 ? undefined : args[i + 1];
};

const q = new URLSearchParams();
for (const nome of ['cliente', 'plano', 'data', 'validade']) {
  const v = opcao(nome);
  if (v) q.set(nome, v);
}

const slug = (opcao('cliente') ?? '')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const saida = fileURLToPath(new URL(`../midia/proposta/proposta${slug ? '-' + slug : ''}.pdf`, import.meta.url));

execFileSync(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--virtual-time-budget=5000', // deixa as fontes carregarem antes de imprimir
  `--print-to-pdf=${saida}`,
  `${URL_BASE}?${q}`,
], { stdio: 'ignore' });

console.log(saida);
