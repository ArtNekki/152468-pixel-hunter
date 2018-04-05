const getClass = (obj) => {
  return {}.toString.call(obj).slice(8, -1);
};

// Бонус за оставшуюся жизнь
const LIFE_BONUS = 50;

// Количество очков за ответ
export const ANSWER_POINTS = {
  slow: 50,
  normal: 100,
  fast: 150
};

// Количество ответов
export const ANSWERS_AMOUNT = 10;

// Варианты скорости ответов в миллисекундах
export const ANSWER_SPEED = {
  slow: 20000,
  normal: 11000,
  fast: 9999
};

// Количество жизней
export const LIFE = {
  full: 3,
  normal: 2,
  minimum: 1,
  none: 0
};

export const calculateAnswerPoints = (answer) => {

  if (getClass(answer) !== `Object`) {
    throw new Error(`Параметр 'answer' должен быть обьектом`);
  }

  if (!(`success` in answer)) {
    throw new Error(`У параметра answer отсутстувует свойство 'success'`);
  }

  if (!(`time` in answer)) {
    throw new Error(`У параметра answer отсутстувует свойство 'time'`);
  }

  if ((typeof answer.success) !== `boolean`) {
    throw new Error(`свойство answer.success должно быть true или false`);
  }

  if ((typeof answer.time) !== `number`) {
    throw new Error(`свойство answer.time должно быть числом`);
  }

  let points = 0;

  if (answer.success === false) {
    return points;
  }

  points = ANSWER_POINTS.normal;

  if (answer.time <= ANSWER_SPEED.fast) {
    points = ANSWER_POINTS.fast;
  }

  if (answer.time >= ANSWER_SPEED.slow) {
    points = ANSWER_POINTS.slow;
  }

  return points;
};

export const calculateTotalGamePoints = (answers, lives) => {
  if (!Array.isArray(answers)) {
    throw new Error(`Параметр 'answers' должен быть массивом`);
  }

  if (answers.length < ANSWERS_AMOUNT) {
    return -1;
  }

  if (typeof lives !== `number`) {
    throw new Error(`Параметр 'lives' должен быть числом`);
  }

  if (lives < LIFE.none || lives > LIFE.full) {
    throw new Error(`Переданное количество жизней должно быть от 0 до 3`);
  }

  const answersPoints = answers.reduce((sum, current) => {
    return sum + calculateAnswerPoints(current);
  }, 0);

  return answersPoints + lives * LIFE_BONUS;
};
