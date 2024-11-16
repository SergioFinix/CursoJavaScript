var usuarios = {};

function agregar_usuario(){
    let nombre = document.getElementById("modalNombre").value;
    let paterno = document.getElementById("modalPaterno").value;
    let materno = document.getElementById("modalMaterno").value;

}

function list_usuarios(){

}

async function cargarJSON() {
    try {
        // Fetch the JSON file
        const response = await fetch('http://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Respuesta de Red no valida');
        }
        const data = await response.json();
        //console.log(data);
        const miselect = document.getElementById('ulNombres');

        data.forEach(item => {
            const elemento = document.createElement('li');
            elemento.classList.add("list-group-item ");
            elemento.textContent = item.name;
            miselect.appendChild(elemento);
        });
    } catch (error) {
        console.error('Error: ', error);
    }
}

// Call the function to load the JSON data when the page loads
window.onload = cargarJSON;