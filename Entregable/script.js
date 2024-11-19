
// cambiamos las tarjetas
const fontSizeInput = document.getElementById('font-size');
const colorInput = document.getElementById('color');
const fontFamilySelect = document.getElementById('font-family');
const userSelect = document.getElementById('user-select');
const cardContainer = document.getElementById('card-container');
// arreglo guardado
let users = []; 

// lamamos los usuariosde la API
async function loadUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    users = await response.json();
    
    users.forEach((user, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = user.name;
        userSelect.appendChild(option);
        
    });

   displayUserCard(users[11]);
}

function displayUserCard(user) {
    
    cardContainer.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = 

    `
    
    
    <img src="https://robohash.org/${user.id}?set=set3" alt="Foto de ${user.name}">
        <h3 content="true">${user.name}</h3>
        <p content="true"><strong>Email:</strong> ${user.email}</p>
        <p content="true"><strong>Compañía:</strong> ${user.company.name}</p>
        <p content="true"><strong>Sitio web:</strong> ${user.website}</p> 
        
        
    `;
    
    cardContainer.appendChild(card);

    applyStyles();
}

function applyStyles() {
    const card = document.querySelector('.card');
    if (card) {
        card.style.fontSize = fontSizeInput.value + 'px';
        card.style.color = colorInput.value;
        card.style.fontFamily = fontFamilySelect.value;
    }
}
// se actualiza el tipo de letra el color y el tamaño
fontSizeInput.addEventListener('input', applyStyles);
colorInput.addEventListener('input', applyStyles);
fontFamilySelect.addEventListener('change', applyStyles);


userSelect.addEventListener('change', () => {
    const selectedIndex = userSelect.value;
    displayUserCard(users[selectedIndex]);
});

loadUsers().then(applyStyles);



