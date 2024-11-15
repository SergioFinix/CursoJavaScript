
// Variables y estado inicial del juego
let wordToGuess = "";        // Palabra secreta
let guessedLetters = [];     // Letras adivinadas correctamente
let attemptsLeft = 6;        // Intentos restantes
let hiddenWord = [];         // Estado actual de la palabra adivinada

// Función para iniciar el juego
async function startGame() {
  attemptsLeft = 6;
  guessedLetters = [];
  wordToGuess = await getWord();
  hiddenWord = Array(wordToGuess.length).fill("_");
  updateDisplay();
  document.getElementById("message").textContent = "¡Empieza el juego!";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();
}

// Fetch a API de palabra random en ingles
function getWord() {
  return new Promise(async (resolve) => {
    const response = await fetch('https://random-word-api.herokuapp.com/word');
    const data = await response.json();
    console.log('data', data);
    resolve(data[0]);
  });
}

// async function getWord() {
//   try {
//     const response = await fetch('https://random-word-api.herokuapp.com/word');
//     const data = response.json()
//     console.log('data', data)
//   } catch (error) {
//     console.error('Error al traer la palabra');
//     alert('Error al traer la palabra')
//   }
// }

// Simula una llamada asincrónica para obtener la palabra a adivinar

function fetchWord() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const words = ["javascript", "asincronia", "callback", "promesas"];
      const randomWord = words[Math.floor(Math.random() * words.length)];
      resolve(randomWord);
    }, 500);
  });
}

// Función para procesar una letra ingresada
function guessLetter() {
  const guessInput = document.getElementById("guessInput");
  const letter = guessInput.value.toLowerCase();

  // Validación del input (solo una letra y no repetida)
  if (!letter || letter.length !== 1 || guessedLetters.includes(letter)) {
    document.getElementById("message").textContent = "Ingresa una letra válida y que no hayas usado.";
    return;
  }

  guessedLetters.push(letter);

  // Verifica si la letra está en la palabra
  if (wordToGuess.includes(letter)) {
    updateHiddenWord(letter);
    document.getElementById("message").textContent = "¡Bien hecho!";
  } else {
    attemptsLeft--;
    document.getElementById("message").textContent = "Letra incorrecta.";
  }

  // Actualiza el display y verifica si el juego ha terminado
  updateDisplay();
  checkGameStatus();
}

// Actualiza el display de la palabra con las letras correctas adivinadas
function updateHiddenWord(letter) {
  for (let i = 0; i < wordToGuess.length; i++) {
    if (wordToGuess[i] === letter) {
      hiddenWord[i] = letter;
    }
  }
}

// Actualiza el DOM para mostrar la palabra, los intentos restantes y el estado del juego
function updateDisplay() {
  document.getElementById("wordDisplay").textContent = hiddenWord.join(" ");
  document.getElementById("attemptsLeft").textContent = attemptsLeft;
  document.getElementById("guessInput").value = "";
}

// Verifica si el juego se ha ganado o perdido
function checkGameStatus() {
  if (hiddenWord.join("") === wordToGuess) {
    document.getElementById("message").textContent = "¡Ganaste! La palabra era: " + wordToGuess;
    disableInput();
  } else if (attemptsLeft <= 0) {
    document.getElementById("message").textContent = "¡Perdiste! La palabra era: " + wordToGuess;
    disableInput();
  }
}

// Deshabilita la entrada del usuario al finalizar el juego
function disableInput() {
  document.getElementById("guessInput").disabled = true;
}

// Inicia el juego al cargar la página
startGame();
