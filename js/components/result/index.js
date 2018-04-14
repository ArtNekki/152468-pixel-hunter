import createElement from '../../util';
import renderHeader from '../header/index';
import renderStats from '../stats/index';

export default (data) => {

  const element = createElement(
      `${renderHeader()}
        <div class='result'>
          <h1>Победа!</h1>
          <table class='result__table'>
            <tr>
              <td class='result__number'>1.</td>
              <td colspan='2'>
                ${renderStats(data.stats)}
              </td>
              <td class='result__points'>×&nbsp;100</td>
              <td class='result__total'>900</td>
            </tr>
            <tr>
              <td></td>
              <td class='result__extra'>Бонус за скорость:</td>
              <td class='result__extra'>1&nbsp;<span class='stats__result stats__result--fast'></span></td>
              <td class='result__points'>×&nbsp;50</td>
              <td class='result__total'>50</td>
            </tr>
            <tr>
              <td></td>
              <td class='result__extra'>Бонус за жизни:</td>
              <td class='result__extra'>2&nbsp;<span class='stats__result stats__result--alive'></span></td>
              <td class='result__points'>×&nbsp;50</td>
              <td class='result__total'>100</td>
            </tr>
            <tr>
              <td></td>
              <td class='result__extra'>Штраф за медлительность:</td>
              <td class='result__extra'>2&nbsp;<span class='stats__result stats__result--slow'></span></td>
              <td class='result__points'>×&nbsp;50</td>
              <td class='result__total'>-100</td>
            </tr>
            <tr>
              <td colspan='5' class='result__total  result__total--final'>950</td>
            </tr>
          </table>
        </div>
      </template>`
  );

  // Возвращаем dom - элементы
  return element;
};