import AbstractView from '../../abstract-view';
import renderStats from '../../partials/stats/index';
import {calculateTotalGameScore} from './util';
import {AnswerPoint, AnswerTime, Life} from '../../settings';

export default class ResultTableView extends AbstractView {
  constructor({answers, lives}) {
    super();
    this._answers = answers;
    this._lives = lives;
  }

  _isWin() {
    return (this._answers.length - this.correctAnswers.length) <= Life.COUNT;
  }

  get correctAnswers() {
    return this._answers.filter((answer) => {
      return answer.isCorrect;
    });
  }

  get fastAnswers() {
    return this._answers.filter((answer) => {
      return (answer.time < AnswerTime.FAST) && answer.isCorrect;
    });
  }

  get slowAnswers() {
    return this._answers.filter((answer) => {
      return (answer.time > AnswerTime.SLOW) && answer.isCorrect;
    });
  }

  get template() {
    return `
      <table class='result__table'>
        <tr>
          <td class='result__number'>1</td>
          <td colspan='2'>
            ${renderStats(this._answers)}
          </td>
          <td class='result__points'>${this._isWin() ? `×&nbsp;100` : ``}</td>
          <td class='result__total ${!this._isWin() ? `result__total--final` : ``}'>${this._isWin() ? this.correctAnswers.length * AnswerPoint.DEFAULT : `FAIL`}</td>
        </tr>
        ${this._isWin() && this.fastAnswers.length ? `<tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${this.fastAnswers.length}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${this.fastAnswers.length * AnswerPoint.BONUS}</td>
        </tr>` : ``}
        ${this._isWin() && this._lives ? `<tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${this._lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${this._lives * Life.BONUS}</td>
        </tr>` : ``}
        ${this._isWin() && this.slowAnswers.length ? `<tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${this.slowAnswers.length}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${this.slowAnswers.length * AnswerPoint.FINE}</td>
        </tr>` : ``}
        <tr>
          <td colspan='5' class='result__total  result__total--final'>${this._isWin() ? calculateTotalGameScore(this._answers, this._lives) : ``}</td>
        </tr>
      </table>
      `;
  }
}
