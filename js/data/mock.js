import {ANSWERS_COUNT, ANSWER_TIME} from './game-score';

// Количество жизней
export const LIFE = {
  max: 3,
  medium: 2,
  min: 1,
  none: 0
};

// Формируем массив ответов
const getAnswers = ({isCorrect, time}) => {
  let answers = new Array(ANSWERS_COUNT).fill({});

  return answers.map((answer) => {
    answer.isCorrect = isCorrect;
    answer.time = time;

    return answer;
  });
};

// Ответ
export const answer = {
  slow: {
    isCorrect: true,
    time: ANSWER_TIME.slow + 1
  },
  normal: {
    isCorrect: true,
    time: 12
  },
  fast: {
    isCorrect: true,
    time: ANSWER_TIME.fast - 1
  },
  failed: {
    isCorrect: false,
    time: 0
  }
};

// Массив с ответами
export const answers = {
  slow: getAnswers(answer.slow),
  normal: getAnswers(answer.normal),
  fast: getAnswers(answer.fast),
  failed: getAnswers(answer.failed)
};
