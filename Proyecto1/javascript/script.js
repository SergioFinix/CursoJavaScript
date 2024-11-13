
const botonAgregarFila = document.getElementById("botonGuardar");
const tabla = document.getElementById("listado").getElementsByTagName("tbody")[0];
//Listado de tareas
let tareas=[];


// Función para agregar una nueva fila al final de la tabla

botonAgregarFila.addEventListener("click", () => {
     
     //Obtener valores seleccionados
     let id = 3;
     let usuario = document.getElementById("nom").value;
     let estado = document.getElementById("edo").value;
     let tarea1= document.getElementById("tarea1").value;
     //console.log(`${id} usuario:${usuario} edo:${estado} tarea:${tarea1}  `);
     if(tarea1!=""){

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
     //despues de agragar limpio elemento
     document.getElementById("tarea1").value="";
     document.getElementById("nom").value="Clementine Bauch";
     document.getElementById("edo").value="Creado";
     }// fin de if
     else{
          console.log("Campo vacio");
     }
     });
     //eliminar elementos
     function eliminarElemento(fila) {
          const elementoLista = document.getElementById("listado");
          elementoLista.deleteRow(fila+1); // Elimina el elemento seleccionado
      }