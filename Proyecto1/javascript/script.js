
const botonAgregarFila = document.getElementById("botonGuardar");
const tabla = document.getElementById("listado").getElementsByTagName("tbody")[0];
let mensajeError= document.getElementById("mensajeError");
//Array de usuarios,tareas y estatus 
let tareas=[];

tareas[0]={id: "1", nombre:"Clementine Bauch",tarea:"Hacer informe",estatus:"En proceso"};
tareas[1]={id: "2", nombre:"Alex",tarea:"Hacer informe",estatus:"En proceso"};

// Función para agregar una nueva fila al final de la lista

botonAgregarFila.addEventListener("click", () => {
     
     //Obtener valores seleccionados
     let id = tareas.length +1;
     let usuario = document.getElementById("nom").value;
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
     // Agregar las celdas a la fila
     nuevaFila.appendChild(celdaId);
     nuevaFila.appendChild(celdaUsuario);
     nuevaFila.appendChild(celdaTarea);
     nuevaFila.appendChild(celdaEstado);
     nuevaFila.appendChild(nuevaFila.appendChild(botonEliminar),nuevaFila.appendChild(botonEditar));
     //nuevaFila.appendChild(botonEliminar);

     // Insertar la nueva fila al final del cuerpo de la tabla
     tabla.appendChild(nuevaFila);
     //despues de agragar inicializo elementos
     document.getElementById("tarea1").value="";
     document.getElementById("nom").value="Clementine Bauch";
     document.getElementById("edo").value="Creado";
     //borrar mensajes de error de captura
     mensajeError.innerHTML= "";
     //
     tareas.push({id:`${id}`, nombre:`${usuario}`,tarea:`${tarea1}`,estatus:`${estado}`});
     console.log(tareas);

     }// fin de if
          else{ //error de captura
               //console.log("Campo vacio");                    
               mensajeError.innerHTML="Error de captura, debe de tener un nombre de tarea, no mayor de 25 caracteres y sin caracteres especiales";
          }
     });
     //eliminar elementos
     function eliminarElemento(fila) {
          const elementoLista = document.getElementById("listado");
          elementoLista.deleteRow(fila+1); // Elimina el elemento seleccionado
          tareas.splice(fila,1);
          //console.log(tareas);
      }
      function editarElemento(fila) {
          //const elementoLista = document.getElementById("listado");
          let datos ="";
          //elementoLista.deleteRow(fila+1); // Modifica el elemento seleccionado
          tareas.splice(fila+1,0)=datos; // Modifica el elemento de la lista
          //console.log(tareas);
      }

      