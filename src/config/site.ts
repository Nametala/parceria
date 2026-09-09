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
    para: 'Para existir no Google e ter para onde mandar o cliente.',
    preco: 'R$ 300',
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
    id: 'identidade',
    nome: 'Página + identidade',
    para: 'Para quem ainda não tem marca — ou tem uma que não representa mais o negócio.',
    preco: 'R$ 500',
    prazo: '[INSERIR PRAZO]',
    destaque: true,
    inclui: [
      'Tudo da página única',
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
    github: 'https://github.com/Nametala',
  },
  {
    nome: 'Gustavo',
    sobrenome: 'Vieira',
    github: 'https://github.com/vGustav1',
  },
] as const;
