/**
 * Conteudo do site em um lugar so.
 * Tudo entre colchetes e placeholder explicito: nao invente valores aqui,
 * substitua pelo dado real. O site trata placeholder como estado valido e
 * degrada com elegancia (ver PLACEHOLDER e temPlaceholder abaixo).
 */

export const PLACEHOLDER = /^\[.*\]$/;
export const temPlaceholder = (v: string) => PLACEHOLDER.test(v.trim());

export const contato = {
  whatsapp: '[INSERIR WHATSAPP]',
  instagram: '[INSERIR @INSTAGRAM]',
  email: '[INSERIR E-MAIL]',
  cidade: 'Belo Horizonte',
  atendimento: 'Atendemos o Brasil todo',
} as const;

export const dores = [
  'Só tenho Instagram.',
  'Meus clientes chegam por indicação.',
  'Quando pesquisam meu nome, não encontram nada.',
  'Já pedi orçamento e nunca responderam.',
  'A agência cobrou mais do que eu podia pagar.',
  'Preciso de um site, não de seis reuniões.',
] as const;

export const processo = [
  {
    n: '01',
    titulo: 'Você conta o que faz',
    texto: 'Uma conversa no WhatsApp. Sem briefing de vinte páginas, sem reunião de duas horas.',
  },
  {
    n: '02',
    titulo: 'A gente transforma isso em identidade',
    texto: 'Marca, texto, estrutura e o site inteiro. Você não precisa trazer nada pronto.',
  },
  {
    n: '03',
    titulo: 'Você aprova',
    texto: 'Vê no ar, num link, antes de qualquer coisa ficar definitiva. Ajuste é conversa, não retrabalho cobrado.',
  },
  {
    n: '04',
    titulo: 'Seu site entra no ar',
    texto: 'Domínio configurado, no Google, com botão de WhatsApp funcionando. Em dias.',
  },
] as const;

export type Plano = {
  id: string;
  nome: string;
  para: string;
  preco: string;
  prazo: string;
  inclui: readonly string[];
  destaque?: boolean;
};

export const planos: readonly Plano[] = [
  {
    id: 'pagina',
    nome: 'Página única',
    para: 'Quem precisa existir no Google e ter para onde mandar o cliente.',
    preco: '[INSERIR PREÇO]',
    prazo: '[INSERIR PRAZO]',
    inclui: [
      'Uma página com tudo que importa',
      'Botão de WhatsApp',
      'Aparece no Google',
      'Funciona no celular',
      'Domínio configurado',
    ],
  },
  {
    id: 'completo',
    nome: 'Site completo',
    para: 'Quem tem serviços, catálogo ou portfólio para mostrar.',
    preco: '[INSERIR PREÇO]',
    prazo: '[INSERIR PRAZO]',
    inclui: [
      'Tudo da página única',
      'Várias seções',
      'Catálogo ou lista de serviços',
      'Galeria de fotos',
      'Textos escritos por nós',
    ],
    destaque: true,
  },
  {
    id: 'identidade',
    nome: 'Site + identidade',
    para: 'Quem ainda não tem marca — ou tem uma que não representa mais o negócio.',
    preco: '[INSERIR PREÇO]',
    prazo: '[INSERIR PRAZO]',
    inclui: [
      'Tudo do site completo',
      'Logotipo',
      'Paleta e tipografia',
      'Arquivos para redes e impressão',
      'Guia de uso da marca',
    ],
  },
] as const;

export type Case = {
  id: string;
  cliente: string;
  segmento: string;
  local: string;
  oQueFizemos: string;
  resultado: string;
  link: string;
};

/** Projetos reais do estudio. Campos nao confirmados ficam como placeholder. */
export const cases: readonly Case[] = [
  {
    id: 'bella-rocca',
    cliente: 'Bella Rocca',
    segmento: 'Moda feminina',
    local: 'Savassi, Belo Horizonte',
    oQueFizemos: 'Site institucional da loja.',
    resultado: '[INSERIR RESULTADO]',
    link: '[INSERIR LINK]',
  },
  {
    id: 'bl4ck-gym',
    cliente: 'BL4CK GYM',
    segmento: 'Academia',
    local: '[INSERIR CIDADE]',
    oQueFizemos: 'Site institucional construído sobre a nossa base própria, em React e Tailwind.',
    resultado: '[INSERIR RESULTADO]',
    link: '[INSERIR LINK]',
  },
  {
    id: 'studio-rondas',
    cliente: 'Studio Rondas',
    segmento: '[INSERIR SEGMENTO]',
    local: '[INSERIR CIDADE]',
    oQueFizemos: '[INSERIR O QUE FOI FEITO]',
    resultado: '[INSERIR RESULTADO]',
    link: '[INSERIR LINK]',
  },
] as const;

export const dupla = [
  {
    nome: 'Arthur',
    sobrenome: 'Nametala',
    papel: 'Front-end e produto',
    faz: 'Desenha a interface, escreve o front e cuida de como o site conversa com quem chega.',
    github: 'https://github.com/Nametala',
  },
  {
    nome: 'Gustavo',
    sobrenome: 'Vieira',
    papel: 'Back-end e tecnologia',
    faz: 'Cuida das integrações, dos formulários, do que roda por trás e de garantir que nada quebre.',
    github: 'https://github.com/vGustav1',
  },
] as const;

export const nao = [
  'Aplicativo de celular',
  'Sistema interno de gestão',
  'Loja virtual com estoque grande',
  'Tráfego pago e gestão de anúncios',
] as const;
