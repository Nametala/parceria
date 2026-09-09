import { cases } from '../config/site';
import { gsap, eMobile, T, E } from '../lib/motion';
import { usarContexto } from '../lib/usarContexto';
import { Valor } from './Texto';

/**
 * WOW 03 — o portfolio como exposicao, nao como grade.
 *
 * No desktop a secao prende e os projetos passam na horizontal, cada um
 * ocupando quase a tela inteira. No celular vira pilha vertical: scroll
 * horizontal preso em tela pequena briga com o gesto natural do sistema.
 */
export function Provas() {
  const ref = usarContexto<HTMLElement>((raiz) => {
    const q = gsap.utils.selector(raiz);
    const trilho = q<HTMLDivElement>('.p-trilho')[0];
    if (!trilho) return;

    if (eMobile()) {
      gsap.fromTo(
        q('.p-painel'),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: T.medio,
          stagger: 0.1,
          ease: E.saida,
          scrollTrigger: { trigger: raiz, start: 'top 70%', once: true },
        }
      );
      return;
    }

    const distancia = () => Math.max(0, trilho.scrollWidth - window.innerWidth);
    gsap.to(trilho, {
      x: () => -distancia(),
      ease: 'none',
      scrollTrigger: {
        trigger: raiz,
        start: 'top top',
        end: () => `+=${distancia()}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  });

  return (
    <section ref={ref} id="provas" className="relative scroll-mt-20 overflow-hidden">
      <div className="flex min-h-[100svh] flex-col justify-center py-24">
        <div className="grade">
          <p className="rotulo">Trabalhos</p>
          <h2 className="display mt-6 max-w-[18ch] text-[clamp(2rem,5.2vw,4.25rem)]">
            Negócios que hoje aparecem quando alguém procura.
          </h2>
        </div>

        <div className="p-trilho mt-14 flex flex-col gap-12 md:mt-20 md:w-max md:flex-row md:gap-0">
          {cases.map((c, i) => (
            <article
              key={c.id}
              className="p-painel grade shrink-0 border-t-2 border-[var(--tinta)] pt-8 md:w-[min(76vw,860px)] md:border-t-0 md:border-l-2 md:pt-0"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[0.75rem] text-[var(--vermelho)]">
                  0{i + 1} / 0{cases.length}
                </span>
                <span className="rotulo">
                  <Valor>{c.segmento}</Valor>
                </span>
              </div>

              <h3 className="display mt-4 text-[clamp(2rem,5.2vw,4.25rem)]">{c.cliente}</h3>

              <p className="mt-3 font-mono text-[0.8125rem] text-[var(--tinta-media)]">
                <Valor>{c.local}</Valor>
              </p>

              <dl className="mt-10 grid max-w-[52ch] gap-6 sm:grid-cols-2">
                <div>
                  <dt className="rotulo">O que fizemos</dt>
                  <dd className="mt-2 leading-[1.5]">
                    <Valor>{c.oQueFizemos}</Valor>
                  </dd>
                </div>
                <div>
                  <dt className="rotulo">Resultado</dt>
                  <dd className="mt-2 leading-[1.5]">
                    <Valor>{c.resultado}</Valor>
                  </dd>
                </div>
              </dl>
            </article>
          ))}

          <div className="p-painel grade flex shrink-0 items-center md:w-[min(58vw,600px)] md:border-l-2 md:border-[var(--tinta)]">
            <p className="display max-w-[15ch] text-[clamp(1.5rem,3.6vw,2.5rem)] text-[var(--vermelho)]">
              O site que você está lendo também é nosso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
