import { AbstractComponent } from '../framework/view/abstract-component.js';

function createNewTaskComponentTemplate() {
  return `<div class="new-task_container">
            <h2 class="new-task_title">Новая задача</h2>
            <div class="new-task_input_container">
              <input type="text" class="new-task_input" placeholder="Новая задача...">
              <button class="new-task_button">+ Добавить</button>
            </div>
          </div>`;
}

export default class NewTaskComponent extends AbstractComponent {
  get template() {
    return createNewTaskComponentTemplate();
  }
}
