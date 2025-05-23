const game = document.querySelector(".game");
const frog = document.getElementById("frog");

let logsArray = [];          
let logSpeed = 5;            
let spawnInterval = 2000;    
let lastSpawnTime = 0;

function jump() {
  if (!frog.classList.contains("jump")) {
    frog.classList.add("jump");
    setTimeout(() => {
      frog.classList.remove("jump");
    }, 300);
  }
}

function createLog() {
  const log = document.createElement("div");
  log.classList.add("logs");
  log.style.position = "absolute";
  log.style.top = "130px";
  log.style.width = "90px";
  log.style.height = "90px";
  log.style.backgroundImage = 'url("img/logs.png")';
  log.style.backgroundSize = "90px 90px";
  log.style.left = "900px";
  game.appendChild(log);
  logsArray.push(log);
}

function moveLogs() {
  for (let i = logsArray.length - 1; i >= 0; i--) {
    const log = logsArray[i];
    let left = parseFloat(log.style.left);
    left -= logSpeed;
    log.style.left = left + "px";

    if (left < -50) {
      log.remove();
      logsArray.splice(i, 1);
    }
  }
}

function checkCollision() {
  const frogTop = parseInt(window.getComputedStyle(frog).getPropertyValue("top"));

  for (const log of logsArray) {
    const logsLeft = parseInt(log.style.left);

    if (logsLeft < 80 && logsLeft > 70 && frogTop >= 100) {
      alert("Game Over!");
      resetGame();
      break;
    }
  }
}

function resetGame() {
  for (const log of logsArray) {
    log.remove();
  }
  logsArray = [];
  logSpeed = 5;
  spawnInterval = 2000;
  lastSpawnTime = 0;
}

function gameLoop(timestamp) {
  if (!lastSpawnTime) lastSpawnTime = timestamp;

  if (timestamp - lastSpawnTime > spawnInterval) {
    createLog();
    lastSpawnTime = timestamp;
    if (Math.random() < 0.5) {
      setTimeout(createLog, 800);
    }

    if (logSpeed < 15) logSpeed += 0.2;
    if (spawnInterval > 1000) spawnInterval -= 50;
  }

  moveLogs();
  checkCollision();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

document.addEventListener("keydown", jump);
