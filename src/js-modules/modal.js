import { formTask, addTasksBtn, resetTaskBtn } from './elements.js'

function toggleModalHidden() {
    formTask.hidden = !formTask.hidden
}

addTasksBtn.addEventListener('click', toggleModalHidden)
resetTaskBtn.addEventListener('click', toggleModalHidden)

export { toggleModalHidden }
