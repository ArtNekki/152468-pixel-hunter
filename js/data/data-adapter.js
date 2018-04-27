import {TaskType} from './structure';

const serverTitleToClientTitle = {
  'two-of-two': TaskType.GUESS_TWO,
  'one-of-three': TaskType.FIND,
  'tinder-like': TaskType.GUESS_ONE
};

const serverAnswerTypeToClientAnswerType = {
  'painting': `paint`,
  'photo': `photo`
};

const formatAnswers = (answers) => {
  return answers.map((it) => {
    return {
      img: it.image.url,
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
