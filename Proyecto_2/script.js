document.addEventListener("DOMContentLoaded", async () => {  
    await loadUsers((users) => {  //cargar usuarios
    displayUsers(user); //mostrar usuarios
});
});  

// Función para cargar usuarios desde la API  
function loadUsers(callback) {
    return new Promise((resolve, reject) =>{
        fetch("https://jsonplaceholder.typicode.com/users") //obtener datos de la API
        .then(response => {
            if (!response.ok){ //promesa complida
                throw new Error('Fallido');
            }
            return response.json();//datos convertidos a JSON
        })
        .then(users => {
            resolve(users);
            if (callback && typeof callback === "function") {
                callback(users);
            }
        })
        .catch(error => {
            console.error("Usuarios no cargados wee:", error);
            document.getElementById("errorMessage").style.display = "block";
            reject(error);
        });
    }); 
}  

// Función para mostrar la tarjeta de perfil  
function displayUsers(users){
    const tbody = document.querySelector("userTable tbody");
    users.forEach(user => {
        const row = document.createElement("tr"); //array de usuario y fila para cada usuario
        row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        `;
        row.addEventListener("click", () => {
            showProfilecard(user); //clic para mostrar mas detalles del usuario
    });
    tbody.appendChild(row);      
    });
}

//