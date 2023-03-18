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
    ctx
