import { STORAGE_KEYS } from './constants.js'
import { renderTasksByType } from './tasks-elements.js'

let todos = [];

function showTasks() {
  let getLocalStorageData = localStorage.getItem(STORAGE_KEYS.TODOS)
  if (getLocalStorageData) {
    todos = JSON.parse(getLocalStorageData)
    renderTasksByType(todos)
  }
}

function saveToStorage(todos) {
  const data = JSON.stringify(todos)
  localStorage.setItem(STORAGE_KEYS.TODOS, data)
}

export { showTasks, saveToStorage }
