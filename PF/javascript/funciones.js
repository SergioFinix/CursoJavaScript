document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('listado-usuarios'); // Lista de usuarios
    const userSelect = document.getElementById('seleccionar-usuarios'); // Selector de usuarios para resultados
    const resultsChartCtx = document.getElementById('graficos-resultados').getContext('2d'); // Contexto para los gráficos
    let surveyResults = {}; // Objeto para almacenar los resultados de las encuestas

    // Fetch y mostrar usuarios
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                // Crear elementos en la lista de usuarios
                const listItem = document.createElement('li');
                listItem.textContent = user.name;
                userList.appendChild(listItem);

                // Añadir opciones al selector de usuarios
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                userSelect.appendChild(option);
            });
        });

    // Función para manejar el envío de encuestas
    window.subirEncuesta = (surveyId) => {
        const userId = userSelect.value; // Obtener el usuario seleccionado
        if (!userId) {
            alert('Selecciona un usuario para votar.');
            return;
        }

        // Inicializar datos si es necesario
        if (!surveyResults[userId]) surveyResults[userId] = {};
        if (!surveyResults[userId][surveyId]) surveyResults[userId][surveyId] = 0;

        // Registrar voto
        surveyResults[userId][surveyId] += 1;
        alert(`Encuesta ${surveyId} enviada para el usuario ${userId}`);
    };

    // Función para mostrar los resultados en el gráfico
    window.mostarResultados = () => {
        const userId = userSelect.value; // Obtener el usuario seleccionado
        if (!userId || !surveyResults[userId]) {
            alert('Selecciona un usuario con resultados para mostrar.');
            return;
        }

        // Preparar datos del gráfico
        const data = [1, 2, 3].map(id => surveyResults[userId][id] || 0);

        // Crear o actualizar el gráfico
        new Chart(resultsChartCtx, {
            type: 'bar',
            data: {
                labels: ['Encuesta 1', 'Encuesta 2', 'Encuesta 3'],
                datasets: [{
                    label: 'Resultados por encuesta',
                    data: data,
                    backgroundColor: ['#4caf50', '#2196f3', '#ff9800']
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };
});
