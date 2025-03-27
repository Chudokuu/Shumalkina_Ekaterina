import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate() {
  return (
    `<div class="column">
      <span class="task-title">Название блока</span>
    </div>`
  );
}

export default class TaskListComponent {
  getTemplate() {
    return createTaskListComponentTemplate();
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
