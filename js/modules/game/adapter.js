import {AnswerType, TaskType} from '../../settings';

const serverTitleToClientTitle = {
  'two-of-two': TaskType.GUESS_TWO,
  'one-of-three': TaskType.FIND,
  'tinder-like': TaskType.GUESS_ONE
};

const serverAnswerTypeToClientAnswerType = {
  'painting': AnswerType.PAINT,
  'photo': AnswerType.PHOTO
};

const formatAnswers = (answers) => {
  return answers.map((it) => {
    return {
      image: {
        url: it.image.url,
        width: it.image.width,
        height: it.image.height
      },
      type: serverAnswerTypeToClientAnswerType[it.type]
    };
  });
};

const formatQuestion = (question) => {
  return {
    type: serverTitleToClientTitle[question.type],
    title: question.question,
    answers: formatAnswers(question.answers)
  };
};

export default (data) => {
  return data.map((question) => {
    return formatQuestion(question);
  });
};
