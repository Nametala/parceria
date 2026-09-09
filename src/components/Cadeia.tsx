import { useRef, useState } from 'react';
import { ScrollTrigger, eMobile } from '../lib/motion';
import { usarContexto } from '../lib/usarContexto';

const elos = [
  {
    palavra: 'Site',
    texto: 'O lugar que é seu. Não o feed de outra empresa, não o perfil que some se a rede cair.',
  },
  {
    palavra: 'Identidade',
    texto:
      'Marca, cor e tipografia. É o que faz o seu negócio parecer sério antes de você dizer uma palavra.',
  },
  {
    palavra: 'Presença',
    texto: 'Aparecer no Google quando alguém procura exatamente o que você faz, na sua cidade.',
  },
  {
    palavra: 'Cliente',
    texto: 'A mensagem chegando no seu WhatsApp. Todo o resto existe só para isso acontecer.',
  },
];

/**
 * Os servicos como uma cadeia, nao como tres cards iguais.
 *
 * A palavra gigante fica presa e troca conforme o texto correspondente passa:
 * o proprio scroll executa a transformacao negocio -> cliente. No celular a
 * palavra vira o titulo de cada bloco, porque nao ha espaco para duas colunas.
 */
export function Cadeia() {
  const [ativo, setAtivo] = useState(0);
  const secoes = useRef<(HTMLLIElement | null)[]>([]);

  const ref = usarContexto<HTMLElement>(() => {
    if (eMobile()) return;
    const gatilhos = secoes.current.map((el, i) =>
      el
        ? ScrollTrigger.create({
            trigger: el,
            start: 'top 62%',
            end: 'bottom 62%',
            onToggle: ({ isActive }) => isActive && setAtivo(i),
          })
        : null
    );
    return () => gatilhos.forEach((g) => g?.kill());
  });

  return (
    <section ref={ref} id="como" className="scroll-mt-20 py-28 md:py-40">
      <div className="grade">
        <p className="rotulo">02 — O que a gente entrega</p>
        <h2 className="display mt-6 max-w-[20ch] text-[clamp(2rem,5vw,3.5rem)]">
          Site é a primeira peça. Cliente é a última.
        </h2>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[1.05fr_1fr] md:gap-24">
          {/* a palavra presa, que se transforma */}
          <div className="hidden md:block">
            <div className="sticky top-[24vh]">
              <div className="relative h-[16vw] min-h-[7rem]">
                {elos.map((elo, i) => (
                  <span
                    key={elo.palavra}
                    aria-hidden="true"
                    className="display absolute top-0 left-0 text-[clamp(3rem,11vw,10rem)] transition-[opacity,transform,color] duration-500"
                    style={{
                      opacity: ativo === i ? 1 : 0,
                      transform: `translateY(${(i - ativo) * 22}px)`,
                      color: ativo === i ? 'var(--tinta)' : 'var(--linha)',
                    }}
                  >
                    {elo.palavra}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex gap-2" aria-hidden="true">
                {elos.map((elo, i) => (
                  <span
                    key={elo.palavra}
                    className="h-[3px] flex-1 transition-colors duration-500"
                    style={{ background: i <= ativo ? 'var(--vermelho-vivo)' : 'var(--linha)' }}
                  />
                ))}
              </div>
            </div>
          </div>

          <ol className="flex flex-col">
            {elos.map((elo, i) => (
              <li
                key={elo.palavra}
                ref={(el) => {
                  secoes.current[i] = el;
                }}
                className="border-t border-[var(--linha)] py-10 md:py-20"
              >
                <span className="rotulo">0{i + 1}</span>
                <h3 className="display mt-3 text-[clamp(2rem,7vw,3rem)] md:hidden">{elo.palavra}</h3>
                <p className="mt-4 max-w-[46ch] text-[clamp(1.0625rem,1.5vw,1.375rem)] leading-[1.5]">
                  {elo.texto}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
