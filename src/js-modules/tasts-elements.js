const tableCurrentTasks = document.querySelector('.current-tasks');
const tableCompletedTasks = document.querySelector('.completed-tasks');
const tableDeleteTasks = document.querySelector('.deleted-tasks');

const templateTasksContent = document.getElementById('template-tasks').content;
const templateTask = templateTasksContent.querySelector('.task');
const templateBtnContent = document.getElementById('template-btn').content;
const templateBtnDo = templateBtnContent.querySelector('.btn__do');
const templateBtnDelete = templateBtnContent.querySelector('.btn__delete');
const templateBtnEdit = templateBtnContent.querySelector('.btn__edit');
const templateBtnReestablish = templateBtnContent.querySelector('.btn__reestablish');

function createTaskElement(item) {
  const task = templateTask.cloneNode(true);

  task.querySelector('.task-name').textContent = item.name;
  task.querySelector('.task-description').textContent = item.description;
  task.querySelector('.task-priority').textContent = item.priority;

  return task;
}

function addCurrentTasks (item) {
  const btnEdit = templateBtnEdit.cloneNode(true);
  const btnDo = templateBtnDo.cloneNode(true);
  const btnDelete = templateBtnDelete.cloneNode(true);
  const task = createTaskElement(item).append(btnEdit, btnDo, btnDelete);

  tableCurrentTasks.append(task);
}

function addDoneTasks (item) {
  const btnEdit = templateBtnEdit.cloneNode(true);
  const btnDelete = templateBtnDelete.cloneNode(true);
  const task = createTaskElement(item).append(btnEdit, btnDelete);

  tableCompletedTasks.append(task);
}

function addDeleteTasks (item) {
  const btnReestablish = templateBtnReestablish.cloneNode(true);
  const btnDelete = templateBtnDelete.cloneNode(true);
  const task = createTaskElement(item).append(btnReestablish, btnDelete);

  tableDeleteTasks.append(task);
}

export {addCurrentTasks, addDoneTasks, addDeleteTasks, templateBtnEdit, templateBtnDo, templateBtnDelete};