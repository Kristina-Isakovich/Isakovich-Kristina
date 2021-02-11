//constants

const TODO_STATE = {
  CURRENT: 'CURRENT',
  DONE: 'DONE',
  DELETE: 'DELETE'
};

const STORAGE_KEYS = {
  TODOS: ''
};

let todos = [];

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

//tabs
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

tab();

//modal
const addTasksBtn = document.querySelector('.add-tasks-btn');
const resetTaskBtn = document.querySelector('.form-btn__reset');
const formTask = document.querySelector('.add-task__form');

function toggleModalHidden() {
  formTask.hidden = !formTask.hidden;
}

addTasksBtn.addEventListener('click', toggleModalHidden);

resetTaskBtn.addEventListener('click', toggleModalHidden);

//local-storage

function showTasks() {
  let getLocalStorageData = localStorage.getItem(STORAGE_KEYS.TODOS);
  if (getLocalStorageData) {
    todos = JSON.parse(getLocalStorageData);
    taskElementFromStorage();
  }
}

showTasks();

function taskElementFromStorage() {
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

function saveToStorage(arr) {
  const data = JSON.stringify(arr);
  localStorage.setItem(STORAGE_KEYS.TODOS, data);
}

function doneTaskStorage(id) {
  todos = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODOS));
  todos = todos.map(it => it.id === id ? {...it, state: TODO_STATE.DONE} : it);
  saveToStorage(todos);
}

function findTaskElement(id) {
  todos = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODOS));
  return todos.find(item => item.id === id);
}

function deleteTaskStorage(id) {
  todos = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODOS));
  todos = todos.map(it => it.id === id ? {...it, state: TODO_STATE.DELETE} : it);
  saveToStorage(todos);
}

//tasks-element


function createTaskElement(item) {
  const task = templateTask.cloneNode(true);

  task.querySelector('.task-name').textContent = item.name;
  task.querySelector('.task-description').textContent = item.description;
  task.querySelector('.task-priority').textContent = item.priority;

  return task;
}

function addCurrentTasks(item) {
  const btnEdit = templateBtnEdit.cloneNode(true);
  const btnDo = templateBtnDo.cloneNode(true);
  const btnDelete = templateBtnDelete.cloneNode(true);
  const task = createTaskElement(item).append(btnEdit, btnDo, btnDelete);

  tableCurrentTasks.append(task);
}

function addDoneTasks(item) {
  const btnEdit = templateBtnEdit.cloneNode(true);
  const btnDelete = templateBtnDelete.cloneNode(true);
  const task = createTaskElement(item).append(btnEdit, btnDelete);

  tableCompletedTasks.append(task);
}

function addDeleteTasks(item) {
  const btnReestablish = templateBtnReestablish.cloneNode(true);
  const btnDelete = templateBtnDelete.cloneNode(true);
  const task = createTaskElement(item).append(btnReestablish, btnDelete);

  tableDeleteTasks.append(task);
}

//add-tasks
const tableTasks = document.querySelector('.current-tasks');
const formName = document.getElementById('form-name');
const formDescription = document.getElementById('form-description');
const taskTemplate = templateTasksContent.querySelector('.task');

formTask.addEventListener('submit', function (event) {
  event.preventDefault();

  renderTasks();
  formTask.reset();
  toggleModalHidden();
  saveToStorage(todos);
})

function createTaskElementForm() {
  let currentTask = taskTemplate.cloneNode(true);
  const formPriority = document.getElementsByName('form-priority');
  const btnEdit = templateBtnEdit.cloneNode(true);
  const btnDo = templateBtnDo.cloneNode(true);
  const btnDelete = templateBtnDelete.cloneNode(true);
  let priority;
  let taskId = Math.random();

  formPriority.forEach(item => {
    if (item.checked) {
      priority = item.value;
    }
  })

  //formPriority.find(item => item.checked?.priority = item.value);

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

function renderTasks() {
  const task = createTaskElementForm();
  tableTasks.append(task);
  console.log(todos)
}

//done-tasks
function deleteCurrentTask(item) {
  const listItem = item.parentNode;
  tableTasks.removeChild(listItem);
}

tableTasks.addEventListener('click', event => {
  if (event.target.classList.contains('btn__do')) {
    deleteCurrentTask(event.target);

    const elementId = event.target.parentNode.getAttribute('data-id');
    const item = findTaskElement(elementId);
    console.log(item);

    addDoneTasks(item);
    doneTaskStorage(elementId);
  }
});

tableCurrentTasks.addEventListener('click', event => {
  if (event.target.classList.contains('btn__delete')) {
    deleteCurrentTask(event.target);

    const elementId = event.target.parentNode.getAttribute('data-id');
    const item = findTaskElement(elementId);

    addDeleteTasks(item);
    deleteTaskStorage(elementId);
  }
});