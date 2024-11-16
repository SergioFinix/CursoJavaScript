document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

let tasks = {};

function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')   //Vinculación con la API
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('user-list');
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user.name;
                li.dataset.userId = user.id;
                li.onclick = () => selectUser(user.id);
                userList.appendChild(li);
                tasks[user.id] = [];
            });
        });
}

function selectUser(userId) {
    const selectedUser = document.querySelectorAll('#user-list li');
    selectedUser.forEach(user => {
        user.classList.remove('selected');
        if (user.dataset.userId == userId) {
            user.classList.add('selected');
        }
    });
    document.getElementById('task-list').dataset.userId = userId;
    displayTasks(userId);
}

function addTask() {                             //Creación de Tabla
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const userId = taskList.dataset.userId;

    if (taskInput.value.trim() === '') {    //Validación ingresar Tarea
        alert('Por favor, ingresa una Tarea.');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskInput.value,
        status: 'Creada'
    };

    tasks[userId].push(task);
    displayTasks(userId);

    taskInput.value = '';
}

function displayTasks(userId) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks[userId].forEach(task => {                   //Arreglo Usuario y tareas asignadas
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = task.text;

        const status = document.createElement('span');
        status.className = `status ${task.status.toLowerCase()}`;
        status.textContent = task.status;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function () {
            tasks[userId] = tasks[userId].filter(t => t.id !== task.id);
            displayTasks(userId);
        };

        const statusButton = document.createElement('button'); //Estados de Tareas
        statusButton.textContent = 'Cambiar Estado';
        statusButton.onclick = function () {
            switch (task.status) {
                case 'Creada':
                    task.status = 'En progreso'; //en Proceso
                    break;
                case 'En progreso':
                    task.status = 'Terminada';   //Terminada
                    break;
                case 'Terminada':
                    task.status = 'Pausada';    // Pausada
                    break;
                case 'Pausada':
                    task.status = 'Creada';     //Creada
                    break;
            }
            displayTasks(userId);
        };

        li.appendChild(span);
        li.appendChild(status);
        li.appendChild(statusButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}
