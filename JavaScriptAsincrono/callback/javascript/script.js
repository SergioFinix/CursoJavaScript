<<<<<<< HEAD
// Simula la obtención de datos con un callback
function fetchUsers(callback) {
    setTimeout(() => {
      const users = [
        { id: 1, name: 'Juan Pérez' },
        { id: 2, name: 'María López' },
        { id: 3, name: 'Carlos García'},
        { id: 4, name: 'Efrén Vázquez'},
        { id: 5, name: 'Omar Moreno'},
        { id: 6, name: 'Anabel Salazar'}


      ];
      callback(users); // Se llama al callback pasando los datos
    }, 5000); // Simula una espera de 2 segundos
=======
// Función para simular la obtención de datos (nombre y fecha de nacimiento)
function fetchUserData(callbacknombre, callbackcumpleaños) {
  const nombre = document.getElementById('userName').value;
  const cumpleaños = document.getElementById('usercumpleaños').value;


  // Verificar si la fecha de nacimiento está vacía
  if (!cumpleaños) {
    alert('Por favor, introduce tu fecha de nacimiento.');
    return; // Si no se introduce la fecha, salir de la función
>>>>>>> 27913fec1a4b45eabc55fa40231c425164cb093e
  }

  setTimeout(() => {
    callbacknombre(nombre); // Llama al callback pasando el nombre
  }, 4000); // Simula una espera de 4 segundos para el nombre

  setTimeout(() => {
    callbackcumpleaños(cumpleaños); // Llama al callback pasando la fecha de nacimiento
  }, 6000); // Simula una espera de 6 segundos para la fecha de nacimiento
}

// Función para mostrar el nombre en la página
function displayName(nombre) {
  const userList = document.getElementById('userList');
  const nombreDiv = document.createElement('div');
  nombreDiv.className = 'user';
  nombreDiv.textContent = `Hola, ${nombre} !`; // Muestra el nombre ingresado
  userList.appendChild(nombreDiv);
}

// Función para calcular la edad en base a la fecha de nacimiento
function calcularEdad(cumpleaños) {
  const fechaCumpleaños = new Date(cumpleaños);
  const fechaActual = new Date();

  let edad = fechaActual.getFullYear() - fechaCumpleaños.getFullYear();
  const mesActual = fechaActual.getMonth();
  const mesCumpleaños = fechaCumpleaños.getMonth();
  const diaActual = fechaActual.getDate();
  const diaCumpleaños = fechaCumpleaños.getDate();

  // Si el cumpleaños no ha pasado aún este año, restamos un año
  if (mesActual < mesCumpleaños || (mesActual === mesCumpleaños && diaActual < diaCumpleaños)) {
    edad--;
  }

  return edad;
}

// Función para mostrar la edad en la página
function displayEdad(cumpleaños) {
  const edad = calcularEdad(cumpleaños); // Calcula la edad
  const userList = document.getElementById('userList');
  const edadDiv = document.createElement('div');
  edadDiv.className = 'user';
  edadDiv.textContent = `Tu edad es de: ${edad} años`; // Muestra la edad calculada
  userList.appendChild(edadDiv);
}

// Evento del botón para cargar los datos
document.getElementById('loadButton').addEventListener('click', () => {
  const userList = document.getElementById('userList');
  userList.innerHTML = 'Cargando...'; // Muestra el mensaje mientras espera
  
  fetchUserData(displayName, displayEdad); // Llama a fetchUserData y pasa los dos callbacks
});

