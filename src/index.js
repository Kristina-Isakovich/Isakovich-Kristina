//Табы
let tab = function () {
    let tabNav = document.querySelectorAll('.tabs-nav__item');
    let tabContent = document.querySelectorAll('.tab');
    let tabName;

    tabNav.forEach(item => {
        item.addEventListener('click', selectTabNav)
    });

    function selectTabNav() {
        tabNav.forEach(item => {
            item.classList.remove('is-active');
        });
        this.classList.add('is-active');
        tabName = this.getAttribute('data-tab-name');
        selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
        tabContent.forEach(item => {
            item.classList.contains(tabName) ?
                item.classList.add('is-active') :
                item.classList.remove('is-active');
        })
    }
};

tab();

//Модальное окно
const addTasksBtn = document.querySelector('.add-tasks-btn');
const resetTaskBtn = document.querySelector('.form-btn__reset');
const submitTaskBtn = document.querySelector('.form-btn__submit');
let formTask = document.querySelector('.add-task__form');

function toggleModalHidden() {
    formTask.hidden = !formTask.hidden;
}

addTasksBtn.addEventListener('click', toggleModalHidden);

resetTaskBtn.addEventListener('click', toggleModalHidden);



//todos
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

    let todo = {
        id: Math.random(),
        name: formName.value,
        description: formDescription.value,
        priority: priority,
        state: TODO_STATE.CURRENT
    };

    todos.push(todo);
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








//удаление

const TODO_STATE = {
    CURRENT: 'CURRENT',
    DONE: 'DONE',
    DELETE: 'DELETE'
};

const STORAGE_KEYS = {
    TODOS: ''
};



