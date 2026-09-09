import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Preferencia declarada do usuario por menos movimento. */
export const semMovimento = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Porta unica por onde toda animacao passa. Alem do prefers-reduced-motion,
 * recusa animar com o documento oculto: em aba de fundo o requestAnimationFrame
 * nao dispara e a animacao de entrada deixaria conteudo preso invisivel.
 */
export const deveAnimar = () =>
  typeof window !== 'undefined' && !semMovimento() && !document.hidden;

/** Ponteiro fino com hover real. Cursor e efeitos magneticos so existem aqui. */
export const ponteiroFino = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const eMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

/**
 * Sistema de motion: tres velocidades e duas curvas. Qualquer duracao fora
 * disso e desvio, nao decisao — mantem o site com um ritmo so.
 */
export const T = {
  rapido: 0.18,   // resposta ao dedo: hover, toque, foco
  medio: 0.52,    // blocos entrando, troca de estado
  cinema: 1.1,    // transformacoes de secao, sequencia da hero
} as const;

export const E = {
  saida: 'power3.out',
  entrada: 'power3.inOut',
  elastico: 'back.out(1.8)',
} as const;

export { gsap, ScrollTrigger };
