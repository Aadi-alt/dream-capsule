// ================================
// CURSOR GLOW
// ================================

const cursor = document.querySelector(".cursor-glow");

if (cursor) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });
}

// ================================
// PARTICLE SYSTEM
// ================================

const canvas = document.getElementById("particleCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

if (canvas && ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 3 + 1;

        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;

        this.opacity = Math.random();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.beginPath();

        ctx.fillStyle = `rgba(120,255,255,${this.opacity})`;

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
}

function createParticles() {
    particles = [];

    for (let i = 0; i < 120; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {

    for (let a = 0; a < particles.length; a++) {

        for (let b = a; b < particles.length; b++) {

            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;

            let distance = dx * dx + dy * dy;

            if (distance < 12000) {

                ctx.beginPath();

                ctx.strokeStyle =
                "rgba(150,0,255,0.08)";

                ctx.lineWidth = 1;

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();
            }
        }
    }
}

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    connectParticles();

    requestAnimationFrame(
        animateParticles
    );
}

if (canvas && ctx) {
    createParticles();
    animateParticles();

    window.addEventListener("resize", () => {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        createParticles();
    });
}

// ================================
// SCROLL REVEAL ANIMATION
// ================================

const reveals =
document.querySelectorAll(
    ".section,.chronicles-card,.conclave-card,.timeline-item"
);

function revealElements() {

    const trigger =
        window.innerHeight * 0.85;

    reveals.forEach((item) => {

        const top =
            item.getBoundingClientRect().top;

        if (top < trigger) {
            item.classList.add("show");
        }
    });
}

window.addEventListener(
    "scroll",
    revealElements
);

revealElements();

// ================================
// TIMELINE AUTO GLOW
// ================================

const timelineItems =
document.querySelectorAll(
    ".timeline-item"
);

let timelineIndex = 0;

if (timelineItems.length > 0) {
    setInterval(() => {

        timelineItems.forEach(item => {

            item.style.boxShadow = "none";
        });

        timelineItems[timelineIndex]
        .style.boxShadow =
        "0 0 30px #c77dff";

        timelineIndex++;

        if (
            timelineIndex >=
            timelineItems.length
        ) {
            timelineIndex = 0;
        }

    }, 1500);
}

// ================================
// AUDIO VISUALIZER
// ================================

const bars =
document.querySelectorAll(
    "#visualizer span"
);

const audio =
document.querySelector(
    ".audio-player"
);

if (audio) {

    audio.addEventListener("play", () => {

        bars.forEach((bar) => {

            bar.style.animationPlayState =
            "running";
        });

    });

    audio.addEventListener("pause", () => {

        bars.forEach((bar) => {

            bar.style.animationPlayState =
            "paused";
        });

    });

}

// ================================
// SCROLL TO TOP
// ================================

const topBtn =
document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener(
        "scroll",
        () => {

            if (
                document.documentElement
                .scrollTop > 500
            ) {
                topBtn.style.display =
                "block";
            } else {
                topBtn.style.display =
                "none";
            }
        }
    );

    topBtn.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top:0,
                behavior:"smooth"
            });

        }
    );
}

// ================================
// CINEMATIC PAGE LOAD
// ================================

window.addEventListener(
    "load",
    () => {

        document.body.style.opacity = 0;

        setTimeout(() => {

            document.body.style.transition =
            "opacity 2s ease";

            document.body.style.opacity = 1;

        }, 200);

    }
);

// ================================
// HERO TITLE FLOATING EFFECT
// ================================

const heroTitle =
document.querySelector(
    ".hero-title"
);

let floatDirection = 1;

setInterval(() => {

    if (heroTitle) {

        heroTitle.style.transform =
        `translateY(${floatDirection*8}px)`;

        heroTitle.style.transition =
        "2s ease";

        floatDirection *= -1;
    }

},2000);

// ================================
// MAGICAL BACKGROUND FLASH
// ================================

setInterval(() => {

    document.body.style.boxShadow =
    "inset 0 0 150px rgba(140,0,255,.15)";

    setTimeout(() => {

        document.body.style.boxShadow =
        "none";

    },600);

},8000);
