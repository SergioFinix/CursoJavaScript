// Simula la obtención de datos con un callback
function fetchUsers(callback) {
    setTimeout(() => {
      const users = [
        { id: 1, name: 'Juan Pérez' },
        { id: 2, name: 'María López' },
        { id: 3, name: 'Carlos García' }
      ];
      callback(users); // Se llama al callback pasando los datos
    }, 2000); // Simula una espera de 2 segundos
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
  
    // Evento del botón para cargar usuarios
    document.getElementById('loadButton').addEventListener('click', () => {
    document.getElementById('userList').innerHTML = 'Cargando usuarios...';
    
    // Llama a fetchUsers y pasa displayUsers como callback
    fetchUsers(displayUsers);
  });
  