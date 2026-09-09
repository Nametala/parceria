#!/usr/bin/env node
// Contrastes WCAG da paleta iD v2. Quebra se alguem trocar uma cor por outra
// que reprove no uso previsto. Rode: node scripts/check-contrast.mjs
import { strict as assert } from 'node:assert';

const luminancia = (hex) =>
  [0, 2, 4]
    .map((i) => parseInt(hex.slice(1 + i, 3 + i), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((soma, canal, i) => soma + [0.2126, 0.7152, 0.0722][i] * canal, 0);

export const contraste = (frente, fundo) => {
  const a = luminancia(frente);
  const b = luminancia(fundo);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};

// Tema unico e claro, de proposito. O site nao segue prefers-color-scheme:
// direcao de arte e escolha, nao preferencia do sistema operacional.
export const cor = {
  papel: '#F2EFE7',
  papelFundo: '#E8E4D9',
  tinta: '#14130F',
  tintaMedia: '#57544A',
  linha: '#D6D1C2',
  linhaForte: '#8B8677',
  azul: '#1B3BFF',
  azulEscuro: '#1330C7',
  vermelho: '#CE2809',
  vermelhoVivo: '#FF3B14',
  branco: '#FFFFFF',

  // tokens que a classe .chapa-tinta redefine para os filhos
  chapaTintaMedia: '#A5A196',
  chapaLinhaForte: '#6B6659',
  chapaAzul: '#7B90FF',
};

// [frente, fundo, minimo, descricao]
// 4.5 = texto normal · 3.0 = texto grande e borda de UI
const casos = [
  [cor.tinta, cor.papel, 4.5, 'texto principal / papel'],
  [cor.tintaMedia, cor.papel, 4.5, 'texto secundario / papel'],
  [cor.tinta, cor.papelFundo, 4.5, 'texto principal / papel de fundo'],
  [cor.azul, cor.papel, 4.5, 'link e marca / papel'],
  [cor.branco, cor.azul, 4.5, 'texto de botao / azul'],
  [cor.vermelho, cor.papel, 4.5, 'vermelho como texto / papel'],
  [cor.branco, cor.vermelho, 4.5, 'texto de botao / vermelho'],
  [cor.linhaForte, cor.papel, 3.0, 'borda de UI / papel'],
  [cor.vermelhoVivo, cor.papel, 3.0, 'vermelho vivo em display grande / papel'],
  [cor.tinta, cor.vermelhoVivo, 4.5, 'texto escuro sobre chapa vermelha'],
  [cor.papel, cor.tinta, 4.5, 'texto claro / chapa tinta'],
  [cor.vermelhoVivo, cor.tinta, 4.5, 'vermelho vivo / chapa tinta'],
  [cor.chapaTintaMedia, cor.tinta, 4.5, 'texto secundario / chapa tinta'],
  [cor.chapaAzul, cor.tinta, 4.5, 'azul / chapa tinta'],
  [cor.chapaLinhaForte, cor.tinta, 3.0, 'borda de UI / chapa tinta'],
  [cor.tinta, cor.vermelhoVivo, 4.5, 'texto do botao vermelho na chapa'],
];

let reprovados = 0;
for (const [frente, fundo, minimo, descricao] of casos) {
  const r = contraste(frente, fundo);
  const passou = r >= minimo;
  if (!passou) reprovados++;
  console.log(
    `${passou ? 'ok  ' : 'FALHA'} ${r.toFixed(2).padStart(5)}:1  (min ${minimo})  ${descricao}`
  );
}

console.log(`\n${casos.length - reprovados}/${casos.length} pares aprovados`);
assert.equal(reprovados, 0, `${reprovados} par(es) reprovaram no contraste WCAG`);
