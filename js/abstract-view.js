import {createElement} from './util';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Абстрактный класс не может быть вызван сам по себе`);
    }
  }

  get template() {
    throw new Error(`Требуется шаблон`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }

    this._element = this.render();
    this.bind(this._element);

    return this._element;
  }

  render() {
    return createElement(this.template);
  }

  bind() {

  }

}
