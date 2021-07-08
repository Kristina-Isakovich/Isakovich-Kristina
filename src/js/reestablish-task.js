import { TODO_STATE } from './constants.js'
import { findTaskElement, deleteTaskFromTable, addCurrentTasks } from './tasks-elements.js'
import { saveToStorage } from './local-storage.js'

tableDeleteTasks.addEventListener('click', event => {
  if (event.target.classList.contains('btn__reestablish')) {
    const elementId = event.target.parentNode.getAttribute('data-id')
    const item = findTaskElement(elementId)
    item.state = TODO_STATE.CURRENT

    deleteTaskFromTable(event.target, tableDeleteTasks)
    addCurrentTasks(item)
    saveToStorage(todos)
  }
})
