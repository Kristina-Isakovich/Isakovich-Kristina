const tableCurrentTasks = document.querySelector('.current-tasks')
const tableCompletedTasks = document.querySelector('.completed-tasks')
const tableDeleteTasks = document.querySelector('.deleted-tasks')

const templateTasksContent = document.getElementById('template-tasks').content
const templateTask = templateTasksContent.querySelector('.task')
const templateBtnContent = document.getElementById('template-btn').content
const templateBtnDo = templateBtnContent.querySelector('.btn__do')
const templateBtnDelete = templateBtnContent.querySelector('.btn__delete')
const templateBtnEdit = templateBtnContent.querySelector('.btn__edit')
const templateBtnReestablish = templateBtnContent.querySelector('.btn__reestablish')
const addTasksBtn = document.querySelector('.add-tasks-btn')
const resetTaskBtn = document.querySelector('.form-btn__reset')
const formTask = document.querySelector('.add-task__form')

const formEdit = document.querySelector('.form-edit')
const resetEditTaskBtn = document.querySelector('.form-edit-btn__reset')
const formEditName = document.getElementById('form-edit-name')
const formEditDescription = document.getElementById('form-edit-description')
const formEditPriority = document.getElementsByName('form-edit-priority')

const formName = document.getElementById('form-name')
const formDescription = document.getElementById('form-description')

export {
  tableCurrentTasks,
  tableCompletedTasks,
  tableDeleteTasks,
  formTask,
  formEdit,
  formEditName,
  formEditDescription,
  formEditPriority,
  formName,
  formDescription,
  resetEditTaskBtn,
  templateBtnEdit,
  templateBtnDo,
  templateBtnDelete,
  templateBtnReestablish,
  templateTask,
  addTasksBtn,
  resetTaskBtn
}
