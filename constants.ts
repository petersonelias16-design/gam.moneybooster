import { Question, ResultLevel } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Qual dessas conquistas financeiras te faria se sentir LIVRE de verdade?",
    options: [
      { id: 'a', text: "Viajar o mundo sem data para voltar", emoji: "✈️", score: 3 },
      { id: 'b', text: "Comprar minha casa própria à vista", emoji: "🏡", score: 2 },
      { id: 'c', text: "Pagar todas as dívidas e limpar meu nome", emoji: "💳", score: 1 },
      { id: 'd', text: "Ter renda passiva caindo na conta todo dia", emoji: "💸", score: 4 }
    ]
  },
  {
    id: 2,
    question: "Qual pensamento sabotador mais atrasa sua vida financeira?",
    options: [
      { id: 'a', text: "Ganho pouco, não sobra nada para investir", emoji: "📉", score: 2 },
      { id: 'b', text: "Finanças é complicado demais para mim", emoji: "🤯", score: 1 },
      { id: 'c', text: "Tenho medo de perder o pouco que tenho", emoji: "😨", score: 1 },
      { id: 'd', text: "Acho que começar agora não vai adiantar", emoji: "🐢", score: 1 }
    ]
  },
  {
    id: 3,
    question: "Se 15 min por dia multiplicassem sua renda, o que você faria?",
    options: [
      { id: 'a', text: "Começaria hoje mesmo, sem pensar duas vezes", emoji: "🚀", score: 4 },
      { id: 'b', text: "Desconfiaria, mas tentaria para ver se funciona", emoji: "🧐", score: 3 },
      { id: 'c', text: "Investiria esse tempo estudando estratégias", emoji: "📚", score: 3 },
      { id: 'd', text: "Usaria esse dinheiro extra para lazer", emoji: "🎉", score: 1 }
    ]
  },
  {
    id: 4,
    question: "Qual obstáculo mais te trava hoje?",
    options: [
      { id: 'a', text: "Falta de tempo livre", emoji: "⏳", score: 2 },
      { id: 'b', text: "Falta de conhecimento prático", emoji: "🧠", score: 3 },
      { id: 'c', text: "Procrastinação e preguiça", emoji: "zzZ", score: 1 },
      { id: 'd', text: "Dívidas acumuladas", emoji: "💣", score: 1 }
    ]
  },
  {
    id: 5,
    question: "O que mais te motiva a mudar sua vida financeira?",
    options: [
      { id: 'a', text: "Dar conforto para minha família", emoji: "👨‍👩‍👧‍👦", score: 3 },
      { id: 'b', text: "Não depender de chefe ou emprego", emoji: "🖕", score: 4 },
      { id: 'c', text: "Realizar sonhos de consumo", emoji: "🚗", score: 2 },
      { id: 'd', text: "Ter segurança na velhice", emoji: "👴", score: 3 }
    ]
  },
  {
    id: 6,
    question: "Quanto tempo você já investe por dia aprendendo sobre dinheiro?",
    options: [
      { id: 'a', text: "Absolutamente nada", emoji: "🚫", score: 1 },
      { id: 'b', text: "Leio algumas notícias às vezes", emoji: "📰", score: 2 },
      { id: 'c', text: "Vejo vídeos, mas não aplico", emoji: "👀", score: 2 },
      { id: 'd', text: "Estudo, mas me sinto perdido", emoji: "🌀", score: 3 }
    ]
  },
  {
    id: 7,
    question: "Qual seria sua reação ao descobrir uma oportunidade de renda real?",
    options: [
      { id: 'a', text: "Agarraria com unhas e dentes", emoji: "🐯", score: 4 },
      { id: 'b', text: "Contaria para todo mundo", emoji: "🗣️", score: 2 },
      { id: 'c', text: "Guardaria segredo e focaria no resultado", emoji: "🤫", score: 4 },
      { id: 'd', text: "Ficaria com medo de arriscar", emoji: "🫣", score: 1 }
    ]
  },
  {
    id: 8,
    question: "Qual dessas atitudes você mais se identifica?",
    options: [
      { id: 'a', text: "Sou impulsivo com gastos", emoji: "🛍️", score: 1 },
      { id: 'b', text: "Sou muito conservador e guardo tudo", emoji: "🐿️", score: 2 },
      { id: 'c', text: "Busco oportunidades, mas desisto rápido", emoji: "🏃", score: 2 },
      { id: 'd', text: "Sou disciplinado quando vejo resultado", emoji: "🎯", score: 4 }
    ]
  },
  {
    id: 9,
    question: "Como você se sente agora, depois dessas perguntas?",
    options: [
      { id: 'a', text: "Mais consciente da minha situação", emoji: "💡", score: 3 },
      { id: 'b', text: "Ansioso para mudar isso logo", emoji: "🔥", score: 4 },
      { id: 'c', text: "Esperançoso com o futuro", emoji: "🌈", score: 3 },
      { id: 'd', text: "Motivado a agir imediatamente", emoji: "💪", score: 4 }
    ]
  },
  {
    id: 10,
    question: "Você está pronto para usar 15 minutos por dia e mudar seu jogo financeiro?",
    options: [
      { id: 'a', text: "SIM! Quero começar agora!", emoji: "🤩", score: 4 },
      { id: 'b', text: "Sim, estou disposto a aprender", emoji: "🤓", score: 3 },
      { id: 'c', text: "Com certeza, chega de perder tempo", emoji: "🛑", score: 4 },
      { id: 'd', text: "Vamos nessa! Me mostra como", emoji: "🤜", score: 4 }
    ]
  }
];

export const RESULT_LEVELS: ResultLevel[] = [
  {
    minScore: 0,
    maxScore: 24,
    title: "Explorador Financeiro",
    description: "Você tem o desejo de mudar, mas ainda faltam as ferramentas e a mentalidade certa para acelerar. O Money Booster é exatamente o 'empurrão' que faltava.",
    color: "text-blue-400",
    badgeIcon: "🧭"
  },
  {
    minScore: 25,
    maxScore: 32,
    title: "Investidor em Ascensão",
    description: "Você já tem uma ótima base e mentalidade! Só precisa de um método validado para transformar essa energia em dinheiro no bolso.",
    color: "text-yellow-400",
    badgeIcon: "⚡"
  },
  {
    minScore: 33,
    maxScore: 40,
    title: "Visionário Money Booster",
    description: "Incrível! Sua mentalidade está alinhada com o sucesso. Com a técnica certa, seus resultados serão exponenciais e rápidos.",
    color: "text-emerald-400",
    badgeIcon: "👑"
  }
];

export const CHECKOUT_URL = "https://pay.kiwify.com.br/LMzJmZu";

export interface SocialProof {
    triggerAfterQuestionIndex: number; // 0-based index (e.g., 1 means after question 2)
    name: string;
    message: string;
    avatarColor: string;
    amount?: string;
}

export const SOCIAL_PROOFS: SocialProof[] = [
    {
        triggerAfterQuestionIndex: 1, // After Q2
        name: "Ana S.",
        message: "Faturei R$ 540 na primeira semana 😳🔥",
        avatarColor: "bg-pink-500",
        amount: "R$ 540"
    },
    {
        triggerAfterQuestionIndex: 3, // After Q4
        name: "Carlos M.",
        message: "Nunca imaginei fazer R$ 1.200 só pelo celular!",
        avatarColor: "bg-blue-500",
        amount: "R$ 1.200"
    },
    {
        triggerAfterQuestionIndex: 5, // After Q6
        name: "Juliana R.",
        message: "Finalmente saí das dívidas! Fiz R$ 800 em 5 dias 👊💸",
        avatarColor: "bg-purple-500",
        amount: "R$ 800"
    },
    {
        triggerAfterQuestionIndex: 7, // After Q8
        name: "Felipe T.",
        message: "Comecei pequeno e bati R$ 3.000 esse mês. Surreal.",
        avatarColor: "bg-green-500",
        amount: "R$ 3.000"
    },
    {
        triggerAfterQuestionIndex: 9, // After Q10 (Before Calculating)
        name: "Mariana L.",
        message: "Isso salvou meu ano. Simples e direto ao ponto!",
        avatarColor: "bg-orange-500",
        amount: "TOP"
    }
];