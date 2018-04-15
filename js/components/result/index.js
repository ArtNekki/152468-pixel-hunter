import {createElement} from '../../util';
import {calculateTotalGameScore, LIFE_BONUS, ANSWER_POINT} from '../../data/game-score';
import renderHeader from '../header/index';
import renderStats from '../stats/index';

// Отрисовывает бунусы
const renderBonusList = (bonusList) => {
  return bonusList.map((it) => {
    return `<tr>
              <td></td>
              <td class='result__extra'>${it.title}</td>
              <td class='result__extra'>${it.count}&nbsp;<span class='stats__result stats__result--${it.type}'></span></td>
              <td class='result__points'>×&nbsp;50</td>
              <td class='result__total'>${it.points}</td>
            </tr>`;
  }).join(``);
};

// Отрисовка общей статистики
export default (state) => {
  const {answers, lives} = state;

  const fastAnswers = answers.filter((answer) => {
    return answer.time < 10;
  });

  const slowAnswers = answers.filter((answer) => {
    return answer.time > 22;
  });

  const bonusList = [
    {
      type: `fast`,
      title: `Бонус за скорость:`,
      count: fastAnswers.length,
      points: fastAnswers.length * ANSWER_POINT.bonus
    },
    {
      type: `alive`,
      title: `Бонус за жизни:`,
      count: lives,
      points: lives * LIFE_BONUS
    },
    {
      type: `slow`,
      title: `Штраф за медлительность:`,
      count: slowAnswers.length,
      points: slowAnswers.length * ANSWER_POINT.fine
    }
  ];

  const element = createElement(
      `${renderHeader()}
        <div class='result'>
          <h1>Победа!</h1>
          <table class='result__table'>
            <tr>
              <td class='result__number'>1.</td>
              <td colspan='2'>
                ${renderStats(answers)}
              </td>
              <td class='result__points'>×&nbsp;100</td>
              <td class='result__total'>${answers.length * ANSWER_POINT.default}</td>
            </tr>
            ${renderBonusList(bonusList)}
            <tr>
              <td colspan='5' class='result__total  result__total--final'>${calculateTotalGameScore(answers, lives)}</td>
            </tr>
          </table>
        </div>`
  );

  // Возвращаем dom - элементы
  return element;
};
