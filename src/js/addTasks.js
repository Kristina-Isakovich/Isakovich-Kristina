const tableTasks = document.querySelector('.current-tasks');
const formName = document.getElementById('form-name');
const formDescription = document.getElementById('form-description');
const currentTasksContent = document.getElementById('template-current-tasks').content;
const taskTemplate = currentTasksContent.querySelector('.current-task');
const todos =[];
let priority = null;

formTask.addEventListener('submit', function (event) {
    event.preventDefault();

    renderTasks ();
    formTask.reset();
    toggleModalHidden();

    let todoCurrent = {
        id: Math.random(),
        name: formName.value,
        description: formDescription.value,
        priority: priority,
        state: TODO_STATE.CURRENT
    };

    todos.push(todoCurrent);
    saveToStorage(todos);
})

function createTaskElement() {
    const currentTask = taskTemplate.cloneNode(true);
    const formPriority = document.getElementsByName('form-priority');

    formPriority.forEach(item => {
        if(item.checked){
            priority = item.value;
        }
    })

    currentTask.querySelector('.current-task-name').textContent = formName.value;
    currentTask.querySelector('.current-task-description').textContent = formDescription.value;
    currentTask.querySelector('.current-task-priority').textContent = priority;

    return currentTask;
}

function renderTasks () {
    const task = createTaskElement();
    tableTasks.append(task);
}

function saveToStorage (arr) {
    const data = JSON.stringify(arr);
    localStorage.setItem(STORAGE_KEYS.TODOS, data);
}