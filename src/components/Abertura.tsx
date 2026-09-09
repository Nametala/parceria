import { useEffect, useRef, useState } from 'react';
import { gsap, T, E, deveAnimar } from '../lib/motion';
import { Marca } from './Marca';

const CHAVE = 'id-abertura-vista';

/** Duracao ate a cortina comecar a subir. A hero usa isso para nao comecar antes. */
export const ESPERA_ABERTURA = 1.15;

// Decidido uma vez por carregamento: Abertura e Hero precisam concordar, e a
// flag de sessao muda no meio do caminho.
let decidido: boolean | null = null;
export function vaiTerAbertura(): boolean {
  if (decidido === null) {
    let jaViu = false;
    try {
      jaViu = sessionStorage.getItem(CHAVE) === '1';
    } catch {
      jaViu = false; // navegacao privada ou storage bloqueado: mostra a abertura
    }
    decidido = deveAnimar() && !jaViu;
  }
  return decidido;
}

/**
 * Logo reveal.
 *
 * O `i` entra pela esquerda, o `D` pela direita, o elo pisca entre eles e a
 * cortina sobe. E a mesma frase da marca — duas partes que se encontram —
 * contada uma vez, na chegada.
 *
 * Três garantias: não roda sob prefers-reduced-motion nem em aba de fundo, não
 * repete na mesma sessão, e um timeout duro remove a cortina mesmo se a
 * timeline falhar. Conteúdo nunca fica preso atrás dela.
 */
export function Abertura() {
  const [ativa, setAtiva] = useState(() => vaiTerAbertura());
  const raizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ativa) return;

    try {
      sessionStorage.setItem(CHAVE, '1');
    } catch {
      /* storage bloqueado: só significa que a abertura roda de novo */
    }

    const raiz = raizRef.current;
    const encerrar = () => setAtiva(false);

    // rede de seguranca: aconteça o que acontecer, a cortina sai
    const trava = window.setTimeout(encerrar, 3000);

    if (!raiz) {
      encerrar();
      return () => window.clearTimeout(trava);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: E.saida }, onComplete: encerrar });

      // as duas letras da propria marca, cada uma vindo de um lado
      tl.fromTo('.m-i', { x: -90, opacity: 0 }, { x: 0, opacity: 1, duration: 0.62 })
        .fromTo('.m-d', { x: 90, opacity: 0 }, { x: 0, opacity: 1, duration: 0.62 }, '<')
        // o elo pisca: as duas partes se reconhecem
        .fromTo(
          '.m-elo',
          { scaleX: 0, opacity: 0 },
          { scaleX: 2.45, opacity: 1, duration: 0.3, ease: E.elastico },
          '>-0.14'
        )
        .to('.m-elo', { opacity: 0, duration: 0.24 }, '>0.16')
        // a cortina sobe e entrega a hero
        .to(
          raiz,
          { clipPath: 'inset(0 0 100% 0)', duration: T.cinema * 0.8, ease: E.entrada },
          '>-0.05'
        );
    }, raiz);

    return () => {
      window.clearTimeout(trava);
      ctx.revert();
    };
  }, [ativa]);

  if (!ativa) return null;

  return (
    <div
      ref={raizRef}
      aria-hidden="true"
      inert
      className="fixed inset-0 z-[100] grid place-items-center bg-[var(--papel)]"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <Marca altura={88} />
    </div>
  );
}
