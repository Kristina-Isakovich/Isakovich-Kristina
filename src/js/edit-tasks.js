import {
  formEdit,
  formEditName,
  formEditDescription,
  formEditPriority,
  tableCurrentTasks,
  tableCompletedTasks,
  resetEditTaskBtn
} from './elements.js'

function toggleModalEditHidden() {
  formEdit.hidden = !formEdit.hidden
}

function formEditData(event) {
  if (event.target.classList.contains('btn__edit')) {
    toggleModalEditHidden()
    const elementId = event.target.parentNode.getAttribute('data-id')
    const todo = findTaskElement(elementId)

    formEdit.setAttribute('data-id', elementId)
    formEditName.value = todo.name
    formEditDescription.value = todo.description
    formEditPriority.forEach(item => todo.priority === item.defaultValue ? item.checked = true : false)
  }
}

tableCurrentTasks.addEventListener('click', formEditData)
tableCompletedTasks.addEventListener('click', formEditData)
resetEditTaskBtn.addEventListener('click', toggleModalEditHidden)

formEdit.addEventListener('submit', function (event) {
  event.preventDefault()
  editTask(event)
  toggleModalEditHidden()
  saveToStorage(todos)
})

function editTask(event) {
  const elementId = event.currentTarget.getAttribute('data-id')
  const currentTask = document.querySelector(`[data-id="${elementId}"]`)
  const task = findTaskElement(elementId)
  let priority

  formEditPriority.forEach(item => item.checked ? priority = item.value : null)

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

  currentTask.querySelector('.task-name').textContent = formEditName.value
  currentTask.querySelector('.task-description').textContent = formEditDescription.value
  currentTask.querySelector('.task-priority').textContent = priority
}
