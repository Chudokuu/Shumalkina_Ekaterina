import { AbstractComponent } from '../framework/view/abstract-component.js';

function createDeleteButtonTemplate() {
  return `<button class="delete-button">✕ Очистить</button>`;
}

export default class DeleteButtonComponent extends AbstractComponent {
  get template() {
    return createDeleteButtonTemplate();
  }
}
