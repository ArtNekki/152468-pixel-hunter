import {Time} from '../../data/game-params';
import headerView from '../header/screen';
import GameView from './view';
import Application from '../../Application';

export default class GameScreen {
  constructor(model) {
    this.model = model;

    this.header = headerView(this.model.state);
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);

    this.game = null;
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
      if (!this.model.time) {
        this.answer();
      }
      this.updateTime();
    }, Time.frequency);
  }

  updateTime() {
    this.header.changeTime(this.model.time);
  }

  updateLives() {
    this.header.changeLives(this.model.state.lives);
  }

  updateGame() {
    this.updateTime();
    this.updateLives();

    const game = new GameView(this.model.state);
    const gameElement = game.element.children[0];

    if (this.game) {
      this.root.replaceChild(gameElement, this.game);
    } else {
      this.root.appendChild(gameElement);
    }

    this.game = gameElement;
    game.onAnswer = this.answer.bind(this);
  }

  answer(correctAnswer = false) {
    this.stopGame();

    if (!correctAnswer) {
      this.model.die();
    }

    this.model.addAnswer(correctAnswer);

    if (this.model.canContinue()) {
      this.startGame();
    } else {
      Application.showResult(this.model.state);
    }
  }
}
