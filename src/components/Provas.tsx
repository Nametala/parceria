import { useState } from 'react';
import { cases } from '../config/site';
import { gsap, deveAnimar, eMobile, T, E } from '../lib/motion';
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
  // O trilho horizontal so pode existir se a animacao existir: quem desliza
  // o trilho e o GSAP, e a secao corta o que passa da largura da tela. Sem
  // animacao — aba aberta em segundo plano, prefers-reduced-motion — dois
  // dos tres projetos ficariam fora da tela sem nenhuma forma de alcancar.
  // Decidido no primeiro render, e nao num efeito, para que a animacao seja
  // montada ja sobre o layout definitivo.
  const [horizontal] = useState(() => deveAnimar() && !eMobile());

  const ref = usarContexto<HTMLElement>((raiz) => {
    const q = gsap.utils.selector(raiz);
    const trilho = q<HTMLDivElement>('.p-trilho')[0];
    if (!trilho) return;

    if (!horizontal) {
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
    <section
      ref={ref}
      id="provas"
      className={`relative scroll-mt-20 ${horizontal ? 'overflow-hidden' : 'py-24 md:py-32'}`}
    >
      <div className={horizontal ? 'flex min-h-[100svh] flex-col justify-center py-14' : ''}>
        <div className="grade">
          <p className="rotulo">Trabalhos</p>
          <h2 className="display mt-4 max-w-[18ch] text-[clamp(2rem,4.4vw,3.5rem)]">
            Negócios que hoje aparecem quando alguém procura.
          </h2>
        </div>

        <div
          className={`p-trilho mt-10 flex flex-col gap-12 ${
            horizontal ? 'md:w-max md:flex-row md:gap-0' : ''
          }`}
        >
          {cases.map((c) => (
            <article
              key={c.id}
              className={`p-painel grade shrink-0 border-t-2 border-[var(--tinta)] pt-8 ${
                horizontal ? 'md:w-[min(76vw,860px)] md:border-t-0 md:border-l-2 md:pt-0' : ''
              }`}
            >
              <span className="rotulo">
                <Valor>{c.segmento}</Valor>
              </span>

              <h3 className="display mt-3 text-[clamp(2rem,4.6vw,3.5rem)]">{c.cliente}</h3>

              <p className="mt-2 font-mono text-[0.8125rem] text-[var(--tinta-media)]">
                <Valor>{c.local}</Valor>
              </p>

              {/* descricao e link na mesma linha, alinhados pela base: empilhados
                  o cartao passava da altura da tela e o link, que e o ultimo
                  elemento, era o primeiro a ser cortado pelo overflow da secao */}
              <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
                <dl className="max-w-[46ch]">
                  <dt className="rotulo">O que fizemos</dt>
                  <dd className="mt-2 leading-[1.5]">
                    <Valor>{c.oQueFizemos}</Valor>
                  </dd>
                </dl>

                {/* a prova de um estudio de site e o site no ar, nao um numero
                    de conversao que ninguem consegue conferir */}
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] shrink-0 items-center gap-2 self-start border-b-2 border-[var(--linha-forte)] font-mono text-[0.8125rem] tracking-[0.1em] whitespace-nowrap uppercase transition-colors hover:border-[var(--vermelho)] hover:text-[var(--vermelho)] sm:self-auto"
                >
                  Ver o site no ar
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only">de {c.cliente}</span>
                </a>
              </div>
            </article>
          ))}

          <div
            className={`p-painel grade flex shrink-0 items-center ${
              horizontal ? 'md:w-[min(58vw,600px)] md:border-l-2 md:border-[var(--tinta)]' : ''
            }`}
          >
            <p className="display max-w-[15ch] text-[clamp(1.5rem,3.6vw,2.5rem)] text-[var(--vermelho)]">
              O site que você está lendo também é nosso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
