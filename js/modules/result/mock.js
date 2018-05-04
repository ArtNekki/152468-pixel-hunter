import {GAME_ROUNDS_COUNT, AnswerTime} from '../../settings';

// Количество жизней
export const LifeValue = {
  MAX: 3,
  MEDIUM: 2,
  MIN: 1,
  NONE: 0
};

// Формируем массив ответов
const getAnswers = ({isCorrect, time}) => {
  let answers = new Array(GAME_ROUNDS_COUNT).fill({});

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
    time: AnswerTime.SLOW + 1
  },
  normal: {
    isCorrect: true,
    time: 12
  },
  fast: {
    isCorrect: true,
    time: AnswerTime.FAST - 1
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
