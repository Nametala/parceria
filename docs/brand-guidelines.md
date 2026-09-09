# iD — Guia de Marca v2.0

> Atualizado: 2026-09-09 · v2.0 — logotipo redesenhado e paleta trocada
> Status: aprovado (símbolo e arquitetura) · pendente (faixa de preço)

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

| Arquivo | Uso |
|---------|-----|
| `logo.svg` | Padrão: i azul, D tinta, sobre papel |
| `logo-reversed.svg` | Sobre chapa escura |
| `logo-mono.svg` | Uma cor; herda `currentColor` |
| `logo-avatar.svg` | Instagram, WhatsApp Business — 512 × 512 |
| `favicon.svg` | Aba do navegador |

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
título, com `letter-spacing: -0,045em` e entrelinha 0,86 — a utilidade `.display`
no CSS já traz tudo isso junto.

| Papel | Fonte | Tamanho |
|-------|-------|---------|
| Hero | Archivo Expanded | clamp(3rem, 13vw, 13rem) |
| H2 de seção | Archivo Expanded | clamp(2,25rem, 6,5vw, 5,5rem) |
| Lead | Instrument Sans | clamp(1,0625rem, 1,6vw, 1,375rem) |
| Texto | Instrument Sans | 17 px, entrelinha 1,55, máx. 46ch |
| Rótulo | JetBrains Mono | 11 px, caixa alta, tracking 0,16em |

Rótulo de seção é sempre mono em caixa alta com o número da etapa: `01 — O que a
gente cortou`. É o que dá ao scroll a sensação de capítulo.

## 5. Voz

### Somos

| Traço | Quer dizer | Soa assim | Nunca assim |
|-------|-----------|-----------|-------------|
| Direto | Resposta antes de contexto | "R$ X, pronto em 5 dias úteis." | "Depende de alguns fatores, vamos conversar?" |
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
fechado, dito antes de começar, e colocamos no ar em dias. Sem contrato e sem
reunião de duas horas.

---

## 6. Mensagem

**Missão.** Damos identidade digital a quem toca o próprio negócio, com site pronto
em dias e preço fechado, pra que o cliente encontre e confie antes mesmo de mandar
a primeira mensagem.

**Proposta de valor.** Para o autônomo ou dono de pequeno negócio que perde cliente
por não ter onde ser encontrado, a iD é um estúdio de sites que coloca o negócio no
ar em dias, com preço fechado e sem contrato. Diferente de agência, aqui você fala
direto com os dois desenvolvedores que escrevem o código.

**Posicionamento.** iD é o estúdio de sites para quem toca o próprio negócio e quer
ser levado a sério online, porque entrega identidade inteira — site, marca e
presença — no prazo e no preço de quem ainda está começando.

### Mensagens de apoio

| Mensagem | Dor que resolve | Prova |
|----------|-----------------|-------|
| Seu negócio existe. Falta o mundo saber. | Só é achado por indicação | Bella Rocca, BL4CK GYM e Studio Rondas no ar |
| Preço fechado, dito antes de começar. | Medo de conta que só cresce | Tabela de preços pública no site |
| Você fala com quem escreve o código. | Cansaço de atendimento que não resolve | São dois devs, sem camada no meio |
| No ar em dias, não em meses. | Orçamento que some e nunca volta | Base própria já pronta e reaproveitada |

### Bio do Instagram

```
Sites para quem toca o próprio negócio
Sem burocracia, sem mensalidade surpresa
Belo Horizonte · atendemos o Brasil todo
Orçamento no WhatsApp ↓
```

---

## 7. Pendente

Os preços foram definidos: **Página única R$ 300** e **Página + identidade
R$ 500**, ambos visíveis no site. Continuam pendentes:

- **Prazo de entrega** de cada pacote (`[INSERIR PRAZO]` em `src/config/site.ts`).
- **WhatsApp, Instagram e e-mail.**
- **`public/og.png`** (1200×600) — sem ele o link compartilhado no WhatsApp
  aparece sem imagem.
- **Campos não confirmados dos cases** (resultado, cidade, segmento do Studio
  Rondas).

O nome textual da empresa é **iD Soluções**. No logotipo continua sendo só
**iD** — "Soluções" nunca entra no símbolo, e nunca em caixa alta como "ID".
