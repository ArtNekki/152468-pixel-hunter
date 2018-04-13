import {createElement, changeView} from '../../util';
import renderHeader from '../header/index';
import renderQuestions from '../questions/index';
import renderStats from '../stats/index';

const CONTENT_TYPE = {
  1: `game__content--wide`,
  3: `game__content--triple`
};

export default (data) => {
  const questions = data.game.questions;
  const answers = data.game.answers;

  const element = createElement(
      `${renderHeader(data)}
      <div class='game'>
          <p class='game__task'>${data.game.title}</p>
          <form class='game__content ${CONTENT_TYPE[questions.length] || ``}'>
            ${renderQuestions(questions)}
          </form>
          <div class='stats'>
            ${renderStats(data.stats)}
          </div>
        </div>`
  );

  // Добавляем логику работы - больше это не работает))
  const REQUIRED_ANSWERS_COUNT = 2;
  const content = element.querySelector(`.game__content`);
  // const answers = Array.from(element.querySelectorAll(`[type='radio']`));

  const getSelectedAnswers = () => {
    const result = answers.filter(((answer) => {
      return answer.checked;
    }));

    return result.length === REQUIRED_ANSWERS_COUNT;
  };

  content.addEventListener(`change`, () => {
    if (!getSelectedAnswers()) {
      return;
    }

    changeView();
  });

  // Возвращаем dom - элементы
  return element;
};
