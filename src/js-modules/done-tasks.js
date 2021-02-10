import {tableTasks} from './add-tasks.js';
import {doneTaskStorage} from "./local-storage.js";
import {addDoneTasks} from './tasts-elements.js';

function deleteCurrentTask(item) {
  const listItem = item.parentNode;
  tableTasks.removeChild(listItem);
}

tableTasks.addEventListener('click', event => {

  if (event.target.classList.contains('btn__do')){
    deleteCurrentTask(event.target);
    addDoneTasks(item);
    doneTaskStorage(item)
  }
});