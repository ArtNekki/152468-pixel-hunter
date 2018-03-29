(function () {
  const Move = {
    left: 37,
    right: 39
  };

  class Screens {

    constructor() {
      this._init();
    }

    _init() {
      this._currentScreen = 0;
      this._screens = document.querySelectorAll(`template`);
      this._container = document.body.querySelector(`.central`);
      this._showScreen(this._currentScreen);
    }

    navigate(dir) {
      const lastScreen = this._screens.length - 1;

      if (dir === `next`) {
        this._currentScreen = this._currentScreen < lastScreen ? this._currentScreen + 1 : 0;
      } else {
        this._currentScreen = this._currentScreen > 0 ? this._currentScreen - 1 : lastScreen;
      }

      this._showScreen(this._currentScreen);
    }

    _showScreen(current) {
      const screen = this._screens[current];
      const screenContent = screen.content.cloneNode(true);

      this._container.innerHTML = ``;
      this._container.appendChild(screenContent);

    }
  }

  if (`content` in document.createElement(`template`)) {
    const screens = new Screens();

    document.addEventListener(`keydown`, (e) => {
      if ((e.keyCode === Move.left) && e.altKey) {
        screens.navigate(`prev`);
      } else if ((e.keyCode === Move.right) && e.altKey) {
        screens.navigate(`next`);
      }
    });
  }
})();
