import {TaskType} from '../../data/structure';
import {GAME_ROUNDS_COUNT} from '../../data/game-params';

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

// Сопоставление типа игры и типа элементов выбора ответа
export const Controls = {
  [TaskType.GUESS_ONE]: `[type='radio']`,
  [TaskType.GUESS_TWO]: `[type='radio']`,
  [TaskType.FIND]: `.game__option`
};

// Возвращает массив элементов, которые были выбраны
export const getCheckedControls = (answers) => {
  const option = answers[0].classList.contains(`game__option`);

  return answers.filter(((answer) => {
    return option ? answer.classList.contains(`game__option--selected`) : answer.checked;
  }));
};

// Получает новое задание
export const nextTask = (state) => {
  return Object.assign({}, state, {
    task: state.tasks.pop()
  });
};

// Добавляет ответ в состояние игры
export const addAnswer = (state, answer) => {
  return Object.assign({}, state, {
    answers: [...state.answers, ...[answer]]
  });
};

// ...
export const selectImage = (e) => {
  const option = e.target.closest(`.game__option`);

  if (!option) {
    return false;
  }

  return option.classList.contains(`game__option--selected`);
};

export const canContinue = ({lives, answers}) => {
  return (lives > -1) && answers.length < GAME_ROUNDS_COUNT;
};

export const die = (game) => {
  const lives = game.lives - 1;

  return Object.assign({}, game, {
    lives
  });
};
