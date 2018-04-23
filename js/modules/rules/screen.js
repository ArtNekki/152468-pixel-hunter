import RulesView from './view';
import Application from '../../Application';

export default class RulesScreen {
  constructor() {
    this._view = new RulesView();
    this._view.goNext = (name) => {
      Application.showGame(name);
    };
  }

  get element() {
    return this._view.element;
  }
}
