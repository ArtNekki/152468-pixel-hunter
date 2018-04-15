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

export const CONTROLS = {
  [taskType.GUESS_ONE]: `[type='radio']`,
  [taskType.GUESS_TWO]: `[type='radio']`,
  [taskType.FIND]: `.game__option`
};

export const getCheckedControls = (answers) => {
  const option = answers[0].classList.contains(`game__option`);

  return answers.filter(((answer) => {
    return option ? answer.classList.contains(`game__option--selected`) : answer.checked;
  }));
};

export const nextTask = (state) => {
  return Object.assign({}, state, {
    task: state.tasks.pop()
  });
};

export const addAnswer = (state, answer) => {
  return Object.assign({}, state, {
    answers: [...state.answers, ...[answer]]
  });
};

export const selectImage = (e) => {
  const option = e.target.closest(`.game__option`);

  if (!option) {
    return;
  }

  return option.classList.contains(`game__option--selected`);
};
