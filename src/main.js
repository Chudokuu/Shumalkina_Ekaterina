
import HeaderComponent from './view/header-component.js';
import NewTaskComponent from './view/new-task-component.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js';
import { render, RenderPosition } from './framework/render.js';

const appContainer = document.getElementById('app');

render(new HeaderComponent(), appContainer, RenderPosition.BEFOREEND);

const mainContainer = document.createElement('div');
mainContainer.className = 'main-container';
appContainer.appendChild(mainContainer);

render(new NewTaskComponent(), mainContainer);

const taskModel = new TaskModel();

const taskBoardPresenter = new TaskBoardPresenter({
  boardContainer: mainContainer,
  tasksModel: taskModel,
});

taskBoardPresenter.init();
