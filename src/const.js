export const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const Status = {
  BACKLOG: 'backlog',
  PROCESS: 'process',
  DONE: 'done',
  TRASH: 'trash',
};

export const StatusLabel = {
  [Status.BACKLOG]: 'Бэклог',
  [Status.PROCESS]: 'В процессе',
  [Status.DONE]: 'Готово',
  [Status.TRASH]: 'Корзина',
};