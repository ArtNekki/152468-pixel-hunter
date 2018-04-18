import showIntro from './modules/intro/screen';

document.addEventListener(`DOMContentLoaded`, () => {
  showIntro();
  // Если в разметке есть кнопка, для возврата назад, то при нажатии на нее
  // возвращаемся на первый экран
  document.addEventListener(`click`, (e) => {
    const goHomeButton = e.target.closest(`.back`);

    if (!goHomeButton) {
      return;
    }

    showIntro();
  });
});
