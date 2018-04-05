import {ANSWERS_AMOUNT, ANSWER_SPEED} from './game';

// Формируем массив ответов
const getAnswers = ({success, time}) => {
  let answers = new Array(ANSWERS_AMOUNT).fill({});

  return answers.map((answer) => {
    answer.success = success;
    answer.time = time;

    return answer;
  });
};

// Ответ
export const answer = {
  slow: {
    success: true,
    time: ANSWER_SPEED.slow
  },
  normal: {
    success: true,
    time: ANSWER_SPEED.normal
  },
  fast: {
    success: true,
    time: ANSWER_SPEED.fast
  },
  failed: {
    success: false,
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
