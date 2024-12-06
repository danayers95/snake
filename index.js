let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount -2;
let headX = 10;
let headY = 10;
let snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let inputsXVelocity = 0;
let insputsYVelocity = 0;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

// audio goes here if I want audio

// loop
function drawGame() {
  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;

  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return;
  }
  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();

  drawScore();

  if (score > 5) {
    speed = 9;
  }
  if (score > 10) {
    speed = 11;
  }
  if (score > 15) {
    speed = 15
  }
  if (score > 20) {
    speed = 22
  }

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  if (headX < 0) {
    gameOver = true;
  } else if (headX === tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === tileCount) {
    gameOver = true;
  }
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y == headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";

    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "50px Verdana";

      var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0", "blue");
      gradient.addColorStop("0.5", "magenta");
      gradient.addColorStop("1.0", "red");

      ctx.fillStyle = gradient;

      ctx.fillText("Game over, man!", canvas.width / 6.5, canvas.height / 2);
    }

    ctx.fillText("Game over, man!", canvas.width / 6.5, canvas.height / 2);
  }

  return gameOver;
}
