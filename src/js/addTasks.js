const tableTasks = document.querySelector('.current-tasks');
const formName = document.getElementById('form-name');
const formDescription = document.getElementById('form-description');
const templateCurrentTasks = document.getElementById('template-current-tasks').content;
const todos =[];

formTask.addEventListener('submit', function (event) {
    event.preventDefault();
    renderTasks ();
    formTask.style.display = 'none';
})

function renderTasks () {
    const node = templateCurrentTasks.querySelector('.current-task');
    let currentTask = node.cloneNode(true);

    currentTask.querySelector('.current-task-name').textContent = formName.value;
    currentTask.querySelector('.current-task-description').textContent = formDescription.value;
    //добавить приоритет ???

    tableTasks.append(currentTask);
}

function saveTodos() {
    let task = {
        id: Math.random(),
        name: formName.value,
        description: formDescription.value,
        priority: '', //????
        state: TODO_STATE.CURRENT
    }
    todos.push(task);
}