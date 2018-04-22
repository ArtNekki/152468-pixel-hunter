import {INITIAL_GAME, GAME_ROUNDS_COUNT, TIMER_TIME} from './game-params';
import {TASKS} from './structure';
import createTimer from './timer';

export default class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.init();
  }

  get state() {
    return this._state;
  }

  init() {
    this._state = Object.assign({}, INITIAL_GAME, {
      tasks: [...TASKS]
    });
  }

  nextTask() {
    this._state = Object.assign({}, this._state, {
      task: this._state.tasks.pop()
    });
    this.resetTime();
    this.timer = createTimer(this._state.timer);
  }

  addAnswer(answer) {
    this._state = Object.assign({}, this._state, {
      answers: [...this._state.answers, ...[answer]]
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

  tick() {
    const result = this.timer.tick();

    this._state = Object.assign({}, this._state, {
      timer: result.time
    });

    return result;
  }

  resetTime() {
    this._state = Object.assign({}, this._state, {
      timer: TIMER_TIME
    });
  }
}
