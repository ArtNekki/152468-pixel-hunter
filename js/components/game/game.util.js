import {TaskType} from '../../data/task.data';

// Сопоставление количества картинок и типа контейнера
export const ContentType = {
  [TaskType.GUESS_ONE]: `game__content--wide`,
  [TaskType.FIND]: `game__content--triple`
};

// Сопоставление типа игры и вида события
export const Event = {
  [TaskType.GUESS_TWO]: `change`,
  [TaskType.GUESS_ONE]: `change`,
  [TaskType.FIND]: `click`
};

export const Controls = {
  [TaskType.GUESS_ONE]: `[type='radio']`,
  [TaskType.GUESS_TWO]: `[type='radio']`,
  [TaskType.FIND]: `.game__option`
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
