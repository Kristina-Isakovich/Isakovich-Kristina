import { TODO_STATE } from './constants.js'
import {
  formTask,
  templateTask,
  templateBtnEdit,
  templateBtnDo,
  templateBtnDelete,
  tableCurrentTasks,
  formName,
  formDescription
} from './elements.js'
import { toggleModalHidden } from './modal.js'
import { saveToStorage } from './local-storage.js'

formTask.addEventListener('submit', function (event) {
  event.preventDefault()
  renderTask()
  formTask.reset()
  toggleModalHidden()
  saveToStorage(todos)
})

function createTaskElementForm() {
  let currentTask = templateTask.cloneNode(true)
  const formPriority = document.getElementsByName('form-priority')
  const btnEdit = templateBtnEdit.cloneNode(true)
  const btnDo = templateBtnDo.cloneNode(true)
  const btnDelete = templateBtnDelete.cloneNode(true)
  let taskId = Math.random()
  let priority

  formPriority.forEach(item => item.checked ? priority = item.value : null)

  currentTask.querySelector('.task-name').textContent = formName.value
  currentTask.querySelector('.task-description').textContent = formDescription.value
  currentTask.querySelector('.task-priority').textContent = priority
  currentTask.setAttribute('data-id', taskId)
  currentTask.append(btnEdit, btnDo, btnDelete)

  let todoCurrent = {
    id: taskId,
    name: formName.value,
    description: formDescription.value,
    priority: priority,
    state: TODO_STATE.CURRENT
  }

  todos.push(todoCurrent)
  return currentTask
}

function renderTask() {
  const task = createTaskElementForm()
  tableCurrentTasks.append(task)
}
