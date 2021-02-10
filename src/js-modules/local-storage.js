import {TODO_STATE, STORAGE_KEYS} from "./constants.js";
import {addCurrentTasks, addDoneTasks, addDeleteTasks} from './tasts-elements.js';

let todos = [];

function showTasks() {
  let getLocalStorageData = localStorage.getItem(STORAGE_KEYS.TODOS);
  if (getLocalStorageData) {
    todos = JSON.parse(getLocalStorageData);
    taskElementFromStorage();
  }
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

function saveToStorage(arr) {
  const data = JSON.stringify(arr);
  localStorage.setItem(STORAGE_KEYS.TODOS, data);
}

function doneTaskStorage(item) {
  todos = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODOS));
  todos = todos.map(it => it.id === item.id ? {...it, state: TODO_STATE.DONE} : it);
  saveToStorage(todos);
}

export {saveToStorage, doneTaskStorage, showTasks};