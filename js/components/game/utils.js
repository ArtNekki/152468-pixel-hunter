import {taskType} from '../../data/task.data';

// Сопоставление количества картинок и типа контейнера
export const CONTENT_TYPE = {
  [taskType.GUESS_ONE]: `game__content--wide`,
  [taskType.FIND]: `game__content--triple`
};

// Сопоставление типа игры и вида события
export const EVENT = {
  [taskType.GUESS_TWO]: `change`,
  [taskType.GUESS_ONE]: `change`,
  [taskType.FIND]: `click`
};

const checkAnswersForGuessTwoTask = (answers) => {
  const requiredAnswersCount = 2;

  const result = answers.filter(((answer) => {
    return answer.checked;
  }));

  return result.length === requiredAnswersCount;
};

const checkAnswersForGuessOneTask = (answers) => {
  return answers.some(((answer) => {
    return answer.checked;
  }));
};

const checkAnswersForFindTask = (answers) => {
  return answers.some(((answer) => {
    return answer.classList.contains(`game__option--selected`);
  }));
};

// Соответствие типа игры функции проверки ответов
export const getSelectedAnswers = {
  [taskType.GUESS_TWO]: checkAnswersForGuessTwoTask,
  [taskType.GUESS_ONE]: checkAnswersForGuessOneTask,
  [taskType.FIND]: checkAnswersForFindTask
};

export const clearAnswersSelection = (answers) => {
  answers.forEach((answer) => {
    answer.classList.remove(`game__option--selected`);
  });
};
