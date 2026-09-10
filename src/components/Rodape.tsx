import { contato, temPlaceholder } from '../config/site';
import { Marca } from './Marca';

export function Rodape() {
  return (
    <footer className="border-t-2 border-[var(--tinta)] py-14">
      <div className="grade flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Marca altura={40} viva />
          <p className="mt-6 max-w-[30ch] text-[var(--tinta-media)]">
            Sites para quem toca o próprio negócio. Sem burocracia, sem mensalidade surpresa.
          </p>
        </div>

        <div className="flex flex-col gap-2 font-mono text-[0.75rem] text-[var(--tinta-media)] md:items-end">
          {temPlaceholder(contato.email) ? (
            <span className="pendente">{contato.email}</span>
          ) : (
            <a href={`mailto:${contato.email}`} className="min-h-[44px] py-2">
              {contato.email}
            </a>
          )}
          {temPlaceholder(contato.instagram) ? (
            <span className="pendente">{contato.instagram}</span>
          ) : (
            <a
              href={`https://instagram.com/${contato.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] py-2"
            >
              {contato.instagram}
            </a>
          )}
          <span>
            {contato.cidade} · MG
          </span>
          <span>© {new Date().getFullYear()} iD Soluções</span>
        </div>
      </div>
    </footer>
  );
}
