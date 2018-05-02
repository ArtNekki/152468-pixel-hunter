import AbstractView from '../../abstract-view';
// import {formatDate} from '../../util';
import {calculateTotalGameScore} from './util';
import {Life, AnswerPoint, GAME_ROUNDS_COUNT, AnswerTime} from '../../settings';
import renderStats from '../../partials/stats/index';

// Сопоставление результата и заголовка
const resultToTitle = {
  [true]: `Победа`,
  [false]: `Поражение`
};

export default class ResultView extends AbstractView {
  constructor({result, player}) {
    super();
    this._state = result;
    this._player = player;
  }

  _renderExtraPoints({answers, lives}) {
    // Получаем список быстрых ответов
    const fastAnswers = answers.filter((answer) => {
      return (answer.time < AnswerTime.FAST) && answer.isCorrect;
    });

    // Получаем список медленных ответов
    const slowAnswers = answers.filter((answer) => {
      return (answer.time > AnswerTime.SLOW) && answer.isCorrect;
    });

    // Список бонусов
    const extraPoints = [
      {
        type: `fast`,
        title: `Бонус за скорость:`,
        count: fastAnswers.length,
        points: fastAnswers.length * AnswerPoint.BONUS
      },
      {
        type: `alive`,
        title: `Бонус за жизни:`,
        count: lives,
        points: lives * Life.BONUS
      },
      {
        type: `slow`,
        title: `Штраф за медлительность:`,
        count: slowAnswers.length,
        points: slowAnswers.length * AnswerPoint.FINE
      }
    ];

    return extraPoints.map((it) => {
      return `<tr>
                <td></td>
                <td class='result__extra'>${it.title}</td>
                <td class='result__extra'>${it.count}&nbsp;<span class='stats__result stats__result--${it.type}'></span></td>
                <td class='result__points'>×&nbsp;50</td>
                <td class='result__total'>${it.points}</td>
              </tr>`;
    }).join(``);
  }

  _renderResultTable({answers, lives}, i) {

    // Определяем победа или поражение
    const isWin = (lives > 0) && (answers.length === GAME_ROUNDS_COUNT);

    // Получаем список правильных ответов
    const correctAnswers = answers.filter((answer) => {
      return answer.isCorrect;
    });

    return `
      ${i === 1 ? `<h3 class='result__title--archieve'>Ваши прошлые результаты:</h3>` : ``}
      <table class='result__table'>
        <tr>
          <td class='result__number'>${(i > 0) ? `${i}.` : ``}</td>
          <td colspan='2'>
            ${renderStats(answers)}
          </td>
          <td class='result__points'>${isWin ? `×&nbsp;100` : ``}</td>
          <td class='result__total ${!isWin ? `result__total--final` : ``}'>${isWin ? correctAnswers.length * AnswerPoint.DEFAULT : `FAIL`}</td>
        </tr>
        ${isWin ? this._renderExtraPoints({answers, lives}) : ``}
        <tr>
          <td colspan='5' class='result__total  result__total--final'>${isWin ? calculateTotalGameScore(answers, lives) : ``}</td>
        </tr>
      </table>
      `;
  }

  _renderResult(results) {
    return results.map((result, i) => {
      return this._renderResultTable(result, i);
    }).join(``);
  }

  _formatTitle(isWin) {
    return `Это ${resultToTitle[isWin]}, ${this._player}!`;
  }

  get template() {
    const results = this._state.reverse();
    // const isWin = (lives > 0) && (answers.length === GAME_ROUNDS_COUNT);

    return `<div class='result'>

              ${this._renderResult(results)}
            </div>`;
  }
}
