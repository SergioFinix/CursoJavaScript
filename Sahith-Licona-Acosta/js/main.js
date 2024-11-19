// arreglo de palabras
const palabras = ['casa','perro','pokemon','gato','celular','goku'];
// Seleccionamos la palabra al azar
const PalabraSecreta = palabras[Math.floor(Math.random()*palabras.length)];

// Variable que contendra las Letras ingresadas
let letrasIngresadas = [];

// variable que contiene el numero de Vidas
let vidas = 7;

// Elementos del DOM
const palabraElement = document.getElementById("palabra");
const letraInput = document.getElementById("letra");
const enviarButton = document.getElementById("enviar");
const resultadoElement = document.getElementById("resultado");
const vidasElement = document.getElementById("vidas");
const muñecoCanvas = document.getElementById("muñeco");
const ctx = muñecoCanvas.getContext("2d");
const btnInicia = document.getElementById("Inicio");
const Principal = document.getElementById("Principal");
const Vdjuegos = document.getElementById("ContJuego");

//Oculta el contenedor de la pantalla del juego
Vdjuegos.style.display = 'none';
// Funcion para limpiar la primer pantalla y pintar la nueva pantalla del juego
btnInicia.addEventListener("click", () => {
    
    btnInicia.style.display = 'none';
    Principal.style.display = 'none';
    Vdjuegos.style.display = '';
    
    
  });
  
// Función para actualizar palabra en pantalla
function actualizarPalabra() {
  let palabraMostrada = "";
  for (let i = 0; i < PalabraSecreta.length; i++) {
    if (letrasIngresadas.includes(PalabraSecreta[i])) {
      palabraMostrada += PalabraSecreta[i] + " ";
    } else {
      palabraMostrada += "_ ";
    }
  }
  palabraElement.textContent = palabraMostrada;
}

// Función para verificar letra ingresada
function verificarLetra(letra) {
  if (PalabraSecreta.includes(letra)) {
    letrasIngresadas.push(letra);
    actualizarPalabra();
  } else {
    vidas--;
    vidasElement.textContent = ` ${vidas}`;
    dibujarMuñeco(vidas);
  }
}

// Función para dibujar muñeco
function dibujarMuñeco(vidas) {
  const canvas =document.querySelector('.muñeco');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.lineWidth= 3;
  ctx.clearRect(0,0, canvas.width,canvas.heigth);

  // HORCA
  if (vidas <= 6) {
   
    ctx.fillRect(-10, 140, 400, 3);//
    ctx.fillRect(0, 0, 5, 140);//
    ctx.fillRect(150, 0, -400, 3);
    ctx.fillRect(150, 0, 5, 20);
  }

  // CABEZA
  if (vidas <= 5) {
   
    ctx.arc(152, 35, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#fff'; // Color del borde
    ctx.stroke();
   
  }

  // CUERPO
  if (vidas <= 4) {
    ctx.fillRect(150, 48, 5, 50);
  }

  // BRAZOS
  if (vidas <= 3) {
    ctx.fillRect(100,70 ,50 ,3);/* brazo*/
    ctx.fillRect(100,70 ,100 ,3);
   
  }

  // PIERNAS
  if (vidas <= 2) {
    
  
    ctx.fillRect(150, 95,10,3);
    ctx.fillRect(160, 95,5,40);
   
   
    
  }
  // PIERNAS
  if (vidas <= 1) {
    
    ctx.fillRect(140, 95,10,3);
    ctx.fillRect(135, 95,5,40);
    
    
  }

   
  ctx.stroke();
}

// Evento enviar
enviarButton.addEventListener("click", () => {
  const letra = letraInput.value.toLowerCase();
  if (letra.length === 1 && letra.match(/[a-z]/)) {
    verificarLetra(letra);
    letraInput.value = "";
  } else {
    alert("Ingrese una letra válida");
  }
});

// Inicializa juego
actualizarPalabra();

//Reinicia el juego
vvaj.addEventListener("click", () => {
  // Reinicia la palabra secreta
   const PalabraSecreta = palabras[Math.floor(Math.random()*palabras.length)];
  // Reinicia las letras ingresadas
   letrasIngresadas = [];
  
  // Reinicia las vidas
   vidas = 7;
  vidasElement.textContent = ` ${vidas}`;
  
  // Limpia el resultado
  resultadoElement.textContent = "";
  
  // Habilita el botón de enviar y el input de letra
  enviarButton.disabled = false;
  letraInput.disabled = false;
  
  // Limpia el canvas del muñeco
  ctx.clearRect(0, 0, muñecoCanvas.width, muñecoCanvas.height);
  
  // Actualiza la palabra en pantalla
  actualizarPalabra();
  
  // Oculta el botón de reiniciar
  vvaj.style.display = "none";
});









setInterval(()=>
{

// Verifica si el jugador ganó o perdió
for (let i = 0; i < PalabraSecreta.length; i++) {
  if (!letrasIngresadas.includes(PalabraSecreta[i])) {
    // Si encuentra una letra que no está en letrasIngresadas, sigue jugando
    break;
  } else if (i === PalabraSecreta.length - 1) {
    // Si todas las letras están en letrasIngresadas, gana el juego
    resultadoElement.textContent = `¡Felicidades, ganaste!`;
    enviarButton.disabled = true;
    letraInput.disabled = true;
    document.getElementById("vvaj").style.display = 'block';
  }
}
if (vidas === 0) {
  resultadoElement.textContent = `¡Lo siento, perdiste! La palabra era: ${PalabraSecreta}`;
  enviarButton.disabled = true;
  letraInput.disabled = true;

  document.getElementById("vvaj").style.display = 'block';
  
}


},2000);

   
