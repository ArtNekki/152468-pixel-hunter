import {createElement, changeView} from '../../util';
import {CONTENT_TYPE, EVENT, getSelectedAnswers, clearAnswersSelection} from './utils';
import renderHeader from '../header/index';
import renderQuestions from '../questions/index';
import getStats from '../stats/index';
import renderResult from '../result/index';
import {INITIAL_GAME, die, canContinue} from '../../data/task';
import {TASKS, taskType} from '../../data/task.data';

let game;

const nextTask = (state) => {
  return Object.assign({}, state, {
    task: state.tasks.pop()
  });
};

const initGame = () => {
  const tasks = [...TASKS];

  game = Object.assign({}, INITIAL_GAME, {
    task: tasks.pop(),
    tasks
  });
};

const addAnswer = (state, answer) => {
  return Object.assign({}, state, {
    answers: [...state.answers, ...[answer]]
  });
};

const updateGame = (state) => {

  // Получение Задания
  const {task, answers} = state;
  const {type, title, questions} = task;

  // Создаем игровой экран
  const element = createElement(
      `${renderHeader(state)}
      <div class='game'>
          <p class='game__task'>${title}</p>
          <form class='game__content ${CONTENT_TYPE[type] || ``}'>
            ${renderQuestions(questions)}
          </form>
          <div class='stats'>
            ${getStats(answers)}
          </div>
        </div>`
  );

  // Элементы
  const content = element.querySelector(`.game__content`);
  const radioButtons = Array.from(element.querySelectorAll(`[type='radio']`));
  const options = Array.from(element.querySelectorAll(`.game__option`));

  // Сопоставление типа игры и типа ответов
  const answerControls = {
    [taskType.GUESS_ONE]: radioButtons,
    [taskType.GUESS_TWO]: radioButtons,
    [taskType.FIND]: options
  };

  const selectOption = (e) => {
    const option = e.target.closest(`.game__option`);

    if (!option) {
      return;
    }

    // clearAnswersSelection(option.parentNode.children);
    option.classList.add(`game__option--selected`);
  };

  content.addEventListener(EVENT[type], (e) => {
    if (type === taskType.FIND) {
      selectOption(e);
    }

    if (!getSelectedAnswers[type](answerControls[type], questions)) {
      return;
    }

    if (false) {
      state = die(state);
    }

    state = addAnswer(state, {isCorrect: true, time: 12});

    if (canContinue(state)) {
      changeView(updateGame(nextTask(state)));
    } else {
      changeView(renderResult(state));
    }
  });

  // Возвращаем dom - элементы
  return element;
};

export default () => {
  initGame();
  return updateGame(game);
};
