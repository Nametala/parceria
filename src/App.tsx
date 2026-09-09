import { useEffect } from 'react';
import { Abertura } from './components/Abertura';
import { Cabecalho } from './components/Cabecalho';
import { Hero } from './components/Hero';
import { Burocracia } from './components/Burocracia';
import { Cadeia } from './components/Cadeia';
import { Provas } from './components/Provas';
import { Preco } from './components/Preco';
import { Dupla } from './components/Dupla';
import { Contato } from './components/Contato';
import { Rodape } from './components/Rodape';
import { iniciarCursor } from './lib/cursor';
import { ScrollTrigger } from './lib/motion';

export default function App() {
  useEffect(() => {
    const limpar = iniciarCursor();
    // as fontes mudam a altura do conteudo: sem isso os pins ficam no lugar errado
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return limpar;
  }, []);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[95] focus:bg-[var(--azul)] focus:px-5 focus:py-4 focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <Abertura />
      <Cabecalho />

      <main id="conteudo">
        <div id="topo" />
        <Hero />
        <Burocracia />
        <Cadeia />
        <Provas />
        <Preco />
        <Dupla />
        <Contato />
      </main>

      <Rodape />
    </>
  );
}
