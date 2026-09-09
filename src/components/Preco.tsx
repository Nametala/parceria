import { planos } from '../config/site';
import { gsap, T, E } from '../lib/motion';
import { usarContexto } from '../lib/usarContexto';
import { Valor } from './Texto';

/**
 * Preco em dois cards.
 *
 * Nao sao cards de SaaS: sem sombra, sem raio, sem borda clarinha. Sao dois
 * blocos de borda grossa no mesmo vocabulario de regua que o resto do site
 * usa, e o segundo herda a chapa escura que ja existe no sistema — e ela que
 * cria a hierarquia, nao um selo de "mais popular".
 */
export function Preco() {
  const ref = usarContexto<HTMLElement>((raiz) => {
    const q = gsap.utils.selector(raiz);
    gsap.fromTo(
      q('.pr-card'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: T.medio,
        stagger: 0.12,
        ease: E.saida,
        scrollTrigger: { trigger: raiz, start: 'top 72%', once: true },
      }
    );
  });

  return (
    <section ref={ref} id="preco" className="scroll-mt-20 py-24 md:py-36">
      <div className="grade">
        <p className="rotulo">Preço</p>
        <h2 className="display mt-5 max-w-[16ch] text-[clamp(2rem,5.2vw,4.25rem)]">
          O valor vem antes do trabalho.
        </h2>
        <p className="mt-7 max-w-[46ch] text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.55]">
          Sem “solicite um orçamento”. Você vê o número aqui, a gente confirma na conversa, e ele não
          muda no meio do caminho.
        </p>

        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          {planos.map((p) => (
            <article
              key={p.id}
              className={`pr-card flex flex-col border-2 border-[var(--tinta)] p-7 md:p-10 ${
                p.destaque ? 'chapa-tinta' : ''
              }`}
            >
              <h3 className="rotulo !text-[0.75rem] !tracking-[0.18em]">{p.nome}</h3>

              <p className="display mt-5 text-[clamp(3rem,7vw,5.5rem)] leading-[0.9]">
                <Valor>{p.preco}</Valor>
              </p>

              <p className="mt-5 max-w-[34ch] text-[0.9375rem] leading-[1.55] text-[var(--tinta-media)]">
                {p.para}
              </p>

              <ul className="mt-9 flex flex-col gap-3 border-t border-[var(--linha)] pt-7">
                {p.inclui.map((item) => (
                  <li key={item} className="flex gap-4 text-[0.9375rem] leading-[1.45]">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-[6px] w-[6px] shrink-0 bg-[var(--vermelho-vivo)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-7 font-mono text-[0.75rem] text-[var(--tinta-media)]">
                no ar em <Valor>{p.prazo}</Valor>
              </p>

              <a
                href="#contato"
                className={`mt-8 inline-flex min-h-[56px] items-center justify-center px-6 font-semibold transition-colors ${
                  p.destaque
                    ? 'bg-[var(--vermelho-vivo)] text-[#14130F] hover:opacity-90'
                    : 'border-2 border-[var(--tinta)] hover:bg-[var(--tinta)] hover:text-[var(--papel)]'
                }`}
              >
                Quero este
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
