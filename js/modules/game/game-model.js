import {initialGame, Life, Time} from '../../settings';
import createTimer from '../../timer/';

export default class GameModel {
  constructor({data, playerName}) {
    this._playerName = playerName;
    this._data = data;
  }

  get player() {
    return this._playerName;
  }

  get state() {
    return this._state;
  }

  init() {
    this._state = Object.assign({}, initialGame, {
      questions: [...this._data]
    });
  }

  nextQuestion() {
    this._state = Object.assign({}, this._state, {
      question: this._state.questions.pop()
    });
    this._resetTime();
    this._timer = createTimer(this._state.time);
  }

  addAnswer(answer) {
    this._state = Object.assign({}, this._state, {
      answers: [...this._state.answers, {isCorrect: answer, time: Time.START - this._state.time}]
    });
  }

  die() {
    const lives = this._state.lives - 1;

    this._state = Object.assign({}, this._state, {
      lives
    });
  }

  isDead() {
    return this._state.lives <= Life.NONE;
  }

  hasNextQuestion() {
    return this._state.questions.length;
  }

  tick() {
    const result = this._timer.tick();

    this._state = Object.assign({}, this._state, {
      time: result.time
    });

    return result;
  }

  _resetTime() {
    this._state = Object.assign({}, this._state, {
      time: Time.START
    });
  }
}
