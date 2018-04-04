import {getElementFromTemplate, changeView} from '../../util';
import renderGreeting from '../greeting';

// Получаем documentFragment с dom-узлами из шаблона
const documentFragmentBase = getElementFromTemplate(
    `<template>
      <div id='intro' class='intro'>
        <h1 class='intro__asterisk'>*</h1>
        <p class='intro__motto'><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </div>
    </template>`
);

export default () => {
  const documentFragment = documentFragmentBase.cloneNode(true);

  // Добавляем логику работы
  const goNextButton = documentFragment.querySelector(`.intro__asterisk`);

  goNextButton.addEventListener(`click`, () => {
    changeView(renderGreeting());
  });

  // Возвращаем dom - элементы
  return documentFragment;
};
