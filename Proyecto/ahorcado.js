// Variables y estado inicial del juego
let palabraAdivinar = "";
let letrasAdivinadas = [];
let intentosRestantes = 6;
let palabraOculta = [];

// Inicializa variables para comenzar el juego
async function iniciarJuego() {
  intentosRestantes = 6;
  letrasAdivinadas = [];
  palabraAdivinar = await obtenerPalabra();
  palabraOculta = Array(palabraAdivinar.length).fill("_");
  actualizarPantalla();
  document.getElementById("mensaje").textContent = "¡Empieza el juego!";
  document.getElementById("entradaLetra").value = "";
  document.getElementById("entradaLetra").focus();
  document.getElementById("entradaLetra").disabled = false;
  document.querySelector("button[onclick='adivinarLetra()']").disabled = false;
  reiniciarAhorcado();
}

// Fetch a API para obtener una palabra aleatoria
function obtenerPalabra() {
  return new Promise(async (resolve) => {
    const respuesta = await fetch('https://random-word-api.herokuapp.com/word');
    const datos = await respuesta.json();
    resolve(datos[0]);
  });
}

// Valida que el caracter sea una letra o un número; de lo contrario, limpia el input
function validarEntradaLetra(event) {
  const input = event.target;
  const letra = input.value;
  const regex = /^[a-zA-Z0-9]$/;

  if (!regex.test(letra)) {
    input.value = '';
  }
}

// Valida la letra ingresada por el usuario
function adivinarLetra() {
  const entradaLetra = document.getElementById("entradaLetra");
  const letra = entradaLetra.value.toLowerCase();

  if (!letra || !/^[a-z]$/.test(letra) || letrasAdivinadas.includes(letra)) {
    document.getElementById("mensaje").textContent = "Ingresa una letra válida y que no hayas usado.";
    return;
  }

  letrasAdivinadas.push(letra);

  if (palabraAdivinar.includes(letra)) {
    actualizarPalabraOculta(letra);
    document.getElementById("mensaje").textContent = "¡Bien hecho!";
  } else {
    intentosRestantes--;
    document.getElementById("mensaje").textContent = "Letra incorrecta.";
    actualizarAhorcado();
  }
  actualizarPantalla();
  verificarEstadoJuego();
}

// Actualiza la palabra oculta al acertar una letra
function actualizarPalabraOculta(letra) {
  for (let i = 0; i < palabraAdivinar.length; i++) {
    if (palabraAdivinar[i] === letra) {
      palabraOculta[i] = letra;
    }
  }
}

// Actualiza el DOM
function actualizarPantalla() {
  document.getElementById("mostrarPalabra").textContent = palabraOculta.join(" ");
  document.getElementById("intentosRestantes").textContent = intentosRestantes;
  document.getElementById("entradaLetra").value = "";
}

// Verifica si se ganó o perdió
function verificarEstadoJuego() {
  if (palabraOculta.join("") === palabraAdivinar) {
    mostrarConfeti();
    deshabilitarEntrada();
  } else if (intentosRestantes <= 0) {
    document.getElementById("mensaje").textContent = "¡Perdiste! La palabra era: " + palabraAdivinar;
    deshabilitarEntrada();
  }
}

// Deshabilita la entrada de datos
function deshabilitarEntrada() {
  document.getElementById("entradaLetra").disabled = true;
}

// Reinicia el muñeco del ahorcado
function reiniciarAhorcado() {
  const contenedorAhorcado = document.getElementById("estructura");
  contenedorAhorcado.className = "";
}

// Actualiza el estado del ahorcado
function actualizarAhorcado() {
  const contenedorAhorcado = document.getElementById("estructura");
  const clases = ["mostrar-cabeza", "mostrar-cuerpo", "mostrar-brazo-izquierdo", "mostrar-brazo-derecho", "mostrar-pierna-izquierda", "mostrar-pierna-derecha"];
  const indice = 6 - intentosRestantes;
  if (indice >= 0 && indice < (clases.length + 1)) {
    contenedorAhorcado.classList.add(clases[indice - 1]);
  }
}

// Inicializa el juego
iniciarJuego();
