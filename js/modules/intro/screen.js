import IntroView from './view';
import Application from '../../Application';

export default class IntroScreen {
  constructor() {
    this._view = new IntroView();
    this._view.goNext = () => {
      Application.showGreeting();
    };
  }

  get element() {
    return this._view.element;
  }
}
