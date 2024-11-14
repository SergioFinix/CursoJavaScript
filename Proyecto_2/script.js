// script.js  asyncrono
document.addEventListener("DOMContentLoaded", async () => {  
    await loadUsers();  
});  

// Función para cargar usuarios de la API  
async function loadUsers() {  
    try {  
        const response = await fetch("https://jsonplaceholder.typicode.com/users");  
        const users = await response.json();  
        
        const tbody = document.querySelector("#userTable tbody");  
        users.forEach(user => {  
            const row = document.createElement("tr");  
            row.innerHTML = `
                <td>${user.id}</td>   
                <td>${user.name}</td>  
            `;  
            
            // Agregar evento para mostrar tarjeta  
            row.addEventListener("click", () => {  
                showProfileCard(user);  
            });  

            tbody.appendChild(row);  
        });  
    } catch (error) {  
        console.error("Error al cargar los usuarios:", error);  
    }  
}  

// Función para mostrar la tarjeta de perfil  
function showProfileCard(user) {  
    const profileCard = document.getElementById("profileCard");  
    profileCard.style.display = "block";  
    
    profileCard.innerHTML = ` 
        <main class="card2">
            <header>
                <img src="http://digittam.com/uploads/1/3/1/1/131171162/editor/trabajo-ingeniero-informatico-1.jpg?1658877141" alt="">
            </header>

            <section>
                <h2>${user.name}</h2>
                <h3>@${user.username}</h3>
                <ul>
                    <p>Email: ${user.email}</p>  
                    <p>Teléfono: ${user.phone}</p>  
                    <p>Dirección: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>  
                    <p>Sitio web: <a href="http://${user.website}" target="_blank">${user.website}</a></p>  
                    <p>Compañía: ${user.company.name} - ${user.company.catchPhrase}</p>  
                </ul>
            </section>
           
            <footer>
                <p>Perfil de ${user.name}</p>
       
            </footer>
        </main>
        
    `;  
}