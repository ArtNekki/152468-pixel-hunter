import {GAME_ROUNDS_COUNT, AnswerPoint, AnswerTime, Life} from '../../settings';

export const isObject = (value) => {
  return (typeof value === `object`) && !Array.isArray(value);
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

  if (!Number.isFinite(answer.time)) {
    throw new Error(`свойство answer.time должно быть числом`);
  }

  let score = 0;

  if (answer.isCorrect === false) {
    return score;
  }

  score += AnswerPoint.DEFAULT;

  if (answer.time < AnswerTime.FAST) {
    score += AnswerPoint.BONUS;
  }

  if (answer.time > AnswerTime.SLOW) {
    score += AnswerPoint.FINE;
  }

  return score;
};

export const calculateTotalGameScore = (answers, lives) => {
  if (!Array.isArray(answers)) {
    throw new Error(`Параметр 'answers' должен быть массивом`);
  }

  if (!Number.isFinite(lives)) {
    throw new Error(`Параметр 'lives' должен быть числом`);
  }

  if (answers.length < GAME_ROUNDS_COUNT) {
    return -1;
  }

  if (lives < 0 || lives > Life.COUNT) {
    throw new Error(`Переданное количество жизней должно быть от 0 до 3`);
  }

  const answersScore = answers.reduce((sum, current) => {
    return sum + calculateAnswerScore(current);
  }, 0);

  return answersScore + lives * Life.BONUS;
};
