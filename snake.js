// Set up the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

// Define the obstacles
const obstacles = [
  { x: 5, y: 5 },
  { x: 20, y: 20 },
  { x: 20, y: 15 },
  { x: 10, y: 20 },
];

// Set up the game variables
let snake = [{ x: 10, y: 10 }];
let food = { x: 0, y: 0 };
let direction = "right";
let score = 0;

// Set up the game loop
function gameLoop() {
  // Move the snake
  let head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }
  snake.unshift(head);

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }

// Check for collision with walls or self
if (head.x < 0) {
  head.x = width / 10 - 1;
} else if (head.x >= width / 10) {
  head.x = 0;
}
if (head.y < 0) {
  head.y = height / 10 - 1;
} else if (head.y >= height / 10) {
  head.y = 0;
}
for (let i = 1; i < snake.length; i++) {
  if (head.x === snake[i].x && head.y === snake[i].y) {
    gameOver();
    return;
  }
}
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
      return;
    }
  }
  for (let i = 0; i < obstacles.length; i++) {
    if (head.x === obstacles[i].x && head.y === obstacles[i].y) {
      gameOver();
      return;
    }
  }
  // Draw the game
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
  }
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 10, 20);

  ctx.fillStyle = "#9E9E9E"; // gray
for (let i = 0; i < obstacles.length; i++) {
  ctx.fillRect(obstacles[i].x * 10, obstacles[i].y * 10, 10, 10);
}

  // Call the game loop again
  setTimeout(gameLoop, 100);
}

// Add touch controls
let touchStartX = 0;
let touchStartY = 0;
document.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});
document.addEventListener("touchmove", (event) => {
  const touchEndX = event.touches[0].clientX;
  const touchEndY = event.touches[0].clientY;
  const dx = touchEndX - touchStartX;
  const dy = touchEndY - touchStartY;
  if (Math.abs(dx) > Math.abs(dy)) {
    // Horizontal swipe
    if (dx > 0) {
      // Right swipe
      if (direction !== "left") {
        direction = "right";
      }
    } else {
      // Left swipe
      if (direction !== "right") {
        direction = "left";
      }
    }
  } else {
    // Vertical swipe
    if (dy > 0) {
      // Down swipe
      if (direction !== "up") {
        direction = "down";
      }
    } else {
      // Up swipe
      if (direction !== "down") {
        direction = "up";
      }
    }
  }
});

// Set up the keyboard controls
document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case 38: // up arrow
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case 40: // down arrow
      if (direction !== "up") {
        direction = "down";
      }
      break;
    case 37: // left arrow
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case 39: // right arrow
      if (direction !== "left") {
        direction = "right";
      }
      break;
  }
});

// Set up the game over function
function gameOver() {
  alert(`Game over! Your score is ${score}.`);
  snake = [{ x: 10, y: 10 }];
  food = { x: 0, y: 0 };
  direction = "right";
  score = 0;
  generateFood();
}

// Set up the food generation function
function generateFood() {
  let x = Math.floor(Math.random() * width / 10);
  let y = Math.floor(Math.random() * height / 10);
  for (let i = 0; i < snake.length; i++) {
    if (x === snake[i].x && y === snake[i].y) {
      generateFood();
      return;
    }
  }
  food = { x, y };
}

// Start the game loop
generateFood();
gameLoop();