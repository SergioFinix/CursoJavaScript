//METODO QUE LLENA LOS USUARIOS EN LA TABLA...

let usuarios = "";
async function cargarUsuarios() {
    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
        usuarios = await respuesta.json();
        const tabla = document.querySelector("#usuarios-table tbody");
        console.log("array - may " +usuarios)
        usuarios.forEach(usuario => {
            const fila = document.createElement('tr');
            fila.innerHTML = `<td>${usuario.id}</td><td>${usuario.name}</td>`;
            tabla.appendChild(fila);
        });

      const filasuser = document.querySelectorAll("#usuarios-table tbody tr");
      // Recorrer todas las filas y agregarles un evento de clic
      filasuser.forEach(fila => {
        fila.addEventListener('click', function() {
          //Obtener las celdas (td) de la fila clickeada
          const celdas = fila.getElementsByTagName('td');
          // Extraer la información de cada celda

          const idu = celdas[0].textContent;
          llamarTareas(idu);
        });
      });
      
      // Seleccionamos todas las celdas de la tabla (excluyendo los encabezados)
      const celdas = document.querySelectorAll('#usuarios-table tbody td');
      // Recorremos todas las celdas y les aplicamos el método toUpperCase()
      celdas.forEach(function(celda) {
        celda.textContent = celda.textContent.toUpperCase();
      });
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
    }
}

function llamarTareas(idu){
  const tablad = document.querySelector("#deberes-table tbody");
  const deberesfitrado = deberes.filter(deber => deber.iduser == idu && deber.estado != "ELIMINADA");
  console.log(deberesfitrado)
  tablad.innerHTML = '';
  deberesfitrado.forEach(deberf => {
    const filad = document.createElement('tr');
    filad.innerHTML = `
    <td>${deberf.titulo}</td>
    <td>${deberf.estado}</td>
    <td>
      <input type="button" style="display: inline-block;" onclick="Editar(${deberf.id},${deberf.iduser},'${deberf.titulo}')" value="Editar"/>
      <input style="display: inline-block;" onclick="Eliminar(${deberf.id},${deberf.iduser})" type="button" value="Eliminar"/>
    </td>
    `;
    tablad.appendChild(filad);
  });
}

cargarUsuarios();

function fechaA(){
    let fecha = new Date();
    let año = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;  //devuelve un valor entre 0 y 11, así que sumamos 1
    let día = fecha.getDate();
    return `${año}-${mes}-${día}`;
}

let deberes = [
  {
      id: 1,
      titulo: "ESTUDIAR PARA EL EXAMEN",
      descripcion: "",
      fechaVencimiento: "2024-11-15",
      estado: "PAUSADA", // puede ser 'EN PROGRESO', 'en progreso', 'TERMINADA',
      iduser: 1
    },
    {
      id: 2,
      titulo: "COMPRAR COMIDA",
      descripcion: "",
      fechaVencimiento: "2024-11-12",
      estado: "TERMINADA",
      iduser: 2
    },
    {
      id: 3,
      titulo: "LLAMAR A LA FAMILIA",
      descripcion: "",
      fechaVencimiento: "2024-11-14",
      estado: "EN PROGRESO",
      iduser: 3
    },
    {
      id: 4,
      titulo: "LEER UN LIBRO DE CHISTES",
      descripcion: ".",
      fechaVencimiento: "2024-11-15",
      estado: "PAUSADA", // puede ser 'EN PROGRESO', 'en progreso', 'TERMINADA',
      iduser: 4
    },
    {
      id: 5,
      titulo: "JUGAR FUTBOL POR LA TARDE",
      descripcion: "",
      fechaVencimiento: "2024-11-12",
      estado: "TERMINADA",
      iduser: 5
    },
    {
      id: 6,
      titulo: "ENTRAR A LA CLASE DE ARTE",
      descripcion: "",
      fechaVencimiento: "2024-11-14",
      estado: "EN PROGRESO",
      iduser: 6
    },
    {
      id: 7,
      titulo: "PASAR POR MI HERMANO A LA ESCUELA",
      descripcion: "",
      fechaVencimiento: "2024-11-15",
      estado: "EN PROGRESO", // puede ser 'EN PROGRESO', 'en progreso', 'TERMINADA',
      iduser: 7
    },
    {
      id: 8,
      titulo: "LAVAR LOS TRASTES",
      descripcion: "",
      fechaVencimiento: "2024-11-12",
      estado: "TERMINADA",
      iduser: 8,
    },
    {
      id: 9,
      titulo: "HACER LA TAREA",
      descripcion: "",
      fechaVencimiento: "2024-11-14",
      estado: "PAUSADA",
      iduser: 9,
    },
    {
      id: 10,
      titulo: "HACER EJERCICIO",
      descripcion: "",
      fechaVencimiento: "2024-11-15",
      estado: "EN PROGRESO", // puede ser 'EN PROGRESO', 'en progreso', 'TERMINADA',
      iduser: 10
    },
    {
      id: 11,
      titulo: "LIMPIAR LA CASA",
      descripcion: "",
      fechaVencimiento: "2024-11-12",
      estado: "TERMINADA",
      iduser: 1
    },
    {
      id: 12,
      titulo: "SACAR LA BASURA",
      descripcion: "",
      fechaVencimiento: "2024-11-14",
      estado: "EN PROGRESO",
      iduser: 2
    },
    {
      id: 13,
      titulo: "ORGANIZAR MI CUERTO",
      descripcion: "",
      fechaVencimiento: "2024-11-15",
      estado: "PAUSADA", // puede ser 'EN PROGRESO', 'en progreso', 'TERMINADA',
      iduser: 3
    },
    {
      id: 14,
      titulo: "LAVAR LA ROPA",
      descripcion: "",
      fechaVencimiento: "2024-11-12",
      estado: "PAUSADA",
      iduser: 4
    },
    {
      id: 15,
      titulo: "LIMPIAR LAS VENTANAS",
      descripcion: "",
      fechaVencimiento: "2024-11-14",
      estado: "EN PROGRESO",
      iduser: 5
    },
    {
      id: 16,
      titulo: "CORTARSE EL CABELLO",
      descripcion: "",
      fechaVencimiento: "2024-11-15",
      estado: "EN PROGRESO", // puede ser 'EN PROGRESO', 'en progreso', 'TERMINADA',
      iduser: 6
    },
    {
      id: 17,
      titulo: "COMPRAR COMIDA",
      descripcion: "",
      fechaVencimiento: "2024-11-12",
      estado: "PAUSADA",
      iduser: 7
    },
    {
      id: 18,
      titulo: "LLAMAR A MI MAMA",
      descripcion: "",
      fechaVencimiento: "2024-11-14",
      estado: "EN PROGRESO",
      iduser: 8
    },
    {
      id: 19,
      titulo: "ESTUDIAR MATEMATICAS",
      descripcion: "",
      fechaVencimiento: "2024-11-15",
      estado: "PAUSADA", // puede ser 'EN PROGRESO', 'en progreso', 'TERMINADA',
      iduser: 9
    },
    {
      id: 20,
      titulo: "LIMPIAR Y DESINFECTAR LA FRUTA",
      descripcion: "",
      fechaVencimiento: "2024-11-12",
      estado: "TERMINADA",
      iduser: 10
    },
    {
      id: 21,
      titulo: "REVISAR EL CORREO ELECTRONICO",
      descripcion: "",
      fechaVencimiento: "2024-11-14",
      estado: "EN PROGRESO",
      iduser: 1
    },
    {
      id: 22,
      titulo: "PLANIFICAR LAS ACTIVIDADES MAS IMPORTANTES",
      descripcion: "",
      fechaVencimiento: "2024-11-15",
      estado: "PAUSADA", // puede ser 'EN PROGRESO', 'en progreso', 'TERMINADA',
      iduser: 2
    },
    {
      id: 23,
      titulo: "PREPARARME PARA IR A LA ENTREVISTA DE TRABAJO",
      descripcion: "",
      fechaVencimiento: "2024-11-12",
      estado: "TERMINADA",
      iduser: 3
    },
    {
      id: 24,
      titulo: "ALIMENTAR A LA MASCOTA",
      descripcion: "",
      fechaVencimiento: "2024-11-14",
      estado: "EN PROGRESO",
      iduser: 4
    }
];

function cargarDeberes(){
    const tabladeber = document.querySelector("#deberes-table tbody");
    // Array de objetos que contienen los deberes
    let deberesmismos = [
        {
            id: 1,
            titulo: "LEVANTARCE A LAS 6 PM",
            descripcion: "",
            fechaVencimiento: "2024-11-15",
            estado: "Creada" //En progreso, Terminada, Pausada, Creada
          },
          {
            id: 2,
            titulo: "TENDER LA CAMA",
            descripcion: "",
            fechaVencimiento: "2024-11-12",
            estado: "En progreso"
          },
          {
            id: 3,
            titulo: "DESAYUNAR",
            descripcion: "",
            fechaVencimiento: "2024-11-14",
            estado: "Pausada"
          },
          {
            id: 4,
            titulo: "TOMAR TRANSPORTE PARA LA ESCUELA",
            descripcion: "",
            fechaVencimiento: "2024-11-15",
            estado: "Terminada" 
          },
          {
            id: 5,
            titulo: "eNTRAR A CLASES",
            descripcion: "",
            fechaVencimiento: "2024-11-12",
            estado: "TERMINADA" //En progreso, Terminada, Pausada, Creada
          },
          {
            id: 6,
            titulo: "COMER EL LONCHE EN LA HORA DEL RECESO",
            descripcion: "",
            fechaVencimiento: "2024-11-14",
            estado: "EN PROGRESO"
          },
          {
            id: 7,
            titulo: "TROMAR EL TRANSPORTE DE REGRESO A CASA",
            descripcion: "",
            fechaVencimiento: "2024-11-15",
            estado: "EN PROGRESO"
          },
          {
            id: 8,
            titulo: "HACER LA TAREA",
            descripcion: "",
            fechaVencimiento: "2024-11-12",
            estado: "TERMINADA"
          },
          {
            id: 9,
            titulo: "CENAR CON LA FAMILIA",
            descripcion: "",
            fechaVencimiento: "2024-11-14",
            estado: "EN PROGRESO"
          },
          {
            id: 10,
            titulo: "BAÑARSE Y LAVARSE LOS DIENTES",
            descripcion: "",
            fechaVencimiento: "2024-11-15",
            estado: "EN PROGRESO" 
          },
          {
            id: 11,
            titulo: "DORMIR",
            descripcion: "",
            fechaVencimiento: "2024-11-12",
            estado: "TERMINADA"
          }
    ];

      // Mostrar todos los deberes
      deberesmismos.forEach(deber => {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td style="text-align: left;">${deber.descripcion}</td><td>${deber.estado}</td>`;
        tabladeber.appendChild(fila);
      });
}

const botones = document.querySelectorAll('.btn-tareas');
const tabla_ver = document.querySelector('.no-visible');
const select = document.getElementById('users');

botones.forEach((item, index) => {
  item.addEventListener('click', () => {
      if(index === 0){
        if(validarInput()){
          const selectuser = document.getElementById("users").value;
          const selectestado = document.getElementById("Sestado").value;
          const nomtarea = document.getElementById("ntarea").value;
          let FA = fechaA();
          let narray = deberes.length;// tomamos el nuemro del arreglo para tomarlo como ID de los siguientes datos
          deberes.push({id: narray+=2, titulo: nomtarea, descripcion: "", fechaVencimiento: FA, estado: selectestado,iduser: selectuser});  // Agrega 4 al final
          llamarTareas(selectuser);
          document.getElementById("ntarea").value = "";
          //console.log(deberes);
          //tabla_ver.className = 'no';
          tabla_ver.classList.add('no-visible');
        }
        
      } else if(index === 1){
          tabla_ver.className = '';
          tabla_ver.classList.add('visible'); 

          const listas = document.getElementById('users');
          listas.innerHTML = '';

          usuarios.forEach(usuario => {
            const nuevoElemento = document.createElement("option");
            nuevoElemento.value = usuario.id;
            nuevoElemento.textContent = usuario.name;
            listas.appendChild(nuevoElemento); // Agrega el nuevo elemento a la lista
        });

        // Seleccionamos el <select> por su id
        const opciones = select.querySelectorAll('option');
        opciones.forEach(function(opcion) {
            opcion.textContent = opcion.textContent.toUpperCase();
        });

      }
  });
});

function cMayuscula(e) {
  e.value = e.value.toUpperCase();
}

function validarInput() {
  var input = document.getElementById("ntarea").value;
  var mensaje = document.getElementById("mensaje");
  // Expresión regular que permite solo letras (mayúsculas y minúsculas)
  var regex = /^[A-Z\s]+$/;
  // Validar si el input tiene solo letras y no excede los 25 caracteres
  if (!regex.test(input)) {
      mensaje.textContent = "El input debe contener letras.";
      mensaje.style.color = "red";
      mensaje.style.textAlign = "center"
  } else if (input.length > 25) {
      mensaje.textContent = "El input no puede tener más de 25 caracteres.";
      mensaje.style.color = "red";
      mensaje.style.textAlign = "center"
  } else {
      return true;
  }
}

function Eliminar(ida, idu){
  // Eliminar el deber
  let index = deberes.findIndex(deber => deber.id === ida);
  deberes[index].estado = "ELIMINADA"; // Cambia la propiedad 'estado' a un ELIMINADA
  llamarTareas(idu);
  /*if (index !== -1) {
      console.log("Despues: "+index);
    // Elimina 1 elemento en el índice encontrado
    /*deberes.splice(index, 1);  
    llamarTareas(idu);
  }*/
  console.log(deberes);
}

function Editar(idt, idu, titulo){
  const tabla_tarea = document.querySelector('.quitartarea');
  const tabla_editT = document.querySelector('.edit-no-visible');
  tabla_editT.className = '';
  tabla_editT.classList.add('visible'); 
  document.getElementById("edittarea").value = titulo;
  document.getElementById("idte").value = idt;
  document.getElementById("idue").value = idu;
  
  tabla_tarea.className = '';
  tabla_tarea.classList.add('edit-no-visible');  
}

function volver(){
  const tabla_tarea = document.querySelector('.edit-no-visible');
  const tabla_editT = document.querySelector('.visible');
  tabla_editT.className = '';
  tabla_editT.classList.add('edit-no-visible');
  tabla_tarea.className = '';
  tabla_tarea.classList.add('quitartarea');
}

function GuardarEdit(){
  let idt = document.getElementById("idte").value;
  let title = document.getElementById("edittarea").value;
  let estad = document.getElementById("SestadoE").value;
  let idu = document.getElementById("idue").value;
  // Encuentra el objeto con id=1
  let deber = deberes.find(item => item.id === idt);

  // Si el objeto es encontrado, actualiza sus datos
  if (deber) {
    deber.estado = estad; 
    deber.titulo = title;  
  }

  console.log(deber);

  /*//let index = deberes.findIndex(deber => deber.id === idt);
  console.log(index);
  deberes[index].estado = estad; // Cambia la propiedad 'estado'
  deberes[index].titulo = title; // Cambia la propiedad 'titulo'*/
  volver();
  llamarTareas(idu);
}

//cargarDeberes();
