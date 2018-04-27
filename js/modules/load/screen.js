import LoadView from './view';

export default class LoadScreen {
  constructor(name) {
    this._view = new LoadView(name);
  }

  get element() {
    return this._view.element;
  }
}
