import { useRef } from 'react';
import { gsap, ScrollTrigger, T, E, ponteiroFino, eMobile } from '../lib/motion';
import { usarContexto } from '../lib/usarContexto';
import { Marca } from './Marca';
import { Botao } from './Botao';
import { Elo } from './Elo';
import { ESPERA_ABERTURA, vaiTerAbertura } from './Abertura';
import { planos, prazo } from '../config/site';

/**
 * Linha de titulo com mascara: o interior sobe de baixo no reveal.
 *
 * O padding-bottom nao e estetico. `overflow: hidden` corta na borda da caixa
 * de padding, e a descendente do "g" desce ~0.2em abaixo da linha de base —
 * sem essa folga ela e decapitada. O reveal continua funcionando porque o
 * interior sobe 105% da propria altura, muito alem da folga.
 */
function Mascara({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.16em] ${className}`}>
      <span className="mask-in block">{children}</span>
    </span>
  );
}

/**
 * Hero: o vao.
 *
 * A frase e uma so — "Seu site em 5 dias" — partida no meio pela marca: e a
 * iD que fecha o vao entre as duas metades. A entrada e uma sequencia unica,
 * nao elementos animados soltos; a saida transforma a propria linha na secao
 * seguinte, entao nao existe "fim da hero", existe passagem.
 */
export function Hero() {
  const marcaRef = useRef<HTMLDivElement>(null);

  const ref = usarContexto<HTMLElement>((raiz) => {
    const q = gsap.utils.selector(raiz);

    // ── ENTRADA: sequencia de 7 estados ──────────────────────────────────
    // se a abertura vai rodar, a hero so comeca quando a cortina sobe:
    // senao o usuario perde a sequencia inteira atras dela
    const tl = gsap.timeline({
      delay: vaiTerAbertura() ? ESPERA_ABERTURA : 0,
      defaults: { ease: E.saida },
    });

    tl.set(raiz, { visibility: 'visible' })
      // 01 a pagina comeca quase vazia: so a marca
      .fromTo(
        q('.h-marca'),
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: T.medio, ease: E.elastico }
      )
      // 02 a marca respira: i e D se afastam e voltam
      .to(q('.h-marca .m-i'), { x: -16, duration: 0.34 }, '>-0.05')
      .to(q('.h-marca .m-d'), { x: 16, duration: 0.34 }, '<')
      .to(q('.h-marca .m-elo'), { scaleX: 2.45, opacity: 1, duration: 0.34 }, '<')
      .to(q('.h-marca .m-i'), { x: 0, duration: 0.4, ease: E.entrada }, '>0.18')
      .to(q('.h-marca .m-d'), { x: 0, duration: 0.4, ease: E.entrada }, '<')
      .to(q('.h-marca .m-elo'), { scaleX: 1, opacity: 0, duration: 0.4 }, '<')
      // 03 o primeiro lado do vao
      .fromTo(q('.h-l1 .mask-in'), { yPercent: 105 }, { yPercent: 0, duration: T.cinema }, '>-0.25')
      // 04 a linha atravessa: e ela que liga os dois lados
      .fromTo(
        q('.h-linha'),
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: T.cinema, ease: E.entrada },
        '>-0.75'
      )
      // 05 o outro lado
      .fromTo(q('.h-l2 .mask-in'), { yPercent: 105 }, { yPercent: 0, duration: T.cinema }, '>-0.8')
      // 06 o que a gente faz, e o convite
      .fromTo(
        q('.h-entra'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: T.medio, stagger: 0.08 },
        '>-0.6'
      );

    // ── SAIDA: a linha engole a tela e vira a proxima secao ──────────────
    // No mobile isso vira um fade simples: pin + scrub em tela pequena
    // atrapalha mais do que impressiona.
    if (!eMobile()) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: raiz,
            start: 'top top',
            end: '+=90%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        })
        .to(q('.h-l1'), { yPercent: -130, opacity: 0, ease: 'none' }, 0)
        .to(q('.h-l2'), { yPercent: 130, opacity: 0, ease: 'none' }, 0)
        .to(q('.h-entra'), { opacity: 0, ease: 'none' }, 0)
        .to(q('.h-marca'), { opacity: 0, scale: 0.6, ease: 'none' }, 0)
        .to(q('.elo-campo'), { opacity: 0, ease: 'none' }, 0)
        .to(q('.elo-nucleo'), { scaleY: 260, ease: 'power2.in' }, 0);
    }

    // parallax do ponteiro, discreto e so em mouse fino
    if (!ponteiroFino()) return;
    const alvo = marcaRef.current;
    if (!alvo) return;
    const px = gsap.quickTo(alvo, 'x', { duration: 0.8, ease: E.saida });
    const py = gsap.quickTo(alvo, 'y', { duration: 0.8, ease: E.saida });
    const mover = (e: MouseEvent) => {
      px((e.clientX / window.innerWidth - 0.5) * 40);
      py((e.clientY / window.innerHeight - 0.5) * 22);
    };
    window.addEventListener('mousemove', mover, { passive: true });
    ScrollTrigger.refresh();
    return () => window.removeEventListener('mousemove', mover);
  });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-24"
    >
      <div className="grade w-full">
        <p className="h-entra rotulo">Estúdio de identidade digital · Belo Horizonte</p>

        <h1 className="mt-8 md:mt-10">
          <span className="sr-only">iD Soluções: o site do seu negócio no ar em 5 dias.</span>

          <span aria-hidden="true" className="block">
            <Mascara className="h-l1 display text-[clamp(2.5rem,10vw,10rem)]">Seu site</Mascara>

            {/* o vao: a linha e a marca em cima dela */}
            <span className="relative my-5 flex h-16 items-center md:my-7 md:h-24">
              <Elo className="h-linha h-[6px] md:h-[10px]" />
              <span
                ref={marcaRef}
                className="h-marca absolute left-1/2 -translate-x-1/2 bg-[var(--papel)] px-5 md:px-8"
              >
                <Marca altura={eMobile() ? 34 : 54} />
              </span>
            </span>

            <Mascara className="h-l2 display text-right text-[clamp(2.5rem,10vw,10rem)]">
              em {prazo}
            </Mascara>
          </span>
        </h1>

        <div className="mt-14 flex flex-col gap-8 md:mt-20 md:flex-row md:items-end md:justify-between">
          <p className="h-entra max-w-[42ch] text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-[1.45]">
            Somos dois desenvolvedores em Belo Horizonte. Fazemos o site do seu negócio a partir de{' '}
            <strong className="font-semibold">{planos[0].preco}</strong>, com preço fechado, dito
            antes de começar.
          </p>

          <div className="h-entra flex shrink-0 flex-wrap gap-3">
            <Botao href="#contato">Quero meu site no ar</Botao>
            <Botao href="#preco" variante="contorno">
              Ver preços
            </Botao>
          </div>
        </div>
      </div>
    </section>
  );
}
