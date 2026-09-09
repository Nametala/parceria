import { dupla } from '../config/site';
import { gsap, T, E } from '../lib/motion';
import { usarContexto } from '../lib/usarContexto';

const contagem = [
  { n: '2', o: 'pessoas' },
  { n: '1', o: 'projeto' },
  { n: '0', o: 'burocracia' },
];

/**
 * Os dois desenvolvedores — sem foto redonda, nome e cargo.
 *
 * A composicao repete a marca: duas colunas separadas por um vao, e uma
 * linha que so aparece quando a secao entra. O mesmo gesto do logo, em
 * escala de secao.
 */
export function Dupla() {
  const ref = usarContexto<HTMLElement>((raiz) => {
    const q = gsap.utils.selector(raiz);
    gsap
      .timeline({ scrollTrigger: { trigger: raiz, start: 'top 68%', once: true } })
      .fromTo(
        q('.d-num'),
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: T.medio, stagger: 0.09, ease: E.saida }
      )
      .fromTo(
        q('.d-elo'),
        { scaleX: 0 },
        { scaleX: 1, duration: T.cinema, ease: E.entrada },
        '-=0.3'
      )
      .fromTo(
        q('.d-pessoa'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: T.medio, stagger: 0.12, ease: E.saida },
        '-=0.7'
      );
  });

  return (
    <section ref={ref} id="dupla" className="scroll-mt-20 py-28 md:py-40">
      <div className="grade">
        <p className="rotulo">05 — Quem faz</p>
        {/* o titulo visual desta secao e a contagem 2 / 1 / 0 logo abaixo;
            este H2 existe para leitor de tela e para a hierarquia nao pular */}
        <h2 className="sr-only">Somos dois. Você fala com quem escreve o código.</h2>

        <ul className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-4 md:mt-14 md:gap-x-20">
          {contagem.map((c) => (
            <li key={c.o} className="overflow-hidden">
              <span className="d-num flex items-baseline gap-3">
                <span className="display text-[clamp(3.5rem,11vw,9rem)] text-[var(--azul)]">
                  {c.n}
                </span>
                <span className="display text-[clamp(1.25rem,3vw,2.5rem)]">{c.o}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* o mesmo elo do logotipo, em escala de secao */}
        <div
          aria-hidden="true"
          className="d-elo mt-12 h-[6px] w-full origin-left bg-[var(--vermelho-vivo)] md:mt-16"
        />

        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-24">
          {dupla.map((p) => (
            <article key={p.nome} className="d-pessoa">
              <h3 className="display text-[clamp(2.5rem,7vw,4.5rem)]">
                {p.nome}
                <span className="block text-[var(--tinta-media)]">{p.sobrenome}</span>
              </h3>
              <p className="rotulo mt-5 text-[var(--vermelho)]">{p.papel}</p>
              <p className="mt-5 max-w-[40ch] leading-[1.55]">{p.faz}</p>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="github"
                className="mt-6 inline-flex min-h-[48px] items-center border-b-2 border-[var(--tinta)] font-mono text-[0.8125rem] tracking-[0.1em] uppercase transition-colors hover:border-[var(--vermelho)] hover:text-[var(--vermelho)]"
              >
                GitHub de {p.nome}
              </a>
            </article>
          ))}
        </div>

        <p className="mt-16 max-w-[52ch] border-t border-[var(--linha)] pt-8 text-[clamp(1.0625rem,1.5vw,1.375rem)] leading-[1.5]">
          Não existe atendimento, gerente de contas nem “nossa equipe entrará em contato”. Você fala
          com quem escreve o código.
        </p>
      </div>
    </section>
  );
}
