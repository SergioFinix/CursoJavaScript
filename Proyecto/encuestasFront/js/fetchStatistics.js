const ctx = document.getElementById('myChart').getContext('2d');
const getSelect = document.getElementById('users');

let urlStatistics;

let myChart;

getSelect.addEventListener('change', function () {
    const getValueSelect = getSelect.value;
    console.log(getValueSelect);
    urlStatistics = `${URLENDPOINT}api/respuesta/${getValueSelect}`;
    GetStatistics()
        .then((data) => {
            const { labels, trueValues, falseValues } = processStatisticsData(data);
            if (myChart) {
                myChart.destroy();
            }
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Respuestas Verdaderas',
                            data: trueValues,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Respuestas Falsas',
                            data: falseValues,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        })
        .catch((error) => {
            console.log(error);
        })
});

function GetStatistics() {
    return new Promise((resolve, reject) => {
        fetch(urlStatistics)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(new Error('Error al obtener usuarios'));
                }
            })
            .then((data) => resolve(data))
            .catch(() => reject(new Error('Error al conectar con API')));
    })
};

function processStatisticsData(data) {
    // Procesa los datos del endpoint para extraer etiquetas y valores
    const labels = Object.keys(data); // Ej: ["Encuesta 1", "Encuesta 2", "Encuesta 3"]
    const trueValues = labels.map((key) => data[key].true); // Valores "true" para cada encuesta
    const falseValues = labels.map((key) => data[key].false); // Valores "false" para cada encuesta

    return { labels, trueValues, falseValues };
}