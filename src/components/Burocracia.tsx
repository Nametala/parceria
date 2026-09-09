import { gsap, T, E, eMobile } from '../lib/motion';
import { usarContexto } from '../lib/usarContexto';

const agencia = [
  'Formulário de briefing',
  'Reunião de alinhamento',
  'Proposta comercial',
  'Reunião para revisar a proposta',
  'Aprovação de escopo',
  'Contrato',
  'Reunião de kickoff',
  'Desenvolvimento',
  'Rodada de ajustes',
  'Mais uma rodada de ajustes',
];

const id = ['Você chama no WhatsApp', 'A gente faz', 'Seu site entra no ar'];

/**
 * WOW 02 — a burocracia sendo cortada.
 *
 * A secao fica presa e cada etapa da agencia e riscada conforme o scroll
 * avanca. Nao e enfeite: o risco e a mensagem. No fim sobra a coluna da
 * direita, que sempre esteve inteira.
 */
export function Burocracia() {
  const ref = usarContexto<HTMLElement>((raiz) => {
    const q = gsap.utils.selector(raiz);

    if (eMobile()) {
      // no celular a mesma ideia sem pin: os riscos entram conforme a lista passa
      gsap.fromTo(
        q('.b-risco'),
        { scaleX: 0 },
        {
          scaleX: 1,
          stagger: 0.08,
          duration: T.medio,
          ease: E.saida,
          scrollTrigger: { trigger: q('.b-lista')[0], start: 'top 75%', once: true },
        }
      );
      return;
    }

    gsap
      .timeline({
        scrollTrigger: {
          trigger: raiz,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      })
      .fromTo(
        q('.b-risco'),
        { scaleX: 0 },
        { scaleX: 1, stagger: 0.7, duration: 1, ease: 'none' },
        0
      )
      .to(q('.b-item'), { opacity: 0.22, stagger: 0.7, duration: 1, ease: 'none' }, 0)
      .fromTo(
        q('.b-total'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.2, ease: E.saida },
        '>-1'
      );
  });

  return (
    <section
      ref={ref}
      id="burocracia"
      className="chapa-tinta relative flex min-h-[100svh] scroll-mt-20 items-center overflow-hidden py-24"
    >
      <div className="grade w-full">
        <p className="rotulo">O que a gente cortou</p>
        <h2 className="display mt-6 max-w-[16ch] text-[clamp(2rem,5.2vw,4.25rem)]">
          A parte chata já foi removida.
        </h2>

        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-2 md:gap-20">
          <div>
            <p className="rotulo mb-6">Agência tradicional · 10 etapas</p>
            <ul className="b-lista flex flex-col gap-3">
              {agencia.map((etapa) => (
                <li key={etapa} className="b-item relative w-fit pr-1">
                  <span className="text-[clamp(0.9375rem,1.5vw,1.25rem)]">{etapa}</span>
                  <span
                    aria-hidden="true"
                    className="b-risco absolute top-1/2 left-0 h-[3px] w-full origin-left bg-[var(--vermelho-vivo)]"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="rotulo mb-6 text-[var(--vermelho-vivo)]">iD · 3 etapas</p>
            <ol className="flex flex-col gap-6">
              {id.map((etapa, i) => (
                <li key={etapa} className="flex items-baseline gap-5">
                  <span className="font-mono text-[0.75rem] text-[var(--vermelho-vivo)]">
                    0{i + 1}
                  </span>
                  <span className="display text-[clamp(1.25rem,2.6vw,2rem)]">{etapa}</span>
                </li>
              ))}
            </ol>

            <p className="b-total mt-12 max-w-[34ch] border-t border-[var(--linha)] pt-6 text-[var(--tinta-media)]">
              Sem contrato que precisa de advogado, sem reunião de duas horas, sem proposta de trinta
              páginas. Você fala com quem escreve o código.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
