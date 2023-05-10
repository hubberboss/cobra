
// Define the canvas and its dimensions globally
let canvas, ctx, width, height;

window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  width = canvas.width;
  height = canvas.height;

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

  // Define the initial game speed (milliseconds)
  let speed = 200;

  // Define game loop interval
  let gameInterval;
// Set up the game loop
function gameLoop() {
  // Clear the current game interval
  clearInterval(gameInterval);

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

  // Game Over if snake is out of canvas or hits itself
  if (head.x < 0 || head.y < 0 || head.x >= width / 10 || head.y >= height / 10 || snake.some((s) => s.x === head.x && s.y === head.y)) {
    gameOver();
    return;
  }

  snake.unshift(head);

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    score++;
    // Increase the game speed with every point, up to a minimum limit
    speed = Math.max(50, speed - 5);
    generateFood();
  } else {
    snake.pop();
  }

  // Clear canvas and draw snake and food
  ctx.clearRect(0, 0, width, height);
  snake.forEach((s) => {
    ctx.fillStyle = 'green';
    ctx.fillRect(s.x * 10, s.y * 10, 10, 10);
  });
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * 10, food.y * 10, 10, 10);

  // Call the game loop again
  gameInterval = setInterval(gameLoop, speed);
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
  speed = 200; // Reset speed
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

// Add an event listener to the start button
document.getElementById("start-button").addEventListener("click", function() {
  // Start the game loop
  gameLoop();
});
};