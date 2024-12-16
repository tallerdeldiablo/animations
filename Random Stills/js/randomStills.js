const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const compWidth = canvas.width;
const compHeight = canvas.height;

const images = [
    'http://img.dummy-image-generator.com/abstract/dummy-800x600-FairyLights.jpg',
    'http://img.dummy-image-generator.com/abstract/dummy-800x600-RedDots.jpg',
    'http://img.dummy-image-generator.com/abstract/dummy-800x600-Mosque.jpg',
    'http://img.dummy-image-generator.com/abstract/dummy-800x600-Utrecht.jpg',
    'http://img.dummy-image-generator.com/abstract/dummy-800x600-Map.jpg'
];

const duration = 1; // length of each cut (seconds)
let loadedImages = [];
let currentIndex = 0;

images.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        loadedImages[index] = img;
        if (loadedImages.filter(Boolean).length === images.length) {
            requestAnimationFrame(draw);
        }
    };
});

function draw(time) {
    const timeInSeconds = time / 1000; // convert time to seconds
    const seed = Math.floor(timeInSeconds / duration) + 1;
    Math.seedrandom(seed); // Use a seeded random number generator
    currentIndex = Math.floor(Math.random() * loadedImages.length);

    ctx.clearRect(0, 0, compWidth, compHeight);
    ctx.drawImage(loadedImages[currentIndex], 0, 0, compWidth, compHeight);

    requestAnimationFrame(draw);
}
