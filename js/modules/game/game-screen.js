import {Time} from '../../settings';
import HeaderScreen from '../header/header-screen';
import GameView from './game-view';
import GameModel from './game-model';
import Application from '../../Application';

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
    this._header = new HeaderScreen(this._model.state, this.stopTimer.bind(this));
    this._root.appendChild(this._header.element);

    // Обновляем данные игры
    this._updateGameData();
  }

  _updateTime() {
    this._header.view.changeTime(this._model.state);
  }

  _updateLives() {
    this._header.view.changeLives(this._model.state);
  }

  _updateGameData() {
    // Получаем задание
    this._model.nextQuestion();
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

  _finishGame() {
    Application.finish(this._model);
  }

  _runTimer() {
    this._interval = setInterval(() => {
      if (this._model.tick().done) {
        this._onAnswer(false);
      }

      this._updateTime();
    }, Time.FREQUENCY);
  }

  stopTimer() {
    clearInterval(this._interval);
  }

  _onAnswer(answer) {
    this.stopTimer();

    this._model.addAnswer(answer);

    if ((!this._model.isDead() && !answer) && !this._model.hasNextQuestion()) {
      this._model.die();
    }

    if ((this._model.isDead() && !answer) || !this._model.hasNextQuestion()) {
      this._finishGame();
      return;
    }

    if (!answer) {
      this._model.die();
    }

    this._updateGameData();
  }
}
