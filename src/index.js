const TODO_STATE = {
  CURRENT: 'CURRENT',
  DONE: 'DONE',
  DELETE: 'DELETE'
};
let STORAGE_KEYS = {
  TODOS: ''
};
let todos = [];

const tableTasks = document.querySelector('.current-tasks');
const formName = document.getElementById('form-name');
const formDescription = document.getElementById('form-description');
const currentTasksContent = document.getElementById('template-current-tasks').content;
const taskTemplate = currentTasksContent.querySelector('.current-task');

//Tabs
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

//элементы со Storage
function addCurrentTasks(item) {
  const currentTask = taskTemplate.cloneNode(true);

  currentTask.querySelector('.current-task-name').textContent = item.name;
  currentTask.querySelector('.current-task-description').textContent = item.description;
  currentTask.querySelector('.current-task-priority').textContent = item.priority;

  tableTasks.append(currentTask);
}

function addDoneTasks(item) {
  const doneTask = doneTaskTemplate.cloneNode(true);
  doneTask.querySelector('.completed-task-name').textContent = item.name;
  doneTask.querySelector('.completed-task-description').textContent = item.description;
  doneTask.querySelector('.completed-task-priority').textContent = item.priority;

  tableCompletedTasks.append(doneTask);
}

function addDeleteTasks(item) {

}

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

function showTasks() {
  let getLocalStorageData = localStorage.getItem(STORAGE_KEYS.TODOS);
  if (getLocalStorageData !== null) {
    todos = JSON.parse(getLocalStorageData);
    taskElementFromStorage();
  }
}

showTasks();


//Модальное окно
const addTasksBtn = document.querySelector('.add-tasks-btn');
const resetTaskBtn = document.querySelector('.form-btn__reset');
let formTask = document.querySelector('.add-task__form');

function toggleModalHidden() {
  formTask.hidden = !formTask.hidden;
}

addTasksBtn.addEventListener('click', toggleModalHidden);
resetTaskBtn.addEventListener('click', toggleModalHidden);

//todos
let priority;

formTask.addEventListener('submit', function (event) {
  event.preventDefault();

  renderTasks();
  formTask.reset();
  toggleModalHidden();
  saveToStorage(todos);
})

function addCurrentTaskInArr() {
  let todoCurrent = {
    id: Math.random(),
    name: formName.value,
    description: formDescription.value,
    priority: priority,
    state: TODO_STATE.CURRENT
  };

  todos.push(todoCurrent);
}

function createTaskElement() {
  const currentTask = taskTemplate.cloneNode(true);
  const formPriority = document.getElementsByName('form-priority');

  formPriority.forEach(item => {
    if (item.checked) {
      priority = item.value;
    }
  })

  currentTask.querySelector('.current-task-name').textContent = formName.value;
  currentTask.querySelector('.current-task-description').textContent = formDescription.value;
  currentTask.querySelector('.current-task-priority').textContent = priority;

  return currentTask;
}

function renderTasks() {
  const task = createTaskElement();
  tableTasks.append(task);
  addCurrentTaskInArr();
}

function saveToStorage(arr) {
  const data = JSON.stringify(arr);
  localStorage.setItem(STORAGE_KEYS.TODOS, data);
}

//выполненные
const doneTasksContent = document.getElementById('template-completed-tasks').content;
const doneTaskTemplate = doneTasksContent.querySelector('.completed-task');
const tableCompletedTasks = document.querySelector('.completed-tasks');
const btnDo = document.querySelector('.btn__do');

function deleteCurrentTask(item) {
  const listItem = item.parentNode;
  tableTasks.removeChild(listItem);
}

function doneTaskStorage(item) {
  todos = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODOS));
  todos.forEach(el => {
    if (el.name === item){
      el.state = TODO_STATE.DONE;
      todos.push(el);
      saveToStorage(todos);
    }
  })
}

function doneTaskElement(item) {
  const doneTask = doneTaskTemplate.cloneNode(true);

  doneTask.querySelector('.completed-task-name').textContent = item.name;
  doneTask.querySelector('.completed-task-description').textContent = item.description;
  doneTask.querySelector('.completed-task-priority').textContent = item.priority;

  return doneTask;
}

function renderDoneTasks(item) {
  const task = doneTaskElement(item);
  tableCompletedTasks.append(task);
}

tableTasks.addEventListener('click', event => { //????

  if (event.target.classList.contains('btn__do')){
    const item = event.target;
    deleteCurrentTask(item);
    renderDoneTasks(item);
    doneTaskStorage(item)
  }
});








