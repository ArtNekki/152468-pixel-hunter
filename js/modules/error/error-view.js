import AbstractView from '../../abstract-view.js';

export default class ErrorView extends AbstractView {
  constructor(error) {
    super();
    this._error = error;
  }

  get template() {
    return `<article class='error'>
      <p class='error__message'>${this._error.message}</p>
    </article>`;
  }
}
