import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListComponentTemplate({ title, status }) {
  return `<div class="column" data-status="${status}">
            <span class="task-title ${status}">${title}</span>
          </div>`;
}

export default class TaskListComponent extends AbstractComponent {
  #title = null;
  #status = null;
  #onTaskDrop = null;

  constructor({ title, status, onTaskDrop } = {}) {
    super();
    this.#title = title;
    this.#status = status;
    this.#onTaskDrop = onTaskDrop;
    this.#setDropHandlers();
  }

  get template() {
    return createTaskListComponentTemplate({
      title: this.#title,
      status: this.#status,
    });
  }

  #setDropHandlers() {
    this.element.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    this.element.addEventListener('drop', (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      const target = event.target.closest('.task');
      this.#onTaskDrop?.(taskId, this.#status, target);
    });
  }
}
