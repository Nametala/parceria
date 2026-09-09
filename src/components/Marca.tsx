import { useRef } from 'react';
import { gsap, semMovimento } from '../lib/motion';

type Props = {
  /** Altura em px. A largura sai da proporcao 134x100. */
  altura?: number;
  /** 'cor' = i azul + D tinta · 'claro' = sobre chapa escura · 'mono' = herda currentColor */
  tom?: 'cor' | 'claro' | 'mono';
  /** Liga a identidade viva: i e D se afastam e um elo aparece entre eles. */
  viva?: boolean;
  className?: string;
};

/**
 * A marca iD.
 *
 * Regra que nasceu do erro da v1: o "i" tem que parecer um i e o "D" tem que
 * parecer um D. Sao duas letras separadas por um vao de uma haste inteira, em
 * cores diferentes. A conexao entre elas nao esta no desenho parado — esta no
 * movimento (prop `viva`), que e onde a ideia de parceria realmente vive.
 *
 * Geometria: grade 134x100, traco unico 22, terminacoes retas.
 */
export function Marca({ altura = 40, tom = 'cor', viva = false, className }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const cores =
    tom === 'claro'
      ? { i: '#5B77FF', d: '#F2EFE7', elo: '#FF3B14' }
      : tom === 'mono'
        ? { i: 'currentColor', d: 'currentColor', elo: 'currentColor' }
        : { i: 'var(--azul)', d: 'var(--tinta)', elo: 'var(--vermelho-vivo)' };

  const abrir = () => {
    if (!viva || semMovimento() || !ref.current) return;
    const raiz = ref.current;
    tl.current?.kill();
    tl.current = gsap
      .timeline({ defaults: { duration: 0.42, ease: 'power3.out' } })
      .to(raiz.querySelector('.m-i'), { x: -16 }, 0)
      .to(raiz.querySelector('.m-d'), { x: 16 }, 0)
      .to(raiz.querySelector('.m-elo'), { scaleX: 2.45, opacity: 1 }, 0);
  };

  const fechar = () => {
    if (!viva || semMovimento() || !ref.current) return;
    const raiz = ref.current;
    tl.current?.kill();
    tl.current = gsap
      .timeline({ defaults: { duration: 0.55, ease: 'power3.inOut' } })
      .to(raiz.querySelector('.m-i'), { x: 0 }, 0)
      .to(raiz.querySelector('.m-d'), { x: 0 }, 0)
      .to(raiz.querySelector('.m-elo'), { scaleX: 1, opacity: 0 }, 0);
  };

  return (
    <svg
      ref={ref}
      viewBox="0 0 134 100"
      height={altura}
      width={(altura * 134) / 100}
      className={className}
      role="img"
      aria-label="iD"
      onMouseEnter={abrir}
      onMouseLeave={fechar}
      style={{ overflow: 'visible' }}
    >
      <title>iD</title>

      {/* o elo so existe em movimento: parado, a marca e so as duas letras */}
      <rect
        className="m-elo"
        x="22"
        y="47"
        width="22"
        height="6"
        fill={cores.elo}
        opacity="0"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />

      <g className="m-i">
        <circle cx="11" cy="11" r="11" fill={cores.i} />
        <path d="M11 32V100" stroke={cores.i} strokeWidth="22" fill="none" />
      </g>

      <g className="m-d" fill="none" stroke={cores.d} strokeWidth="22">
        <path d="M55 0V100" />
        <path d="M55 11H83A39 39 0 0 1 83 89H55" />
      </g>
    </svg>
  );
}
