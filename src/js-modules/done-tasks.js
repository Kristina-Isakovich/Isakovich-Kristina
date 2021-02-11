import {tableTasks} from './add-tasks.js';
import {doneTaskStorage, findTaskElement} from "./local-storage.js";
import {addDoneTasks} from './tasks-elements.js';

function deleteTask(item) {
  const listItem = item.parentNode;
  tableTasks.removeChild(listItem);
}

tableTasks.addEventListener('click', event => {
  if (event.target.classList.contains('btn__do')){
    deleteTask(event.target);

    const elementId = event.target.parentNode.getAttribute('data-id');
    const item = findTaskElement(elementId);

    addDoneTasks(item);
    doneTaskStorage(elementId);
  }
});

export {deleteTask};