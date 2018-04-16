// Начальные параметры игры
export const INITIAL_GAME = {
  task: {},
  tasks: [],
  answers: [],
  lives: 3,
  timer: 25
};

// Количество раундов в игре
export const GAME_ROUNDS_COUNT = 10;

// Жизнь
export const Life = {
  count: INITIAL_GAME.lives,
  bonus: 50
};

// Количество очков за ответ
export const AnswerPoint = {
  default: 100,
  bonus: 50,
  fine: -50
};

export const AnswerTime = {
  slow: 20,
  fast: 10
};