import {Time} from '../../settings';
import headerView from '../header/screen';
import GameView from './view';
import Application from '../../Application';
import GameModel from './model';

export default class GameScreen {
  constructor(data) {
    this._model = new GameModel(data);
  }

  get element() {
    return this._root;
  }

  startGame() {
    // Активируем начальные данные модели
    this._model.init();

    //
    this._root = document.createElement(`div`);
    this._header = headerView(this._model.state);
    this._root.appendChild(this._header.element);

    // Обновляем данные игры
    this._updateGameData();
  }

  _stopTimer() {
    clearInterval(this._interval);
  }

  _runTimer() {
    this._interval = setInterval(() => {
      if (this._model.tick().done) {
        this._onAnswer(false);
      }
      this._updateTime();
    }, Time.FREQUENCY);
  }

  _updateTime() {
    this._header.changeTime(this._model.state);
  }

  _updateLives() {
    this._header.changeLives(this._model.state);
  }

  _updateGameData() {
    // Получаем задание
    this._model.nextTask();
    // Запускаем таймер
    this._runTimer();
    // Обновляем время
    this._updateTime();
    // Обновляем жизни
    this._updateLives();

    // Обновляем gameView
    const game = new GameView(this._model.state);
    const gameElement = game.element.children[0];

    if (this._game) {
      this._root.replaceChild(gameElement, this._game);
    } else {
      this._root.appendChild(gameElement);
    }

    this._game = gameElement;
    game.onAnswer = this._onAnswer.bind(this);
  }

  _onAnswer(answer) {
    this._stopTimer();

    this._model.addAnswer(answer);

    if ((this._model.isDead() && !answer) || !this._model.hasNextTask()) {
      this._finishGame();
      return;
    }

    if (!answer) {
      this._model.die();
    }

    this._updateGameData();
  }

  _finishGame() {
    Application.finish(this._model);
  }
}
