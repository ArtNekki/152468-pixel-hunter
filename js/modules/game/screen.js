import {TIMER_TIME} from '../../data/game-params';
import {changeView} from '../../util';
import renderHeader from '../header/screen';
import GameView from './view';
import Application from '../../Application';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this._interval = null;
  }

  get element() {
    return this.root;
  }

  startGame() {
    this.model.nextTask();
    this.updateGame();
    this.runTimer();
  }

  stopGame() {
    clearInterval(this._interval);
  }

  runTimer() {
    this._interval = setInterval(() => {
      this.model.tick();
      if (!this.model.state.timer) {
        this.stopGame();
        this.model.nextTask();
        this.runTimer();
        console.log('как такое возможно:???');
              console.log(this.model.state.timer);
      }
      this.updateGame();
    }, 1000);
  }

  updateGame() {
    this.header = renderHeader(this.model.state);
    this.game = new GameView(this.model.state);
    this.game.onAnswer = this.answer.bind(this);

    this.root = document.createDocumentFragment();
    this.root.appendChild(this.header);
    this.root.appendChild(this.game.element);

    changeView(this.element);
  }

  answer(correctAnswer) {
    if (!correctAnswer) {
      this.model.die();
    }

    this.model.addAnswer({isCorrect: correctAnswer, time: TIMER_TIME});

    if (this.model.canContinue()) {
      this.model.nextTask();
      this.updateGame();
    } else {
      Application.showResult(this.model.state);
    }
  }
}
