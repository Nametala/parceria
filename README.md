# iD

Site e identidade da iD — estúdio de sites para pequenos empreendedores, autônomos
e negócios locais, tocado por dois desenvolvedores em Belo Horizonte.

O site é single-page. Ele é o produto e o portfólio ao mesmo tempo.

## No ar

https://id-site-nametala-s-projects.vercel.app

Projeto `id-site` no Vercel, ligado a este repositório na branch `main`: **todo
push vira deploy**, sem passo manual.

Está com `noindex` no `index.html` enquanto houver placeholder no
`src/config/site.ts`. Apagar aquela linha é o que libera a indexação no
lançamento.

Cuidado com os subdomínios `.vercel.app`: são globais. `id-site.vercel.app`,
`id-estudio.vercel.app` e `parceria.vercel.app` são de outras pessoas ou de
projetos velhos — o link acima é o certo.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build  ->  dist/
npm run preview
npm run lint
npm run check:contrast
```

## Stack e por que

React 19 · Vite 8 · TypeScript · Tailwind v4 · GSAP 3 (ScrollTrigger).

É a mesma stack da nossa base institucional (`bl4ck-gym`), de propósito: já
conhecemos, já temos padrão de GSAP e Tailwind v4, e uma página só não precisa do
roteamento nem do servidor do Next.js. O que se perde com isso é SSR — e como todo
`<meta>`, Open Graph e JSON-LD vive estático no `index.html`, o preview de link no
WhatsApp funciona mesmo assim. Se um dia precisar de várias rotas renderizadas no
servidor, a migração é pequena.

Dependências e justificativa:

| Pacote | Por quê |
|--------|---------|
| `gsap` | ScrollTrigger com scrub e stagger. Rolar isso à mão dá mais código e pior resultado. |
| `tailwindcss` + `@tailwindcss/vite` | Convenção do estúdio. |
| `@fontsource-variable/*` | Fontes auto-hospedadas: sem conexão a terceiro, sem DNS externo no caminho crítico. |

**Lenis foi descartado de propósito.** Smooth scroll sequestra o scroll nativo,
piora em toque e atrapalha acessibilidade. O ScrollTrigger funciona bem sem ele.

## Onde mexer

| Quero mudar | Arquivo |
|-------------|---------|
| Textos, preços, cases, contato | `src/config/site.ts` |
| Cores | `docs/brand-guidelines.md` → sync → `assets/theme.css` |
| Escala tipográfica, espinha, base | `src/index.css` |
| O logotipo | `src/components/Marca.tsx` (geometria em `docs/brand-guidelines.md` §2) |

**Cor não se edita no componente.** A fonte da verdade é
`docs/brand-guidelines.md`; `assets/theme.css` traz a camada semântica e o
`src/index.css` só mapeia isso para o Tailwind. Depois de trocar qualquer cor,
rode `npm run check:contrast` — ele falha se algum par reprovar no WCAG AA.

## Conteúdo que ainda falta

Tudo entre colchetes em `src/config/site.ts` é placeholder explícito. Nada foi
inventado. Em desenvolvimento o console lista todos eles no boot, e na página eles
aparecem com marcação visível (`.pendente`) para ninguém publicar sem ver.

Hoje faltam: WhatsApp, @ do Instagram, e-mail, os três preços, os três prazos, e os
campos não confirmados dos cases.

Fora do `site.ts` faltam ainda:

- `public/og.png` (1200×630) — exportar de `assets/logo/logo-avatar.svg` e
  descomentar as duas linhas `og:image` no `index.html`. Sem isso o link
  compartilhado no WhatsApp aparece sem imagem.
- O domínio real, que aparece em `index.html` (canonical e `og:url`),
  `public/robots.txt` e `public/sitemap.xml` como `SEU-DOMINIO.com.br`.

## Decisões de direção que valem preservar

- **O logo são duas letras, não uma forma.** O `i` e o `D` ficam separados por um
  vão de uma haste inteira, em cores diferentes. A conexão entre eles não está no
  desenho parado — está no movimento (`<Marca viva />`). Se alguém encostar as
  duas letras "pra ficar mais bonito", a marca volta a precisar de legenda.
- **Tema único e claro.** O site não segue `prefers-color-scheme`. Direção de arte
  é escolha, não preferência do sistema. A chapa escura (`.chapa-tinta`) aparece
  em dois momentos e nunca no site inteiro.
- **Dois vermelhos, e eles não são intercambiáveis.** `#FF3B14` tem a energia mas
  só dá 3,10:1 sobre o papel: vale para display grande, elo e chapa. Para texto,
  `#CE2809`. O `check-contrast.mjs` quebra se isso for confundido.
- **Tudo reto.** `border-radius: 0` global. As únicas curvas do site são o pingo
  do `i` e o bojo do `D`. É o que faz a marca saltar.
- **A largura expandida é escolha, não acaso.** Archivo `wdth 118`. Condensada é o
  default de todo site de agência.
- **Animação nunca prende conteúdo.** Tudo passa por `deveAnimar()`, que recusa
  animar sob `prefers-reduced-motion` **e** com o documento oculto (em aba de
  fundo o `requestAnimationFrame` não dispara). Sempre `fromTo`, nunca `from`:
  com o double-mount do StrictMode, `from` grava o estado já animado como destino.
- **Os três pins só existem acima de 768px.** No celular a mesma narrativa roda
  sem pin e sem scroll horizontal — `eMobile()` decide isso em cada seção.
