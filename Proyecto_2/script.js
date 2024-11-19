document.addEventListener("DOMContentLoaded", async () => {  
    await loadUsers((users) => {  //cargar usuarios
        displayUsers(users); // mostrar mediante Callback visualizaciOn de usuarios  
    });  
});  

// Promesa para cargar usuarios  
function loadUsers(callback) {  
    return new Promise((resolve, reject) => {  
        fetch("https://jsonplaceholder.typicode.com/users") //obtener datos de la API 
            .then(response => {  
                if (!response.ok) {  
                    throw new Error('Fallido');  
                }  
                return response.json();  //datos convertidos a JSON
            })  
            .then(users => {  
                resolve(users); // Resolviendo la promesa  
                if (callback && typeof callback === "function") {  
                    callback(users); // Llamando al callback  
                }  
            })  
            .catch(error => {  
                console.error("Error al cargar los usuarios:", error);  
                document.getElementById("errorMessage").style.display = "block";  
                reject(error); // Rechazando la promesa en caso de error  
            });  
    });  
}  

// Función para mostrar usuarios en la tabla  
function displayUsers(users) {  
    const tbody = document.querySelector("#userTable tbody");  
    users.forEach(user => {  
        const row = document.createElement("tr");   //array de usuario y fila para cada usuario
        row.innerHTML = `  
            <td>${user.id}</td>  
            <td>${user.name}</td>  
        `;  

        row.addEventListener("click", () => {  
            showProfileCard(user);   //clic para mostrar mas detalles del usuario
        });  

        tbody.appendChild(row);  
    });  
}  


let currentStyle = 'style1';  
const cardContainer = document.getElementById("profileCard");  
const cardContainer_2 = document.getElementById("profileCard_2");
const userStyles = []; // Array para almacenar la perzonalizacion de los usuarios 

function showProfileCard(user) {  
    cardContainer.style.display = "block";  
    cardContainer_2.style.display = "block";
    
    const userStyle = userStyles[user.id - 1] || { fontFamily: 'Arial', fontSize: '16px', color: '#000' }; // Estilos predeterminados  

    cardContainer.innerHTML = `  
        <main class="card2 ${currentStyle}" style="font-family: ${userStyle.fontFamily}; font-size: ${userStyle.fontSize}; color: ${userStyle.color};">  
            <header>  
                <img src="https://www.styleone-design.com/wp-content/uploads/2021/04/que-es-la-experiencia-de-usuario-1.jpg" alt="">  
            </header>  
            <section>  
                <h2>${user.name}</h2>  
                <h3>@${user.username}</h3>  
                <p>Email: ${user.email}</p>  
                <p>Teléfono: ${user.phone}</p>  
                <p>Dirección: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>  
                <p>Sitio web: <a href="http://${user.website}" target="_blank">https://${user.website}</a></p>  
                <p>Compañía: ${user.company.name} - ${user.company.catchPhrase}</p>  
            </section>  
           
            <footer>  
            <p>Perfil de ${user.name}</p>  
            </footer>  
        </main>  
    `;  
    cardContainer_2.innerHTML = `  
        <main class="card3 ${currentStyle}" style="font-family: ${userStyle.fontFamily}; font-size: ${userStyle.fontSize}; color: ${userStyle.color};">  
            
            <section> 
            <h3>Personaliza tu tarjeta</h3>    
                <button class="btn primary" data-user='${JSON.stringify(user)}' onclick="changeStyle('style1', this)">Tema 1</button>  
                <button class="btn success" data-user='${JSON.stringify(user)}' onclick="changeStyle('style2', this)">Tema 2</button>  
                <button class="btn warning" data-user='${JSON.stringify(user)}' onclick="changeStyle('style3', this)">Tema 3</button>   
            </section>  
            <section>   
                <label for="fontFamily">Tipo de letra:</label>  
                <select id="fontFamily" onchange="updateStyles(${user.id})">  
                    <option value="Arial">Arial</option>  
                    <option value="Courier New">Courier New</option>  
                    <option value="Georgia">Georgia</option>  
                    <option value="Times New Roman">Times New Roman</option>  
                    <option value="Verdana">Verdana</option>  
                </select>  
                <label for="fontSize">Tamaño de letra:</label>  
                <input type="number" id="fontSize" value="16" min="10" max="40" onchange="updateStyles(${user.id})" /> px  
                <label for="fontColor">Color de letra:</label>  
                <input type="color" id="fontColor" value="#000000" onchange="updateStyles(${user.id})" />  
                 </section> 
                <section>
                <button class="btn primary" onclick="saveStyles(${user.id})">Guardar </button>
                <button class="btn primary" onclick="resetStyles(${user.id})">Restablecer</button>
                <button class="btn primary" onclick="closeProfileCard()">Cerrar</button>  
                </section>
             
        </main>  
    `; 

    // Establecer las selecciones actuales  
    document.getElementById('fontFamily').value = userStyle.fontFamily;  
    document.getElementById('fontSize').value = parseInt(userStyle.fontSize);  
    document.getElementById('fontColor').value = userStyle.color;  
}  

function updateStyles(userId) {  
    const fontFamily = document.getElementById('fontFamily').value;  
    const fontSize = document.getElementById('fontSize').value + 'px';  
    const fontColor = document.getElementById('fontColor').value;  

    // Actualizar los estilos en la tarjeta  
    const card = cardContainer.querySelector('main');  
    card.style.fontFamily = fontFamily;  
    card.style.fontSize = fontSize;  
    card.style.color = fontColor;  
}  

function saveStyles(userId) {  
    const fontFamily = document.getElementById('fontFamily').value;  
    const fontSize = document.getElementById('fontSize').value + 'px';  
    const fontColor = document.getElementById('fontColor').value;
  
    // Guardar los estilos en el arreglo userStyles  
    userStyles[userId - 1] = { fontFamily, fontSize, color: fontColor };  
    alert('Estilos guardados correctamente para ' + user.name);  
}  

function changeStyle(style, button) {  
    currentStyle = style;  
    const user = JSON.parse(button.getAttribute('data-user'));  
    showProfileCard(user);  
}  
function resetStyles(userId) {  
    // defenir por defaulr el estilo  
    const defaultStyles = {  
        fontFamily: 'Arial',  
        fontSize: '16px',  
        color: '#000000',  
        currentStyle: 'style1'
    }
    // actualizar el userStyles del arreglo por el default 
    userStyles[userId - 1] = defaultStyles;  

    // resetear el estilo
    const card = cardContainer.querySelector('main');  
    card.style.fontFamily = defaultStyles.fontFamily;  
    card.style.fontSize = defaultStyles.fontSize;  
    card.style.color = defaultStyles.color;
    card.style.currentStyle = defaultStyles.currentStyle;  

    // valores predeterminados
    document.getElementById('fontFamily').value = defaultStyles.fontFamily;  
    document.getElementById('fontSize').value = parseInt(defaultStyles.fontSize);  
    document.getElementById('fontColor').value = defaultStyles.color; 
    document.getElementById('style1').value = defaultStyles.currentStyle; 

    alert('Estilos restablecidos a los valores predeterminados para ' + user.name);  
}

function closeProfileCard() {  
    cardContainer.style.display = "none"; // Oculta la tarjeta de perfil  
    cardContainer_2.style.display = "none";
}