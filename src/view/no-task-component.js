import { AbstractComponent } from '../framework/view/abstract-component.js';

function createNoTaskComponentTemplate() {
  return `<div class="no-task">
            <p>Перетащите карточку</p>
          </div>`;
}

export default class NoTaskComponent extends AbstractComponent {
  get template() {
    return createNoTaskComponentTemplate();
  }
}
