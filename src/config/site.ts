/**
 * Conteudo do site em um lugar so.
 * Tudo entre colchetes e placeholder explicito: nao invente valores aqui,
 * substitua pelo dado real. O site trata placeholder como estado valido e
 * degrada com elegancia (ver PLACEHOLDER e temPlaceholder abaixo).
 */

export const PLACEHOLDER = /^\[.*\]$/;
export const temPlaceholder = (v: string) => PLACEHOLDER.test(v.trim());

export const contato = {
  /** Numero principal do site. O individual de cada um fica em `dupla`. */
  whatsapp: '+55 31 98311-2211',
  instagram: '@idsolucoes.bh',
  email: 'idsolucoessites@gmail.com',
  cidade: 'Belo Horizonte',
} as const;

/** Prazo unico dos dois pacotes. Um numero so, para nao virar tabela. */
export const prazo = '5 dias';

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
    texto:
      'Vê no ar, num link, antes de qualquer coisa ficar definitiva. Ajuste é conversa, não retrabalho cobrado.',
  },
  {
    n: '04',
    titulo: 'Seu site entra no ar',
    texto: 'Domínio configurado, no Google, com botão de WhatsApp funcionando. Em 5 dias.',
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
    prazo,
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
    prazo,
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
  /** Site no ar. Para um estudio de sites, o link e a prova — nao um numero. */
  link: string;
};

export const cases: readonly Case[] = [
  {
    id: 'via-drones',
    cliente: 'VIA Drones',
    segmento: 'Pulverização agrícola',
    local: 'Medeiros, MG',
    oQueFizemos:
      'Site inteiro: a operação explicada passo a passo, a ficha técnica do drone e o orçamento caindo direto no WhatsApp.',
    link: 'https://viadronesmarcel.vercel.app',
  },
  {
    id: 'bl4ck-gym',
    cliente: 'THE BL4CK GYM',
    segmento: 'Academia',
    local: 'Belo Horizonte',
    oQueFizemos:
      'Site institucional com as modalidades da academia e a aula experimental como chamada principal.',
    link: 'https://bl4ck-gym.vercel.app',
  },
  {
    id: 'studio-rondas',
    cliente: 'Studio Rondas',
    segmento: 'Saúde integrada',
    local: 'Funcionários, Belo Horizonte',
    oQueFizemos:
      'Site com as quatro modalidades, o endereço e a aula experimental marcada pelo WhatsApp.',
    link: 'https://studio-rondas.vercel.app',
  },
] as const;

export const dupla = [
  {
    nome: 'Arthur',
    sobrenome: 'Nametala',
    github: 'https://github.com/Nametala',
    whatsapp: '+55 31 98311-2211',
  },
  {
    nome: 'Gustavo',
    sobrenome: 'Vieira',
    github: 'https://github.com/vGustav1',
    whatsapp: '+55 31 98957-5955',
  },
] as const;

/** wa.me exige so digitos: +55 31 98311-2211 -> 5531983112211 */
export const linkZap = (numero: string, mensagem?: string) =>
  `https://wa.me/${numero.replace(/\D/g, '')}` +
  (mensagem ? `?text=${encodeURIComponent(mensagem)}` : '');
