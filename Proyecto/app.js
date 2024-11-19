// Variables globales
let users = [];
let polls = [];

// Cargar usuarios asincrónicamente
async function loadUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        users = await response.json();
        displayUsers();
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
    }
}

// Mostrar usuarios en la barra lateral
function displayUsers() {
    const userList = document.getElementById('users');
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerText = user.name;
        li.onclick = () => selectUser(user);
        userList.appendChild(li);
    });
}

// Seleccionar usuario y mostrar encuestas para votar
let selectedUser = null;
function selectUser(user) {
    selectedUser = user;
    alert(`Usuario seleccionado: ${user.name}`);
}

// Añadir una nueva opción al formulario de encuesta
function addOption() {
    const optionsContainer = document.getElementById('optionsContainer');
    const optionInput = document.createElement('input');
    optionInput.type = 'text';
    optionInput.className = 'optionInput';
    optionInput.placeholder = `Opción ${optionsContainer.children.length + 1}`;
    optionsContainer.appendChild(optionInput);
}

// Crear una nueva encuesta y añadirla al listado de encuestas
function createPoll() {
    const questionInput = document.getElementById('questionInput');
    const optionInputs = document.querySelectorAll('.optionInput');

    // Obtener la pregunta y las opciones
    const question = questionInput.value.trim();
    const options = Array.from(optionInputs).map(input => input.value.trim()).filter(opt => opt !== '');

    if (question === '' || options.length < 2) {
        alert("Por favor, ingrese una pregunta y al menos dos opciones.");
        return;
    }

    // Crear una nueva encuesta
    const newPoll = {
        question: question,
        options: options,
        votes: Array(options.length).fill(0)  // Inicializar votos en 0
    };
    
    polls.push(newPoll);  // Añadir encuesta a la lista de encuestas
    displayPolls();  // Actualizar encuestas mostradas

    // Limpiar el formulario de encuesta
    questionInput.value = '';
    optionsContainer.innerHTML = '';
    addOption();  // Añadir dos campos de opción por defecto
    addOption();
}

// Mostrar encuestas en el contenedor principal
function displayPolls() {
    const pollsContainer = document.getElementById('pollsContainer');
    pollsContainer.innerHTML = '';
    polls.forEach((poll, index) => {
        const pollCard = document.createElement('div');
        pollCard.classList.add('poll-card');
        
        const pollTitle = document.createElement('h3');
        pollTitle.innerText = `Encuesta ${index + 1}`;
        pollCard.appendChild(pollTitle);

        const question = document.createElement('p');
        question.innerText = poll.question;
        pollCard.appendChild(question);

        poll.options.forEach((option, optIndex) => {
            const optionContainer = document.createElement('div');
            optionContainer.classList.add('option');
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `poll_${index}`;
            radio.value = optIndex;
            radio.onclick = () => castVote(index, optIndex);
            
            const label = document.createElement('label');
            label.innerText = option;

            optionContainer.appendChild(radio);
            optionContainer.appendChild(label);
            pollCard.appendChild(optionContainer);
        });
        
        pollsContainer.appendChild(pollCard);
    });
}

// Registrar voto y actualizar resultados
function castVote(pollIndex, optionIndex) {
    if (!selectedUser) {
        alert("Por favor, seleccione un usuario primero.");
        return;
    }
    polls[pollIndex].votes[optionIndex]++;
    alert("Voto registrado!");
    displayResults();
}

// Mostrar resultados de las encuestas en gráficos
function displayResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    polls.forEach((poll, index) => {
        const chartContainer = document.createElement('div');
        chartContainer.classList.add('chart-container');

        const canvas = document.createElement('canvas');
        canvas.id = `chart_${index}`;
        chartContainer.appendChild(canvas);
        resultsContainer.appendChild(chartContainer);

        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: poll.options,
                datasets: [{
                    label: poll.question,
                    data: poll.votes,
                    backgroundColor: ['#4CAF50', '#FF5733', '#33AFFF', '#FFC300', '#C70039']
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
}

// Cargar usuarios al cargar la página
loadUsers();
