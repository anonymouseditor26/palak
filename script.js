// Confetti animation
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confetti = [];
let animationFrameId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function randomColor() {
    const colors = ['#ff6f61', '#ffb347', '#f7cac9', '#92a8d1', '#b5ead7', '#f9d423', '#e2f0cb'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createConfettiPiece() {
    return {
        x: Math.random() * canvas.width,
        y: -20,
        r: Math.random() * 6 + 4,
        d: Math.random() * 40 + 10,
        color: randomColor(),
        tilt: Math.random() * 10 - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
    };
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.d / 5);
        ctx.stroke();
    });
    updateConfetti();
}

function updateConfetti() {
    for (let i = 0; i < confetti.length; i++) {
        confetti[i].y += (Math.cos(confetti[i].d) + 3 + confetti[i].r / 2) / 2;
        confetti[i].tiltAngle += confetti[i].tiltAngleIncremental;
        confetti[i].tilt = Math.sin(confetti[i].tiltAngle) * 15;
        if (confetti[i].y > canvas.height) {
            confetti[i] = createConfettiPiece();
            confetti[i].y = -20;
        }
    }
}

function startConfetti() {
    confetti = [];
    for (let i = 0; i < 150; i++) {
        confetti.push(createConfettiPiece());
    }
    cancelAnimationFrame(animationFrameId);
    animateConfetti();
    setTimeout(stopConfetti, 5000);
}

function animateConfetti() {
    drawConfetti();
    animationFrameId = requestAnimationFrame(animateConfetti);
}

function stopConfetti() {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.getElementById('celebrateBtn').addEventListener('click', startConfetti); 