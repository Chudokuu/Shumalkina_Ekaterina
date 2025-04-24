import { AbstractComponent } from '../framework/view/abstract-component.js';

function createNewTaskComponentTemplate() {
  return `<form class="new-task_container">
            <h2 class="new-task_title">Новая задача</h2>
            <div class="new-task_input_container">
              <input type="text" class="new-task_input" placeholder="Новая задача..." id="add-task">
              <button type="submit" class="new-task_button">+ Добавить</button>
            </div>
          </form>`;
}

export default class NewTaskComponent extends AbstractComponent {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#clickHandler);
  }

  get template() {
    return createNewTaskComponentTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
