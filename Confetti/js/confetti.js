const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const compWidth = canvas.width;
const compHeight = canvas.height;

const life = 1.2; // life of particle in seconds
const minSpeed = 100; // minimum speed in y direction (pixels per second)
const maxSpeed = 150; // maximum speed in y direction
const maxDrift = 100; // maximum drift in x direction
const maxRotationSpeed = 360; // max rotation speed in degrees per second
const numParticles = 100; // number of particles

let particles = [];

function initParticles() {
    for (let i = 0; i < numParticles; i++) {
        particles.push(createParticle());
    }
}

function createParticle() {
    const delay = Math.random() * life;
    const seed = Math.floor(Math.random() * 1000) + 3;

    return {
        x: Math.random() * compWidth,
        y: -10,
        z: 0,
        delay,
        seed,
        age: 0,
        speed: random(minSpeed, maxSpeed),
        drift: random(-maxDrift, maxDrift),
        rotationSpeed: random(-maxRotationSpeed, maxRotationSpeed),
        rotation: random(0, 360)
    };
}

function random(min, max) {
    return min + Math.random() * (max - min);
}

function draw() {
    ctx.clearRect(0, 0, compWidth, compHeight);

    particles.forEach(particle => {
        const time = performance.now() / 1000;
        if (time < particle.delay) {
            particle.age = 0;
        } else {
            particle.age = (time - particle.delay) % life;
        }

        const x = particle.x + particle.age * particle.drift;
        const y = particle.y + particle.age * particle.speed;
        const rotation = particle.rotation + particle.age * particle.rotationSpeed;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.fillRect(-7.5, -7.5, 15, 15);
        ctx.restore();

        if (y > compHeight) {
            particle.y = -10;
            particle.age = 0;
            particle.delay = Math.random() * life;
        }
    });
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}

initParticles();
animate();
