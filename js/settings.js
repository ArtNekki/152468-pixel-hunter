// Время
export const Time = {
  START: 30,
  CRITICAL: 5,
  FREQUENCY: 1000
};

// Жизнь
export const Life = {
  COUNT: 3,
  BONUS: 50,
  NONE: 0
};

// Начальные параметры игры
export const INITIAL_GAME = {
  question: {},
  questions: [],
  answers: [],
  lives: Life.COUNT,
  time: Time.START
};

// Количество раундов в игре
export const GAME_ROUNDS_COUNT = 10;

// Количество очков за ответ
export const AnswerPoint = {
  DEFAULT: 100,
  BONUS: 50,
  FINE: -50
};

export const AnswerTime = {
  SLOW: 20,
  FAST: 10
};

// Тип вопросов
export const AnswerType = {
  PHOTO: `photo`,
  PAINT: `paint`
};

// Тип заданий
export const QuestionType = {
  GUESS_TWO: `two-of-two`,
  GUESS_ONE: `tinder-like`,
  FIND: `one-of-three`
};
