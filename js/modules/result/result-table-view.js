import AbstractView from '../../abstract-view';
import renderStats from '../../partials/stats/index';
import {calculateTotalGameScore} from './util';
import {AnswerPoint, AnswerTime, Life} from '../../settings';

export default class ResultTableView extends AbstractView {
  constructor({answers, lives}, position) {
    super();
    this._answers = answers;
    this._lives = lives;
    this._position = position;

    this._correctAnswers = answers.filter((answer) => {
      return answer.isCorrect;
    });

    this._fastAnswers = answers.filter((answer) => {
      return (answer.time < AnswerTime.FAST) && answer.isCorrect;
    });

    this._slowAnswers = answers.filter((answer) => {
      return (answer.time > AnswerTime.SLOW) && answer.isCorrect;
    });

    this._isWin = (answers.length - this._correctAnswers.length) <= Life.COUNT;
  }

  get template() {
    return `
      <table class='result__table'>
        <tr>
          <td class='result__number'>${this._position}.</td>
          <td colspan='2'>
            ${renderStats(this._answers)}
          </td>
          <td class='result__points'>${this._isWin ? `×&nbsp;100` : ``}</td>
          <td class='result__total ${!this._isWin ? `result__total--final` : ``}'>${this._isWin ? this._correctAnswers.length * AnswerPoint.DEFAULT : `FAIL`}</td>
        </tr>
        ${this._isWin && this._fastAnswers.length ? `<tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${this._fastAnswers.length}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${this._fastAnswers.length * AnswerPoint.BONUS}</td>
        </tr>` : ``}
        ${this._isWin && this._lives ? `<tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${this._lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${this._lives * Life.BONUS}</td>
        </tr>` : ``}
        ${this._isWin && this._slowAnswers.length ? `<tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${this._slowAnswers.length}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${this._slowAnswers.length * AnswerPoint.FINE}</td>
        </tr>` : ``}
        <tr>
          <td colspan='5' class='result__total  result__total--final'>${this._isWin ? calculateTotalGameScore(this._answers, this._lives) : ``}</td>
        </tr>
      </table>
      `;
  }
}
