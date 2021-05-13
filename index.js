const TODO_STATE = {
  CURRENT: 'CURRENT',
  DONE: 'DONE',
  DELETE: 'DELETE'
};

const STORAGE_KEYS = {
  TODOS: 'TODOS'
};

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
const addTasksBtn = document.querySelector('.add-tasks-btn');
const resetTaskBtn = document.querySelector('.form-btn__reset');
const formTask = document.querySelector('.add-task__form');
const formName = document.getElementById('form-name');
const formDescription = document.getElementById('form-description');
const formEdit = document.querySelector('.form-edit');
const resetEditTaskBtn = document.querySelector('.form-edit-btn__reset');
const formEditName = document.getElementById('form-edit-name');
const formEditDescription = document.getElementById('form-edit-description');
const formEditPriority = document.getElementsByName('form-edit-priority');
let todos = [];

function toggleModalEditHidden() {
  formEdit.hidden = !formEdit.hidden
}

function formEditData(event) {
  if (event.target.classList.contains('btn__edit')) {
    toggleModalEditHidden()
    const elementId = event.target.parentNode.getAttribute('data-id');
    const todo = findTaskElement(elementId);

    formEdit.setAttribute('data-id', elementId);
    formEditName.value = todo.name;
    formEditDescription.value = todo.description;
    formEditPriority.forEach(item => todo.priority === item.defaultValue ? item.checked = true : false)
  }
}

tableCurrentTasks.addEventListener('click', formEditData)
tableCompletedTasks.addEventListener('click', formEditData)

formEdit.addEventListener('submit', function (event) {
  event.preventDefault();
  editTask(event);
  toggleModalEditHidden();
  saveToStorage(todos);
})

function editTask(event) {
  const elementId = event.currentTarget.getAttribute('data-id');
  const currentTask = document.querySelector(`[data-id="${elementId}"]`);
  const task = findTaskElement(elementId);
  let priority;

  formEditPriority.forEach(item => item.checked ? priority = item.value : null);

  const newTask = {
    id: task.id,
    name: formEditName.value,
    description: formEditDescription.value,
    priority: priority,
    state: task.state
  }

  todos = todos.map(item => {
    if (item.id === task.id) {
      return newTask;
    }
    return item;
  })

  currentTask.querySelector('.task-name').textContent = formEditName.value;
  currentTask.querySelector('.task-description').textContent = formEditDescription.value;
  currentTask.querySelector('.task-priority').textContent = priority;
}

resetEditTaskBtn.addEventListener('click', toggleModalEditHidden)

function tab() {
  const tabNav = document.querySelectorAll('.tabs-nav__item');
  const tabContent = document.querySelectorAll('.tab');
  let tabName;

  tabNav.forEach(item => {
    item.addEventListener('click', selectTabNav)
  });

  function selectTabNav() {
    tabNav.forEach(item => {
      item.classList.remove('is-active');
    });
    this.classList.add('is-active');
    tabName = this.getAttribute('data-tab-name');
    selectTabContent(tabName);
  }

  function selectTabContent(tabName) {
    tabContent.forEach(item => {
      item.classList.contains(tabName) ?
        item.classList.add('is-active') :
        item.classList.remove('is-active');
    })
  }
}

function toggleModalHidden() {
  formTask.hidden = !formTask.hidden
}

addTasksBtn.addEventListener('click', toggleModalHidden);
resetTaskBtn.addEventListener('click', toggleModalHidden);

function showTasks() {
  let getLocalStorageData = localStorage.getItem(STORAGE_KEYS.TODOS);
  if (getLocalStorageData) {
    todos = JSON.parse(getLocalStorageData);
    renderTasksByType(todos);
  }
}

function renderTasksByType(todos) {
  todos.forEach(item => {
    if (item.state === TODO_STATE.CURRENT) {
      addCurrentTasks(item);
    } else if (item.state === TODO_STATE.DONE) {
      addDoneTasks(item);
    } else if (item.state === TODO_STATE.DELETE) {
      addDeleteTasks(item);
    }
  })
}

function saveToStorage(todos) {
  const data = JSON.stringify(todos);
  localStorage.setItem(STORAGE_KEYS.TODOS, data);
}

function findTaskElement(id) {
  return todos.find(item => item.id === Number(id));
}

function createTaskElement(item) {
  const task = templateTask.cloneNode(true);

  task.querySelector('.task-name').textContent = item.name;
  task.querySelector('.task-description').textContent = item.description;
  task.querySelector('.task-priority').textContent = item.priority;
  task.setAttribute('data-id', item.id);

  return task;
}

function addCurrentTasks(item) {
  const btnEdit = templateBtnEdit.cloneNode(true);
  const btnDo = templateBtnDo.cloneNode(true);
  const btnDelete = templateBtnDelete.cloneNode(true);
  const task = createTaskElement(item);
  task.append(btnEdit, btnDo, btnDelete);

  tableCurrentTasks.append(task);
}

function addDoneTasks(item) {
  const btnEdit = templateBtnEdit.cloneNode(true);
  const btnDelete = templateBtnDelete.cloneNode(true);
  const task = createTaskElement(item);
  task.append(btnEdit, btnDelete);

  tableCompletedTasks.append(task);
}

function addDeleteTasks(item) {
  const btnReestablish = templateBtnReestablish.cloneNode(true);
  const btnDelete = templateBtnDelete.cloneNode(true);
  const task = createTaskElement(item);
  task.append(btnReestablish, btnDelete);

  tableDeleteTasks.append(task);
}

formTask.addEventListener('submit', function (event) {
  event.preventDefault();
  renderTask();
  formTask.reset();
  toggleModalHidden();
  saveToStorage(todos);
})

function createTaskElementForm() {
  let currentTask = templateTask.cloneNode(true);
  const formPriority = document.getElementsByName('form-priority');
  const btnEdit = templateBtnEdit.cloneNode(true);
  const btnDo = templateBtnDo.cloneNode(true);
  const btnDelete = templateBtnDelete.cloneNode(true);
  let taskId = Math.random();
  let priority;

  formPriority.forEach(item => item.checked ? priority = item.value : null)

  currentTask.querySelector('.task-name').textContent = formName.value;
  currentTask.querySelector('.task-description').textContent = formDescription.value;
  currentTask.querySelector('.task-priority').textContent = priority;
  currentTask.setAttribute('data-id', taskId);
  currentTask.append(btnEdit, btnDo, btnDelete);

  let todoCurrent = {
    id: taskId,
    name: formName.value,
    description: formDescription.value,
    priority: priority,
    state: TODO_STATE.CURRENT
  };
  todos.push(todoCurrent);
  return currentTask;
}

function renderTask() {
  const task = createTaskElementForm();
  tableCurrentTasks.append(task);
}

function deleteTaskFromTable(item, table) {
  const listItem = item.parentNode;
  table.removeChild(listItem);
}

tableCurrentTasks.addEventListener('click', event => {
  if (event.target.classList.contains('btn__do')) {
    const elementId = event.target.parentNode.getAttribute('data-id');
    const item = findTaskElement(elementId);
    item.state = TODO_STATE.DONE;

    deleteTaskFromTable(event.target, tableCurrentTasks);
    addDoneTasks(item);
    saveToStorage(todos);
  }
})

tableCurrentTasks.addEventListener('click', event => {
  if (event.target.classList.contains('btn__delete')) {
    const elementId = event.target.parentNode.getAttribute('data-id');
    const item = findTaskElement(elementId);
    item.state = TODO_STATE.DELETE

    deleteTaskFromTable(event.target, tableCurrentTasks);
    addDeleteTasks(item);
    saveToStorage(todos);
  }
})

tableCompletedTasks.addEventListener('click', event => {
  if (event.target.classList.contains('btn__delete')) {
    const elementId = event.target.parentNode.getAttribute('data-id');
    const item = findTaskElement(elementId);
    item.state = TODO_STATE.DELETE

    deleteTaskFromTable(event.target, tableCompletedTasks);
    addDeleteTasks(item);
    saveToStorage(todos);
  }
})

tableDeleteTasks.addEventListener('click', event => {
  if (event.target.classList.contains('btn__reestablish')) {
    const elementId = event.target.parentNode.getAttribute('data-id');
    const item = findTaskElement(elementId);
    item.state = TODO_STATE.CURRENT

    deleteTaskFromTable(event.target, tableDeleteTasks);
    addCurrentTasks(item);
    saveToStorage(todos);
  }
})

tableDeleteTasks.addEventListener('click', event => {
  if (event.target.classList.contains('btn__delete')) {
    const elementId = event.target.parentNode.getAttribute('data-id');

    todos.forEach((item, index) => {
      if (item.id === Number(elementId)) {
        todos.splice(index, 1)
      }
    })

    deleteTaskFromTable(event.target, tableDeleteTasks);
    saveToStorage(todos);
  }
})

showTasks();
tab();
