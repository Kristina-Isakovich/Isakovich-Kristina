import { TODO_STATE } from './constants.js'
import { tableCurrentTasks } from './elements.js'
import { addDoneTasks, deleteTaskFromTable } from './tasks-elements.js'
import { saveToStorage } from './local-storage.js'

tableCurrentTasks.addEventListener('click', event => {
  if (event.target.classList.contains('btn__do')) {
    const elementId = event.target.parentNode.getAttribute('data-id')
    const item = findTaskElement(elementId)
    item.state = TODO_STATE.DONE

    deleteTaskFromTable(event.target, tableCurrentTasks)
    addDoneTasks(item)
    saveToStorage(todos)
  }
})
