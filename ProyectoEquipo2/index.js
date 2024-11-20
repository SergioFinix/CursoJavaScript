var numnombre = null;
var person = {};
var estilos = {};

async function cargarJSON() {
    try {
        const response = await fetch('http://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Respuesta de Red no valida');
        }
        const data = await response.json();
        const miselect = document.getElementById('ulNombres');

        data.forEach(item => {
            let newEstilo = {
                "id": item.id,
                "numTemplate": 1,
                "tipoNombre": "font-style: normal;",
                "tipoTitulo": "font-style: normal;",
                "tipoTexto": "font-style: normal;",
                "colorNombre": "black",
                "colorTitulo": "black",
                "colorTexto": "black",
            };
            estilos[item.id] = newEstilo;
            const elemento = document.createElement('li');
            elemento.setAttribute('data-id', item.id);
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
        console.log(estilos);
    } catch (error) {
        console.error('Error: ', error);
    }
}

window.onload = cargarJSON;
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('list-group-item')) {
        Array.from(event.target.attributes).forEach(attr => {
            if (attr.name.startsWith('data-')) {
                const key = attr.name.slice(5);
                person[key] = attr.value;
            }
            if(attr.name == "data-id"){
                numnombre = parseInt(attr.value);
            }
        });
        cargarTarjeta();
    }
});

function tipoTarjeta(numtarjeta){
    estilos[numnombre].numTemplate = numtarjeta;
    cargarTarjeta();
}

function eTipoNombre(tipo){
    estilos[numnombre].tipoNombre = tipo;
    cargarTarjeta();
}

function eTipoTitulo(tipo){
    estilos[numnombre].tipoTitulo = tipo;
    cargarTarjeta();
}

function eTipoTexto(tipo){
    estilos[numnombre].tipoTexto = tipo;
    cargarTarjeta();
}

function eColorNombre(color){
    estilos[numnombre].colorNombre = color;
    cargarTarjeta();
}

function eColorTitulo(color){
    estilos[numnombre].colorTitulo = color;
    cargarTarjeta();
}

function eColorTexto(color){
    estilos[numnombre].colorTexto = color;
    cargarTarjeta();
}

function cargarTarjeta(){
    let template = "";
    if(estilos[numnombre].numTemplate == 1){
        template = `<div class="card">
            <div class="card-header">
                <p class="text-center" style="${estilos[numnombre].tipoNombre}; color: ${estilos[numnombre].colorNombre}">${person.name}</p>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Correo electrónico:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.email}</span>
                    </div>
                    <div class="col-6">
                        <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Número telefónico:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.phone}</span>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Nombre de usuario:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.username}</span>
                    </div>
                    <div class="col-6">
                        <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Sitio Web:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.website}</span>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Dirección:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.address}</span>
                    </div>
                    <div class="col-6">
                        <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Compañía:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.company}</span>
                    </div>
                </div>
            </div>                  
        </div>`;
    }else if(estilos[numnombre].numTemplate == 2){
        template = `<div class="card">
            <div class="row g-0">
                <div class="col-md-4 my-auto">
                    <p class="text-center px-5" style="${estilos[numnombre].tipoNombre}; color: ${estilos[numnombre].colorNombre}">${person.name}</p>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Correo electrónico:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.email}</span>
                            </div>
                            <div class="col-6">
                                <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Número telefónico:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.phone}</span>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-6">
                                <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Nombre de usuario:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.username}</span>
                            </div>
                            <div class="col-6">
                                <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Sitio Web:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.website}</span>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-6">
                                <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Dirección:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.address}</span>
                            </div>
                            <div class="col-6">
                                <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Compañía:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.company}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    } if(estilos[numnombre].numTemplate == 3){
        template = `<div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Correo electrónico:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.email}</span>
                    </div>
                    <div class="col-6">
                        <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Número telefónico:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.phone}</span>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Nombre de usuario:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.username}</span>
                    </div>
                    <div class="col-6">
                        <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Sitio Web:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.website}</span>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Dirección:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.address}</span>
                    </div>
                    <div class="col-6">
                        <span style="${estilos[numnombre].tipoTitulo}; color: ${estilos[numnombre].colorTitulo}">Compañía:</span><br><span style="${estilos[numnombre].tipoTexto}; color: ${estilos[numnombre].colorTexto}">${person.company}</span>
                    </div>
                </div>
            </div>    
            <div class="card-footer">
                <p class="text-center" style="${estilos[numnombre].tipoNombre}; color: ${estilos[numnombre].colorNombre}">${person.name}</p>
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