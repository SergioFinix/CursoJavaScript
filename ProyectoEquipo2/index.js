var numtemplate = 1;
var person = {};
var colorNombre = "black";
var colorTitulo = "black";
var colorTexto = "black";
var tipoNombre = "font-style: normal;";
var tipoTitulo = "font-style: normal;";
var tipoTexto = "font-style: normal;";
var estilo = {
    "tipoNombre": tipoNombre,
    "tipoTitulo": tipoTitulo,
    "tipoTexto": tipoTexto,
    "colorNombre": colorNombre,
    "colorTitulo": colorTitulo,
    "colorTexto": colorTexto,
}

async function cargarJSON() {
    try {
        // Fetch the JSON file
        const response = await fetch('http://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Respuesta de Red no valida');
        }
        const data = await response.json();
        const miselect = document.getElementById('ulNombres');

        data.forEach(item => {
            const elemento = document.createElement('li');
            elemento.setAttribute('data-name', item.name);
            elemento.setAttribute('data-username', item.username);
            elemento.setAttribute('data-email', item.email);
            elemento.setAttribute('data-phone', item.phone);
            elemento.setAttribute('data-website', item.website);
            elemento.setAttribute('data-address', item.address.street);
            elemento.setAttribute('data-company', item.company.name);
            elemento.classList.add("list-group-item");
            elemento.textContent = item.name;
            miselect.appendChild(elemento);
        });
    } catch (error) {
        console.error('Error: ', error);
    }
}

window.onload = cargarJSON;
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('list-group-item')) {

        // Loop through the data attributes and add them to the object
        Array.from(event.target.attributes).forEach(attr => {
            if (attr.name.startsWith('data-')) {
                const key = attr.name.slice(5); // Remove 'data-' prefix
                person[key] = attr.value;
            }
        });

        cargarTarjeta();
    }
});

function tipoTarjeta(numtarjeta){
    numtemplate = numtarjeta;
    cargarTarjeta();
}

function eTipoNombre(tipo){
    estilo.tipoNombre = tipo;
    console.log(estilo);
    cargarTarjeta();
}

function eTipoTitulo(tipo){
    estilo.tipoTitulo = tipo;
    cargarTarjeta();
}

function eTipoTexto(tipo){
    estilo.tipoTexto = tipo;
    cargarTarjeta();
}

function eColorNombre(color){
    estilo.colorNombre = color;
    cargarTarjeta();
}

function eColorTitulo(color){
    estilo.colorTitulo = color;
    cargarTarjeta();
}

function eColorTexto(color){
    estilo.colorTexto = color;
    cargarTarjeta();
}

function cargarTarjeta(){
    let template = "";
    if(numtemplate == 1){
        template = `<div class="card">
            <div class="card-header">
                <p class="text-center mt-3">
                    <img width="80" src="icons/p1.png">
                </p>
                <p class="text-center" style="${estilo.tipoNombre}; color: ${estilo.colorNombre}">${person.name}</p>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Correo electrónico:</span><br><span style="${estilo.tipoTexto}; color: ${estilo.colorTexto}">${person.email}</span>
                    </div>
                    <div class="col-6">
                        <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Número telefónico:</span><br><span style="${estilo.tipoTexto}; color: ${estilo.colorTexto}">${person.phone}</span>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Nombre de usuario:</span><br><span style="${estilo.tipoTexto}; color: ${estilo.colorTexto}">${person.username}</span>
                    </div>
                    <div class="col-6">
                        <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Sitio Web:</span><br><span style="${estilo.tipoTexto}; color: ${estilo.colorTexto}">${person.website}</span>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Dirección:</span><br><span style="${estilo.tipoTexto}; color: ${estilo.colorTexto}">${person.address}</span>
                    </div>
                    <div class="col-6">
                        <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Compañía:</span><br><span style="${estilo.tipoTexto}; color: ${estilo.colorTexto}">${person.company}</span>
                    </div>
                </div>
            </div>                  
        </div>`;
    }else if(numtemplate == 2){
        template = `<div class="card">
            <div class="row g-0">
                <div class="col-md-4 my-auto">
                    <p class="text-center mt-3">
                        <img width="80" src="icons/p1.png">
                    </p>
                    <p class="text-center px-5" style="${estilo.tipoNombre}; color: ${estilo.colorNombre}">${person.name}</p>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Correo electrónico:</span><br><span style="${estilo.tipoTexto}; color: ${estilo.colorTexto}">${person.email}</span>
                            </div>
                            <div class="col-6">
                                <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Número telefónico:</span><br><span style="${estilo.tipoTexto}; color: ${estilo.colorTexto}">${person.phone}</span>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-6">
                                <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Nombre de usuario:</span><br><span style="${estilo.tipoTexto}; color: ${estilo.colorTexto}">${person.username}</span>
                            </div>
                            <div class="col-6">
                                <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Sitio Web:</span><br><span style="${estilo.tipoTexto}; color: ${estilo.colorTexto}">${person.website}</span>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-6">
                                <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Dirección:</span><br><span style="${estilo.tipoTexto}; color: ${estilo.colorTexto}">${person.address}</span>
                            </div>
                            <div class="col-6">
                                <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Compañía:</span><br><span style="${estilo.tipoTexto}; color: ${estilo.colorTexto}">${person.company}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    } if(numtemplate == 3){
        template = `<div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Correo electrónico:</span><br><span>${person.email}</span>
                    </div>
                    <div class="col-6">
                        <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Número telefónico:</span><br><span>${person.phone}</span>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Nombre de usuario:</span><br><span>${person.username}</span>
                    </div>
                    <div class="col-6">
                        <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Sitio Web:</span><br><span>${person.website}</span>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Dirección:</span><br><span>${person.address}</span>
                    </div>
                    <div class="col-6">
                        <span style="${estilo.tipoTitulo}; color: ${estilo.colorTitulo}">Compañía:</span><br><span>${person.company}</span>
                    </div>
                </div>
            </div>    
            <div class="card-footer">
                <p class="text-center mt-3">
                    <img width="80" src="icons/p1.png">
                </p>
                <p class="text-center" style="${estilo.tipoNombre}; color: ${estilo.colorNombre}">${person.name}</p>
            </div>              
        </div>`;
    }
    document.getElementById("tarjeta").innerHTML = template;
}

document.addEventListener('mouseover', function(event) {
    if (event.target.classList.contains('list-group-item')) {
        event.target.style.backgroundColor = "#F4F4F4";
    }
});
document.addEventListener('mouseout', function(event) {
    if (event.target.classList.contains('list-group-item')) {
        event.target.style.backgroundColor = "#FFFFFF";
    }
});