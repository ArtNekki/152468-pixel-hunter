import {GAME_ROUNDS_COUNT} from '../../data/game-params';

// Возвращает массив элементов, которые были выбраны
export const getCheckedControls = (answers) => {
  return answers.filter(((answer) => {
    return answer.checked;
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

export const canContinue = ({lives, answers}) => {
  return (lives > -1) && answers.length < GAME_ROUNDS_COUNT;
};

export const die = (game) => {
  const lives = game.lives - 1;

  return Object.assign({}, game, {
    lives
  });
};
