// main.js
import { fetchUsers } from './api.js';
import { renderUserList, displayUserCard, applyCustomization } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
  const users = await fetchUsers();

  // Renderiza la lista de usuarios y configura el evento de clic
  //Estructura de control if
  if(users.length > 0){
    renderUserList(users, displayUserCard);
    // Evento para aplicar personalización
    document.getElementById('applyButton').addEventListener('click', () => {
      applyCustomization();
    });
  }else{
    console.log('No hay usuarios para mostrar');
  }

  
});
