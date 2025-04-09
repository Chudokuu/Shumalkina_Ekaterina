import TaskBoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import DeleteButtonComponent from '../view/delete-button-component.js';
import NoTaskComponent from '../view/no-task-component.js';
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
    this.#tasks = [...this.#tasksModel.tasks];
    this.#renderBoard();
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task });
    render(taskComponent, container);
  }

  #renderTasksList(status, tasks, container) {
    const taskListComponent = new TaskListComponent({ title: StatusLabel[status], status });
    render(taskListComponent, container);

    if (tasks.length === 0) {
      const noTaskComponent = new NoTaskComponent({ status });
      render(noTaskComponent, taskListComponent.element);
    } else {
      tasks.forEach((task) => {
        this.#renderTask(task, taskListComponent.element);
      });
    }

    if (status === Status.TRASH) {
      const deleteButton = new DeleteButtonComponent();
      render(deleteButton, taskListComponent.element);
    }
  }

  #renderBoard() {
    render(this.#taskBoardComponent, this.#boardContainer);
    Object.values(Status).forEach((status) => {
      const tasksForStatus = this.#tasks.filter((task) => task.status === status);
      this.#renderTasksList(status, tasksForStatus, this.#taskBoardComponent.element);
    });
  }
}
