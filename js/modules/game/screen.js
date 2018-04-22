import {Time} from '../../data/game-params';
import {changeView} from '../../util';
import headerView from '../header/screen';
import GameView from './view';
import Application from '../../Application';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this._interval = null;

    this.header = headerView(this.model.state);

    this.game = new GameView(this.model.state);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.game.element);
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
    // const game = new GameView(this.model.state).element.children[0];
    // game.onAnswer = this.answer.bind(this);
    // this.root.replaceChild(game, this.game.children[0]);
    //
    // this.game = game;
  }

  answer(correctAnswer = false) {
    this.stopGame();

    if (!correctAnswer) {
      this.model.die();
      this.updateLives();
    }

    this.model.addAnswer({isCorrect: correctAnswer, time: Time.start});

    if (this.model.canContinue()) {
      this.startGame();
    } else {
      Application.showResult(this.model.state);
    }
  }
}
