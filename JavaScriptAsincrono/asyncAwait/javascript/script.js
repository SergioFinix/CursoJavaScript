// Simula la obtención de datos de usuarios con una Promise
function fetchUsers() {
  return new Promise((resolve, reject) => {
    // Simulamos una operación asíncrona con setTimeout
    setTimeout(() => {
      const success = true; // Cambia a false para simular un error
      if (success) {
        resolve([
          { id: 1, name: 'Juan Pérez' },
          { id: 2, name: 'María López' },
          { id: 3, name: 'Carlos García' }
        ]);
      } else {
        reject('Error al cargar los usuarios');
      }
    }, 2000); // Simulamos un retraso de 2 segundos
  });
}

// Función para mostrar los usuarios en la página
function displayUsers(users) {
  const userList = document.getElementById('userList');
  userList.innerHTML = ''; // Limpia la lista antes de agregar los usuarios

  users.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.className = 'user';
    userDiv.textContent = `${user.name}`;
    userList.appendChild(userDiv);
  });
}

// Función para mostrar el mensaje de error
function showError(error) {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = error;
}

// Función asíncrona para cargar los usuarios
async function loadUsers() {
  // Limpia los mensajes anteriores
  document.getElementById('userList').innerHTML = 'Cargando usuarios...';
  document.getElementById('errorMessage').textContent = '';

  try {
    const users = await fetchUsers(); // Espera a que se resuelva la Promise
    displayUsers(users); // Muestra los usuarios si la Promise se resuelve
  } catch (error) {
    showError(error); // Muestra el error si la Promise es rechazada
  }
}

// Evento del botón para cargar usuarios
document.getElementById('loadButton').addEventListener('click', loadUsers);
