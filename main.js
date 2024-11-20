
const usuario_select = document.getElementById("usuario_select")
const estado_select = document.getElementById("estado_select")
const nombre_input = document.getElementById("nombre_input")
const seguimiento_movimiento = document.getElementById("seguimiento_movimiento")
const container = document.querySelector(".agregar_container");
const titulo_form = document.getElementById("titulo_form") 

let usuarios = [] // Por si se necesitan los datos luego
let tareas = [] // donde se guardan las tareas agregadas
let tipoAccion = 0 // para decidir si es nueva tarea o actualizarla
let idSelect = 0 // Id del alemento seleccionado

// Petición A la API
async function getUsarios() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const res = await response.json()
        return res
    } catch (error) {
        console.error(error)
        return null
    }
}

// Función para agregar Usuarios dentro de la tabla
async function agregarUsuarios() {
    const data = await getUsarios()
    usuarios = data
    const tablaUsuario = document.getElementById("usarios_tabla")

    data.forEach(element => {
        const fila = document.createElement("tr")
        const id = document.createElement("td")
        id.textContent = element.id

        const nombre = document.createElement("td")
        nombre.textContent = element.name
        nombre.addEventListener('click', () => { // Evento para observar sus tareas asignadas
            // Agregar metodo para cargar tareas en la tabla al leer un array (Tareas)
            agregarTareas(element.id)
        })

        fila.appendChild(id)
        fila.appendChild(nombre)
        tablaUsuario.appendChild(fila) // Agregado a la tabla

        const option = document.createElement("option") // Agregado del opciones
        option.value = element.id
        option.textContent = element.name
        usuario_select.appendChild(option)

        tareas.push( // Array con respuestas
            {
                idUsuario: element.id,
                tarea: []
            }
        )
    });
}

// Añade los elementos guardados en el array tarea a la tabla
function agregarTareas(idUsuario) {
    const tareas_tabla = document.getElementById("tareas_tabla")
    tareas_tabla.innerHTML = ""
    const element = tareas.find(element => element.idUsuario === idUsuario)
    seguimiento_movimiento.innerText = ""
    if (!element) return


    element.tarea.forEach(tarea => {
        const fila = document.createElement("tr")
        fila.setAttribute("class", `task-${tarea.id}-row`)
        const estado = document.createElement("td")
        estado.textContent = tarea.estado

        const nombre = document.createElement("td")
        nombre.textContent = tarea.nombre

        const opciones = document.createElement("td")
        const eliminar = document.createElement("button")
        eliminar.textContent = "Eliminar"
        eliminar.addEventListener('click', () => {
            eliminarElemento(element.idUsuario, tarea.id)
            document.querySelector(`.task-${tarea.id}-row`).style.display = 'none'
        })

        const editar = document.createElement("button")
        editar.textContent = "Editar"
        editar.addEventListener('click', () => {
            editarTarea(element.idUsuario, tarea.id)
        })

        fila.appendChild(nombre)
        fila.appendChild(estado)
        opciones.appendChild(eliminar)
        opciones.appendChild(editar)
        fila.appendChild(opciones)
        tareas_tabla.appendChild(fila) // Agregado a la tabla

    })
}

// Mostrar la ventana para guardar una nueva tarea
function mostrarBotonAgregar() {
    container.classList.toggle("ocultar");
    titulo_form.innerText = "Nueva Tarea"
    tipoAccion = 0
}

function getDatosFormularioGuardarTarea() { // Obtiene los datos del formulario (section)
    const usuario = usuario_select.value
    const estado = estado_select.value
    const nombre = nombre_input.value.trim()
    return {
        "usuario": usuario,
        "estado": estado,
        "nombre": nombre
    }
}

// guardar los datos de la tarea en el array tareas
function guardarActividad() {
    const data = getDatosFormularioGuardarTarea()
    if(data.nombre.length <= 0){
        alert("Agregue un titulo")
        return
    }

    if (tipoAccion == 0) { // Guarda
        const usuario_listado = tareas.find(e => e.idUsuario == data.usuario)

        usuario_listado.tarea.push(
            { id: usuario_listado.tarea.length + 1, nombre: data.nombre, "estado": data.estado },
        )
        seguimiento_movimiento.innerText = "Se ha agregado una tarea"
    } else{ // Actualiza
        const usuario_listado = tareas.find(e => e.idUsuario == data.usuario)

        const tarea = usuario_listado.tarea.find(e => e.id == idSelect) // modifica
        tarea.nombre = data.nombre
        tarea.estado = data.estado

        seguimiento_movimiento.innerText = "Se ha modificado la tarea"
        container.classList.add("ocultar");

    }
}


function eliminarElemento(id, idElement) {
    // Realizar un map a tareas y su id de tarea y luego reemplazar tareas
    const tarea = tareas.find(e => e.idUsuario == id)
    tarea.tarea = tarea.tarea.filter(item => item.id !== idElement) // Remplaza el array con otro, volver 
    seguimiento_movimiento.innerText = "Se ha eliminado una tarea"
}

function editarTarea(idUsuario, idTarea) { // Metodo para abrir el panel de modificación
    container.classList.remove("ocultar")
    titulo_form.innerText = "Modificar Tarea"
    const usuarioTarea = tareas.find(e => e.idUsuario == idUsuario)
    const tarea = usuarioTarea.tarea.find(e => e.id == idTarea)

    estado_select.value = tarea.estado
    nombre_input.value = tarea.nombre
    usuario_select.value = usuarioTarea.idUsuario
    tipoAccion = 1
    idSelect = tarea.id

}

agregarUsuarios() // Inicializa