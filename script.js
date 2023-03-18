// Set up canvas for drawing the hangman
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

// Define the words to choose from
var words = ["apple", "banana", "cherry", "orange", "pear"];

// Select a random word from the list
var word = words[Math.floor(Math.random() * words.length)];

// Create an array of underscores to represent the hidden word
var hiddenWord = new Array(word.length).fill("_");

// Create an array to store guessed letters
var guessedLetters = [];

// Set up the number of incorrect guesses allowed
var maxGuesses = 6;
var numGuesses = 0;

// Draw the hangman on the canvas
function drawHangman() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // Draw the gallows
  ctx.beginPath();
  ctx.moveTo(20, canvasHeight - 20);
  ctx.lineTo(canvasWidth - 20, canvasHeight - 20);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(60, canvasHeight - 20);
  ctx.lineTo(60, 20);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(60, 20);
  ctx.lineTo(140, 20);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(140, 20);
  ctx.lineTo(140, 60);
  ctx.stroke();
  
  // Draw the head
  if (numGuesses > 0) {
    ctx.beginPath();
    ctx.arc(140, 80, 20, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  // Draw the body
  if (numGuesses > 1) {
    ctx.beginPath();
    ctx.moveTo(140, 100);
    ctx.lineTo(140, 180);
    ctx.stroke();
  }
  
  // Draw the left arm
  if (numGuesses > 2) {
    ctx.beginPath();
    ctx.moveTo(140, 120);
    ctx.lineTo(100, 100);
    ctx.stroke();
  }
  
  // Draw the right arm
  if (numGuesses > 3) {
    ctx.beginPath();
    ctx.moveTo(140, 120);
    ctx.lineTo(180, 100);
    ctx.stroke();
  }
  
  // Draw the left leg
  if (numGuesses > 4) {
    ctx.beginPath();
    ctx.moveTo(140, 180);
    ctx.lineTo(100, 220);
    ctx.stroke();
  }
  
  // Draw the right leg
  if (numGuesses > 5) {
    ctx.beginPath();
    ctx.moveTo(140, 180);
    ctx.lineTo(180, 220);
    ctx.stroke();
  }
}

// Update the displayed word with the correctly guessed letters
function updateWord() {
  var wordDiv = document.getElementById("word");
  wordDiv.innerHTML = "";
  for (var i = 0; i < hiddenWord.length; i++) {
    wordDiv.innerHTML += hiddenWord[i] + " ";
  }
}

// Update the displayed guessed letters
function updateGuesses() {
  var guessesDiv = document.getElementById("guesses");
  guessesDiv.innerHTML = "Guessed letters: ";
  for (var i = 0; i < guessedLetters.length; i++) {
    guessesDiv.innerHTML += guessedLetters[i] + ", ";
  }
}

// Check if the guessed letter is in the word
function checkGuess(guess) {
  if (guessedLetters.indexOf(guess) === -1) {
    guessedLetters.push(guess);
    if (word.indexOf(guess) === -1) {
      numGuesses++;
    } else {
      for (var i = 0; i < word.length; i++) {
        if (word.charAt(i) === guess) {
          hiddenWord[i] = guess;
        }
      }
    }
  }
}

// Check if the game is over
function checkGameOver() {
  if (numGuesses >= maxGuesses) {
    alert("Game over! The word was " + word);
    resetGame();
  } else if (hiddenWord.indexOf("_") === -1) {
    alert("You win! The word was " + word);
    resetGame();
  }
}

// Reset the game
function resetGame() {
  word = words[Math.floor(Math.random() * words.length)];
  hiddenWord = new Array(word.length).fill("_");
  guessedLetters = [];
  numGuesses = 0;
  updateWord();
  updateGuesses();
  drawHangman();
}

// Set up the event listener for key presses
document.addEventListener("keydown", function(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    var guess = String.fromCharCode(event.keyCode).toLowerCase();
    checkGuess(guess);
    updateWord();
    updateGuesses();
    drawHangman();
    checkGameOver();
  }
});

// Start the game
updateWord();
updateGuesses();
drawHangman();
