import { useRef, type ReactNode } from 'react';
import { gsap, ponteiroFino, semMovimento, T, E } from '../lib/motion';

type Props = {
  href: string;
  children: ReactNode;
  variante?: 'cheio' | 'contorno' | 'vermelho';
  cursor?: string;
  className?: string;
};

/**
 * Botao com atracao magnetica ao ponteiro. O deslocamento e pequeno de
 * proposito: o alvo nunca sai de baixo do cursor. Em toque nao existe.
 */
export function Botao({ href, children, variante = 'cheio', cursor, className = '' }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const px = useRef<gsap.QuickToFunc | null>(null);
  const py = useRef<gsap.QuickToFunc | null>(null);

  const preparar = () => {
    if (!ref.current || !ponteiroFino() || semMovimento()) return;
    px.current ??= gsap.quickTo(ref.current, 'x', { duration: 0.4, ease: E.saida });
    py.current ??= gsap.quickTo(ref.current, 'y', { duration: 0.4, ease: E.saida });
  };

  const mover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    preparar();
    const el = ref.current;
    if (!el || !px.current || !py.current) return;
    const r = el.getBoundingClientRect();
    px.current((e.clientX - (r.left + r.width / 2)) * 0.22);
    py.current((e.clientY - (r.top + r.height / 2)) * 0.3);
  };

  const soltar = () => {
    if (!ref.current || !px.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' });
  };

  const estilos = {
    cheio: 'bg-[var(--azul)] text-white hover:bg-[var(--azul-escuro)]',
    vermelho: 'bg-[var(--vermelho)] text-white hover:bg-[var(--vermelho-vivo)] hover:text-[var(--tinta)]',
    contorno:
      'border-2 border-[var(--tinta)] text-[var(--tinta)] hover:bg-[var(--tinta)] hover:text-[var(--papel)]',
  } as const;

  return (
    <a
      ref={ref}
      href={href}
      data-cursor={cursor}
      onMouseMove={mover}
      onMouseLeave={soltar}
      style={{ transitionDuration: `${T.rapido}s` }}
      className={`inline-flex min-h-[56px] items-center justify-center px-8 font-semibold tracking-[-0.01em] transition-colors will-change-transform ${estilos[variante]} ${className}`}
    >
      {children}
    </a>
  );
}
