

let usuarios = {
    "Carlos": {
        nombre: "Carlos",
        presupuesto: 0,
        gastos: {
            Enero: [],
            Febrero: [],
            Marzo: []
        }
    },
    "Ana": {
        nombre: "Ana",
        presupuesto: 0,
        gastos: {
            Enero: [],
            Febrero: [],
            Marzo: []
        }
    },
    "Luis": {
        nombre: "Luis",
        presupuesto: 0,
        gastos: {
            Enero: [],
            Febrero: [],
            Marzo: []
        }
    },
    "María": {
        nombre: "María",
        presupuesto: 0,
        gastos: {
            Enero: [],
            Febrero: [],
            Marzo: []
        }
    },
    "José": {
        nombre: "José",
        presupuesto: 0,
        gastos: {
            Enero: [],
            Febrero: [],
            Marzo: []
        }
    },
    "Laura": {
        nombre: "Laura",
        presupuesto: 0,
        gastos: {
            Enero: [],
            Febrero: [],
            Marzo: []
        }
    },
    "Pedro": {
        nombre: "Pedro",
        presupuesto: 0,
        gastos: {
            Enero: [],
            Febrero: [],
            Marzo: []
        }
    },
    "Carmen": {
        nombre: "Carmen",
        presupuesto: 0,
        gastos: {
            Enero: [],
            Febrero: [],
            Marzo: []
        }
    },
    "Javier": {
        nombre: "Javier",
        presupuesto: 0,
        gastos: {
            Enero: [],
            Febrero: [],
            Marzo: []
        }
    },
    "Isabel": {
        nombre: "Isabel",
        presupuesto: 0,
        gastos: {
            Enero: [],
            Febrero: [],
            Marzo: []
        }
    }
};

let usuarioSeleccionado = usuarios['Carlos'];


function seleccionarUsuario(usuario) {
    usuarioSeleccionado = usuarios[usuario];
    document.getElementById("usuarioSeleccionadoNombre").innerText = usuario;
    actualizarTablas();
}


function actualizarPresupuesto() {
    usuarioSeleccionado.presupuesto = parseFloat(document.getElementById("presupuesto").value);
    actualizarTablas();
}


function abrirModal() {
    document.getElementById("myModal").style.display = "block";
}


function cerrarModal() {
    document.getElementById("myModal").style.display = "none";
}


function agregarCompra() {
    const mes = document.getElementById("mes").value;
    const producto = document.getElementById("producto").value;
    const precio = parseFloat(document.getElementById("precio").value);

    if (producto && !isNaN(precio)) {
        usuarioSeleccionado.gastos[mes].push({ producto, precio });
        cerrarModal();
        actualizarTablas();
    } else {
        alert("Por favor, ingrese un producto y un precio válidos.");
    }
}


function calcularTotalMes(mes) {
    return usuarioSeleccionado.gastos[mes].reduce((total, compra) => total + compra.precio, 0);
}


function actualizarTablas() {
    let html = '';
    const meses = ['Enero', 'Febrero', 'Marzo'];

    meses.forEach((mes) => {
        html += `<h3>Compras en ${mes}</h3><table><tr><th>Producto</th><th>Precio</th></tr>`;
        let totalMes = calcularTotalMes(mes);
        usuarioSeleccionado.gastos[mes].forEach((compra) => {
            html += `<tr><td>${compra.producto}</td><td>${compra.precio.toFixed(2)}</td></tr>`;
        });


        let className = totalMes > usuarioSeleccionado.presupuesto ? 'fuera-presupuesto' : 'dentro-presupuesto';
        html += `<tr><td><strong>Total ${mes}</strong></td><td class="${className}">${totalMes.toFixed(2)}</td></tr>`;
        html += `</table>`;
    });

    document.getElementById("tablas").innerHTML = html;
}


function mostrarResultados() {
    let totalGeneral = 0;
    let productoMasVendido = '';
    let cantidadProductos = {};

    for (let mes in usuarioSeleccionado.gastos) {
        usuarioSeleccionado.gastos[mes].forEach((compra) => {
            totalGeneral += compra.precio;
            cantidadProductos[compra.producto] = (cantidadProductos[compra.producto] || 0) + 1;
        });
    }


    productoMasVendido = Object.keys(cantidadProductos).reduce((a, b) => cantidadProductos[a] > cantidadProductos[b] ? a : b);

    document.getElementById("totalGeneral").innerText = `Total General: $${totalGeneral.toFixed(2)}`;
    document.getElementById("productoMasVendido").innerText = `Producto Más Vendido: ${productoMasVendido}`;
    document.getElementById("resultadosGenerales").style.display = 'block';
}


actualizarTablas();
