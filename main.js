// Selectors
    const toDoInput = document.querySelector('.todo-input');
    const toDoButton = document.querySelector('.todo-button');
    const toDoList = document.querySelector('.todo-list');
    const filterSelect = document.querySelector('.filter-todo');
    const filterOptions = document.querySelectorAll('.todo-option');

// Fucntions

const addToDo = e => {
    //Prevent form from submitting
    e.preventDefault(); /* 1 */
    //Create todo div
    if(toDoInput.value === '') {
        alert('Невозможно добавить пустую задачу');
    } else {
        const toDoDiv = document.createElement('div');
        toDoDiv.classList.add('todo');
        //Create li
        const newToDo = document.createElement('li');
        newToDo.textContent = toDoInput.value
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);
        //Add to storage
        saveLocal(toDoInput.value);
        //Create buttons
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        toDoDiv.appendChild(completedButton);
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
        deleteButton.classList.add('delete-btn');
        toDoDiv.appendChild(deleteButton);
        // Append to list
        toDoList.appendChild(toDoDiv);
        //Clear Todo input
        toDoInput.value = '';
    }
};


const deleteCheck = e => {
    console.log(e.target.parentElement.classList.contains(''))
    // Delete Todo
    if(e.target.classList.contains('delete-btn')) {
        e.target.parentElement.classList.add('fall');
        removeLocalStorage(e.target.parentElement);
        e.target.parentElement.addEventListener('transitionend', () => { /* 2 */
            e.target.parentElement.remove();
        });
    }

    // CHECK ToDo
    if(e.target.classList.contains('complete-btn')) {
        e.target.parentElement.classList.toggle('completed');
    }
};

const filterList = (e) => {
    const todos = toDoList.childNodes;
    todos.forEach(task => {
        switch (e.target.value){
            case 'all':
                task.style.display = 'flex';
                break;
            case 'completed':
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
        }
    });
};

const saveLocal = task => {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(task);
    localStorage.setItem('todos', JSON.stringify(todos));
};

const checkLocalStorage = () => {
    if( localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
};

const getTodos = () => {
    checkLocalStorage();
    todos.forEach(task => {
        const toDoDiv = document.createElement('div');
        toDoDiv.classList.add('todo');
        //Create li
        const newToDo = document.createElement('li');
        newToDo.textContent = task;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);
        //Create buttons
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        toDoDiv.appendChild(completedButton);
    
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
        deleteButton.classList.add('delete-btn');
        toDoDiv.appendChild(deleteButton);
        // Append to list
        toDoList.appendChild(toDoDiv);
    })
};

const removeLocalStorage = (task) => {
    checkLocalStorage();
    todos.splice(todos.indexOf(task.textContent), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
};

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
toDoButton.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
filterSelect.addEventListener('change', filterList);

