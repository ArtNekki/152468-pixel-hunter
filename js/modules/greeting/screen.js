import GreetingView from './view';
import Application from '../../Application';

export default class GreetingScreen {
  constructor() {
    this._view = new GreetingView();
    this._view.goNext = () => {
      Application.showRules();
    };
  }

  get element() {
    return this._view.element;
  }
}
