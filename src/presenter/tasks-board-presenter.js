
import TaskBoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import DeleteButtonComponent from '../view/delete-button-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';

export default class TaskBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #taskBoardComponent = new TaskBoardComponent();
  #tasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#tasks = [...this.#tasksModel.getTasks()];

    render(this.#taskBoardComponent, this.#boardContainer);

    const statuses = Object.values(Status);

    statuses.forEach((status) => {
      const taskListComponent = new TaskListComponent({ title: StatusLabel[status], status });
      render(taskListComponent, this.#taskBoardComponent.getElement());
        
      this.#tasks
        .filter((task) => task.status === status)
        .forEach((task) => {
          const taskComponent = new TaskComponent({ task });
          render(taskComponent, taskListComponent.getElement());
        });

        if (status === Status.TRASH) {
            const deleteButton = new DeleteButtonComponent();
            render(deleteButton, taskListComponent.getElement());
        }
    });
  }
}
