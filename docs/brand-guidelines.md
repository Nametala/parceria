# iD — Guia de Marca v2.0

> Atualizado: 2026-09-09 · v2.1 — mensagem principal, preço, prazo e contato
> Status: aprovado (símbolo, arquitetura, preço, prazo e @ do Instagram) · pendente (domínio)

A tabela Quick Reference é lida por `scripts/sync-brand-to-tokens.cjs`, por isso os
rótulos `Primary Color`, `Secondary Color` e `Accent Color` ficam em inglês. Todo o
resto do documento é em português.

## Quick Reference

| Element | Value | Nome na marca |
|---------|-------|---------------|
| Primary Color | #1B3BFF | Azul — o "i" |
| Secondary Color | #14130F | Tinta — o "D" |
| Accent Color | #CE2809 | Vermelho — a energia |
| Display Font | Archivo Expanded | títulos, wdth 118 / wght 800 |
| Primary Font | Instrument Sans | interface e texto |
| Mono Font | JetBrains Mono | rótulos, preços, prazos |
| Voice | Direto, Chão, Franco, Presente | |

---

## 1. A marca

**iD** é a marca. **Soluções** é o descritor.

Essa separação é deliberada e é a decisão mais importante do guia. O logotipo é
sempre só o símbolo `iD`; "Soluções" aparece como palavra subordinada ao lado ou
abaixo, e pode ser trocado ou removido no futuro sem redesenhar nada. Isso protege
a marca de um problema real: existem pelo menos seis empresas brasileiras de
tecnologia chamadas ID Soluções, ID Solutions, ID Plus, ID Tecnologia, ID Soluções
em Dados e ID Brasil. A força tem que vir do símbolo e da voz, nunca do descritor.

### O que "iD" quer dizer

**iD = identidade.** Não vendemos site, vendemos a identidade digital de um negócio
que hoje só existe no boca a boca — o lugar onde o cliente confere se a coisa é
séria antes de mandar a primeira mensagem. Toda a comunicação sai daí.

As leituras secundárias (o `#id` do CSS, "ideia") podem virar tempero em peça de
campanha, mas nunca substituem a leitura principal.

### Quem somos

Dois desenvolvedores em Belo Horizonte: Arthur Nametala (front-end, produto e
interface) e Gustavo Vieira (back-end, integrações e qualidade). O cliente fala
direto com quem escreve o código — não existe camada de atendimento, e essa
ausência é argumento de venda, não limitação.

Atendemos **só Belo Horizonte**. É uma escolha, não uma fase: é a cidade onde a
gente consegue aparecer se precisar, e vender proximidade que não se cumpre é o
mesmo que não vender nada.

---

## 2. Logotipo

### Duas letras, não uma forma

O logotipo é **um `i` minúsculo e um `D` maiúsculo**, separados por um vão de
uma haste inteira, em cores diferentes: o `i` em Azul, o `D` em Tinta.

Isso é uma correção deliberada da v1. Naquela versão as duas letras dividiam a
mesma haste, e o resultado exigia explicação: em tamanho pequeno lia como um
"b", e mesmo grande a pessoa precisava que alguém contasse que ali havia um "i"
e um "D". Conceito que precisa de legenda não é logotipo.

A regra agora é curta e não se negocia:

> O `i` tem que parecer um i. O `D` tem que parecer um D.
> A conexão entre eles é secundária.

### A conexão vive no movimento

A ideia de parceria não está no desenho parado — está no gesto. Parado, o
logotipo mostra `iD`. Em interação (`<Marca viva />`), as duas letras se afastam
e um elo vermelho aparece entre elas, depois voltam.

É o mesmo gesto que a página inteira repete: a hero separa "seu negócio" de "o
mundo" e coloca a linha vermelha entre os dois; a seção da dupla faz igual com
os dois desenvolvedores. A marca não é uma imagem, é um sistema.

### Construção

Grade 134 × 100. Traço único de 22. Terminações **retas**, não arredondadas — a
marca é tipográfica, não um símbolo.

| Elemento | Valor |
|----------|-------|
| Traço | 22, igual em toda a marca |
| Pingo do i | centro (11, 11), raio 11 |
| Haste do i | x = 11, de y = 32 a y = 100 |
| Vão entre as letras | 22 — uma haste inteira; é ele que garante ler i + D |
| Haste do D | x = 55, de y = 0 a y = 100 |
| Bojo do D | raio 39, de y = 11 a y = 89 |

O `i` é mais baixo que o `D` de propósito: é minúsculo contra maiúsculo, e essa
diferença de altura ajuda a leitura instantânea.

### Variantes

Exportadas em `public/marca/` — SVG para qualquer uso vetorial, PNG para
onde não se aceita SVG (WhatsApp, Instagram, Word, gráfica).

| Arquivo | Uso |
|---------|-----|
| `marca-id.svg` · `.png` | Padrão: i azul, D tinta. Fundo transparente |
| `marca-id-claro.svg` · `.png` | Sobre chapa escura |
| `marca-id-mono.svg` · `.png` | Uma cor só, tinta. Carimbo, bordado, impressão em uma cor |
| `marca-id-perfil.png` | Avatar sobre papel — 1024 × 1024 |
| `marca-id-perfil-escuro.png` | Avatar sobre tinta — 1024 × 1024 |
| `favicon.svg` | Aba do navegador |

Os PNG têm 2010 × 1500 e fundo transparente. Para refazer todos depois de mexer
na marca: `node scripts/marca.mjs` — o script parte da mesma geometria do
componente, então arquivo e site nunca divergem.

No código, use sempre `<Marca />` de `src/components/Marca.tsx`. Nunca redesenhe
a geometria à mão.

### Tamanho mínimo

| Formato | Mínimo |
|---------|--------|
| Tela | 24 px de altura |
| Impresso | 9 mm de altura |

### Proibido

- Encostar o `i` no `D` ou reduzir o vão. O vão é a marca.
- Deixar as duas letras na mesma cor no uso padrão.
- Arredondar as terminações.
- Girar, inclinar, espelhar, esticar ou aplicar sombra e gradiente.
- Escrever "ID" em caixa alta. A marca é **iD**.
- Usar o elo vermelho parado: ele só existe em movimento.

## 3. Paleta

Tema **único e claro**. O site não segue `prefers-color-scheme`: direção de arte
é uma escolha, não preferência do sistema operacional. A chapa escura existe em
dois momentos pontuais (`.chapa-tinta`), nunca no site inteiro.

Todos os pares abaixo foram calculados. `node scripts/check-contrast.mjs` roda a
verificação (16 pares) e falha se alguma cor for trocada por outra que reprove.

### Primary Colors

| Name | Hex | Uso |
|------|-----|-----|
| Azul | #1B3BFF | O "i" da marca, links, ação primária |
| Azul Dark | #1330C7 | Hover e pressionado |

### Secondary Colors

| Name | Hex | Uso |
|------|-----|-----|
| Tinta | #14130F | Texto, o "D" da marca, chapa escura |
| Tinta Light | #57544A | Texto secundário |

### Accent Colors

| Name | Hex | Uso |
|------|-----|-----|
| Vermelho | #CE2809 | A energia. Passa como texto sobre papel (4,65:1) |
| Vermelho Light | #FF3B14 | Só em display grande, elo, riscos e chapa. **Reprova como texto corrido** |

### Neutros

| Name | Hex | Uso |
|------|-----|-----|
| Papel | #F2EFE7 | Fundo do site |
| Papel Fundo | #E8E4D9 | Blocos recuados |
| Linha | #D6D1C2 | Divisórias decorativas |
| Linha Forte | #8B8677 | Borda de input e de componente |

**A regra do vermelho.** Existem dois vermelhos porque um só não resolve:
`#FF3B14` tem a energia que a marca precisa mas só dá 3,10:1 sobre o papel — vale
para display grande e para chapa, nunca para um parágrafo. Para texto, use
`#CE2809`.

## 4. Tipografia

Três papéis, três famílias — cada uma faz o que as outras não fazem.

```css
--font-display: 'Archivo Variable', 'Arial Black', sans-serif;  /* wdth 118, wght 800 */
--font-sans:    'Instrument Sans Variable', 'Helvetica Neue', Arial, sans-serif;
--font-mono:    'JetBrains Mono Variable', ui-monospace, monospace;
```

**Archivo em largura expandida** é a voz alta da marca. Expandida e não
condensada de propósito: condensada é o default de todo site de agência. Só em
título, com `letter-spacing: -0,035em` e entrelinha 0,95 — a utilidade `.display`
no CSS já traz tudo isso junto.

A entrelinha não desce de 0,95. Abaixo disso a descendente do "g" encosta na
linha seguinte, e onde há máscara de reveal (`overflow: hidden`) ela é cortada.

| Papel | Fonte | Tamanho |
|-------|-------|---------|
| Hero | Archivo Expanded | clamp(2,5rem, 10vw, 10rem) |
| H2 de seção | Archivo Expanded | clamp(2,25rem, 6,5vw, 5,5rem) |
| Lead | Instrument Sans | clamp(1,0625rem, 1,6vw, 1,375rem) |
| Texto | Instrument Sans | 16 px, entrelinha 1,6, máx. 46ch |
| Rótulo | JetBrains Mono | 11 px, caixa alta, tracking 0,16em |

Rótulo de seção é sempre mono em caixa alta e curto: `O QUE A GENTE ENTREGA`.
Sem número — a numeração ficou só nas etapas do processo, onde ela diz uma
ordem real, e não como enfeite em toda seção.

## 5. Voz

### Somos

| Traço | Quer dizer | Soa assim | Nunca assim |
|-------|-----------|-----------|-------------|
| Direto | Resposta antes de contexto | "R$ 300, pronto em 5 dias." | "Depende de alguns fatores, vamos conversar?" |
| Chão | Fala de venda, não de stack | "O cliente vê seu horário e chama no zap." | "Arquitetura headless com SSR." |
| Franco | Diz o que não faz | "Isso a gente não faz. Indico quem faz." | "Conseguimos atender qualquer demanda." |
| Presente | Dois nomes, não uma fachada | "Sou o Arthur, quem cuida do back é o Gustavo." | "Nossa equipe entrará em contato." |

### Palavras banidas

soluções digitais inovadoras · ecossistema · disruptivo · sob medida · alavancar ·
potencializar · transformação digital · sob consulta

Sim, o descritor da marca é "Soluções" — e é exatamente por isso que a expressão
inteira "soluções digitais" fica proibida no texto. O descritor identifica a
categoria; ele não é permissão para escrever como folheto de 2009.

### Reescrita de referência

**Antes:** Somos uma empresa especializada em soluções digitais inovadoras,
oferecendo sites de alta performance sob medida para alavancar o seu negócio.

**Depois:** Somos dois desenvolvedores. Fazemos o site do seu negócio com preço
fechado, dito antes de começar, e colocamos no ar em 5 dias. Sem contrato e sem
reunião de duas horas.

---

## 6. Mensagem

**Missão.** Damos identidade digital a quem toca o próprio negócio, com site pronto
em 5 dias e preço fechado, pra que o cliente encontre e confie antes mesmo de mandar
a primeira mensagem.

**Proposta de valor.** Para o autônomo ou dono de pequeno negócio que perde cliente
por não ter onde ser encontrado, a iD é um estúdio de sites que coloca o negócio no
ar em 5 dias, com preço fechado e sem contrato. Diferente de agência, aqui você fala
direto com os dois desenvolvedores que escrevem o código.

**Posicionamento.** iD é o estúdio de sites para quem toca o próprio negócio e quer
ser levado a sério online, porque entrega identidade inteira — site, marca e
presença — no prazo e no preço de quem ainda está começando.

### Mensagens de apoio

| Mensagem | Dor que resolve | Prova |
|----------|-----------------|-------|
| Seu site no ar em 5 dias. | Orçamento que some e nunca volta | VIA Drones, BL4CK GYM e Studio Rondas, com link |
| Preço fechado, dito antes de começar. | Medo de conta que só cresce | R$ 300 e R$ 500 impressos no site |
| Você fala com quem escreve o código. | Cansaço de atendimento que não resolve | Os dois WhatsApps na página, sem intermediário |
| Só Belo Horizonte. | Medo de contratar alguém que some | Mesma cidade: dá pra cobrar de perto |

A primeira linha é a mensagem principal, e é ela que vira o título da página.
Ela mudou: a versão anterior ("Seu negócio existe, falta o mundo saber") era uma
ideia, não uma oferta — quem lia tinha que traduzir sozinho o que a gente vende.
A regra que vale para a marca vale para o texto: **conceito que precisa de
legenda não serve.**

### Bio do Instagram

```
Sites para quem toca o próprio negócio
A partir de R$ 300 · no ar em 5 dias
Belo Horizonte — e só BH
Veja o site e chame no zap ↓
```

O perfil é **@idsolucoes.bh**. Tudo o que envolve o Instagram — @, bio, links,
destaques, grade de lançamento, legendas e cadência — vive em
`docs/instagram.md`, e as artes saem de `midia/instagram/posts.html`.

---

## 7. Pendente

Preço (**R$ 300** e **R$ 500**), prazo (**5 dias**), os dois WhatsApps, o e-mail
e o **@ do Instagram** já estão em `src/config/site.ts` — não resta placeholder
nenhum. Continua pendente:

- **Criar a conta** `@idsolucoes.bh`. O @ já está escrito no rodapé do site, mas
  o perfil ainda não existe. Passo a passo em `docs/instagram.md`.
- **Domínio próprio.** Não é bloqueio: até ele existir, o endereço oficial é o
  da Vercel, e é ele que está na canonical, no `robots.txt` e no `sitemap.xml`.
  O site está aberto para indexação — um estúdio que vende "apareça no Google"
  não pode ser invisível nele.

Os cases não têm mais nenhum campo em placeholder.

O nome textual da empresa é **iD Soluções**. No logotipo continua sendo só
**iD** — "Soluções" nunca entra no símbolo, e nunca em caixa alta como "ID".
