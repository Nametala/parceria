# iD — prompt para gerar uma pauta de posts

> Atualizado: 2026-10-04 · v1.0 — escrito junto com a pauta 2 (posts 10 a 24)

Este é o pedido que gerou os posts 10 a 24. Guardar o prompt, e não só o
resultado, é o que faz a próxima pauta sair no mesmo nível sem recomeçar a
explicação. Cole o bloco inteiro e troque o que está entre colchetes.

---

Leia, antes de escrever qualquer coisa:

- `docs/brand-guidelines.md` — voz, palavras banidas, paleta, tipografia
- `docs/instagram.md` — o que já foi publicado, as legendas e a cadência
- `docs/abordagem.md` §4 — as perguntas reais que chegam na DM
- `src/config/site.ts` — preço, prazo, cases e as seis dores
- `midia/instagram/posts.html` — o sistema de arte e as classes existentes

Elabore **[15]** posts novos para o @idsolucoes.bh. Entregue as três partes
juntas: o texto de cada quadro no array `slides` de
`midia/instagram/posts.html`, as legendas em `docs/instagram.md`, e os PNG
exportados com `node scripts/artes.mjs`.

## O que torna um post aceitável

1. **Nenhum conceito que precise de legenda.** Se a arte só funciona depois
   que alguém explica, está errada. É a mesma regra do logotipo.
2. **Carrossel, de três a quatro quadros.** É o único formato estático em que
   a pessoa age — e arrastar é o que o Instagram lê como interesse. `arraste →`
   em todo quadro menos o último.
3. **Uma ideia por carrossel.** O primeiro quadro é a frase, o do meio é o
   porquê, o último é o preço e para onde ir.
4. **Nada inventado.** Preço, prazo, cases e condições saem do `site.ts` e do
   `abordagem.md`. Não invente número de mercado, estatística de conversão nem
   depoimento. Quando o dado não existir, escreva sem ele.
5. **Registro escrito.** Sem "tá", "pra", "zap", sem imperativo de conversa
   ("manda", "arrasta") no texto corrido. Direto, mas não oral.
6. **Palavras banidas** do guia de marca, sem exceção — "soluções digitais"
   inclusive.
7. **Nada de cargo** para o Arthur ou o Gustavo. São dois desenvolvedores,
   sem divisão declarada de funções.
8. **Só Belo Horizonte**, dito como escolha e não como limitação.

## O que torna um post bom

Um post que só repete "R$ 300, 5 dias, link na bio" não move nada: isso já
está na bio. O que move é um destes quatro:

- **Um teste que a pessoa faz sozinha** no próprio celular, e que prova o
  problema sem a gente afirmar nada (post 10).
- **Uma dor dita com as palavras dela**, seguida do mecanismo — por que
  aquilo acontece —, não da oferta (posts 11 a 13).
- **Algo útil que ela pode usar mesmo sem contratar**, inclusive contra nós
  (post 16: conferir no Registro.br de quem é o domínio).
- **Uma franqueza que ninguém publica**: o que não fazemos, o que não está
  incluído, por que a agência custa o que custa (posts 13, 14 e 24).

Reconhecer o que a pessoa já fez bem antes de vender vale mais que qualquer
chamada (post 21). Elogio genérico, não.

## Equilíbrio da pauta

Para 15 posts, a mistura que funcionou foi: 4 de dor, 5 de transparência
(preço, prazo, condições, o que não fazemos), 3 de utilidade sem venda,
2 de nicho (um por segmento da lista de abordagem, sempre marcando que o
site-modelo é fictício) e 1 de posicionamento.

Trabalho novo entra fora dessa conta: todo site que entra no ar vira post.

## Arte

Use as classes que já existem em `posts.html` — `.display xl/l/m/s`,
`.rotulo`, `.corpo`, `.mono`, `.regua`, `.itens`/`.item.cortado`, `.inclui`,
`.etapa`. Não crie CSS novo sem necessidade: a grade inteira depende de as
artes parecerem a mesma coleção.

- Alterne chapa escura e papel ao longo do carrossel, e entre carrosséis.
- O vermelho `#FF3B14` só em display grande, régua e chapa. Nunca em texto
  corrido — para isso existe o `#CE2809`.
- Caiba em um quadro: o título não pode encostar no topo, e a assinatura não
  pode sair pela base. Confira medindo, não de olho.
- A miniatura da grade corta o 4:5 em 1:1 pelo centro. Por isso o `.bloco`
  guarda 200px embaixo — não reduza isso para ganhar espaço.

## Verificação antes de entregar

- Nenhum quadro com estouro: `.bloco` com folga no topo e `.assina` dentro
  da base, medido no navegador e não de olho.
- Os PNG saem em 1080×1350 (post), 1080×1920 (story) e 1080×1080 (capa),
  exatos.
- Nenhuma palavra banida, nenhum cargo, nenhum dado inventado.
- As legendas entram em `docs/instagram.md` com a ordem de publicação e as
  cinco hashtags (quatro fixas mais uma do assunto).
