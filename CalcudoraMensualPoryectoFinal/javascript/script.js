
const SelectListacliente = document.getElementById('Listacliente');//combo
const cajapresupuestomensual = document.getElementById('presupuestomensual');//caja

const SelectListaMesdeventa = document.getElementById('ListaMesdeventa');//combo        
const cajaproducto = document.getElementById('producto');//caja
const cajacosto = document.getElementById('costo');//caja
const botonagregarproducto = document.getElementById('agregarproducto');//btn

const Errordelistaclientes = document.getElementById('errordelistaclientes');//div
const Sumatotalcliente = document.getElementById('sumatotalcliente');//div
const Productomasadquirido = document.getElementById('productomasadquirido');//div
const tabla = document.getElementById("miTabla").getElementsByTagName("tbody")[0];//tabla

// Inicio de cargar combos
hacerLlamadaApi()     
.then((data) => {
    SelectListacliente.innerHTML = ''; // Limpiamos el contenido del <select> antes de agregar las nuevas opciones
    
    for(let i=0; i < data.length; i++){
        const opcion = document.createElement('option');
        opcion.innerHTML = `<option value="${data[i].id}">${data[i].name}</option>`;
        SelectListacliente.appendChild(opcion);                              
    };          
})
.catch((error) => {
    // Mostrar mensaje de error si la llamada a la API falla          
    Errordelistaclientes.textContent = error.message;
});

cargarmeses();

function hacerLlamadaApi() {
    return new Promise((resolve, reject) => {
        // Consulta de usuarios para hacer la llamada a la API y mostrar en un select
        fetch(`https://jsonplaceholder.typicode.com/users`)
        .then((response) => {
            if (response.ok) {                        
                return response.json(); // Si la respuesta es exitosa, convertirla a formato JSON
            } else {
                reject(new Error('Usuarios encontrados.'));
            }
        })
        .then((data) => resolve(data)) // Resolver la promesa con los datos obtenidos
        .catch(() => reject(new Error('No se pudo conectar con la API.'))); // Error en la conexión
    });
}

function cargarmeses(){
    // Fin de cargar combo usuarios
    let meses = ['Enero', 'Febrero', 'Marzo'];

    // Limpiar la lista antes de actualizar
    SelectListaMesdeventa.innerHTML = '';
        
    // Recorrer el arreglo y agregar cada fruta al DOM
    meses.forEach((mes, index) => {
        const opcionmes = document.createElement('option');
        opcionmes.value = mes;  // Usamos 'id' como valor de la opción FUNCIONA
        opcionmes.textContent = mes;  // Usamos 'name' como texto visible FUNCIONA
        SelectListaMesdeventa.appendChild(opcionmes);
    });
}
// Fin de cargar combos

// Inicio Evento Agregar producto en array, mostrar tabla y sumar
let ventaDetalle = [];
botonagregarproducto.addEventListener("click", () => {   
    
    valor = validarpresupuestomensual();
    if(valor == true){
        //  if(presupuestomensual !=""){
        //Agregar producto en un array
        agregarProductoarray();
        //Mostrar registros en la tabla
        mostrarventadetalle(SelectListaMesdeventa);
    }
    
                

});

//Agregar
let validarsumatotal = 0;
function agregarProductoarray(){

    
    let a = validarsumatotal + parseInt(cajacosto.value);
    if(a <= parseInt(cajapresupuestomensual.value)){
        // Crear un objeto con los datos del formulario
        let mesdeVenta = SelectListaMesdeventa.value;
        let cliente = SelectListacliente.value;
        let producto = cajaproducto.value;
        let costo = cajacosto.value;
        const nuevoProducto = {
            mesdeVenta,
            cliente,
            producto,
            costo
        };

        // Agregar el nuevo dato al array de datos
        ventaDetalle.push(nuevoProducto);
        //limpiarcajas();  
    }
    else{
        alert("El limite de credito ya fue superado");
    }
                
}

//Mostrar tabla
function mostrarventadetalle(mes){
        // Limpiar la tabla antes de mostrar los nuevos datos
        tabla.innerHTML = '';
    let totalgeneralcliente = 0;
    
    let contador = {}; // objeto para guardar las ocurrencias
    let maximo = 0; // variable para guardar el máximo
    let numeroMasRepetido; // variable para guardar el número más repetido

    // Recorrer los datos guardados y añadirlos como filas en la tabla
    ventaDetalle.forEach((dato, index) => {
        let clientecombo = SelectListacliente.value;
        if(mes.value == dato.mesdeVenta && clientecombo == dato.cliente){
            let nuevaFila = document.createElement("tr");
            // Crear las celdas
            let celdaMesdeventa = document.createElement("td");
            let celdaCliente = document.createElement("td");                
            let celdaProducto = document.createElement("td");
            let celdaCosto = document.createElement("td");
            // Asignar valores a las celdas
            celdaMesdeventa.textContent = dato.mesdeVenta;
            celdaCliente.textContent = dato.cliente;            
            celdaProducto.textContent = dato.producto;
            celdaCosto.textContent = dato.costo; 
            // Agregar las celdas a la fila
            nuevaFila.appendChild(celdaMesdeventa);
            nuevaFila.appendChild(celdaCliente);            
            nuevaFila.appendChild(celdaProducto);
            nuevaFila.appendChild(celdaCosto);
            // Insertar la nueva fila al principio del cuerpo de la tabla
            tabla.insertBefore(nuevaFila, tabla.firstChild);
            
        }
        if(clientecombo == dato.cliente){
            totalgeneralcliente = totalgeneralcliente + parseInt(dato.costo);
            contador[dato.producto] = (contador[dato.producto] || 0) + 1;
        }

        
        
        console.log(totalgeneralcliente);
        // const row = tabla.insertRow();
        // row.insertCell(0).textContent = dato.mesdeVenta;
        // row.insertCell(1).textContent = dato.cliente;
        // row.insertCell(2).textContent = dato.producto;
        // row.insertCell(3).textContent = dato.costo;
    });
    // recorremos el objeto y buscamos el máximo
    for (var numero in contador) {
        if (contador[numero] > maximo) {
            maximo = contador[numero];
            numeroMasRepetido = numero;                
        }
    }
    
    Sumatotalcliente.textContent = 'Total general del Cliente: $'+totalgeneralcliente;
    if(numeroMasRepetido != null){
        Productomasadquirido.textContent = 'Producto mas comprado: '+numeroMasRepetido;
    }else{
        Productomasadquirido.textContent = 'Producto mas comprado: ';
    }
    
    //Suma total de la venta detalle
    Sumarcuenta();
    limpiarcajas();
}
//Suma de ventadetalle mensual
function Sumarcuenta(){
    let suma = 0;

    // Recorrer todas las filas del tbody
    for (let fila of tabla.rows) {
        let celdacosto = fila.cells[3]; // Columna del costo producto (índice 1)
        let costo = parseInt(celdacosto.textContent); // Convertir el texto en un número

        // Sumar la edad si es un número válido
        if (!isNaN(costo)) {
            suma += costo;
        }
    }

    // Mostrar el resultado en el div
    sumaventa.textContent = `Total por mes $: ${suma}`;
    validarsumatotal = suma;
}
// Fin Evento Agregar producto en array, mostrar tabla y sumar

//Limpiar inputs
function limpiarcajas(){
    cajaproducto.value ="";
    cajacosto.value = "";
}
//Reiniciar desde cliente la tabla
function mostrarventadetallecliente(cliente){
    
    //recargar meses
    cargarmeses();
        //Mostrar registros en la tabla
        mostrarventadetalle(SelectListaMesdeventa,cliente);
        limpiarcajas();
}

function validarpresupuestomensual() {
    const presupuestomensual = cajapresupuestomensual.value;
    const costo =cajacosto.value;
    const regex = /^[0-9,$]*$/;
    const mensaje = document.getElementById('mensaje');
    const title_card = document.querySelector('.mensaje');
    let valor = true;
    if (regex.test(presupuestomensual) && regex.test(costo)) {
        mensaje.textContent = "";
        mensaje.className = "success";
        valor = true;
    } else {
        mensaje.textContent = "El número de presupuesto mensual o el costo del producto esta mal el formato.";
        mensaje.className = "error";                
        valor = false;
    }
    return valor;
}
