const doTasksContent = document.getElementById('template-completed-tasks').content;
const doTaskTemplate = doTasksContent.querySelector('.completed-task');
const tableCompletedTasks = document.querySelector('.completed-tasks');
const btnDo = document.querySelector('.btn__do');

function doTaskElement () {
  const doTask = doTaskTemplate.cloneNode(true);
  doTask.querySelector('.completed-task-name').textContent = formName.value;
  doTask.querySelector('.completed-task-description').textContent = formDescription.value;
  doTask.querySelector('.completed-task-priority').textContent = priority;

  return doTask;
}

const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODOS));

function renderDoTasks () {
  const task = doTaskElement();
  tableCompletedTasks.append(task);
}

btnDo.addEventListener('click', function () {

})