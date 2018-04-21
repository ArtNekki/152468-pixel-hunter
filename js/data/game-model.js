import {INITIAL_GAME, GAME_ROUNDS_COUNT} from './game-params';
import {TASKS} from './structure';
import createTimer from './timer';

export default class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.init();
    this.timer = createTimer(this._state.timer);
  }

  get state() {
    return this._state;
  }

  init() {
    const tasks = [...TASKS];

    this._state = Object.assign({}, INITIAL_GAME, {
      task: tasks.pop(),
      tasks
    });
  }

  nextTask() {
    this._state = Object.assign({}, this._state, {
      task: this._state.tasks.pop()
    });
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
    return this.timer.tick().time;
  }
}
