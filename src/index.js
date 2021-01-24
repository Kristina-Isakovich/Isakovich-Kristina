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

addTasksBtn.addEventListener('click', () => {
    formTask.style.display = 'flex';
});

resetTaskBtn.addEventListener('click', () => {
    formTask.style.display = 'none';
});



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



