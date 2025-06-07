
const cakeContainer = document.getElementById('cake-container');
const flame = document.getElementById('flame');
const instructionText = document.getElementById('instruction-text');
const extinguishMessage = document.getElementById('extinguish-message');
const balloonContainer = document.getElementById('balloon-container');
const birthdaySound = document.getElementById('birthday-sound');
const giftContainer = document.getElementById('gift-container');
const giftBox = document.getElementById('giftBox');
const confettiContainer = document.getElementById('confetti-container');
function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles() {
  const r = random(255);
  const g = random(255);
  const b = random(255);
  const mt = random(200);
  const ml = random(50);
  const dur = random(5) + 5;
  return `
    background-color: rgba(${r},${g},${b},0.7);
    color: rgba(${r},${g},${b},0.7);
    margin: ${mt}px 0 0 ${ml}px;
    animation: float ${dur}s ease-in infinite;
  `;
}

function createBalloons(num) {
  for (let i = 0; i < num; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.cssText = getRandomStyles();
    balloonContainer.appendChild(balloon);
  }
}

// Create glittery confetti
function createConfetti() {
  const colors = [
    '#ff0000', '#00ff00', '#0000ff', '#ffff00',
    '#ff00ff', '#00ffff', '#ff8800', '#ff0088',
    '#8800ff', '#00ff88', '#88ff00', '#0088ff'
  ];
  
  const shapes = [
    'circle', 'square', 'triangle', 'diamond',
    'star', 'heart', 'pentagon', 'hexagon'
  ];
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Random position
    const left = random(100);
    const animationDuration = random(10) + 5;
    const delay = random(10);
    const size = random(15) + 5;
    
    // random color and shape
    const color = colors[random(colors.length)];
    const shape = shapes[random(shapes.length)];
    
    // add glitter effect
    const glitter = `
      background: ${color};
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${animationDuration}s;
      animation-delay: ${delay}s;
      filter: drop-shadow(0 0 2px ${color}) 
              drop-shadow(0 0 5px white);
    `;
    
    // shape specific styles
    if (shape === 'circle') {
      confetti.style.cssText = glitter + 'border-radius: 50%;';
    } else if (shape === 'triangle') {
      confetti.style.cssText = glitter + 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%);';
    } else if (shape === 'diamond') {
      confetti.style.cssText = glitter + 'clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);';
    } else if (shape === 'star') {
      confetti.style.cssText = glitter + 'clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);';
    } else if (shape === 'heart') {
      confetti.style.cssText = glitter + 'clip-path: polygon(50% 15%, 15% 40%, 30% 65%, 50% 90%, 70% 65%, 85% 40%);';
    } else {
      confetti.style.cssText = glitter;
    }
    
    confettiContainer.appendChild(confetti);
  }
}

cakeContainer.addEventListener('click', () => {
  if (flame.style.display === 'none') return;
  
  flame.style.display = 'none';

  instructionText.classList.add('fade-out');
  extinguishMessage.style.display = 'block';
  
  createBalloons(40);
  
  birthdaySound.play();

  // after 2 seconds, fade out the cake and show the gift
  setTimeout(() => {
    cakeContainer.style.opacity = '0';
    
    // after another 1 second when cake is faded out nd show the gift
    setTimeout(() => {
      giftContainer.classList.add('visible');
    }, 3000);
  }, 8000);

  // stop the sound after 18mins
  setTimeout(() => {
    birthdaySound.pause();
    birthdaySound.currentTime = 0;
  }, 180000);
});

// gift box click handler
giftBox.addEventListener('click', function() {
  this.classList.add('clicked');

  // stop the birthday music 
  birthdaySound.pause();
  birthdaySound.currentTime = 0;

  const videoContainer = document.getElementById('videoContainer');
  const video = videoContainer.querySelector('video');

  videoContainer.classList.add('show');

  // after fade-in
  setTimeout(() => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }

    video.play();
  }, 500);
});

document.getElementById('video').addEventListener('ended', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
});
createConfetti();