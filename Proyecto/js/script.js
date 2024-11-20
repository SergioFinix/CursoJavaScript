document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://jsonplaceholder.typicode.com/users';
    const userList = document.getElementById('user-list');
    const taskList = document.getElementById('task-list');
    const userSection = document.getElementById('user-section');
    const taskSection = document.getElementById('task-section');
    const taskModal = new bootstrap.Modal(document.getElementById('task-modal')); 
    const taskForm = document.getElementById('task-form');
    const taskNameInput = document.getElementById('task-name');
    const taskStatusInput = document.getElementById('task-status');
    const userNameTitle = document.getElementById('user-name');
    const backButton = document.getElementById('back-button');

    let tasks = [
        { id: 1, userId: 1, name: 'Tarea de ejemplo 1', status: 'Creada' },
        { id: 2, userId: 2, name: 'Tarea de ejemplo 2', status: 'En progreso' },
        { id: 3, userId: 3, name: 'Tarea de ejemplo 3', status: 'Creada' },
        { id: 4, userId: 4, name: 'Tarea de ejemplo 4', status: 'En progreso' },
        { id: 5, userId: 5, name: 'Tarea de ejemplo 5', status: 'Creada' },
        { id: 6, userId: 6, name: 'Tarea de ejemplo 6', status: 'En progreso' },
        { id: 7, userId: 7, name: 'Tarea de ejemplo 7', status: 'Creada' },
        { id: 8, userId: 8, name: 'Tarea de ejemplo 8', status: 'En progreso' },
        { id: 9, userId: 9, name: 'Tarea de ejemplo 9', status: 'Creada' },
        { id: 10, userId: 10, name: 'Tarea de ejemplo 10', status: 'En progreso' }
        
    ];

    let currentUserId = null;

    // Cargar usuarios desde la API
    async function loadUsers() {
        const response = await fetch(apiURL);
        const users = await response.json();

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td class="clickable" data-id="${user.id}">${user.name}</td>
            `;
            userList.appendChild(row);

            row.querySelector('.clickable').addEventListener('click', () => loadTasks(user.id, user.name));
        });
    }

    // Cargar tareas de un usuario
    function loadTasks(userId, userName) {
        currentUserId = userId;
        userNameTitle.textContent = `Tareas de ${userName}`;
        renderTasks();
        userSection.classList.add('d-none');
        taskSection.classList.remove('d-none');
    }

    // Renderizar tareas
    function renderTasks() {
        taskList.innerHTML = '';
        const userTasks = tasks.filter(task => task.userId === currentUserId);

        userTasks.forEach(task => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.id}</td>
                <td>${task.name}</td>
                <td>${task.status}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editTask(${task.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Eliminar</button>
                </td>
            `;
            taskList.appendChild(row);
        });
    }

    // Agregar tarea
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = taskNameInput.value.trim();
        const status = taskStatusInput.value;

        if (!name) {
            alert('El nombre de la tarea no puede estar vacío.');
            return;
        }

        tasks.push({
            id: Date.now(),
            userId: currentUserId,
            name,
            status
        });

        taskModal.hide();
        renderTasks();
        taskForm.reset();
    });

    // Editar tarea
    window.editTask = function (taskId) {
        const task = tasks.find(t => t.id === taskId);
        const newName = prompt('Editar nombre de la tarea:', task.name);
        if (newName && newName.trim()) {
            task.name = newName.trim();
            renderTasks();
        }
    };

    // Eliminar tarea
    window.deleteTask = function (taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    };

    // Mostrar modal para agregar tarea
    document.getElementById('add-task').addEventListener('click', () => {
        taskModal.show();
    });

    // Volver a la lista de usuarios
    backButton.addEventListener('click', () => {
        userSection.classList.remove('d-none');
        taskSection.classList.add('d-none');
    });

    // Cargar usuarios al inicio
    loadUsers();
});
