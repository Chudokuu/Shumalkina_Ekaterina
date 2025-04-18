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
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    this.#tasks = [...this.#tasksModel.tasks];
    this.#renderBoard();
  }

  createTask() {
    const taskTitle = document.querySelector('#add-task').value.trim();
    if (!taskTitle) {
      return;
    }
    this.#tasksModel.addTask(taskTitle);
    document.querySelector.apply('#add-task').value = '';
  }

  get tasks() {
    return this.#tasksModel.tasks;
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
      this.#renderClearButton(taskListComponent.element);
    }
  }

  #renderBoard() {
    render(this.#taskBoardComponent, this.#boardContainer);
    Object.values(Status).forEach((status) => {
      const tasksForStatus = this.#tasksModel.getTasksByStatus(status);
      this.#renderTasksList(status, tasksForStatus, this.#taskBoardComponent.element);
    });
  }

  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }

  #clearBoard() {
    this.#taskBoardComponent.element.innerHTML = '';
  }

  #handleClearTrash(buttonComponent) {
    this.#tasksModel.clearTrash();
    const buttonEl = buttonComponent.element;
    buttonEl.disabled = true;
  }

  #renderClearButton(container) {
    const tasksInTrash = this.#tasksModel.getTasksByStatus(Status.TRASH);
    const deleteButton = new DeleteButtonComponent({
      onClick: () => this.#handleClearTrash(deleteButton),
      disabled: tasksInTrash.length === 0  // Проверка на наличие задач
    });
    render(deleteButton, container);
  }

}
