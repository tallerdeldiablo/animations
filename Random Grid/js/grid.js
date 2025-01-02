const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

// Grid configuration
const columns = 10; // Number of columns in the grid
const tHold = 0.2; // Hold time (in seconds)
const tMin = 0.5; // Minimum cycle time
const tMax = 1.0; // Maximum cycle time

const gap = canvas.width / columns; // Grid cell size
const rows = Math.floor(canvas.height / gap); // Number of rows
const origin = [gap, gap]; // Starting point of the grid

// Particle settings
const numParticles = 20; // Number of particles
const particles = [];

// Initialize particles
for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.floor(Math.random() * (columns - 1)),
    y: Math.floor(Math.random() * (rows - 1)),
    targetX: 0,
    targetY: 0,
    startTime: 0,
    endTime: 0,
    state: 'rest', // 'rest', 'moving'
  });
}

// Move particles randomly along the grid
function updateParticles() {
  const currentTime = performance.now() / 1000; // Time in seconds

  particles.forEach((particle) => {
    if (particle.state === 'rest') {
      // Generate a new move cycle
      particle.startTime = currentTime;
      particle.endTime = currentTime + Math.random() * (tMax - tMin) + tMin;
      particle.targetX = Math.floor(Math.random() * (columns - 1));
      particle.targetY = Math.floor(Math.random() * (rows - 1));
      particle.state = 'moving';
    }

    if (particle.state === 'moving') {
      const progress = (currentTime - particle.startTime) / (particle.endTime - particle.startTime);

      if (progress < tHold) {
        // Hold in the current position
        particle.currentX = particle.x;
        particle.currentY = particle.y;
      } else if (progress >= 1) {
        // Move to the new position
        particle.x = particle.targetX;
        particle.y = particle.targetY;
        particle.state = 'rest';
      } else {
        // Smooth transition
        particle.currentX = ease(progress, particle.x, particle.targetX);
        particle.currentY = ease(progress, particle.y, particle.targetY);
      }
    }
  });
}

// Ease function
function ease(t, start, end) {
  return start + (end - start) * Math.sin((t * Math.PI) / 2); // Ease-out
}

// Draw grid and particles
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw grid lines
  for (let x = 0; x <= columns; x++) {
    ctx.beginPath();
    ctx.moveTo(x * gap, 0);
    ctx.lineTo(x * gap, canvas.height);
    ctx.strokeStyle = '#ccc';
    ctx.stroke();
  }

  for (let y = 0; y <= rows; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * gap);
    ctx.lineTo(canvas.width, y * gap);
    ctx.strokeStyle = '#ccc';
    ctx.stroke();
  }

  // Draw particles
  particles.forEach((particle) => {
    ctx.beginPath();
    ctx.arc(
      origin[0] + particle.currentX * gap,
      origin[1] + particle.currentY * gap,
      gap / 4,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = '#ff5733';
    ctx.fill();
  });
}

// Animation loop
function animate() {
  updateParticles();
  draw();
  requestAnimationFrame(animate);
}

// Start animation
animate();
