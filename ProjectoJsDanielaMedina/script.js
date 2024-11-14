let UserSelect = document.getElementById ("userSelect");
let CuerpoTabla = document.getElementById ("CuerpoTabla");
let jsonNames = {}

async function LlenarSelect () {
    const response = await fetch ("https://jsonplaceholder.typicode.com/users")
    const data = await response.json()
    console.log (data)
    let optionfragment = document.createDocumentFragment ()
    data.forEach ((user)=> {
        let option = document.createElement("option")
        option.textContent = user.name
        option.value = user.id 
        optionfragment.appendChild (option)

        jsonNames[user.id] = user.name;
    })
UserSelect.append (optionfragment)
    
}
LlenarSelect ()

document.getElementById ("GuardarTarea") .addEventListener ("click",()=>{
    let EstadoTarea = document.getElementById ("statusSelect").value
    let NombreTarea = document.getElementById ("taskInput").value
    let UsuarioId = UserSelect.value   

    let tablafragment = document.createDocumentFragment()
    let tr = document.createElement ("tr")
    tr.id = UsuarioId;
    let TableContent = `
        <td>${UsuarioId}</td>
        <td id="Usuario">${jsonNames[UsuarioId]}</td>                
        <td id="Tarea">${NombreTarea}</td>
        <td id="Estado">${EstadoTarea}</td>
        <td>
        <button class="BotonEliminar" id=${UsuarioId} onClick="Eliminar('${NombreTarea}')">Eliminar</button>
        <button class="BotonEditar" id=${UsuarioId} onClick="Editar(${UsuarioId})" data-bs-toggle="modal" data-bs-target="#editTaskModal">Editar</button>
        </td>`
        let EstadoActividades = document.getElementById ("EstadoActividades");
        EstadoActividades.innerHTML = `
        <td>Se agregó la tarea ${NombreTarea} a ${jsonNames[UsuarioId]}</td>
        `
NombreTarea = '';

tr.innerHTML =TableContent
tablafragment.appendChild (tr)
CuerpoTabla.appendChild (tr)

})

function Eliminar (tarea) {
    let rows = Array.from(document.querySelectorAll('#CuerpoTabla tr'))
    rows.forEach(usuario => {

        if (usuario.querySelector('#Tarea').textContent === tarea) {
            usuario.remove(); // Elimina la fila del DOM
        }
        let Usuario = usuario.querySelector ('#Usuario') .textContent;
        let Tarea = usuario.querySelector('#Tarea').textContent;

        let EstadoActividades = document.getElementById ("EstadoActividades");
        EstadoActividades.innerHTML = `
        <td>Se eliminó la tarea ${Tarea} de ${Usuario}</td>
        `
    });
}

function Editar (id) {
    let rows = Array.from(document.querySelectorAll('#CuerpoTabla tr'))
    rows.forEach(usuario => {
        if (parseInt(usuario.id) === parseInt(id)) {
            let tarea = usuario.querySelector('#Tarea').textContent;
            let estado = usuario.querySelector('#Estado').textContent;
            let Usuario = usuario.querySelector('#Usuario').textContent;
           

            let editStatus = document.getElementById ("editStatusSelect");
            editStatus.value = estado

            let editTask = document.getElementById ("editTaskInput");
            let tareaAnterior = editTask.value;
            editTask.value = tarea; 

            document.getElementById ("updateTaskBtn") .addEventListener ("click", ()=> {
                usuario.querySelector('#Tarea').textContent = editTask.value;
                usuario.querySelector('#Estado').textContent = editStatus.value;

            let EstadoActividades = document.getElementById ("EstadoActividades");
            EstadoActividades.innerHTML = `
            <td>La tarea ${tarea}cambió de estado a ${editStatus.value} para el Usuario ${Usuario}</td>
            `

            EstadoActividades.innerHTML = `
            <td>La tarea ${tareaAnterior} cambió a ${editTask.value} para el Usuario ${Usuario}</td>
            `

            });
        }
    });
}
