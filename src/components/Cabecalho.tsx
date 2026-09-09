import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, T, E, deveAnimar } from '../lib/motion';
import { Marca } from './Marca';

const secoes = [
  { href: '#burocracia', label: 'O que cortamos' },
  { href: '#como', label: 'O que entregamos' },
  { href: '#provas', label: 'Trabalhos' },
  { href: '#preco', label: 'Preço' },
  { href: '#dupla', label: 'Quem faz' },
  { href: '#contato', label: 'Falar com a gente' },
];

export function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const barraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  // barra de progresso: o usuario sente que esta avancando pela experiencia
  useEffect(() => {
    if (!deveAnimar() || !barraRef.current) return;
    const anim = gsap.fromTo(
      barraRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      }
    );
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  // menu em tela cheia: os links entram em cascata, nao tudo de uma vez
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    if (!deveAnimar()) {
      gsap.set(el, { autoAlpha: aberto ? 1 : 0 });
      return;
    }

    if (aberto) {
      gsap
        .timeline()
        .set(el, { autoAlpha: 1 })
        .fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: T.medio, ease: E.entrada })
        .fromTo(
          el.querySelectorAll('.menu-link'),
          { yPercent: 110 },
          { yPercent: 0, duration: T.medio, stagger: 0.05, ease: E.saida },
          '-=0.2'
        );
    } else {
      gsap.to(el, {
        clipPath: 'inset(0 0 100% 0)',
        duration: T.rapido * 2,
        ease: E.entrada,
        onComplete: () => gsap.set(el, { autoAlpha: 0 }),
      });
    }
  }, [aberto]);

  // fechar com Escape e travar o scroll do fundo enquanto aberto
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false);
    document.addEventListener('keydown', aoTeclar);
    const antes = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', aoTeclar);
      document.body.style.overflow = antes;
      ScrollTrigger.refresh();
    };
  }, [aberto]);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent"
      >
        <div ref={barraRef} className="h-full w-full origin-left bg-[var(--vermelho-vivo)]" />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${
          rolou && !aberto ? 'border-b border-[var(--linha)] bg-[var(--papel)]' : ''
        }`}
      >
        <div className="grade flex h-20 items-center justify-between gap-4">
          <a href="#topo" aria-label="iD — início" className="py-2" data-cursor="topo">
            <Marca altura={30} viva />
          </a>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-id"
            className="relative z-[81] flex min-h-[48px] items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] uppercase"
          >
            <span className="flex flex-col gap-[5px]" aria-hidden="true">
              <span
                className="block h-[2px] w-6 bg-current transition-transform"
                style={{ transform: aberto ? 'translateY(7px) rotate(45deg)' : undefined }}
              />
              <span
                className="block h-[2px] w-6 bg-current transition-opacity"
                style={{ opacity: aberto ? 0 : 1 }}
              />
              <span
                className="block h-[2px] w-6 bg-current transition-transform"
                style={{ transform: aberto ? 'translateY(-7px) rotate(-45deg)' : undefined }}
              />
            </span>
            {aberto ? 'Fechar' : 'Menu'}
          </button>
        </div>
      </header>

      <div
        id="menu-id"
        ref={menuRef}
        className="chapa-tinta invisible fixed inset-0 z-[80] flex items-center opacity-0"
      >
        <nav aria-label="Seções" className="grade w-full">
          <ul className="flex flex-col">
            {secoes.map((s, i) => (
              <li key={s.href} className="overflow-hidden border-b border-[var(--linha)]">
                <a
                  href={s.href}
                  onClick={() => setAberto(false)}
                  data-cursor="ir"
                  className="menu-link flex items-baseline gap-6 py-4 md:gap-10"
                >
                  <span className="font-mono text-[0.6875rem] text-[var(--vermelho-vivo)]">
                    0{i + 1}
                  </span>
                  <span className="display text-[clamp(1.75rem,6vw,4.5rem)] transition-colors hover:text-[var(--vermelho-vivo)]">
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
