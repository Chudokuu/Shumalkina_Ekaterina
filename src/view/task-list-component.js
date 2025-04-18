import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListComponentTemplate({ title, status }) {
  return `<div class="column">
            <span class="task-title ${status}">${title}</span>
          </div>`;
}

export default class TaskListComponent extends AbstractComponent {
  #title = null;
  #status = null;

  constructor({ title, status } = {}) {
    super();
    this.#title = title;
    this.#status = status;
  }

  get template() {
    return createTaskListComponentTemplate({
      title: this.#title,
      status: this.#status,
    });
  }
}
