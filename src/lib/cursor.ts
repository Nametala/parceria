import { gsap, ponteiroFino, semMovimento, T } from './motion';

/**
 * Cursor proprio: um ponto que segue o ponteiro e vira rotulo em cima de
 * elementos com data-cursor. So existe em ponteiro fino — em toque nao e
 * criado, e o cursor nativo nunca some (o proprio ponto acompanha ele).
 */
export function iniciarCursor(): (() => void) | undefined {
  if (!ponteiroFino() || semMovimento()) return;

  const el = document.createElement('div');
  el.className = 'cursor-id';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<span class="cursor-id__rotulo"></span>';
  document.body.appendChild(el);

  const rotulo = el.querySelector<HTMLElement>('.cursor-id__rotulo')!;
  const px = gsap.quickTo(el, 'x', { duration: 0.32, ease: 'power3.out' });
  const py = gsap.quickTo(el, 'y', { duration: 0.32, ease: 'power3.out' });

  let visivel = false;
  const mover = (e: PointerEvent) => {
    if (!visivel) {
      visivel = true;
      gsap.to(el, { opacity: 1, duration: T.rapido });
    }
    px(e.clientX);
    py(e.clientY);

    const alvo = (e.target as Element | null)?.closest<HTMLElement>('[data-cursor]');
    const texto = alvo?.dataset.cursor ?? '';
    if (rotulo.textContent !== texto) {
      rotulo.textContent = texto;
      el.classList.toggle('cursor-id--rotulado', Boolean(texto));
    }
  };

  const sair = () => {
    visivel = false;
    gsap.to(el, { opacity: 0, duration: T.rapido });
  };

  window.addEventListener('pointermove', mover, { passive: true });
  document.addEventListener('pointerleave', sair);

  return () => {
    window.removeEventListener('pointermove', mover);
    document.removeEventListener('pointerleave', sair);
    el.remove();
  };
}
