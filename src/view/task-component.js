import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate({ title, status }) {
  return `<div class="task task-${status}">${title}</div>`;
}

export default class TaskComponent extends AbstractComponent {
  #task = null;

  constructor({ task }) {
    super();
    this.#task = task;
  }

  get template() {
    return createTaskComponentTemplate(this.#task);
  }
}
