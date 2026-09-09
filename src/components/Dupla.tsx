import { dupla, linkZap } from "../config/site";
import { gsap, T, E } from "../lib/motion";
import { usarContexto } from "../lib/usarContexto";

const contagem = [
  { n: "2", o: "pessoas" },
  { n: "1", o: "projeto" },
  { n: "0", o: "burocracia" },
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
      .timeline({
        scrollTrigger: { trigger: raiz, start: "top 68%", once: true },
      })
      .fromTo(
        q(".d-num"),
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: T.medio,
          stagger: 0.09,
          ease: E.saida,
        },
      )
      .fromTo(
        q(".d-elo"),
        { scaleX: 0 },
        { scaleX: 1, duration: T.cinema, ease: E.entrada },
        "-=0.3",
      )
      .fromTo(
        q(".d-pessoa"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: T.medio, stagger: 0.12, ease: E.saida },
        "-=0.7",
      );
  });

  return (
    <section ref={ref} id="dupla" className="scroll-mt-20 py-28 md:py-40">
      <div className="grade">
        <p className="rotulo">Quem faz</p>
        {/* o titulo visual desta secao e a contagem 2 / 1 / 0 logo abaixo;
            este H2 existe para leitor de tela e para a hierarquia nao pular */}
        <h2 className="sr-only">
          Somos dois. Você fala com quem escreve o código.
        </h2>

        <ul className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-4 md:mt-14 md:gap-x-20">
          {contagem.map((c) => (
            <li key={c.o} className="overflow-hidden">
              <span className="d-num flex items-baseline gap-3">
                <span className="display text-[clamp(3rem,7.5vw,6.5rem)] text-[var(--azul)]">
                  {c.n}
                </span>
                <span className="display text-[clamp(1.25rem,3vw,2.5rem)]">
                  {c.o}
                </span>
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
              <h3 className="display text-[clamp(1.75rem,4.2vw,3rem)]">
                {p.nome}
                <span className="block text-[var(--tinta-media)]">
                  {p.sobrenome}
                </span>
              </h3>
              {/* sem cargo, e com o numero direto: e ele que faz "voce fala
                  com quem escreve o codigo" deixar de ser slogan */}
              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2">
                {[
                  {
                    rotulo: "WhatsApp",
                    href: linkZap(
                      p.whatsapp,
                      "Oi, " + p.nome + "! Vim pelo site da iD.",
                    ),
                  },
                  { rotulo: "GitHub", href: p.github },
                ].map((l) => (
                  <a
                    key={l.rotulo}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center gap-2 border-b-2 border-[var(--linha-forte)] font-mono text-[0.8125rem] tracking-[0.1em] uppercase transition-colors hover:border-[var(--vermelho)] hover:text-[var(--vermelho)]"
                  >
                    {l.rotulo}
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only">de {p.nome}</span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-16 max-w-[52ch] border-t border-[var(--linha)] pt-8 text-[clamp(1.0625rem,1.5vw,1.375rem)] leading-[1.5]">
          Não existe atendimento, gerente de contas nem “nossa equipe entrará em
          contato”. Você fala com quem escreve o código.
        </p>
      </div>
    </section>
  );
}
