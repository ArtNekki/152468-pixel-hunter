import RulesView from './rules-view';
import HeaderScreen from '../header/header-screen';
import Application from '../../Application';

export default class RulesScreen {
  constructor() {
    this._view = new RulesView();
    this._view.goNext = (name) => {
      Application.showGame(name);
    };
  }

  get element() {
    const element = this._view.element;
    element.prepend(new HeaderScreen().element);
    return element;
  }
}
