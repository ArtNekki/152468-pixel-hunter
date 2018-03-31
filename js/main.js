(function () {
  const KEY_CODE = {
    left: 37,
    right: 39
  };

  const DIRECTION = {
    next: `next`,
    prev: `prev`
  };

  // if (`content` in document.createElement(`template`)) {
  //
  // }

  const screens = document.querySelectorAll(`template`);
  const container = document.body.querySelector(`.central`);
  const lastScreen = screens.length - 1;
  let currentScreen = 0;

  // Показывает экран в зависимости от переданного числа
  const showScreen = function (current) {
    const screen = screens[current];
    const screenContent = screen.content.cloneNode(true);

    container.innerHTML = ``;
    container.appendChild(screenContent);
  };

  // Показываем начальный экран
  showScreen(0);

  // Переход по экранам
  const navigate = function (dir) {
    if (dir === DIRECTION.next) {
      currentScreen = currentScreen < lastScreen ? currentScreen + 1 : 0;
    } else {
      currentScreen = currentScreen > 0 ? currentScreen - 1 : lastScreen;
    }

    showScreen(currentScreen);
  };

  document.addEventListener(`keydown`, (e) => {
    if ((e.keyCode === KEY_CODE.left) && e.altKey) {
      navigate(DIRECTION.next);
    } else if ((e.keyCode === KEY_CODE.right) && e.altKey) {
      navigate(DIRECTION.prev);
    }
  });
})();
