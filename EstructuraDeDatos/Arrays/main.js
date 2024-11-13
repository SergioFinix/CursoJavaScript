const agregarUsuario = document.getElementById("agregarUsuario")
const eliminarUsuario = document.getElementById("eliminarUsuario")
const usuarioInput = document.getElementById("usuarioInput")
const usuariosLista = document.getElementById("usuariosLista")
const aplicarFormulario = document.getElementById("aplicarFormularios")
const agregarPregunta = document.getElementById("agregarPregunta")
const selectForm = document.getElementById("selectForm")
const formularioLista = document.getElementById("formularioLista")
// Variables de selección

let formulario = [ // Formularios creados 3
    {
        idForm: 1,
        preguntas: []
    },
    {
        idForm: 2,
        preguntas: []
    },
    {
        idForm: 3,
        preguntas: []
    }
]

let pregunta = [] // Preguntas creadas

let usuarios = [] // Usuarios agregados

let respuestas = [ //
    {
        idUsuario: 1,
        idPregunta: 1,
        idOpcion: 1
    }
]

function agregarUsuarios(nombre) { // Agrega un nuevo usuario
    if(!nombre.trim()) return
    const idArray = usuarios.length + 1
    usuarios.push({ "id": idArray, "nombre": nombre })
}
function eliminarUsuarios() { // Elimina el ultimo usuario
    usuarios.pop()
}
function respuestaAleatoria(idPregunta) { // genera una respuesta int según el num de opciones
    const elemento = pregunta.find(item => item.idPregunta == idPregunta)
    const num = elemento.opcion.length
    return Math.floor((Math.random() * num)) + 1
}
function aplicarFormularios() { // Recorre todos los formularios para calcular
    console.log("-------------")
    formulario.forEach(form => { // Todos los formularios
        console.log("formulario: " + form.idForm)
        form.preguntas.forEach(elementPregunta => { // Preguntas
            usuarios.forEach(usu => {
                console.log(form.idForm + "- " + usu.nombre + ": " + respuestaAleatoria(elementPregunta))
                // Guardar las respuestas aquí
            })

        })
    })
}

function agregarPreguntas(numFormulario, preguntaData) { // Agrega una nueva pregunta
    let bodyText = ""
    formulario.forEach(item => {
        if (item.idForm == numFormulario) {
            item.preguntas.push(pregunta.length + 1)
            id = item.preguntas.length
        }
    })


    const obj = // Remplaza el objData
    {
        idPregunta: pregunta.length + 1,
        texto: "terminado?",
        opcion: [
            {
                idOpcion: 1,
                texto: "si"
            },
            {
                idOpcion: 2,
                texto: "no"
            }
            ,
            {
                idOpcion: 3,
                texto: "tal vez"
            }
        ]
    }

    bodyText += `<h2>${obj.texto}</h2><select>`
    obj.opcion.forEach(item =>{
        bodyText += `<option>${item.texto}</option>`
    })
    bodyText += `</select>`
    formularioLista.innerHTML += bodyText
    pregunta.push(obj)

}

function renderizarFormulario(id) { // Agrega los elementos de Form a la lista
    formularioLista.innerHTML = ""
    const form = formulario.find(item => item.idForm == id)
    let aux
    let bodyText = ""
    form.preguntas.forEach(formPregunta => {
        aux = pregunta.find(item => item.idPregunta == formPregunta)
        bodyText += `<h2>${aux.texto}</h2><ul>`
        aux.opcion.forEach(opcion => {
            bodyText += `
                    <li>
                        ${opcion.texto}
                    </li>
                `

        })
        bodyText += "</ul>"
        formularioLista.innerHTML = bodyText
    })




}

// Disparadores de los botones
agregarUsuario.addEventListener('click', () => {
    const nombre = usuarioInput.value
    agregarUsuarios(nombre)
    renderizarUsuario()
})

eliminarUsuario.addEventListener('click', () => {
    eliminarUsuarios()
    renderizarUsuario()
})

aplicarFormulario.addEventListener('click', () => {
    aplicarFormularios()
})

agregarPregunta.addEventListener('click', () => {
    agregarPreguntas(selectForm.value)
})

selectForm.addEventListener('change', () => {
    renderizarFormulario(selectForm.value)
})

function renderizarUsuario() {
    usuariosLista.innerHTML = ""
    usuarios.forEach(usu => {
        usuariosLista.innerHTML += `<li>${usu.nombre}</li>`
    })
}

