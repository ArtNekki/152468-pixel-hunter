import {createElement, changeView} from '../../util';
import {CONTENT_TYPE, EVENT, CONTROLS, getCheckedControls, nextTask, addAnswer, selectImage} from './game.util';
import renderHeader from '../header/index';
import renderQuestions from '../questions/index';
import getStats from '../stats/index';
import renderResult from '../result/index';
import {INITIAL_GAME, die, canContinue} from '../../data/task';
import {TASKS, taskType} from '../../data/task.data';

let game;

const initGame = () => {
  const tasks = [...TASKS];

  game = Object.assign({}, INITIAL_GAME, {
    task: tasks.pop(),
    tasks
  });
};

const updateGame = (state) => {

  // Получение Задания
  const {task, answers, timer} = state;
  const {type, title, questions} = task;

  // Создаем игровой экран
  const screen = createElement(
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
  const content = screen.querySelector(`.game__content`);
  const answerControls = Array.from(screen.querySelectorAll(CONTROLS[type]));

  content.addEventListener(EVENT[type], (e) => {
    const checkedAnswerControls = getCheckedControls(answerControls);

    if (!checkedAnswerControls.length || ((type === taskType.GUESS_TWO)
        && checkedAnswerControls.length !== 2)) {
      return;
    }

    let correctAnswer;

    if (type === taskType.FIND) {
      correctAnswer = selectImage(e);
    } else {
      correctAnswer = questions.every((question, i) => {
        return question.type === checkedAnswerControls[i].value;
      });
    }

    if (!correctAnswer) {
      state = die(state);
    }

    state = addAnswer(state, {isCorrect: correctAnswer, time: timer});

    if (canContinue(state)) {
      changeView(updateGame(nextTask(state)));
    } else {
      changeView(renderResult(state));
    }
  });

  // Возвращаем игровой экран
  return screen;
};

export default () => {
  initGame();
  return updateGame(game);
};
