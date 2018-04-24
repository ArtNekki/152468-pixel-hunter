import {Time} from '../../data/game-params';
import headerView from '../header/screen';
import GameView from './view';
import Application from '../../Application';
import GameModel from './model';

export default class GameScreen {
  constructor(playerName) {
    this._model = new GameModel(playerName);

    this._header = headerView(this._model.state);
    this._root = document.createElement(`div`);
    this._root.appendChild(this._header.element);

    this._game = null;
    this._interval = null;
  }

  get element() {
    return this._root;
  }

  startGame() {
    this._model.nextTask();
    this._updateGame();
    this._runTimer();
  }

  stopGame() {
    clearInterval(this._interval);
  }

  _runTimer() {
    this._interval = setInterval(() => {
      if (this._model.tick().done) {
        this._answer();
      }
      this._updateTime();
    }, Time.frequency);
  }

  _updateTime() {
    this._header.changeTime(this._model.state);
  }

  _updateLives() {
    this._header.changeLives(this._model.state);
  }

  _updateGame() {
    this._updateTime();
    this._updateLives();

    const game = new GameView(this._model.state);
    const gameElement = game.element.children[0];

    if (this._game) {
      this._root.replaceChild(gameElement, this._game);
    } else {
      this._root.appendChild(gameElement);
    }

    this._game = gameElement;
    game.onAnswer = this._answer.bind(this);
  }

  _answer(correctAnswer = false) {
    this.stopGame();

    if (!correctAnswer) {
      this._model.die();
    }

    this._model.addAnswer(correctAnswer);

    if (this._model.canContinue()) {
      this.startGame();
    } else {
      this._finishGame();
    }
  }

  _finishGame() {
    Application.showResult(this._model.state);
  }
}
