import {deleteTask} from "./done-tasks.js";
import {tableCurrentTasks, addDeleteTasks} from "./tasks-elements.js";
import {deleteTaskStorage, findTaskElement} from "./local-storage.js";

tableCurrentTasks.addEventListener('click', event => {
  if (event.target.classList.contains('btn__delete')){
    deleteTask(event.target);

    const elementId = event.target.parentNode.getAttribute('data-id');
    const item = findTaskElement(elementId);

    addDeleteTasks(item);
    deleteTaskStorage(elementId);
  }
});