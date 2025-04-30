import { generateID } from '../utils.js';
import { UserAction, UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class TaskModel extends Observable {
  #tasks = [];
  #tasksApiService = null;

  constructor({tasksApiService}) {
    super();
    this.#tasksApiService = tasksApiService;
    
    this.#tasksApiService.tasks.then((tasks) => {
      console.log(tasks);
    });
 
  }

  get tasks() {
    return this.#tasks;
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#tasks = tasks;
    } catch {
      this.#tasks = [];
    }
    this._notify(UpdateType.INIT);
  }

  async addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateID(),
    };
    try {
      const created = await this.#tasksApiService.addTask(newTask);
      this.#tasks.push(created);
      this._notify(UserAction.ADD_TASK, created);
      return created;
    } catch(err) {
      console.error('Ошибка при добавлении задачи на сервер:', err);
      throw err;
    }
  }

  async updateTaskStatus(taskId, newStatus, beforeTaskId = null) {
    const task = this.#tasks.find(t => t.id === taskId);
    if (!task) return;
    const previous = task.status;
    task.status = newStatus;
    try {
      const updated = await this.#tasksApiService.updateTask(task);
      Object.assign(task, updated);
      if (beforeTaskId) {
        const beforeTaskIndex = this.#tasks.findIndex(t => t.id === beforeTaskId);
        if (beforeTaskIndex !== -1) {
          this.#tasks.splice(this.#tasks.indexOf(task), 1); 
          this.#tasks.splice(beforeTaskIndex, 0, task);  
        }
      } else {
        if (!this.#tasks.includes(task)) {
          this.#tasks.push(task);
        }
      }
      this._notify(UserAction.UPDATE_TASK, task);
    } catch (err) {
      console.error('Ошибка при обновлении задачи на сервере:', err);
      task.status = previous; 
      throw err;
    }
  }
  

  async clearTrash() {
    const trashTasks = this.#tasks.filter(t => t.status === 'trash');
    try {
      await Promise.all(trashTasks.map(t => this.#tasksApiService.deleteTask(t.id)));
      this.#tasks = this.#tasks.filter(t => t.status !== 'trash');
      this._notify(UserAction.DELETE_TASK, {status: 'trash'});
    } catch(err) {
      console.error('Ошибка при очистке корзины на сервере:', err);
      throw err;
    }
  }

  hasTrashTasks() {
    return this.#tasks.some(t => t.status === 'trash');
  }
}