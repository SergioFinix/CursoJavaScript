document.addEventListener("DOMContentLoaded", function () {
    // Llenar selectores con opciones predefinidas
    const respuestas = ["No me gusta", "Soy neutral", "Me gusta mucho", "Soy muy fan"];
    const selectIds = ["e1p1", "e1p2", "e1p3", "e2p1", "e2p2", "e2p3", "e3p1", "e3p2", "e3p3"];
    selectIds.forEach(id => {
        const selectElement = document.getElementById(id);
        respuestas.forEach(respuesta => {
            const option = document.createElement("option");
            option.value = respuesta;
            option.textContent = respuesta;
            selectElement.appendChild(option);
        });
    });

    // Modo claro y oscuro
    const lightModeBtn = document.getElementById("lightModeBtn");
    const darkModeBtn = document.getElementById("darkModeBtn");

    function enableLightMode() {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
    }

    function enableDarkMode() {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
    }

    lightModeBtn.addEventListener("click", enableLightMode);
    darkModeBtn.addEventListener("click", enableDarkMode);

    // Validaciones de entrada
    const nombreRegex = /^[A-Za-z\s]{1,15}$/;
    const apellidosRegex = /^[A-Za-z\s]{1,25}$/;

    const nombreInput = document.getElementById("Nombre");
    const nombreError = document.getElementById("nombreError");
    const apellidosInput = document.getElementById("apellidos");
    const apellidosError = document.getElementById("apellidosError");

    function validarNOMBRE(nombre) {
        return nombreRegex.test(nombre);
    }

    function validarAPELLIDOS(apellidos) {
        return apellidosRegex.test(apellidos);
    }

    nombreInput.addEventListener("input", () => {
        const nombreValue = nombreInput.value;
        nombreError.textContent = validarNOMBRE(nombreValue) ? "" : "Por favor, introduce solo letras (máximo 15 caracteres)";
    });

    apellidosInput.addEventListener("input", () => {
        const apellidosValue = apellidosInput.value;
        apellidosError.textContent = validarAPELLIDOS(apellidosValue) ? "" : "Por favor, introduce solo letras (máximo 25 caracteres)";
    });

    // Enviar datos al servidor
    document.getElementById("generalesForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const formEle = document.getElementById("generalesForm");
        const formData = new FormData(formEle);

        setTimeout(() => {
            fetch("https://script.google.com/macros/s/AKfycbyi1Tu7WPqZUkCzvrisH4SVxatiuj7wXgLw4shq3aNkswUUmRXrlJczp-HnZlSlIG_sLA/exec", {
                method: "POST",
                body: formData
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    alert(`Sus datos han sido enviados. Gracias: ${data.message}`);
                    formEle.reset();
                    location.reload();
                })
                .catch((error) => {
                    console.log(error);
                    alert("Hubo un error al enviar la solicitud. Por favor, inténtelo de nuevo más tarde.");
                });
        }, 1000);
    });

    // Manejo de gráficos y tabla
    async function fetchAndRenderCharts() {
        const respuestaMapping = {
            "No me gusta": 1,
            "Soy neutral": 2,
            "Me gusta mucho": 3,
            "Soy muy fan": 4
        };

 function createChart(canvasId, chartData, chartTitle) {
        const ctx = document.getElementById(canvasId).getContext("2d");
        return new Chart(ctx, {
            type: "bar",
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: chartTitle }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
        try {
            const response = await fetch("https://script.google.com/macros/s/AKfycbyi1Tu7WPqZUkCzvrisH4SVxatiuj7wXgLw4shq3aNkswUUmRXrlJczp-HnZlSlIG_sLA/exec");
            const result = await response.json();
            console.log(result);
            if (result.status === "success") {
                const data = result.data;

                const labels = data.map(row => row.Nombre);

                // Llenar tabla y agregar eventos
                const tableBody = document.querySelector("#apiTable tbody");
                tableBody.innerHTML = ""; // Limpiar tabla

                data.forEach(row => {
                    const tableRow = document.createElement("tr");
                    tableRow.innerHTML = `
                        <td>${row.Nombre}</td>
                        <td>${row.apellidos}</td>
                    `;
                    tableRow.addEventListener("click", () => actualizarGraficaT(row));
                    tableBody.appendChild(tableRow);
                });

                // Crear gráficas generales
                createChart("chartEncuesta1", generarData(data, respuestaMapping, "e1"), "Resultados Encuesta 1");
                createChart("chartEncuesta2", generarData(data, respuestaMapping, "e2"), "Resultados Encuesta 2");
                createChart("chartEncuesta3", generarData(data, respuestaMapping, "e3"), "Resultados Encuesta 3");
            } else {
                console.error("Error al obtener datos:", result.message);
            }
        } catch (error) {
            console.error("Error en fetch:", error);
        }
    }

    function generarData(data, mapping, prefix) {
        return {
            labels: data.map(row => row.Nombre),
            datasets: ["p1", "p2", "p3"].map((key, i) => ({
                label: `${prefix}${key}`,
                data: data.map(row => mapping[row[`${prefix}${key}`]] || 0),
                backgroundColor: `rgba(${75 * (i + 1)}, ${192 * (i + 1)}, ${192 / (i + 1)}, 0.2)`,
                borderColor: `rgba(${75 * (i + 1)}, ${192 * (i + 1)}, ${192 / (i + 1)}, 1)`
            }))
        };
    }

    function actualizarGraficaT(row) {
        const respuestaMapping = {
            "No me gusta": 1,
            "Soy neutral": 2,
            "Me gusta mucho": 3,
            "Soy muy fan": 4
        };

        const dataT = [
            respuestaMapping[row.e1p1] || 0,
            respuestaMapping[row.e1p2] || 0,
            respuestaMapping[row.e1p3] || 0,
            respuestaMapping[row.e2p1] || 0,
            respuestaMapping[row.e2p2] || 0,
            respuestaMapping[row.e2p3] || 0,
            respuestaMapping[row.e3p1] || 0,
            respuestaMapping[row.e3p2] || 0,
            respuestaMapping[row.e3p3] || 0
        ];

        encuestaTChart.data.labels = [
            "E1P1", "E1P2", "E1P3",
            "E2P1", "E2P2", "E2P3",
            "E3P1", "E3P2", "E3P3"
        ];
        encuestaTChart.data.datasets[0].data = dataT;
        encuestaTChart.update();
    }

    let encuestaTChart = new Chart(document.getElementById("chartEncuestaT").getContext("2d"), {
        type: "bar",
        data: {
            labels: [],
            datasets: [{ label: "Resultados", data: [], backgroundColor: "rgba(75, 192, 192, 0.2)", borderColor: "rgba(75, 192, 192, 1)" }]
        },
        options: { responsive: true }
    });

    fetchAndRenderCharts();
});
