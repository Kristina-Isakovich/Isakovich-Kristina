import {formTask, toggleModalHidden} from './modal.js';
import {TODO_STATE, STORAGE_KEYS} from './constants.js';
import {saveToStorage} from "./local-storage.js";
import {templateBtnEdit, templateBtnDo, templateBtnDelete} from './tasks-elements.js';

const tableTasks = document.querySelector('.current-tasks');
const formName = document.getElementById('form-name');
const formDescription = document.getElementById('form-description');
const templateTasksContent = document.getElementById('template-tasks').content;
const taskTemplate = templateTasksContent.querySelector('.task');
const todos = [];
let priority;

formTask.addEventListener('submit', function (event) {
  event.preventDefault();

  renderTasks();
  formTask.reset();
  toggleModalHidden();
  saveToStorage(todos);
})

function addCurrentTaskInArr() {

}

function createTaskElementForm() {
  let currentTask = taskTemplate.cloneNode(true);
  const formPriority = document.getElementsByName('form-priority');
  const btnEdit = templateBtnEdit.cloneNode(true);
  const btnDo = templateBtnDo.cloneNode(true);
  const btnDelete = templateBtnDelete.cloneNode(true);
  const taskId = Math.random();

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
  addCurrentTaskInArr();
  console.log(todos)
}

export {tableTasks};