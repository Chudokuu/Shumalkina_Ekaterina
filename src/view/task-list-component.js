import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate({title, status} ) {
  return (
    `<div class="column">
      <span class="task-title ${status}">${title}</span>
    </div>`
  );
}

export default class TaskListComponent {
  constructor({ title, status } = {}) {
    this.title = title;
    this.status = status;
  }

  getTemplate() {
    return createTaskListComponentTemplate({
      title: this.title,
      status: this.status,
    });
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
