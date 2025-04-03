import { createElement } from '../framework/render.js';

function createNewTaskComponentTemplate() {
  return (
    `<div class="new-task_container">
      <h2 class="new-task_title">Новая задача</h2>
      <div class="new-task_input_container">
        <input type="text" class="new-task_input" placeholder="Новая задача...">
        <button class="new-task_button">+ Добавить</button>
      </div>
    </div>`
  );
}

export default class NewTaskComponent {
  getTemplate() {
    return createNewTaskComponentTemplate();
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
