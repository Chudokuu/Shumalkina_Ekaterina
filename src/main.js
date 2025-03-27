import HeaderComponent from './view/header-component.js';
import NewTaskComponent from './view/new-task-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';
import { render, RenderPosition } from './framework/render.js';


const appContainer = document.getElementById('app');
render(new HeaderComponent(), appContainer, RenderPosition.BEFOREEND);

const mainContainer = document.createElement('div');
mainContainer.className = 'main-container';
appContainer.appendChild(mainContainer);

render(new NewTaskComponent(), mainContainer);

const taskBoardComponent = new TaskBoardComponent();
render(taskBoardComponent, mainContainer);

for (let i = 0; i < 4; i++) {
  const taskListComponent = new TaskListComponent();
  render(taskListComponent, taskBoardComponent.getElement());
  for (let j = 0; j < 4; j++) {
    render(new TaskComponent(), taskListComponent.getElement());
  }
}
