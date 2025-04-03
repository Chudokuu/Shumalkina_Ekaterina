
import { tasks } from "../mock/task.js";

export default class TaskModel {
  #tasks = tasks;

  getTasks() {
    return this.#tasks;
  }
}
