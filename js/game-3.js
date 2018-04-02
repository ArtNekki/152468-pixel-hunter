import {getElementFromTemplate, changeView} from './util';
import renderStats from './stats';

const render = () => {
  // Генерируем Dom - элементы из шаблона
  const gameThree = getElementFromTemplate(
      `<template>
        <header class='header'>
          <div class='header__back'>
            <button class='back'>
              <img src='img/arrow_left.svg' width='45' height='45' alt='Back'>
              <img src='img/logo_small.svg' width='101' height='44'>
            </button>
          </div>
          <h1 class='game__timer'>NN</h1>
          <div class='game__lives'>
            <img src='img/heart__empty.svg' class='game__heart' alt='Life' width='32' height='32'>
            <img src='img/heart__full.svg' class='game__heart' alt='Life' width='32' height='32'>
            <img src='img/heart__full.svg' class='game__heart' alt='Life' width='32' height='32'>
          </div>
        </header>
        <div class='game'>
          <p class='game__task'>Найдите рисунок среди изображений</p>
          <form class='game__content  game__content--triple'>
            <div class='game__option'>
              <img src='http://placehold.it/304x455' alt='Option 1' width='304' height='455'>
            </div>
            <div class='game__option'>
              <img src='http://placehold.it/304x455' alt='Option 1' width='304' height='455'>
            </div>
            <div class='game__option'>
              <img src='http://placehold.it/304x455' alt='Option 1' width='304' height='455'>
            </div>
          </form>
          <div class='stats'>
            <ul class='stats'>
              <li class='stats__result stats__result--wrong'></li>
              <li class='stats__result stats__result--slow'></li>
              <li class='stats__result stats__result--fast'></li>
              <li class='stats__result stats__result--correct'></li>
              <li class='stats__result stats__result--wrong'></li>
              <li class='stats__result stats__result--unknown'></li>
              <li class='stats__result stats__result--slow'></li>
              <li class='stats__result stats__result--unknown'></li>
              <li class='stats__result stats__result--fast'></li>
              <li class='stats__result stats__result--unknown'></li>
            </ul>
          </div>
        </div>
      </template>`);

  // Добавляем логику работы
  const content = gameThree.querySelector(`.game__content`);
  const answers = Array.from(gameThree.querySelectorAll(`.game__option`));

  const clearAnswersSelection = () => {
    answers.forEach((answer) => {
      answer.classList.remove(`game__option--selected`);
    });
  };

  const getSelectedAnswers = () => {
    return answers.some(((answer) => {
      return answer.classList.contains(`game__option--selected`);
    }));
  };

  const selectAnswer = (e) => {
    const option = e.target.closest(`.game__option`);

    if (!option) {
      return;
    }

    clearAnswersSelection();
    option.classList.add(`game__option--selected`);

    if (!getSelectedAnswers()) {
      return;
    }

    changeView(renderStats());
  };

  content.addEventListener(`click`, selectAnswer);

  // Возвращаем dom - элементы
  return gameThree;
};

export default render;
