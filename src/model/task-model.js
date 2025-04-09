import { tasks } from "../mock/task.js";

export default class TaskModel {
  #tasks = tasks;

  get tasks() {
    return this.#tasks;
  }
}
