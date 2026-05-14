export type PageEffect = 'petals' | 'sparkles' | 'none';

export type PageContent = {
  id: number;
  media: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
  };
  text: string;
  effect?: PageEffect;
};

export const recipientName = 'Gaby';

export const pages: PageContent[] = [
  {
    id: 1,
    media: {
      type: 'video',
      src: '/media/page-1.mp4',
      alt: 'Guns N\' Roses en concierto',
    },
    text: "Te conocí en mi refugio: la academia.\nY un día llegaste tú. Bailando contigo todo fluía desde el primer paso, y cada clase me daba más ganas de que llegara la siguiente. Tu sonrisa, tu belleza y tu olor me ponían nervioso. Y cada vez quería más conocerte fuera de cualquier clase o social.",
    effect: 'sparkles',
  },
  {
    id: 2,
    media: {
      type: 'image',
      src: '/media/page-2.jpg',
      alt: 'Lo ordinario',
    },
    text: 'Mi oportunidad llegó: invitarte al Pa\'l Norte.\nEntre la multitud, con la música y contigo al lado, me sentí completamente yo. Quería que conocieras mi forma de disfrutar la vida.\nEsa noche entendí que mi conexión contigo no era solo en la pista — era en todo lo demás también.',
    effect: 'none',
  },
  {
    id: 3,
    media: {
      type: 'video',
      src: '/media/page-3.mp4',
      alt: 'El tiempo',
    },
    text: 'Guns N\' Roses tocando, la gente gritando, y tú me abrazabas para protegerte del frío. Yo ya sabía que me gustabas. Pero esa noche, con tu cabeza descansando en mi espalda y miles de personas alrededor, todo se quedó en silencio por un segundo.\nAhí sentí algo que no había sentido con nadie: contigo el mundo se siente en paz.',
    effect: 'petals',
  },
  {
    id: 4,
    media: {
      type: 'video',
      src: '/media/page-4.mp4',
      alt: 'Lo que construimos',
    },
    text: 'Desde ese día me dediqué a enamorarte. Y tú, quizás sin saberlo, te dedicaste a lo mismo conmigo. Te mostré mi lado más vulnerable, y tú me mostraste el tuyo. Entre más te conocía, más te admiraba, más me enamoraba de ti y de tu sonrisa.',
    effect: 'none',
  },
  {
    id: 5,
    media: {
      type: 'image',
      src: '/media/page-5.jpg',
      alt: 'El hoy',
    },
    text: 'Eres una mujer con un corazón enorme, ambiciosa, con una claridad sobre lo que quieres en la vida que pocas personas tienen. Eres mucho más inteligente que yo. Y eso, en lugar de intimidarme, lo atesoro como algo que quiero cuidar para siempre. Quiero ser la persona que te vea brillar en las buenas y en las malas. Quiero ser tu compañero de viaje — en todos los sentidos.',
    effect: 'sparkles',
  },
  {
    id: 6,
    media: {
      type: 'video',
      src: '/media/page-6.mp4',
      alt: 'El hoy',
    },
    text: 'Quiero hacer todo lo que esté en mí para hacerte feliz, escogerte siempre sin importar la circunstancia. Ser tu refugio y tu acompañante en cada triunfo y adversidad en nuestras vidas, quiero recorrer la vida contigo.',
    effect: 'sparkles',
  },
  {
    id: 7,
    media: {
      type: 'video',
      src: '/media/page-7.mp4',
      alt: 'El hoy',
    },
    text: 'Gracias por abrir tu corazón conmigo, por cada beso y cada abrazo que me llenan de vida. Por sonreírme siempre y por la paz que me das. Gracias inspirarme a ser una mejor versión de mí cada día. Gracias por llevarme de la mano y elegirme. Gracias por hacerme el hombre más feliz.',
    effect: 'sparkles',
  },
  {
    id: 8,
    media: {
      type: 'image',
      src: '/media/page-8.jpg',
      alt: 'El hoy',
    },
    text: 'Quiero bailar contigo esta vida... Quiero seguir conociéndote, admirándote, aprendiendo de ti y amándote cada día más.\nQuiero construir un futuro contigo, lleno de aventuras, aprendizajes y amor.',
    effect: 'sparkles',
  },
];

export const finalQuestion = '¿Quieres seguir\nconstruyendo esto\nconmigo?';

export const finalCue = 'Levanta la mirada.';
