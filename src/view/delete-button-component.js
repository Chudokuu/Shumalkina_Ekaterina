
import { createElement } from '../framework/render.js';

function createDeleteButtonTemplate() {
  return `<button class="delete-button">✕ Очистить</button>`;
}

export default class DeleteButtonComponent {
  getTemplate() {
    return createDeleteButtonTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
