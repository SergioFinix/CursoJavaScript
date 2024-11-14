//METODO QUE LLENA LOS USUARIOS EN LA TABLA...
async function cargarUsuarios() {
    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
        const usuarios = await respuesta.json();
        //console.log(usuarios);
        const tabla = document.querySelector("#usuarios-table tbody");
        const tablad = document.querySelector("#deberes-table tbody");
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
          const deberesfitrado = deberes.filter(deber => deber.iduser == idu);
          console.log(deberesfitrado)
          tablad.innerHTML = '';
          deberesfitrado.forEach(deberf => {
            const filad = document.createElement('tr');
            filad.innerHTML = `<td>${deberf.titulo}</td><td>${deberf.estado}</td>`;
            tablad.appendChild(filad);
          });

        });
      });

    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
    }
}

cargarUsuarios();

let deberes = [
  {
      id: 1,
      titulo: "ESTUDIAR PARA EL EXAMEN",
      descripcion: "",
      fechaVencimiento: "2024-11-15",
      estado: "pendiente", // puede ser 'pendiente', 'en progreso', 'completado',
      iduser: 1
    },
    {
      id: 2,
      titulo: "COMPRAR COMIDA",
      descripcion: "",
      fechaVencimiento: "2024-11-12",
      estado: "completado",
      iduser: 2
    },
    {
      id: 3,
      titulo: "LLAMAR A LA FAMILIA",
      descripcion: "",
      fechaVencimiento: "2024-11-14",
      estado: "pendiente",
      iduser: 3
    },
    {
      id: 4,
      titulo: "LEER UN LIBRO DE CHISTES",
      descripcion: ".",
      fechaVencimiento: "2024-11-15",
      estado: "pendiente", // puede ser 'pendiente', 'en progreso', 'completado',
      iduser: 4
    },
    {
      id: 5,
      titulo: "JUGAR FUTBOL POR LA TARDE",
      descripcion: "",
      fechaVencimiento: "2024-11-12",
      estado: "completado",
      iduser: 5
    },
    {
      id: 6,
      titulo: "ENTRAR A LA CLASE DE ARTE",
      descripcion: "",
      fechaVencimiento: "2024-11-14",
      estado: "pendiente",
      iduser: 6
    },
    {
      id: 7,
      titulo: "PASAR POR MI HERMANO A LA ESCUELA",
      descripcion: "",
      fechaVencimiento: "2024-11-15",
      estado: "pendiente", // puede ser 'pendiente', 'en progreso', 'completado',
      iduser: 7
    },
    {
      id: 8,
      titulo: "LAVAR LOS TRASTES",
      descripcion: "",
      fechaVencimiento: "2024-11-12",
      estado: "completado",
      iduser: 8,
    },
    {
      id: 9,
      titulo: "HACER LA TAREA",
      descripcion: "",
      fechaVencimiento: "2024-11-14",
      estado: "pendiente",
      iduser: 9,
    },
    {
      id: 10,
      titulo: "HACER EJERCICIO",
      descripcion: "",
      fechaVencimiento: "2024-11-15",
      estado: "pendiente", // puede ser 'pendiente', 'en progreso', 'completado',
      iduser: 10
    },
    {
      id: 11,
      titulo: "LIMPIAR LA CASA",
      descripcion: "",
      fechaVencimiento: "2024-11-12",
      estado: "completado",
      iduser: 1
    },
    {
      id: 12,
      titulo: "SACAR LA BASURA",
      descripcion: "",
      fechaVencimiento: "2024-11-14",
      estado: "pendiente",
      iduser: 2
    },
    {
      id: 13,
      titulo: "ORGANIZAR MI CUERTO",
      descripcion: "",
      fechaVencimiento: "2024-11-15",
      estado: "pendiente", // puede ser 'pendiente', 'en progreso', 'completado',
      iduser: 3
    },
    {
      id: 14,
      titulo: "LAVAR LA ROPA",
      descripcion: "",
      fechaVencimiento: "2024-11-12",
      estado: "completado",
      iduser: 4
    },
    {
      id: 15,
      titulo: "LIMPIAR LAS VENTANAS",
      descripcion: "",
      fechaVencimiento: "2024-11-14",
      estado: "pendiente",
      iduser: 5
    },
    {
      id: 16,
      titulo: "CORTARSE EL CABELLO",
      descripcion: "",
      fechaVencimiento: "2024-11-15",
      estado: "pendiente", // puede ser 'pendiente', 'en progreso', 'completado',
      iduser: 6
    },
    {
      id: 17,
      titulo: "COMPRAR COMIDA",
      descripcion: "",
      fechaVencimiento: "2024-11-12",
      estado: "completado",
      iduser: 7
    },
    {
      id: 18,
      titulo: "LLAMAR A MI MAMA",
      descripcion: "",
      fechaVencimiento: "2024-11-14",
      estado: "pendiente",
      iduser: 8
    },
    {
      id: 19,
      titulo: "ESTUDIAR MATEMATICAS",
      descripcion: "",
      fechaVencimiento: "2024-11-15",
      estado: "pendiente", // puede ser 'pendiente', 'en progreso', 'completado',
      iduser: 9
    },
    {
      id: 20,
      titulo: "LIMPIAR Y DESINFECTAR LA FRUTA",
      descripcion: "",
      fechaVencimiento: "2024-11-12",
      estado: "completado",
      iduser: 10
    },
    {
      id: 21,
      titulo: "REVISAR EL CORREO ELECTRONICO",
      descripcion: "",
      fechaVencimiento: "2024-11-14",
      estado: "pendiente",
      iduser: 1
    },
    {
      id: 22,
      titulo: "PLANIFICAR LAS ACTIVIDADES MAS IMPORTANTES",
      descripcion: "",
      fechaVencimiento: "2024-11-15",
      estado: "pendiente", // puede ser 'pendiente', 'en progreso', 'completado',
      iduser: 2
    },
    {
      id: 23,
      titulo: "PREPARARME PARA IR A LA ENTREVISTA DE TRABAJO",
      descripcion: "",
      fechaVencimiento: "2024-11-12",
      estado: "completado",
      iduser: 3
    },
    {
      id: 24,
      titulo: "ALIMENTAR A LA MASCOTA",
      descripcion: "",
      fechaVencimiento: "2024-11-14",
      estado: "pendiente",
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
            estado: "completado" //En progreso, Terminada, Pausada, Creada
          },
          {
            id: 6,
            titulo: "COMER EL LONCHE EN LA HORA DEL RECESO",
            descripcion: "",
            fechaVencimiento: "2024-11-14",
            estado: "pendiente"
          },
          {
            id: 7,
            titulo: "TROMAR EL TRANSPORTE DE REGRESO A CASA",
            descripcion: "",
            fechaVencimiento: "2024-11-15",
            estado: "pendiente"
          },
          {
            id: 8,
            titulo: "HACER LA TAREA",
            descripcion: "",
            fechaVencimiento: "2024-11-12",
            estado: "completado"
          },
          {
            id: 9,
            titulo: "CENAR CON LA FAMILIA",
            descripcion: "",
            fechaVencimiento: "2024-11-14",
            estado: "pendiente"
          },
          {
            id: 10,
            titulo: "BAÑARSE Y LAVARSE LOS DIENTES",
            descripcion: "",
            fechaVencimiento: "2024-11-15",
            estado: "pendiente" 
          },
          {
            id: 11,
            titulo: "DORMIR",
            descripcion: "",
            fechaVencimiento: "2024-11-12",
            estado: "completado"
          }
    ];

      // Mostrar todos los deberes
      deberesmismos.forEach(deber => {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td style="text-align: left;">${deber.descripcion}</td><td>${deber.estado}</td>`;
        tabladeber.appendChild(fila);
      });
}

//cargarDeberes();
