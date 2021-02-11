import {STORAGE_KEYS, TODO_STATE} from "./constants.js";
import {addCurrentTasks, addDeleteTasks, addDoneTasks} from './tasks-elements.js';

let todos = [];

function showTasks() {
  let getLocalStorageData = localStorage.getItem(STORAGE_KEYS.TODOS);
  if (getLocalStorageData) {
    todos = JSON.parse(getLocalStorageData);
    taskElementFromStorage();
  }
}

showTasks();

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

function findTaskElement (id) { //?????
  todos = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODOS));
  return todos.find(item => item.id === id);
}

function doneTaskStorage(id) {
  todos = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODOS));
  todos = todos.map(it => it.id === id ? {...it, state: TODO_STATE.DONE} : it);
  saveToStorage(todos);
}

function deleteTaskStorage(id) {
  todos = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODOS));
  todos = todos.map(it => it.id === id ? {...it, state: TODO_STATE.DELETE} : it);
  saveToStorage(todos);
}

export {saveToStorage, doneTaskStorage, deleteTaskStorage, showTasks, findTaskElement};