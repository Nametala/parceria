import { planos, nao } from '../config/site';
import { Valor } from './Texto';

/**
 * Preco como lista editorial, nao como tres cards iguais.
 *
 * Cada plano e uma linha de largura inteira com o valor em corpo grande.
 * A abertura usa <details> nativo: funciona no teclado e sem JavaScript,
 * entao a informacao de preco nunca depende de script para existir.
 */
export function Preco() {
  return (
    <section id="preco" className="scroll-mt-20 py-28 md:py-40">
      <div className="grade">
        <p className="rotulo">04 — Preço</p>
        <h2 className="display mt-6 max-w-[16ch] text-[clamp(2.25rem,6.5vw,5.5rem)]">
          O valor vem antes do trabalho.
        </h2>
        <p className="mt-8 max-w-[48ch] text-[clamp(1.0625rem,1.5vw,1.375rem)] leading-[1.5]">
          Sem “solicite um orçamento”. Você vê o número aqui, a gente confirma na conversa, e ele não
          muda no meio do caminho.
        </p>

        <ul className="mt-16 border-t-2 border-[var(--tinta)]">
          {planos.map((p) => (
            <li key={p.id} className="border-b-2 border-[var(--tinta)]">
              <details className="group">
                <summary
                  data-cursor="abrir"
                  className="flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-x-8 gap-y-3 py-8 marker:content-none md:py-12"
                >
                  <span className="display text-[clamp(1.75rem,5vw,4rem)] transition-colors group-open:text-[var(--vermelho)]">
                    {p.nome}
                  </span>
                  <span className="flex items-baseline gap-6">
                    <span className="font-mono text-[clamp(1.125rem,2.4vw,2rem)]">
                      <Valor>{p.preco}</Valor>
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-[1.5rem] leading-none transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>

                <div className="grid gap-8 pb-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
                  <p className="max-w-[36ch] text-[var(--tinta-media)]">{p.para}</p>
                  <div>
                    <ul className="flex flex-col gap-2.5">
                      {p.inclui.map((item) => (
                        <li key={item} className="flex gap-4">
                          <span
                            aria-hidden="true"
                            className="mt-[0.62em] h-[7px] w-[7px] shrink-0 bg-[var(--azul)]"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 font-mono text-[0.8125rem] text-[var(--tinta-media)]">
                      no ar em <Valor>{p.prazo}</Valor>
                    </p>
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-8 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <h3 className="display text-[clamp(1.5rem,3vw,2.25rem)]">O que a gente não faz</h3>
          <div>
            <p className="max-w-[46ch] text-[var(--tinta-media)]">
              Dizer isso antes economiza o tempo de todo mundo. Se você precisa de algo dessa lista,
              a gente indica quem faz.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {nao.map((item) => (
                <li
                  key={item}
                  className="border border-[var(--linha-forte)] px-3 py-1.5 font-mono text-[0.75rem] text-[var(--tinta-media)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
