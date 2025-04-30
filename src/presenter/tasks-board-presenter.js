import TaskBoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import DeleteButtonComponent from '../view/delete-button-component.js';
import NoTaskComponent from '../view/no-task-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel, UserAction, UpdateType } from '../const.js';

export default class TaskBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #taskBoardComponent = new TaskBoardComponent();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));
  }

  async init() {
    await this.#tasksModel.init();
    this.#clearBoard();
    this.#renderBoard();
  }

  createTask() {
    this.#tasksModel.addTask(document.querySelector('#add-task').value.trim());
    document.querySelector('#add-task').value = '';
  }

  #renderTask(task, container) {
    const comp = new TaskComponent({task});
    render(comp, container);
  }

  #renderTasksList(status, tasks, container) {
    const list = new TaskListComponent({
      title: StatusLabel[status],
      status,
      onTaskDrop: this.#handleTaskDrop.bind(this)
    });
    render(list, container);

    if (tasks.length === 0) {
      render(new NoTaskComponent({ status }), list.element);
    } else {
      tasks.forEach(task => this.#renderTask(task, list.element));
    }

    if (status === Status.TRASH) {
      this.#renderClearButton(list.element);
    }
  }

  #clearBoard() {
    this.#taskBoardComponent.element.innerHTML = '';
  }

  #renderBoard() {
    render(this.#taskBoardComponent, this.#boardContainer);
    Object.values(Status).forEach(status => {
      const tasks = this.#tasksModel.tasks.filter(t => t.status === status);
      this.#renderTasksList(status, tasks, this.#taskBoardComponent.element);
    });
  }

  #handleModelEvent(event, payload) {
    switch(event) {
      case UpdateType.INIT:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  }

  #renderClearButton(container) {
    const disabled = !this.#tasksModel.hasTrashTasks();
    const button = new DeleteButtonComponent({
      onClick: () => this.#tasksModel.clearTrash(),
      disabled
    });
    render(button, container);
  }

  #handleTaskDrop(taskId, newStatus, targetElement) {
    const beforeTaskId = targetElement?.dataset?.taskId;

    if (!beforeTaskId) {
      this.#tasksModel.updateTaskStatus(taskId, newStatus);
    } else {
      this.#tasksModel.updateTaskStatus(taskId, newStatus, beforeTaskId);
    }
  }
}