// ui.js
export function renderUserList(users, onClickUser) {
  const tbody = document.querySelector('.user-list');
  tbody.innerHTML = ''; // Limpiar lista
  //Manejo del DOM
  //Manipualción de arreglos
  users.forEach(user => {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.textContent = user.name;
    //Eventos javascript y manejo del DOM
    td.classList.add('clickable');
    td.addEventListener('click', () => onClickUser(user));
    tr.appendChild(td);
    tbody.appendChild(tr);
  });
}

export function displayUserCard(user) {
  const { name, username, email, address, phone, website, company } = user; // Destructuración de objetos
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = ''; // Limpiar tarjeta anterior
  
  const card = document.createElement('div');
  //plantillas literales
  card.className = `profile-card ${document.getElementById('designSelect').value}`;
  card.innerHTML = `
    <h2>${name}</h2>
    <p><strong>Username:</strong> ${username}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Address:</strong> ${address.street}, ${address.city}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Website:</strong> ${website}</p>
    <p><strong>Company:</strong> ${company.name}</p>
  `;
  cardContainer.appendChild(card);
  
  applyCustomization();
}

export function applyCustomization() {
  if (!validateForm()) return; // Detener si el formulario no es válido

  // Obtiene valores del formulario
  const fontSize = document.getElementById('fontSize').value + 'px';
  const fontFamily = document.getElementById('fontFamily').value;
  const designClass = document.getElementById('designSelect').value;

  // Selecciona todas las tarjetas
  const cards = document.querySelectorAll('.profile-card');
  if (cards.length > 0) {
    console.log('Aplicando personalización a todas las tarjetas...');
    cards.forEach(card => {
      // Aplica estilos de tamaño y fuente
      card.style.fontSize = fontSize;
      card.style.fontFamily = fontFamily;

      // Manipulación de clases CSS para los diseños
      card.classList.remove('design1', 'design2');
      card.classList.add(designClass);
    });
  } else {
    console.log('No hay tarjetas disponibles para personalizar.');
  }
}


//Validación de formulario
export function validateForm() {
  const fontSize = document.getElementById('fontSize').value;
  const fontFamily = document.getElementById('fontFamily').value;
  const designSelect = document.getElementById('designSelect').value;

  let errors = [];

  // Validar tamaño de letra
  if (!fontSize || fontSize < 10 || fontSize > 30) {
    errors.push('El tamaño de letra debe estar entre 10 y 30.');
  }

  // Validar tipo de letra
  if (!fontFamily) {
    errors.push('Debe seleccionar un tipo de letra.');
  }

  // Validar diseño
  if (!designSelect) {
    errors.push('Debe seleccionar un diseño.');
  }

  // Mostrar errores si los hay
  if (errors.length > 0) {
    alert('Errores encontrados:\n' + errors.join('\n'));
    return false; // Detener el proceso si hay errores
  }

  return true; // Continuar si todo es válido
}

