const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const compWidth = canvas.width;
const compHeight = canvas.height;

const tMin = 0.25; // minimum segment duration
const tMax = 1.0; // maximum segment duration

let obj = {
    position: { x: compWidth / 2, y: compHeight / 2 },
    scale: { x: 100, y: 100 },
    rotation: 0,
    startPosition: { x: compWidth / 2, y: compHeight / 2 },
    endPosition: { x: compWidth / 2, y: compHeight / 2 },
    startScale: { x: 100, y: 100 },
    endScale: { x: 100, y: 100 },
    startRotation: 0,
    endRotation: 0,
    startTime: 0,
    endTime: 0,
    j: 0
};

function random(min, max) {
    return min + Math.random() * (max - min);
}

function updateProperties(time) {
    while (time >= obj.endTime) {
        obj.j++;
        obj.startTime = obj.endTime;
        obj.endTime += random(tMin, tMax);
        
        obj.startPosition = obj.endPosition;
        obj.endPosition = {
            x: random(0.1 * compWidth, 0.9 * compWidth),
            y: random(0.1 * compHeight, 0.9 * compHeight)
        };
        
        obj.startScale = obj.endScale;
        let s = random(75, 150);
        obj.endScale = { x: s, y: s };
        
        obj.startRotation = obj.endRotation;
        obj.endRotation = random(0, 720);
    }
}

function ease(time, start, end, startVal, endVal) {
    let t = (time - start) / (end - start);
    t = t > 1 ? 1 : t;
    if (typeof startVal === 'number') {
        return startVal + (endVal - startVal) * t;
    } else {
        return {
            x: startVal.x + (endVal.x - startVal.x) * t,
            y: startVal.y + (endVal.y - startVal.y) * t
        };
    }
}

function draw(time) {
    ctx.clearRect(0, 0, compWidth, compHeight);

    updateProperties(time / 1000); // Convert time to seconds

    let position = ease(time / 1000, obj.startTime, obj.endTime, obj.startPosition, obj.endPosition);
    let scale = ease(time / 1000, obj.startTime, obj.endTime, obj.startScale, obj.endScale);
    let rotation = ease(time / 1000, obj.startTime, obj.endTime, obj.startRotation, obj.endRotation);

    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.scale(scale.x / 100, scale.y / 100);
    ctx.fillStyle = 'blue';
    ctx.fillRect(-50, -50, 100, 100);
    ctx.restore();

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
