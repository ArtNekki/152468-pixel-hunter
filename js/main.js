(function () {
  const KEY_CODE = {
    left: 37,
    right: 39
  };

  const DIRECTION = {
    next: `next`,
    prev: `prev`
  };

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

  // Переход по экранам
  const navigate = function (dir) {
    if (dir === DIRECTION.next) {
      currentScreen = currentScreen < lastScreen ? currentScreen + 1 : 0;
    } else {
      currentScreen = currentScreen > 0 ? currentScreen - 1 : lastScreen;
    }

    showScreen(currentScreen);
  };

  // Показываем начальный экран
  showScreen(0);

  document.addEventListener(`keydown`, (e) => {
    if (!e.altKey) {
      return;
    }

    if (e.keyCode !== KEY_CODE.left && e.keyCode !== KEY_CODE.right) {
      return;
    }

    navigate(e.keyCode === KEY_CODE.left ? DIRECTION.prev : DIRECTION.next);
  });
})();
