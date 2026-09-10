import { useEffect, useRef, useState } from 'react';
import { contato, linkZap, planos, temPlaceholder } from '../config/site';
import { gsap, T, E, deveAnimar } from '../lib/motion';
import { Marca } from './Marca';

type Etapa = 0 | 1 | 2 | 3;

type Pergunta = { id: string; label: string; dica: string };

const perguntas: Pergunta[] = [
  {
    id: 'negocio',
    label: 'O que o seu negócio faz?',
    dica: 'Ex.: barbearia, personal, manicure, escritório de advocacia.',
  },
  {
    id: 'precisa',
    label: 'O que você precisa?',
    dica: 'Pode mudar depois. É só pra eu já chegar com o preço certo.',
  },
  {
    id: 'nome',
    label: 'Como eu te chamo?',
    dica: 'Só o primeiro nome já serve.',
  },
];

/**
 * WOW 04 — o contato como conversa, nao como formulario.
 *
 * Tres perguntas, uma por vez, montando a mensagem que vai pro WhatsApp.
 * Nao existe backend: a mensagem e composta no cliente e entregue no canal
 * que o negocio realmente usa. Se o numero ainda for placeholder, a etapa
 * final mostra a mensagem pronta em vez de um link quebrado.
 */
export function Contato() {
  const [etapa, setEtapa] = useState<Etapa>(0);
  const [negocio, setNegocio] = useState('');
  const [precisa, setPrecisa] = useState('');
  const [nome, setNome] = useState('');
  const palcoRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const zapPendente = temPlaceholder(contato.whatsapp);
  const mensagem =
    `Oi! Vim pelo site. Sou ${nome || 'ainda sem nome'} e tenho ${negocio || 'um negócio'}. ` +
    `Preciso de: ${precisa || 'ainda não sei'}.`;
  const zap = zapPendente ? null : linkZap(contato.whatsapp, mensagem);

  // cada troca de etapa e uma transicao, nao um salto
  useEffect(() => {
    if (!deveAnimar() || !palcoRef.current) return;
    gsap.fromTo(
      palcoRef.current,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: T.medio, ease: E.saida },
    );
  }, [etapa]);

  // Foca a pergunta so quando e o proprio usuario que troca de etapa.
  // Focar na montagem fazia o navegador rolar ate o input, e este formulario
  // e a penultima secao do documento: a pagina abria no fim.
  //
  // O guard e "o usuario pediu", nao "ja montou" — em dev o StrictMode monta
  // duas vezes, entao um ref de primeira montagem deixa a segunda passar e o
  // bug volta so no ambiente de desenvolvimento.
  const focarAoTrocar = useRef(false);
  const irPara = (n: Etapa) => {
    focarAoTrocar.current = true;
    setEtapa(n);
  };

  useEffect(() => {
    if (!focarAoTrocar.current) return;
    focarAoTrocar.current = false;
    if (etapa < 3) inputRef.current?.focus();
  }, [etapa]);

  const avancar = () => irPara(Math.min(3, etapa + 1) as Etapa);
  const podeAvancar = etapa === 0 ? negocio.trim() : etapa === 1 ? precisa : nome.trim();

  return (
    <section id="contato" className="chapa-tinta scroll-mt-20 py-28 md:py-40">
      <div className="grade">
        <div className="flex items-center gap-5">
          <Marca altura={34} tom="claro" viva />
          <p className="rotulo">Falar com a gente</p>
        </div>

        <h2 className="display mt-8 max-w-[14ch] text-[clamp(2.25rem,6vw,4.75rem)]">
          Vamos colocar seu negócio no ar.
        </h2>

        <div className="mt-14 flex gap-2 md:mt-20" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="h-[3px] flex-1 transition-colors duration-500"
              style={{
                background: i <= etapa ? 'var(--vermelho-vivo)' : 'var(--linha)',
              }}
            />
          ))}
        </div>

        <div ref={palcoRef} className="mt-10 min-h-[20rem]">
          {etapa < 3 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (podeAvancar) avancar();
              }}
            >
              <p className="rotulo">Pergunta {etapa + 1} de 3</p>

              <label
                htmlFor={perguntas[etapa].id}
                className="display mt-4 block max-w-[18ch] text-[clamp(1.5rem,3.6vw,2.5rem)]"
              >
                {perguntas[etapa].label}
              </label>

              <p id={`dica-${perguntas[etapa].id}`} className="mt-4 text-[var(--tinta-media)]">
                {perguntas[etapa].dica}
              </p>

              {etapa === 1 ? (
                <div
                  role="radiogroup"
                  aria-labelledby="precisa"
                  className="mt-8 flex flex-wrap gap-3"
                >
                  {[...planos.map((p) => p.nome), 'Ainda não sei'].map((op) => (
                    <button
                      key={op}
                      type="button"
                      role="radio"
                      aria-checked={precisa === op}
                      onClick={() => setPrecisa(op)}
                      className="min-h-[56px] border-2 px-6 text-[1.0625rem] transition-colors"
                      style={{
                        borderColor: precisa === op ? 'var(--vermelho-vivo)' : 'var(--linha-forte)',
                        background: precisa === op ? 'var(--vermelho-vivo)' : 'transparent',
                        color: precisa === op ? '#14130F' : 'inherit',
                      }}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  ref={inputRef}
                  id={perguntas[etapa].id}
                  name={perguntas[etapa].id}
                  aria-describedby={`dica-${perguntas[etapa].id}`}
                  value={etapa === 0 ? negocio : nome}
                  onChange={(e) => (etapa === 0 ? setNegocio : setNome)(e.target.value)}
                  autoComplete={etapa === 2 ? 'given-name' : 'off'}
                  className="display mt-8 w-full max-w-[22ch] border-b-4 border-[var(--linha-forte)] bg-transparent pb-3 text-[clamp(1.5rem,4vw,2.75rem)] outline-none focus:border-[var(--vermelho-vivo)]"
                />
              )}

              <div className="mt-10 flex items-center gap-6">
                <button
                  type="submit"
                  disabled={!podeAvancar}
                  className="min-h-[56px] bg-[var(--vermelho-vivo)] px-8 font-semibold text-[#14130F] transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
                >
                  {etapa === 2 ? 'Montar minha mensagem' : 'Continuar'}
                </button>
                {etapa > 0 && (
                  <button
                    type="button"
                    onClick={() => irPara((etapa - 1) as Etapa)}
                    className="min-h-[48px] font-mono text-[0.75rem] tracking-[0.14em] uppercase underline underline-offset-4"
                  >
                    Voltar
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div>
              <p className="rotulo">Pronto</p>
              <p className="mt-4 max-w-[30ch] text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.4]">
                É só isso. Sua mensagem já está escrita:
              </p>

              <blockquote className="mt-8 max-w-[46ch] border-l-4 border-[var(--vermelho-vivo)] py-2 pl-6 font-mono text-[0.9375rem] leading-[1.7]">
                {mensagem}
              </blockquote>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                {zap ? (
                  <a
                    href={zap}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[56px] items-center bg-[var(--vermelho-vivo)] px-8 font-semibold text-[#14130F]"
                  >
                    Enviar no WhatsApp
                  </a>
                ) : (
                  <span className="inline-flex min-h-[56px] items-center border-2 border-dashed border-[var(--vermelho-vivo)] px-6 font-mono text-[0.8125rem] text-[var(--vermelho-vivo)]">
                    {contato.whatsapp} — configure em src/config/site.ts
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => irPara(0)}
                  className="min-h-[48px] font-mono text-[0.75rem] tracking-[0.14em] uppercase underline underline-offset-4"
                >
                  Recomeçar
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
