import { tasks } from "../mock/task.js";
import { generateID } from "../utils.js";

export default class TaskModel {
  #tasks = tasks;
  #observers = [];

  get tasks() {
    return this.#tasks;
  }

  getTasksByStatus(status) {
    return this.#tasks.filter(task => task.status === status);
  }

  addTask(title) {
    const newTask = {
      id: generateID(),
      title,
      status: 'backlog'
    };
    this.#tasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter(obs => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach(observer => observer());
  }

  clearTrash() {
    this.#tasks = this.#tasks.filter(task => task.status !== 'trash');
    this._notifyObservers();
  }
}
