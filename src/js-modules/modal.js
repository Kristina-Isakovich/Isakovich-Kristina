const addTasksBtn = document.querySelector('.add-tasks-btn');
const resetTaskBtn = document.querySelector('.form-btn__reset');
const formTask = document.querySelector('.add-task__form');

function toggleModalHidden() {
    formTask.hidden = !formTask.hidden;
}

addTasksBtn.addEventListener('click', toggleModalHidden);

resetTaskBtn.addEventListener('click', toggleModalHidden);

export {toggleModalHidden, formTask};