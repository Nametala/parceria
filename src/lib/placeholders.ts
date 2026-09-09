import { contato, planos, cases, temPlaceholder } from '../config/site';

/**
 * Lista no console tudo que ainda e placeholder. So em dev: existe para
 * ninguem publicar achando que o conteudo esta completo.
 */
export function avisarPlaceholders() {
  const pendentes: string[] = [];

  for (const [k, v] of Object.entries(contato)) {
    if (typeof v === 'string' && temPlaceholder(v)) pendentes.push(`contato.${k} = ${v}`);
  }
  for (const p of planos) {
    if (temPlaceholder(p.preco)) pendentes.push(`plano "${p.nome}".preco = ${p.preco}`);
    if (temPlaceholder(p.prazo)) pendentes.push(`plano "${p.nome}".prazo = ${p.prazo}`);
  }
  for (const c of cases) {
    for (const [k, v] of Object.entries(c)) {
      if (typeof v === 'string' && temPlaceholder(v)) pendentes.push(`case "${c.cliente}".${k} = ${v}`);
    }
  }

  if (pendentes.length) {
    console.warn(
      `[iD] ${pendentes.length} campos ainda sao placeholder (src/config/site.ts):\n` +
        pendentes.map((p) => `  · ${p}`).join('\n')
    );
  }
}
