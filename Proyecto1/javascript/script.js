
const botonAgregarFila = document.getElementById("botonGuardar");
const botonEditar=document.getElementById("botonGuardar2");
const tabla = document.getElementById("listado").getElementsByTagName("tbody")[0];
let mensajeError= document.getElementById("mensajeError");
const divAgregarTarea = document.getElementById("agregarTarea");
const divEditarElemento = document.getElementById("editarTarea");
let idTarea =20241100;
//Array de usuarios,tareas y estatus 
let tareas=[];
const botonAgregarTarea = document.getElementById("botonAgregarTarea");

const resultado = document.getElementById('resultado');
const usuarios1 = document.getElementById("listadoUsuarios");
const usuarios2 = document.getElementById("listadoUsuarios2");
const logDiv = document.getElementById('log');

//tareas[0]={id: "1", nombre:"Clementine Bauch",tarea:"Hacer informe",estatus:"En proceso"};

//mostrar el div de agregar tarea
botonAgregarTarea.addEventListener("click",()=>{
  divAgregarTarea.className="";
  divAgregarTarea.className="mostrar";
  divEditarElemento.className="";
  divEditarElemento.className="ocultar";

});

//llamada a la API y uso de promesas
for(num=1;num<=10;num++){
     listar(num);
   }

   function listar(num){
     let  numberValue = 0;
     numberValue=num;

     if (isNaN(numberValue) || numberValue > 10 || numberValue < 1) {
       alert('Por favor, introduce un número válido entre 1 y 10.');
       return; // Salir de la función si el número no es válido o es mayor que 10
     }

     // Si el número es válido, hacemos la llamada a la API
     hacerLlamadaApi(numberValue)
       .then((data) => {
         // Mostrar resultado exitoso si la API devuelve datos
         mostrarResultado(`${data.name}`, true);
       })
       .catch((error) => {
         // Mostrar mensaje de error si la llamada a la API falla
         mostrarResultado(`Error de consulta: ${error.message}`, false);
       });
   };

   function hacerLlamadaApi(userId) {
     return new Promise((resolve, reject) => {
       // Usamos el ID introducido por el usuario para hacer la llamada a la API
       fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
         .then((response) => {
           if (response.ok) {
             return response.json(); // Si la respuesta es exitosa, convertirla a JSON
           } else {
             reject(new Error('Usuario no encontrado.'));
           }
         })
         .then((data) => resolve(data)) // Resolver la promesa con los datos obtenidos
         .catch(() => reject(new Error('No se pudo conectar con la API.'))); // Error en la conexión
     });
   }

   function mostrarResultado(mensaje, exito) {    
           
     let option1=document.createElement("option");
     let option2=document.createElement("option");
     option1.value=mensaje;
     option1.textContent=mensaje;
     option2.value=mensaje;
     option2.textContent=mensaje;
     usuarios1.appendChild(option1);
     usuarios2.appendChild(option2);      
     resultado.className = exito ? 'exito' : 'fracaso';
   }

// Función para agregar una nueva fila al final de la lista
botonAgregarFila.addEventListener("click", () => {
     //incremento id de tarea
     idTarea++;
     //Obtener valores seleccionados
     let id = idTarea;
     let usuario = document.getElementById("listadoUsuarios").value;
     let estado = document.getElementById("edo").value;
     let tarea1= document.getElementById("tarea1").value;
     //console.log(`${id} usuario:${usuario} edo:${estado} tarea:${tarea1}  `);
     const regex = /^[A-Za-z0-9 ]{1,25}$/;
     //validarTarea();
     if(tarea1!="" && regex.test(tarea1)){         

     // Crear una nueva fila
     let nuevaFila = document.createElement("tr");
     nuevaFila.id="fila3";

     // Crear las celdas
     let celdaId = document.createElement("td");
     let celdaUsuario = document.createElement("td");
     let celdaTarea = document.createElement("td");
     let celdaEstado = document.createElement("td");
     let celdaOperaciones = document.createElement("td");
     let botonEliminar =document.createElement("button");
     let botonEditar =document.createElement("button");

     // Asignar valores a las celdas
     celdaId.textContent = id;
     celdaUsuario.textContent = usuario;
     celdaTarea.textContent = tarea1;
     celdaEstado.textContent = estado;
     botonEliminar.textContent ="Eliminar";
     botonEditar.textContent ="Editar";
     celdaOperaciones.textContent="";
     botonEliminar.addEventListener('click',()=>{
          eliminarElemento(nuevaFila.rowIndex-1);
     });
     botonEditar.addEventListener('click',()=>{
          editarElemento(nuevaFila.rowIndex-1);
     });
     // Agregar las celdas a la fila
     nuevaFila.appendChild(celdaId);
     nuevaFila.appendChild(celdaUsuario);
     nuevaFila.appendChild(celdaTarea);
     nuevaFila.appendChild(celdaEstado);
     nuevaFila.appendChild(nuevaFila.appendChild(botonEliminar),nuevaFila.appendChild(botonEditar));
     //nuevaFila.appendChild(botonEliminar);

     // Insertar la nueva fila al final del cuerpo de la tabla
     tabla.appendChild(nuevaFila);
     //despues de agregar inicializo elementos
     document.getElementById("tarea1").value="";
     document.getElementById("listadoUsuarios").value="Clementine Bauch";
     document.getElementById("edo").value="Creado";
     //borrar mensajes de error de captura
     mensajeError.innerHTML= "";
     //ocultar div de captura
     divAgregarTarea.className="";
     divAgregarTarea.className="ocultar";
     //
     tareas.push({id:`${id}`, nombre:`${usuario}`,tarea:`${tarea1}`,estatus:`${estado}`});
     console.log(tareas);
     logMessage(`Se agrego tarea "${tarea1}" con el id "${id}" a nombre de "${usuario}" con el staus de "${estado}"`);

     }// fin de if
          else{ //error de captura
               //console.log("Campo vacio");                    
               mensajeError.innerHTML="Error de captura, debe de tener un nombre de tarea, no mayor de 25 caracteres y sin caracteres especiales";
          }
     });
     //eliminar elementos
     function eliminarElemento(fila) {
          const elementoLista = document.getElementById("listado");
          const idEliminiado =elementoLista.rows[fila+1].cells[0].textContent;
          elementoLista.deleteRow(fila+1); // Elimina el elemento seleccionado
          tareas.splice(fila,1);

          logMessage(`Se elimino tarea con el id "${idEliminiado}" `);
          //ocultar editar y nuevo si estan visibles
          divEditarElemento.className="";
          divEditarElemento.className="ocultar";
          divAgregarTarea.className="";
          divAgregarTarea.className="ocultar";
          //console.log(tareas);
      }
      function editarElemento(fila) {
        const elementoLista = document.getElementById("listado");
        const usuarioEditar=document.getElementById("listadoUsuarios2");
        const tareaEditar=document.getElementById("tarea2");
        const estadoEditar=document.getElementById("edo2");
        const filaEditar=document.getElementById("numeroFila");
        
        divEditarElemento.className="";
        divEditarElemento.className="mostrar";
        divAgregarTarea.className="";
        divAgregarTarea.className="ocultar";

          usuarioEditar.value=elementoLista.rows[fila+1].cells[1].textContent;
          tareaEditar.value=elementoLista.rows[fila+1].cells[2].textContent;
          estadoEditar.value=elementoLista.rows[fila+1].cells[3].textContent;
          filaEditar.innerHTML = fila+1;
          
      }

      botonEditar.addEventListener("click",()=>{
        const filaEditar= parseInt(document.getElementById("numeroFila").innerHTML-1);
        //const tareaEditar= document.getElementById("tarea2").innerHTML;        
        divEditarElemento.className="";
        divEditarElemento.className="ocultar";
        //console.log(filaEditar);
        //const regex = /^[A-Za-z0-9 ]{1,25}$/;
     //validarTarea();
     //if(tareaEditar!="" && regex.test(tareaEditar)){  
        editarFila(filaEditar);
     //}
      });
      function editarFila(fila){
        const elementoLista = document.getElementById("listado");
        const usuarioEditar=document.getElementById("listadoUsuarios2");
        const tareaEditar=document.getElementById("tarea2");
        const estadoEditar=document.getElementById("edo2");
        //const filaEditar=document.getElementById("numeroFila");
        const divEditarElemento = document.getElementById("editarTarea");
        const idElemento = elementoLista.rows[fila+1].cells[0].textContent;

        divEditarElemento.className="";
        divEditarElemento.className="ocultar";
        
        
        elementoLista.rows[fila+1].cells[1].textContent = usuarioEditar.value;
        elementoLista.rows[fila+1].cells[2].textContent =tareaEditar.value;
        elementoLista.rows[fila+1].cells[3].textContent = estadoEditar.value;
        logMessage(`Se modifico la tarea con el id "${idElemento}"-> nombre:"${usuarioEditar.value}",status:"${estadoEditar.value},tarea:${tareaEditar.value}"`);
        
        //elementoLista.deleteRow(fila+1); // Modifica el elemento seleccionado
        //elementoLista.rows[fila+1].cells[1].textContent=datos;
        //tareas.splice(fila+1,0)=datos; // Modifica el elemento de la lista
        //console.log(fila);

      }

      // Función para registrar mensajes en el log
      function logMessage(message) {
        const newLog = document.createElement('p');
        newLog.textContent = message;
        logDiv.appendChild(newLog);
        logDiv.scrollTop = logDiv.scrollHeight; // Desplazar hacia el final del log
    }

      