import IntroView from './view';

export default class IntroScreen {
  constructor() {
    this._view = new IntroView();
  }

  get element() {
    return this._view.element;
  }
}
