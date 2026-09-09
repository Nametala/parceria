import { useEffect, useRef, useState } from 'react';
import { ligarElo } from '../lib/shaderElo';
import { deveAnimar } from '../lib/motion';

/**
 * O elo entre os dois lados do vao.
 *
 * A barra sólida é o elo de verdade e existe sempre — é ela que aparece se o
 * WebGL não estiver disponível ou se o usuário pediu menos movimento. O shader
 * é enriquecimento por cima: um campo de energia atravessando a linha.
 */
export function Elo({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [comShader, setComShader] = useState(false);

  useEffect(() => {
    if (!deveAnimar() || !canvasRef.current) return;
    const controle = ligarElo(canvasRef.current);
    if (!controle) return; // sem WebGL: fica só a barra, e está tudo certo
    setComShader(true);
    return controle.destruir;
  }, []);

  return (
    <span className={`relative block w-full ${className}`}>
      {/* o campo de energia: 5x mais alto que a barra, centrado nela */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="elo-campo pointer-events-none absolute left-0 h-[500%] w-full transition-opacity duration-700"
        style={{ top: '-200%', opacity: comShader ? 1 : 0 }}
      />
      {/* o núcleo sólido: é ele que engole a tela na saída da hero */}
      <span className="elo-nucleo relative block h-full w-full origin-left bg-[var(--vermelho-vivo)]" />
    </span>
  );
}
