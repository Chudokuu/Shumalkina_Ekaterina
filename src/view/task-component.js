import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate({ title, status }) {
  return `<div class="task task-${status}" draggable="true">${title}</div>`;
}

export default class TaskComponent extends AbstractComponent {
  #task = null;

  constructor({ task }) {
    super();
    this.#task = task;
    this.#makeDraggable();
  }

  get template() {
    return createTaskComponentTemplate(this.#task);
  }

  #makeDraggable() {
    this.element.dataset.taskId = this.#task.id;

    this.element.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.#task.id);
    });
  }
}
