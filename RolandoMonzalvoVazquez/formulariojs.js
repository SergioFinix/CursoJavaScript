window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    var datosEncuestas = []
    datosUsuarios()
});
// Repositorio simulado (puede ser un objeto en memoria)
const repositorioRespuestas = {
    formulario1: {},
    formulario2: {},
    formulario3: {}
};

// Función para guardar los datos (simulación de promesa)
function guardarDatos(formularioId, respuestas) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            repositorioRespuestas[formularioId] = respuestas;
            resolve(`Datos guardados para ${formularioId}`);
            alert(`Datos guardados para ${formularioId}`)
        }, 1000);  // Simulando retraso
    });
}

// Función para mostrar resultados
function mostrarResultados() {
    const resultado1 = document.getElementById('resultados1');
    const resultado2 = document.getElementById('resultados2');
    const resultado3 = document.getElementById('resultados3');

    resultado1.innerHTML = `
        <strong>Formulario 1: Información Personal</strong><br>
        Nombre: ${repositorioRespuestas.formulario1.nombre}<br>
        Edad: ${repositorioRespuestas.formulario1.edad}<br>
        Estudios: ${repositorioRespuestas.formulario1.estudios}<br>
        Deporte: ${repositorioRespuestas.formulario1.deporte}<br>
    `;
    resultado2.innerHTML = `
        <strong>Formulario 2: Mascotas</strong><br>
        ¿Te gustan las mascotas?: ${repositorioRespuestas.formulario2.mascotas ?? 'Sin respuesta'}<br>
        ¿Tienes alguna mascota?: ${repositorioRespuestas.formulario2.animal ?? 'Sin respuesta'}<br>
        ¿Qué mascota tienes?: ${repositorioRespuestas.formulario2.mascotaselect ?? 'Sin respuesta'}<br>
        ¿Qué mascota exótica te gustaría tener?: ${repositorioRespuestas.formulario2.exotica ?? 'Sin respuesta'}<br><br>
    `;
    resultado3.innerHTML = `
        <strong>Formulario 3: Trabajo</strong><br>
        Relación con compañeros: ${repositorioRespuestas.formulario3.relacion ?? 'Sin respuesta'}<br>
        Relación con jefe(a): ${repositorioRespuestas.formulario3.jefe ?? 'Sin respuesta'}<br>
        Ambiente laboral: ${repositorioRespuestas.formulario3.oficina ?? 'Sin respuesta'}<br><br>
    `;
}


async function datosUsuarios() {
    let listado = document.getElementById('listado')
    const datosUsuarios = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: "GET"
    });
    const responseText = await datosUsuarios.json();
    responseText.map((columna) => {
        listado.innerHTML += `<span onclick="asignarEncuesta(this)" usuario='${columna['id']}' > ${columna['name']} </span>`
    })
}

function asignarEncuesta(e) {
    let usuario = document.getElementById('usuarioSelected')
    let nombre = e.textContent
    usuario.innerHTML = nombre

    document.getElementById('formulario1').reset();
    document.getElementById('formulario2').reset();
    document.getElementById('formulario3').reset();

    document.getElementById('resultados1').innerHTML = '';
    document.getElementById('resultados2').innerHTML = '';
    document.getElementById('resultados3').innerHTML = '';

    document.getElementById('graficas').innerHTML = ''

}


// Función para manejar el envío de formularios
function manejarEnvioFormulario(evento, formularioId, grafica) {
    evento.preventDefault();  // Evitar que el formulario se envíe de la forma tradicional

    let idform = document.getElementById(formularioId).getAttribute('formulario');
    let nombre = document.getElementById('usuarioSelected').textContent;
    let respuestas = [];
    let resultado = [];
    const form = evento.target;

    

    if (nombre == '') {
        alert('debes seleccionar un usuario')
        return
    }
    // Obtenemos los datos del formulario dependiendo del formulario
    if (formularioId === 'formulario1') {
        respuestas.push({
            "idform": idform,
            "usuario": nombre,
            "nombre": form.nombre.value,
            "edad": form.edad.value,
            "estudios": form.estudios.value,
            "deporte": form.deporte.value
        });
        resultado.nombre = form.nombre.value;
        resultado.edad = form.edad.value;
        resultado.estudios = form.estudios.value;
        resultado.deporte = form.deporte.value;
    } else if (formularioId === 'formulario2') {
        respuestas.push({
            "idform": idform,
            "usuario": nombre,
            "mascotas": form.mascotas.value,
            "animal": form.animal.value,
            "mascotaselect": form.mascotaselect.value,
            "exotica": form.exotica.value
        });
        resultado.mascotas = form.mascotas.value;
        resultado.animal = form.animal.options[form.animal.selectedIndex].text;
        resultado.mascotaselect = form.mascotaselect.options[form.mascotaselect.selectedIndex].text;
        resultado.exotica = form.exotica.value;
    } else if (formularioId === 'formulario3') {
        respuestas.push({
            "idform": idform,
            "usuario": nombre,
            "relacion": form.relacion.value,
            "jefe": form.jefe.value,
            "oficina": form.oficina.value
        });
        resultado.relacion = form.relacion.options[form.relacion.selectedIndex].text;
        resultado.jefe = form.jefe.options[form.jefe.selectedIndex].text;
        resultado.oficina = form.oficina.options[form.oficina.selectedIndex].text;
    }

    // Llamamos a la función para guardar los datos y mostrar los resultados
    guardarDatos(formularioId, resultado)
        .then((mensaje) => {
            console.log(mensaje);
            mostrarResultados();
            document.getElementById('graficas').innerHTML = ''
            document.getElementById('graficas').innerHTML = `<canvas id="${grafica}"></canvas>`

            let datos = [];
            let labe = [];
            let color = '#9BD0F5'

            respuestas.map((col) => {
                console.log(col)
                if (col.idform == 1) {
                    color= '#'
                    labe = ['edad', 'estudios', 'deporte']
                    datos.push(col.edad)
                    datos.push(col.estudios)
                    datos.push(col.deporte)
                }
                if (col.idform == 2) {
                    color = '#9bf5dd'
                    labe = ['animal', 'mascota tiene']
                    datos.push(col.animal)
                    datos.push(col.mascotaselect)
                }
                if (col.idform == 3) {
                    color = '#dbdbd5'
                    labe = ['calificación', 'relacion', 'oficina']
                    datos.push(col.jefe)
                    datos.push(col.relacion)
                    datos.push(col.oficina)
                }
            })

            setTimeout(() => {

                console.log(datos)
                var ctx = document.getElementById(grafica);

                var myLineChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labe,
                        datasets: [{
                            label: formularioId,
                            data: datos,
                            borderWidth: 1,
                            backgroundColor: color,
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

            }, 500);


        })
        .catch((error) => {
            console.error('Error al guardar datos:', error);
        });
}

// Añadir eventos a los formularios
document.getElementById('formulario1').addEventListener('submit', (evento) => manejarEnvioFormulario(evento, 'formulario1', 'myChart1'));
document.getElementById('formulario2').addEventListener('submit', (evento) => manejarEnvioFormulario(evento, 'formulario2', 'myChart2'));
document.getElementById('formulario3').addEventListener('submit', (evento) => manejarEnvioFormulario(evento, 'formulario3', 'myChart3'));



