import {createElement, changeView} from '../../util';
import {INITIAL_GAME, TIMER_TIME} from '../../data/game-params';
import {TASKS, TaskType} from '../../data/structure';
import {ContentType, Event, Control, getCheckedControls, nextTask, addAnswer, selectImage, die, canContinue} from './util';
import renderHeader from '../header/index';
import renderQuestions from '../questions/index';
import getStats from '../stats/index';
import renderResult from '../result/index';

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
          <form class='game__content ${ContentType[type] || ``}'>
            ${renderQuestions(questions)}
          </form>
          <div class='stats'>
            ${getStats(answers)}
          </div>
        </div>`
  );

  const content = screen.querySelector(`.game__content`);
  const answerControls = Array.from(screen.querySelectorAll(Control[type]));

  content.addEventListener(Event[type], (e) => {
    const checkedAnswerControls = getCheckedControls(answerControls);

    if (!checkedAnswerControls.length || ((type === TaskType.GUESS_TWO)
        && checkedAnswerControls.length !== 2)) {
      return;
    }

    let correctAnswer;

    if (type === TaskType.FIND) {
      correctAnswer = selectImage(e);
    } else {
      correctAnswer = questions.every((question, i) => {
        return question.type === checkedAnswerControls[i].value;
      });
    }

    if (!correctAnswer) {
      state = die(state);
    }

    state = addAnswer(state, {isCorrect: correctAnswer, time: TIMER_TIME - timer});

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
