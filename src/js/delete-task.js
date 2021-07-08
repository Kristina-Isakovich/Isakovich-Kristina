import { TODO_STATE } from './constants.js'
import { tableCurrentTasks, tableCompletedTasks, tableDeleteTasks } from './elements.js'
import { deleteTaskFromTable, addDeleteTasks } from './tasks-elements.js'
import { saveToStorage } from './local-storage.js'

tableCurrentTasks.addEventListener('click', event => {
  if (event.target.classList.contains('btn__delete')) {
    const elementId = event.target.parentNode.getAttribute('data-id')
    const item = findTaskElement(elementId)
    item.state = TODO_STATE.DELETE

    deleteTaskFromTable(event.target, tableCurrentTasks)
    addDeleteTasks(item)
    saveToStorage(todos)
  }
})

tableCompletedTasks.addEventListener('click', event => {
  if (event.target.classList.contains('btn__delete')) {
    const elementId = event.target.parentNode.getAttribute('data-id')
    const item = findTaskElement(elementId)
    item.state = TODO_STATE.DELETE

    deleteTaskFromTable(event.target, tableCompletedTasks)
    addDeleteTasks(item)
    saveToStorage(todos)
  }
})

tableDeleteTasks.addEventListener('click', event => {
  if (event.target.classList.contains('btn__delete')) {
    const elementId = event.target.parentNode.getAttribute('data-id')

    todos.forEach((item, index) => {
      if (item.id === Number(elementId)) {
        todos.splice(index, 1)
      }
    })

    deleteTaskFromTable(event.target, tableDeleteTasks)
    saveToStorage(todos)
  }
})
