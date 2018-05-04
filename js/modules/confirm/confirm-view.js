import AbstractView from '../../abstract-view';

const Action = {
  OK: `ok`,
  CANCEL: `cancel`
};

export default class ConfirmView extends AbstractView {
  constructor(text) {
    super();
    this._text = text;
  }

  get template() {
    return `<div class='confirm'>
      <div class='confirm__body'>
        <p class='confirm__text'>${this._text}</p>
        <div class='confirm__actions'>
          <button class='btn' data-action='ok'>Ок</button>
          <button class='btn' data-action='cancel'>Отмена</button>
        </div>
      </div>
    </div>`;
  }

  bind() {
    this.element.querySelector(`.confirm`).addEventListener(`click`, (e) => {
      const action = e.target.dataset.action;

      if (action === Action.OK) {
        this.onOk();
      }

      if (action === Action.CANCEL) {
        this.onCancel();
      }
    });
  }

  onOk() {

  }

  onCancel() {

  }
}
