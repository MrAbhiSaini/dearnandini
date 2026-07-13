/**
 * ==========================================================================
 * DEAR NANDINI V2 - ULTRA-PREMIUM CANVAS CELEBRATION ENGINE
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("celebration-canvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const finalCelebrateBtn = document.getElementById("final-celebrate-btn");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    let confetti = [];
    let isActive = false;

    // Premium Color Palette for Sparks & Confetti
    const luxuryColors = ["#ff4d6d", "#ff85a1", "#d4af37", "#ffdf7a", "#00f5d4", "#7b2cbf", "#9d4edd"];

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // 1. FIREWORKS SPARK PARTICLE OBJECT
    class Spark {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            // Angle and velocity vector mathematics
            this.angle = Math.random() * Math.PI * 2;
            this.velocity = Math.random() * 6 + 2;
            this.drag = 0.95;
            this.gravity = 0.12;
            this.alpha = 1;
            this.fadeSpeed = Math.random() * 0.015 + 0.01;
        }
        update() {
            this.velocity *= this.drag;
            this.x += Math.cos(this.angle) * this.velocity;
            this.y += Math.sin(this.angle) * this.velocity + this.gravity;
            this.alpha -= this.fadeSpeed;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, Math.random() * 2 + 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // 2. RUNTIME CONFETTI RIBBON OBJECT
    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * -20 - 10;
            this.color = luxuryColors[Math.floor(Math.random() * luxuryColors.length)];
            this.size = Math.random() * 6 + 6;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = (Math.random() - 0.5) * 2;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 4 - 2;
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    // Trigger Burst Explosions Coordinates
    function createFireworkBurst(targetX, targetY) {
        const randomColor = luxuryColors[Math.floor(Math.random() * luxuryColors.length)];
        const particleCount = 80;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Spark(targetX, targetY, randomColor));
        }
    }

    // Main Canvas Render Loop
    function celebrationRenderLoop() {
        if (!isActive) return;

        // Creates a smooth trailing tail motion blur effect
        ctx.fillStyle = "rgba(7, 7, 9, 0.2)";
        ctx.fillRect(0, 0, width, height);

        // Update & Render Fireworks Sparks
        particles = particles.filter(p => p.alpha > 0);
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Update & Render Confetti Stream
        confetti = confetti.filter(c => c.y < height);
        confetti.forEach(c => {
            c.update();
            c.draw();
        });

        // Continuous automatic background bursts if running actively
        if (Math.random() < 0.04 && particles.length < 300) {
            createFireworkBurst(Math.random() * width, Math.random() * (height * 0.6));
        }

        // Keep feeding light confetti streams
        if (confetti.length < 100) {
            confetti.push(new ConfettiPiece());
        }

        requestAnimationFrame(celebrationRenderLoop);
    }

    // 3. EVENT INITIALIZER
    finalCelebrateBtn.addEventListener("click", () => {
        isActive = true;
        
        // Instant visual impact on user click coordinate
        createFireworkBurst(width / 2, height * 0.4);
        createFireworkBurst(width * 0.3, height * 0.3);
        createFireworkBurst(width * 0.7, height * 0.3);
        
        // Flood screen with confetti instantly
        for (let i = 0; i < 80; i++) {
            confetti.push(new ConfettiPiece());
        }

        // Boot system loop
        celebrationRenderLoop();

        // Optional: Shake button gently to provide premium dynamic feedback
        finalCelebrateBtn.style.transform = "scale(0.95)";
        setTimeout(() => {
            finalCelebrateBtn.style.transform = "none";
        }, 150);
    });
});