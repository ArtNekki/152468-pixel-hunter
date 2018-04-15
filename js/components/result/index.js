import {createElement} from '../../util';
import {calculateTotalGameScore, LIFE_BONUS, ANSWER_POINT, ANSWERS_COUNT, ANSWER_TIME} from '../../data/game-score';
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

  // Определяем победа или поражение
  const isWin = answers.length === ANSWERS_COUNT;

  // Получаем список быстрых ответов
  const fastAnswers = answers.filter((answer) => {
    return answer.time < ANSWER_TIME.fast;
  });

  // Получаем список медленных ответов
  const slowAnswers = answers.filter((answer) => {
    return answer.time > ANSWER_TIME.slow;
  });

  // Получаем список правильных ответов
  const correctAnswers = answers.filter((answer) => {
    return answer.isCorrect;
  });

  // Заголовок результата
  const RESULT_TITLE = {
    [true]: `Победа!`,
    [false]: `Поражение!`
  };

  // Список бонусов
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
          <h1>${RESULT_TITLE[isWin]}</h1>
          <table class='result__table'>
            <tr>
              <td class='result__number'>1.</td>
              <td colspan='2'>
                ${renderStats(answers)}
              </td>
              <td class='result__points'>${isWin ? `×&nbsp;100` : ``}</td>
              <td class='result__total ${!isWin ? `result__total--final` : ``}'>${isWin ? correctAnswers.length * ANSWER_POINT.default : `FAIL`}</td>
            </tr>
            ${isWin ? renderBonusList(bonusList) : ``}
            <tr>
              <td colspan='5' class='result__total  result__total--final'>${isWin ? calculateTotalGameScore(answers, lives) : ``}</td>
            </tr>
          </table>
        </div>`
  );

  // Возвращаем dom - элементы
  return element;
};
