import { temPlaceholder } from '../config/site';

/**
 * Renderiza conteudo pendente com marca visivel (.pendente), para ninguem
 * publicar achando que o campo ja tem valor real.
 */
export function Valor({ children }: { children: string }) {
  if (temPlaceholder(children)) {
    return <span className="pendente">{children}</span>;
  }
  return <>{children}</>;
}
