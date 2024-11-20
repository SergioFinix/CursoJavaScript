// Variables y estado inicial del juego
let wordToGuess = "";
let guessedLetters = [];
let attemptsLeft = 6;
let hiddenWord = [];

// Inicializa variables para comnezar el juego
async function startGame() {
  attemptsLeft = 6;
  guessedLetters = [];
  wordToGuess = await getWord();
  hiddenWord = Array(wordToGuess.length).fill("_");
  updateDisplay();
  document.getElementById("message").textContent = "¡Empieza el juego!";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();
  document.getElementById("guessInput").disabled = false;
  document.querySelector("button[onclick='guessLetter()']").disabled = false;
  resetHangman();
}

// Fetch a API de palabra random en ingles
function getWord() {
  return new Promise(async (resolve) => {
    const response = await fetch('https://random-word-api.herokuapp.com/word');
    const data = await response.json();
    // console.log('data', data);
    resolve(data[0]);
  });
}

// Valida las que el caracter sea una letra o un numero de lo contrario limpia el nput
function validateLetterInput(event) {
  const input = event.target;
  const letter = input.value;
  const regex = /^[a-zA-Z0-9]$/;

  if (!regex.test(letter)) {
    input.value = '';
  }
}

// Valida la letra que ingresa el usuario, que no se repita y no este vacia
function guessLetter() {
  const guessInput = document.getElementById("guessInput");
  const letter = guessInput.value.toLowerCase();

  if (!letter || !/^[a-z]$/.test(letter) || guessedLetters.includes(letter)) {
    document.getElementById("message").textContent = "Ingresa una letra válida y que no hayas usado.";
    return;
  }

  // Mete en un arreglo la palabra
  guessedLetters.push(letter);

  // Verifica si ya existe la letra o es incorrecta
  if (wordToGuess.includes(letter)) {
    updateHiddenWord(letter);
    document.getElementById("message").textContent = "¡Bien hecho!";
  } else {
    attemptsLeft--;
    document.getElementById("message").textContent = "Letra incorrecta.";
    updateHangman();
  }
  updateDisplay();
  checkGameStatus();
}

// Actualiza la palabra del ahorcado, cambia el guion por la letra adivinada
function updateHiddenWord(letter) {
  for (let i = 0; i < wordToGuess.length; i++) {
    if (wordToGuess[i] === letter) {
      hiddenWord[i] = letter;
    }
  }
}

// Actualiza la el doom, intentos restantes, y letras acertadas
function updateDisplay() {
  document.getElementById("wordDisplay").textContent = hiddenWord.join(" ");
  document.getElementById("attemptsLeft").textContent = attemptsLeft;
  document.getElementById("guessInput").value = "";
}

// Comprueba si el juego ha terminado, se gano o se perdió
function checkGameStatus() {
  if (hiddenWord.join("") === wordToGuess) {
    //document.getElementById("message").textContent = "¡Ganaste! La palabra era: " + wordToGuess;
    Toastify({
      text: `Palabra a adivinar: ${wordToGuess}`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "bottom",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();

    const end = Date.now() + 15 * 500;
    const colors = ["#ffffff", "#00b09b", "#96c93d", "#f2f2f2"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
    disableInput();
  } else if (attemptsLeft <= 0) {
    document.getElementById("message").textContent = "¡Perdiste! La palabra era: " + wordToGuess;
    confetti({
      spread: 360,
      ticks: 200,
      gravity: 1,
      decay: 0.94,
      startVelocity: 30,
      particleCount: 100,
      scalar: 3,
      shapes: ["image"],
      shapeOptions: {
        image: [{
          src: "https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f625.png",
          width: 60,
          height: 60,
        }],
      },
    });
    Toastify({
      text: `La palabra era: ${wordToGuess}`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "bottom",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
    disableInput();
  }
}

// Deshabilita el input
function disableInput() {
  document.getElementById("guessInput").disabled = true;
}

// Reinicia las clases del muñeco de ahorcado
function resetHangman() {
  const hangmanContainer = document.getElementById("gallows");
  hangmanContainer.className = "";
}

// Añade el cuerpo del muñeco en base a los intentos (estilos css en orden)
function updateHangman() {
  const hangmanContainer = document.getElementById("gallows");
  const classes = ["show-head", "show-body", "show-left-arm", "show-right-arm", "show-left-leg", "show-right-leg"];
  const index = 6 - attemptsLeft;
  // console.log(index);
  if (index >= 0 && index < (classes.length + 1)) {
    hangmanContainer.classList.add(classes[index - 1]);
  }
}

// Inicializa el juego
startGame();