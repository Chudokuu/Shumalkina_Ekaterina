import { AbstractComponent } from '../framework/view/abstract-component.js';

function createDeleteButtonTemplate(disabled) {
  return `<button class="delete-button" ${disabled ? 'disabled' : ''}>✕ Очистить</button>`;
}

export default class DeleteButtonComponent extends AbstractComponent {
  #onClick = null;
  #disabled = false;

  constructor({ onClick, disabled = false }) {
    super();
    this.#onClick = onClick;
    this.#disabled = disabled;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createDeleteButtonTemplate(this.#disabled);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    if (!this.#disabled) {
      this.#onClick();
    }
  };
}
