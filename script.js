const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const gameOverDisplay = document.getElementById("game-over");
const highScoreDisplay = document.getElementById("highScore");
const currentScoreDisplay = document.getElementById("currentScore");

let isJumping = false;
let gravity = 0.5; 
let dinoBottom = 50;
let jumpHeight = 220; // Maximum jump height
let jumpSpeed = 15;   
let fallSpeed = 0;    
let score = 0;
let highScore = 0;

document.addEventListener("keydown", function(event) {
  if (event.key === " " && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  let jumpInterval = setInterval(() => {
    // Move up
    if (dinoBottom < jumpHeight) {
      dinoBottom += jumpSpeed;
      dino.style.bottom = dinoBottom + 'px';
    } else {
      // Start falling down
      clearInterval(jumpInterval);
      fall();
    }
  }, 20);
}

function fall() {
  let fallInterval = setInterval(() => {
    // Move down
    if (dinoBottom > 50) { 
      dinoBottom -= gravity + fallSpeed; 
      fallSpeed += 0.2; 
      dino.style.bottom = dinoBottom + 'px';
    } else {
      clearInterval(fallInterval);
      dinoBottom = 50; 
      isJumping = false;
      fallSpeed = 0; 
    }
  }, 20);
}

let gameInterval = setInterval(function() {
  let dinoBottomPos = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
  let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

  if (obstacleLeft > 0 && obstacleLeft < 50 && dinoBottomPos <= 100) {
    clearInterval(gameInterval);
    obstacle.style.animation = "none";
    showGameOver();
  } else if (obstacleLeft < 0) {
    score++;
    scoreDisplay.innerText = "Score: " + score;
  }
}, 10);

function showGameOver() {
  currentScoreDisplay.innerText = score;
  if (score > highScore) {
    highScore = score;
  }
  highScoreDisplay.innerText = highScore;

  gameOverDisplay.style.display = "flex"; 
}

function restartGame() {
  score = 0;
  scoreDisplay.innerText = "Score: 0";
  dino.style.bottom = '50px'; 
  dinoBottom = 50;
  fallSpeed = 0;  
  obstacle.style.animation = ""; 
  obstacle.style.right = '0';
  gameOverDisplay.style.display = "none"; 
  gameInterval = setInterval(gameLoop, 10);
}

function gameLoop() {
  let dinoBottomPos = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
  let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

  if (obstacleLeft > 0 && obstacleLeft < 50 && dinoBottomPos <= 100) {
    clearInterval(gameInterval);
    showGameOver();
  } else if (obstacleLeft < 0) {
    score++;
    scoreDisplay.innerText = "Score: " + score;
  }
}
