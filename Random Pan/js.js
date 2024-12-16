const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const compWidth = canvas.width;
const compHeight = canvas.height;

const img = new Image();
img.src = 'your-image-url.jpg'; // Replace with the path to your image

const scaleTime = 1; // Duration to scale
const holdTime = 0.5; // Duration to hold
const maxScale = 1.5; // Maximum scale factor
const minScale = 1.0; // Minimum scale factor

let panAndScan = {
    scale: minScale,
    position: { x: compWidth / 2, y: compHeight / 2 },
    startTime: 0,
    endTime: 0,
    startScale: minScale,
    endScale: minScale,
    startPosition: { x: compWidth / 2, y: compHeight / 2 },
    endPosition: { x: compWidth / 2, y: compHeight / 2 },
    j: 0
};

img.onload = () => {
    requestAnimationFrame(draw);
};

function random(min, max) {
    return min + Math.random() * (max - min);
}

function updateProperties(time) {
    const totalTime = scaleTime + holdTime;
    while (time >= panAndScan.endTime) {
        panAndScan.j++;
        panAndScan.startTime = panAndScan.endTime;
        panAndScan.endTime += random(scaleTime, scaleTime + holdTime);

        panAndScan.startScale = panAndScan.endScale;
        panAndScan.endScale = random(minScale, maxScale);

        panAndScan.startPosition = panAndScan.endPosition;
        panAndScan.endPosition = {
            x: random((compWidth - img.width * panAndScan.endScale) / 2, (img.width * panAndScan.endScale - compWidth) / 2),
            y: random((compHeight - img.height * panAndScan.endScale) / 2, (img.height * panAndScan.endScale - compHeight) / 2)
        };
    }
}

function ease(t, startVal, endVal) {
    return startVal + (endVal - startVal) * t;
}

function draw(time) {
    ctx.clearRect(0, 0, compWidth, compHeight);

    time = time / 1000; // Convert time to seconds
    updateProperties(time);

    const totalTime = scaleTime + holdTime;
    const segTime = time % totalTime;

    if (segTime > scaleTime) {
        panAndScan.scale = panAndScan.endScale;
        panAndScan.position = panAndScan.endPosition;
    } else {
        const percent = segTime / scaleTime;
        panAndScan.scale = ease(percent, panAndScan.startScale, panAndScan.endScale);
        panAndScan.position.x = ease(percent, panAndScan.startPosition.x, panAndScan.endPosition.x);
        panAndScan.position.y = ease(percent, panAndScan.startPosition.y, panAndScan.endPosition.y);
    }

    ctx.save();
    ctx.translate(compWidth / 2, compHeight / 2);
    ctx.scale(panAndScan.scale, panAndScan.scale);
    ctx.translate(-img.width / 2 + panAndScan.position.x, -img.height / 2 + panAndScan.position.y);
    ctx.drawImage(img, 0, 0);
    ctx.restore();

    requestAnimationFrame(draw);
}
