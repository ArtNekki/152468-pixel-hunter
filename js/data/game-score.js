import {isNumber, isObject} from '../is';

// Бонус за оставшуюся жизнь
const LIFE_BONUS = 50;

// Количество жизней
const LIVES_COUNT = 3;

// Количество ответов
export const ANSWERS_COUNT = 10;

// Количество очков за ответ
export const ANSWER_POINT = {
  default: 100,
  bonus: 50,
  fine: -50
};

// J
export const ANSWER_TIME = {
  slow: 20,
  fast: 10
};

export const calculateAnswerScore = (answer) => {
  if (!isObject(answer)) {
    throw new Error(`Параметр 'answer' должен быть обьектом`);
  }

  if (!(`isCorrect` in answer)) {
    throw new Error(`У параметра answer отсутстувует свойство 'isCorrect'`);
  }

  if (!(`time` in answer)) {
    throw new Error(`У параметра answer отсутстувует свойство 'time'`);
  }

  if ((typeof answer.isCorrect) !== `boolean`) {
    throw new Error(`Свойство answer.isCorrect должно быть true или false`);
  }

  if (!isNumber(answer.time)) {
    throw new Error(`свойство answer.time должно быть числом`);
  }

  let score = 0;

  if (answer.isCorrect === false) {
    return score;
  }

  score += ANSWER_POINT.default;

  if (answer.time < ANSWER_TIME.fast) {
    score += ANSWER_POINT.bonus;
  }

  if (answer.time > ANSWER_TIME.slow) {
    score += ANSWER_POINT.fine;
  }

  return score;
};

export const calculateTotalGameScore = (answers, lives) => {
  if (!Array.isArray(answers)) {
    throw new Error(`Параметр 'answers' должен быть массивом`);
  }

  if (!isNumber(lives)) {
    throw new Error(`Параметр 'lives' должен быть числом`);
  }

  if (answers.length < ANSWERS_COUNT) {
    return -1;
  }

  if (lives < 0 || lives > LIVES_COUNT) {
    throw new Error(`Переданное количество жизней должно быть от 0 до 3`);
  }

  const answersScore = answers.reduce((sum, current) => {
    return sum + calculateAnswerScore(current);
  }, 0);

  return answersScore + lives * LIFE_BONUS;
};
