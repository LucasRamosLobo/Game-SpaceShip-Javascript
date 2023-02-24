// Obter o elemento canvas e o contexto 2D
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const spaceshipImg = new Image();
spaceshipImg.src = 'images/nave.png';

const meteorImg = new Image();
meteorImg.src = 'images/meteoro.png';

spaceshipImg.onload = () => {
  spaceshipLoaded = true;
};

meteorImg.onload = () => {
  meteorLoaded = true;
};
// Definir as dimensões da nave espacial e da bala
const spaceshipWidth = 50;
const spaceshipHeight = 50;
const bulletWidth = 6;
const bulletHeight = 20;
const maxMeteors = 10;
// Definir as posições iniciais da nave espacial e da bala
let spaceshipX = canvas.width / 2 - spaceshipWidth / 2;
let spaceshipY = canvas.height - spaceshipHeight - 10;
let bulletX = spaceshipX + spaceshipWidth / 2 - bulletWidth / 2;
let bulletY = spaceshipY;

// Definir a velocidade da nave espacial, da bala e do meteoro
const spaceshipSpeed = 5;
const bulletSpeed = 10;
const meteorSpeed = 5;

// Definir o tamanho e a velocidade dos meteoros
const meteorSize = 30;
const minMeteorSpeed = 2;
const maxMeteorSpeed = 5;

// Definir a pontuação inicial e a velocidade de aumento da pontuação
let score = 0;
const scoreIncreaseSpeed = 1;

// Criar um array para armazenar os meteoros
const meteors = [];

// Adicionar um evento de mousemove para controlar a nave espacial
canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  spaceshipX = event.clientX - rect.left - spaceshipWidth / 2;
});

// Adicionar um evento de click para atirar a bala
canvas.addEventListener('click', (event) => {
  bulletX = spaceshipX + spaceshipWidth / 2 - bulletWidth / 2;
  bulletY = spaceshipY;
});

// Desenhar a nave espacial
function drawSpaceship() {
    if (spaceshipLoaded) {
        ctx.drawImage(spaceshipImg, spaceshipX, spaceshipY, spaceshipWidth, spaceshipHeight);
}}


// Desenhar a bala
function drawBullet() {
  ctx.fillStyle = 'red';
  ctx.fillRect(bulletX, bulletY, bulletWidth, bulletHeight);
}

// Desenhar os meteoros
function drawMeteors() {
  for (let i = 0; i < meteors.length; i++) {
    if (meteorLoaded) {
        ctx.drawImage(meteorImg, meteors[i].x, meteors[i].y, meteorSize, meteorSize);
  }}
}

// Mover a nave espacial
function moveSpaceship() {
  if (spaceshipX < 0) {
    spaceshipX = 0;
  } else if (spaceshipX > canvas.width - spaceshipWidth) {
    spaceshipX = canvas.width - spaceshipWidth;
  }
}

// Mover a bala
function moveBullet() {
  bulletY -= bulletSpeed;
  if (bulletY < 0) {
    bulletY = spaceshipY;
  }
}

// Mover os meteoros
function moveMeteors() {
  for (let i = 0; i < meteors.length; i++) {
    meteors[i].y += meteorSpeed;
    if (meteors[i].y > canvas.height) {
      meteors.splice(i, 1);
      i--;
    }
  }
}

// Adicionar um novo meteoro
function addMeteor() {
    const x = Math.random() * (canvas.width - meteorSize);
    const y = -meteorSize;
    const speed = Math.random() * (maxMeteorSpeed - minMeteorSpeed) + minMeteorSpeed;
    if (meteors.length < 10){
      meteors.push({ x, y, speed });
    }}
    
    // Verificar se houve colisão entre a bala e um meteoro
function checkBulletCollision() {
    for (let i = 0; i < meteors.length; i++) {
        if (
            bulletX + bulletWidth > meteors[i].x &&
            bulletX < meteors[i].x + meteorSize &&
            bulletY + bulletHeight > meteors[i].y &&
            bulletY < meteors[i].y + meteorSize
    ) {
    bulletY = spaceshipY;
    meteors.splice(i, 1);
    i--;
    score += 1;
    }
    }
}
    
    // Verificar se houve colisão entre a nave espacial e um meteoro
function checkSpaceshipCollision() {
    for (let i = 0; i < meteors.length; i++) {
        if (
            spaceshipX + spaceshipWidth > meteors[i].x &&
            spaceshipX < meteors[i].x + meteorSize &&
            spaceshipY + spaceshipHeight > meteors[i].y &&
            spaceshipY < meteors[i].y + meteorSize
    ) {
    alert('Game Over! Your score: ' + score);
    location.reload();
    }
    }
}
    
    // Aumentar a pontuação
    function increaseScore() {
    score += scoreIncreaseSpeed;
    }
    
// Desenhar tudo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpaceship();
    drawBullet();
    drawMeteors();
    }
    
// Atualizar tudo
function update() {
    moveSpaceship();
    moveBullet();
    moveMeteors();
    checkBulletCollision();
    checkSpaceshipCollision();
    increaseScore();
    }
    
// Executar o jogo
    setInterval(() => {
    addMeteor();
    draw();
    update();
    }, 50);