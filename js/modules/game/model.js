import {INITIAL_GAME, GAME_ROUNDS_COUNT, Time} from '../../settings';
import createTimer from '../../timer/timer';

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
    this._state = Object.assign({}, INITIAL_GAME, {
      tasks: [...this._data]
    });
  }

  nextTask() {
    this._state = Object.assign({}, this._state, {
      task: this._state.tasks.pop()
    });
    this._resetTime();
    this._timer = createTimer(this._state.time);
  }

  addAnswer(answer) {
    this._state = Object.assign({}, this._state, {
      answers: [...this._state.answers, {isCorrect: answer, time: Time.start - this._state.time}]
    });
  }

  die() {
    const lives = this._state.lives - 1;

    this._state = Object.assign({}, this._state, {
      lives
    });
  }

  canContinue() {
    const {lives, answers} = this._state;
    return (lives > -1) && answers.length < GAME_ROUNDS_COUNT;
  }

  isDead() {
    return this._state.lives <= 0;
  }

  hasNextTask() {
    return this._state.tasks.length;
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
      time: Time.start
    });
  }
}
