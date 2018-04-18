import AbstractView from '../../../abstract-view';
import {calculateTotalGameScore} from './util';
import {Life, AnswerPoint, GAME_ROUNDS_COUNT, AnswerTime} from '../../../data/game-params';
import HeaderView from '../header/index';
import renderStats from '../../partials/stats/index';

// Сопоставление результата и заголовка
const resultToTitle = {
  [true]: `Победа!`,
  [false]: `Поражение!`
};

// Отрисовывает информацию по дополнительным баллам
const renderExtraPoints = ({answers, lives}) => {
  // Получаем список быстрых ответов
  const fastAnswers = answers.filter((answer) => {
    return (answer.time < AnswerTime.fast) && answer.isCorrect;
  });

  // Получаем список медленных ответов
  const slowAnswers = answers.filter((answer) => {
    return (answer.time > AnswerTime.slow) && answer.isCorrect;
  });

  // Список бонусов
  const extraPoints = [
    {
      type: `fast`,
      title: `Бонус за скорость:`,
      count: fastAnswers.length,
      points: fastAnswers.length * AnswerPoint.bonus
    },
    {
      type: `alive`,
      title: `Бонус за жизни:`,
      count: lives,
      points: lives * Life.bonus
    },
    {
      type: `slow`,
      title: `Штраф за медлительность:`,
      count: slowAnswers.length,
      points: slowAnswers.length * AnswerPoint.fine
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
};

export default class ResultView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    const {answers, lives} = this.state;

    // Определяем победа или поражение
    const isWin = answers.length === GAME_ROUNDS_COUNT;

    // Получаем список правильных ответов
    const correctAnswers = answers.filter((answer) => {
      return answer.isCorrect;
    });

    return `${new HeaderView().template}
      <div class='result'>
        <h1>${resultToTitle[isWin]}</h1>
        <table class='result__table'>
          <tr>
            <td class='result__number'>1.</td>
            <td colspan='2'>
              ${renderStats(answers)}
            </td>
            <td class='result__points'>${isWin ? `×&nbsp;100` : ``}</td>
            <td class='result__total ${!isWin ? `result__total--final` : ``}'>${isWin ? correctAnswers.length * AnswerPoint.default : `FAIL`}</td>
          </tr>
          ${isWin ? renderExtraPoints(this.state) : ``}
          <tr>
            <td colspan='5' class='result__total  result__total--final'>${isWin ? calculateTotalGameScore(answers, lives) : ``}</td>
          </tr>
        </table>
      </div>`;
  }
}
