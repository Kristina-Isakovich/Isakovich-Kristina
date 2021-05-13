import {
  templateBtnEdit,
  templateBtnDo,
  templateBtnDelete,
  templateBtnReestablish,
  tableCurrentTasks,
  tableCompletedTasks,
  tableDeleteTasks
} from './elements.js'

function renderTasksByType(todos) {
  todos.forEach(item => {
    if (item.state === TODO_STATE.CURRENT) {
      addCurrentTasks(item)
    } else if (item.state === TODO_STATE.DONE) {
      addDoneTasks(item)
    } else if (item.state === TODO_STATE.DELETE) {
      addDeleteTasks(item)
    }
  })
}

function findTaskElement(id) {
  return todos.find(item => item.id === Number(id))
}

function deleteTaskFromTable(item, table) {
  const listItem = item.parentNode
  table.removeChild(listItem)
}

function createTaskElement(item) {
  const task = templateTask.cloneNode(true)

  task.querySelector('.task-name').textContent = item.name
  task.querySelector('.task-description').textContent = item.description
  task.querySelector('.task-priority').textContent = item.priority
  task.setAttribute('data-id', item.id)

  return task
}

function addCurrentTasks(item) {
  const btnEdit = templateBtnEdit.cloneNode(true)
  const btnDo = templateBtnDo.cloneNode(true)
  const btnDelete = templateBtnDelete.cloneNode(true)
  const task = createTaskElement(item)
  task.append(btnEdit, btnDo, btnDelete)

  tableCurrentTasks.append(task)
}

function addDoneTasks(item) {
  const btnEdit = templateBtnEdit.cloneNode(true)
  const btnDelete = templateBtnDelete.cloneNode(true)
  const task = createTaskElement(item)
  task.append(btnEdit, btnDelete)

  tableCompletedTasks.append(task)
}

function addDeleteTasks(item) {
  const btnReestablish = templateBtnReestablish.cloneNode(true)
  const btnDelete = templateBtnDelete.cloneNode(true)
  const task = createTaskElement(item)
  task.append(btnReestablish, btnDelete)

  tableDeleteTasks.append(task)
}

export {
  renderTasksByType,
  findTaskElement,
  deleteTaskFromTable,
  addCurrentTasks,
  addDoneTasks,
  addDeleteTasks
}
