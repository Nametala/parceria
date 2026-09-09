import { useLayoutEffect, useRef, type RefObject } from 'react';
import { gsap, deveAnimar } from './motion';

/**
 * Roda uma animacao GSAP com escopo e limpeza automatica.
 * Se o movimento nao for permitido (preferencia do usuario ou aba oculta), o
 * callback nao roda: o conteudo ja esta no estado final no HTML, entao nada some.
 */
export function usarContexto<T extends HTMLElement>(
  criar: (escopo: T) => void,
  deps: unknown[] = []
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !deveAnimar()) return;
    const ctx = gsap.context(() => criar(el), el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
