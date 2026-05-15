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
      src: 'https://gabyletter.blob.core.windows.net/media/page-1.mp4',
      alt: '',
    },
    text: "Hola mi amor!\nSé que ahora mismo estas tu y tu bonita sonrisa conmigo en este momento.\nQuiero compartir contigo esta carta digital para contarte una historia y unas palabras a través de esta pequeña carta digital que he programado y creado pensando en ti y en nosotros.\nCada instante a tu lado ha sido un gran regalo, y quiero aprovechar esta oportunidad para expresarte lo que siento por ti de una manera diferente y a mi estilo.\nEspero que disfrutes cada página tanto como yo disfruté creándola para ti...",
    effect: 'sparkles',
  },
  {
    id: 2,
    media: {
      type: 'video',
      src: 'https://gabyletter.blob.core.windows.net/media/page-2.mp4',
      alt: '',
    },
    text: "Te conocí en mi refugio: la academia.\nY un día llegaste tú. Bailando contigo todo fluía desde el primer paso, y cada clase me daba más ganas de que llegara la siguiente. Tu sonrisa, tu belleza y tu olor me ponían nervioso. Y cada vez quería más conocerte fuera de cualquier clase o social.",
    effect: 'sparkles',
  },
  {
    id: 3,
    media: {
      type: 'image',
      src: 'https://gabyletter.blob.core.windows.net/media/page-3.jpg',
      alt: 'El concierto',
    },
    text: 'Hasta que mi oportunidad llegó, estar contigo en Pa\'l Norte y entre la multitud, la música y contigo a mi lado, me sentí completamente yo. Quería que me conocieras a mi y a mi forma de disfrutar la vida.\nEsa noche entendí que mi conexión contigo no era solo bailando — era en todo lo demás también.',
    effect: 'petals',
  },
  {
    id: 4,
    media: {
      type: 'video',
      src: 'https://gabyletter.blob.core.windows.net/media/page-4.mp4',
      alt: 'El concierto',
    },
    text: 'Mientras Guns N\' Roses tocaba, la gente gritaba, y tú me abrazabas para protegerte del frío. Yo ya sabía que me gustabas. Pero esa noche, con tu cabeza descansando en mi espalda y miles de personas alrededor, todo se quedó en silencio por un segundo.\nAhí sentí algo que no había sentido con nadie: contigo el mundo se siente en paz.',
    effect: 'sparkles',
  },
  {
    id: 5,
    media: {
      type: 'video',
      src: 'https://gabyletter.blob.core.windows.net/media/page-5.mp4',
      alt: '',
    },
    text: 'Desde ese día me dediqué a enamorarte. Y tú, quizás con miedo o sin saberlo, hiciste lo mismo conmigo. Te mostré mi lado más vulnerable, y tú me mostraste el tuyo. Entre más te conocía, más te admiraba, más me enamoraba de ti y de tu hermosa sonrisa.',
    effect: 'sparkles',
  },
  {
    id: 6,
    media: {
      type: 'image',
      src: 'https://gabyletter.blob.core.windows.net/media/page-6.jpg',
      alt: '',
    },
    text: 'Eres una mujer admirable con un enorme corazón, ambiciosa, con una claridad sobre lo que quieres en la vida que pocas personas tienen. Eres mucho más inteligente que yo. Y eso, en lugar de intimidarme, lo atesoro como algo que quiero cuidar para siempre.',
    effect: 'petals',
  },
  {
    id: 7,
    media: {
      type: 'video',
      src: 'https://gabyletter.blob.core.windows.net/media/page-7.mp4',
      alt: '',
    },
    text: 'Quiero ser la persona que te vea brillar en las buenas y en las malas. Quiero ser tu compañero de viaje — en todos los sentidos. Cuidarte, apoyarte, admirarte y amarte cada día más. Quiero ser tu mejor amigo, tu confidente y protector.',
    effect: 'sparkles',
  },
  {
    id: 8,
    media: {
      type: 'video',
      src: 'https://gabyletter.blob.core.windows.net/media/page-8.mp4',
      alt: '',
    },
    text: 'Quiero hacer todo lo que esté en mí para hacerte feliz, escogerte siempre sin importar la circunstancia. Ser tu refugio y tu acompañante en cada triunfo y adversidad en nuestras vidas, quiero recorrer la vida contigo.',
    effect: 'sparkles',
  },
  {
    id: 9,
    media: {
      type: 'video',
      src: 'https://gabyletter.blob.core.windows.net/media/page-9.mp4',
      alt: '',
    },
    text: 'Gracias por abrir tu corazón conmigo, por cada beso y cada abrazo que me llenan de vida. Por sonreírme siempre y por la paz que me das. Gracias inspirarme a ser una mejor versión de mí cada día. Gracias por llevarme de la mano y elegirme. Por creer en mí más de lo que yo creo en mí mismo. Gracias por hacerme el hombre más feliz.',
    effect: 'sparkles',
  },
  {
    id: 10,
    media: {
      type: 'image',
      src: 'https://gabyletter.blob.core.windows.net/media/page-10.jpg',
      alt: '',
    },
    text: 'Quiero seguir bailando contigo esta vida...\n Seguir conociéndote, admirándote, consintiéndote y aprendiendo de ti amándote cada día más.\nQuiero seguir viendo esa hermosa sonrisa que tienes y construir un futuro contigo, lleno de aventuras, grandes aprendizajes y experiencias juntos.',
    effect: 'sparkles',
  },
];

export const finalQuestion = 'TE AMO!\n\n¿Quieres seguir\nconstruyendo esto\nconmigo?';

export const finalCue = 'Ahora levanta la mirada mi amor...';
