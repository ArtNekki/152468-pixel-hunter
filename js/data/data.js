const games = [
  {
    type: `one`,
    title: `Угадайте для каждого изображения фото или рисунок?`,
    questions: [
      {
        type: `photo`,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      },
      {
        type: `paint`,
        img: `https://k42.kn3.net/CF42609C8.jpg`
      }
    ]
  },
  {
    type: `two`,
    title: `Угадай, фото или рисунок?`,
    questions: [
      {
        type: `photo`,
        img: `https://i.imgur.com/DiHM5Zb.jpg`,
      }
    ]
  },
  {
    type: `three`,
    title: `Найдите рисунок среди изображений`,
    questions: [
      {
        type: `photo`,
        img: `http://i.imgur.com/DKR1HtB.jpg`,
      },
      {
        type: `paint`,
        img: `https://k32.kn3.net/5C7060EC5.jpg`
      },
      {
        type: `photo`,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      }
    ]
  }
];

export const INITIAL_GAME = {
  game: games[0],
  stats: [`slow`, `fast`],
  lives: 3
};
