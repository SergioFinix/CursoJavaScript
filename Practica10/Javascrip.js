function displayUsers(name) {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Limpia la lista antes de agregar los usuarios
  
    users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.className = 'user';
      userDiv.textContent = `${user.name}`;
      userList.appendChild(userDiv);
    });
  }