import HeaderComponent from './view/header-component.js';
import NewTaskComponent from './view/new-task-component.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js';
import { render, RenderPosition } from './framework/render.js';
import TasksApiService from './service/tasks-api-service.js';

const END_POINT = 'https://681234823ac96f7119a74286.mockapi.io';
const appContainer = document.getElementById('app');

render(new HeaderComponent(), appContainer, RenderPosition.BEFOREEND);

const mainContainer = document.createElement('div');
mainContainer.className = 'main-container';
appContainer.append(mainContainer);

const newTaskComponent = new NewTaskComponent({ onClick: handleNewTaskButtonClick });
render(newTaskComponent, mainContainer);

const tasksModel = new TaskModel({
  tasksApiService: new TasksApiService(END_POINT)
});

const taskBoardPresenter = new TaskBoardPresenter({
  boardContainer: mainContainer,
  tasksModel
});

taskBoardPresenter.init();

function handleNewTaskButtonClick() {
  taskBoardPresenter.createTask();
}