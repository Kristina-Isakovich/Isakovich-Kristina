import {formTask, toggleModalHidden} from './modal.js';
import {TODO_STATE, STORAGE_KEYS} from './constants.js';
import {saveToStorage} from "./local-storage.js";
import {templateBtnEdit, templateBtnDo, templateBtnDelete} from './tasts-elements.js';

const tableTasks = document.querySelector('.current-tasks');
const formName = document.getElementById('form-name');
const formDescription = document.getElementById('form-description');
const templateTasksContent = document.getElementById('template-tasks').content;
const taskTemplate = templateTasksContent.querySelector('.task');
const todos =[];
let priority;
let taskId;

formTask.addEventListener('submit', function (event) {
    event.preventDefault();

    renderTasks();
    formTask.reset();
    toggleModalHidden();
    saveToStorage(todos);
})

function addCurrentTaskInArr() {
    let todoCurrent = {
        id: taskId,
        name: formName.value,
        description: formDescription.value,
        priority: priority,
        state: TODO_STATE.CURRENT
    };

    todos.push(todoCurrent);
}

function createTaskElement() {
    let currentTask = taskTemplate.cloneNode(true);
    const formPriority = document.getElementsByName('form-priority');
    const btnEdit = templateBtnEdit.cloneNode(true);
    const btnDo = templateBtnDo.cloneNode(true);
    const btnDelete = templateBtnDelete.cloneNode(true);
    taskId = Math.random();

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

     return currentTask;
}

function renderTasks() {
    const task = createTaskElement();
    tableTasks.append(task);
    addCurrentTaskInArr();
    console.log(todos)
}

export {tableTasks};