const deleteButtons = document.querySelectorAll('.delete');
const checkmarks = document.querySelectorAll('.checkmark');
const taskInput = document.querySelector('.task-input input');
const addButton = document.querySelector('.add-task');
const toDoList = document.querySelector('.task-list')


const filters = document.querySelectorAll('.filter')

let tasksArray = [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function renderTask(task) {
    const newItem = document.createElement("li");
    newItem.classList.add('task');
    if (task.completed) {
        newItem.classList.add('completed');
    }
    newItem.setAttribute('data-index', tasksArray.length - 1);

    const checkmark = document.createElement('span');
    checkmark.classList.add('checkmark');
    checkmark.innerText = task.completed ? '✓' : '';
    newItem.appendChild(checkmark);

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.classList.add('task-text');
    newItem.appendChild(taskText);

    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('delete');
    deleteBtn.textContent = '×';
    newItem.appendChild(deleteBtn);

    toDoList.appendChild(newItem);
}

addButton.addEventListener('click', () => {
    const input = taskInput.value.trim();
    if (input === '') return;

    const task = { text: input, completed: false };
    tasksArray.push(task);
    saveTasks();
    renderTask(task);
    taskInput.value = '';
});

checkmarks.forEach(checkmark => {
    checkmark.addEventListener('click', () => {
        const item = checkmark.closest('li');
        if (item.classList.contains('completed')) {
            item.classList.remove('completed');
            checkmark.innerText = ' ';
        } else {
            item.classList.add('completed');
            checkmark.innerText = '✓';
        }
    });
});


toDoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('checkmark')) {
        const item = event.target.closest('li');
        item.classList.toggle('completed');
        event.target.innerText = item.classList.contains('completed') ? '✓' : '';
        const index = item.getAttribute('data-index');
        tasksArray[index].completed = item.classList.contains('completed');
        saveTasks();
    } else if (event.target.classList.contains('delete')) {
        const taskItem = event.target.closest('li');
        if (taskItem) {
            const index = taskItem.getAttribute('data-index');
            tasksArray.splice(index, 1);
            saveTasks();
            toDoList.innerHTML = '';
            tasksArray.forEach(renderTask);
        }
    }
});

filters.forEach(filter => {
    filter.addEventListener('click', (event) => {
        filters.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        const taskList = document.querySelectorAll('li')
        taskList.forEach(task => {
            const currentFilter = event.target.textContent;
            if (currentFilter === 'Active') {
                if (task.classList.contains('completed')) {
                    task.style.display = 'none';
                } else {
                    task.style.display = 'flex';
                }
            } else if (currentFilter === 'Completed') {
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                } 
            } else if (currentFilter === 'All') {
               task.style.display = 'flex';
            }   
        })
    })
});

function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasksArray = storedTasks;
  tasksArray.forEach(renderTask);
}

loadTasks();
