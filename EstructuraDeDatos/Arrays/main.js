const agregarUsuario = document.getElementById("agregarUsuario")
const eliminarUsuario = document.getElementById("eliminarUsuario")
const usuarioInput = document.getElementById("usuarioInput")
const usuariosLista = document.getElementById("usuariosLista")
const aplicarFormulario = document.getElementById("aplicarFormularios")
const agregarPregunta = document.getElementById("agregarPregunta")
const selectForm = document.getElementById("selectForm")
const formularioLista = document.getElementById("formularioLista")

let formulario = [
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

let pregunta = []

let usuarios = []

let respuestas = [
    {
        idUsuario: 1,
        idPregunta: 1,
        idOpcion: 1
    }
]

function agregarUsuarios(nombre) {
    const idArray = usuarios.length + 1
    usuarios.push({ "id": idArray, "nombre": nombre })
}
function eliminarUsuarios() {
    usuarios.pop()
}
function respuestaAleatoria(idPregunta) {
    const elemento = pregunta.find(item => item.idPregunta == idPregunta)
    const num = elemento.opcion.length
    return Math.floor((Math.random() * num))+1
}
function aplicarFormularios() {
    formulario.forEach(form => { // Todos los formularios
        console.log("formulario: " + form.idForm)
        form.preguntas.forEach(elementPregunta=> { // Preguntas
            usuarios.forEach(usu => {
                console.log(form.idForm + "- " + usu.nombre +": "+ respuestaAleatoria(elementPregunta))
            })

        })
    })
}

function agregarPreguntas(numFormulario) {
    let id
    formulario.forEach(item =>{
        if(item.idForm == numFormulario){
            item.preguntas.push(pregunta.length + 1)
            id = item.preguntas.length
        }
    })
    

    const obj =
    {
        idPregunta: pregunta.length+1,
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
    
    pregunta.push(obj)
    console.log(pregunta)

}

function renderizarFormulario(id){
    formularioLista.innerHTML = ""
    const form = formulario.find(item => item.idForm == id)
    let j = 0
    for (let i = 0; i < form.length; i++) {
        while(j < pregunta.length){
            console.log(pregunta[j] == form[i])
            j++
        }
    }

    
    
}

agregarUsuario.addEventListener('click', () => {
    const nombre = usuarioInput.value
    agregarUsuarios(nombre)
    mostrarUsuarios()
})

eliminarUsuario.addEventListener('click', () => {
    eliminarUsuarios()
    mostrarUsuarios()
})

aplicarFormulario.addEventListener('click', () => {
    aplicarFormularios()
})

agregarPregunta.addEventListener('click', () => {
    agregarPreguntas(selectForm.value)
})

selectForm.addEventListener('change', () =>{
    renderizarFormulario(selectForm.value)
})

function mostrarUsuarios() {
    usuariosLista.innerHTML = ""
    usuarios.forEach(usu => {
        usuariosLista.innerHTML += `<li>${usu.nombre}</li>`
    })
}

