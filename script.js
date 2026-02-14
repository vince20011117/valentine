const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const card = document.querySelector(".card");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const dynamicGif = document.getElementById("dynamicGif");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let noCount = 0;
let particles = [];

const messages = [
  "NO 💔",
  "Are you sure? 😐",
  "Really?? 😢",
  "Please… 🥺",
  "This hurts 😭",
  "Just press YES 😏",
  "Last chance! NO or YES? 😬",
  "You're enjoying this, aren't you? 😤",
  "Fine, keep saying NO... 😒",
  "Okay fine… YES? 😏",
];

// Gifs that change with each NO click - matching the emotional progression
const gifs = [
  "assets/cutepuppy.gif", // Cute puppy - initial NO
  "assets/confused.gif", // Confused cat
  "assets/sad.gif", // Sad puppy eyes
  "assets/shocked.gif", // Shocked kitten
  "assets/crying.gif", // Crying kitten
  "assets/heartbroken.gif", // Sad dog
  "assets/frustrated.gif", // Frustrated cat
  "assets/crying2.gif", // crying
  "assets/angry.gif", // Angry face
  "assets/annoyed.gif", // Annoyed look
  "assets/giveup.gif", // Giving up
];

// Particle system for effects
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = Math.random() * -6 - 2;
    this.life = 1;
    this.decay = Math.random() * 0.015 + 0.01;
    this.size = Math.random() * 3 + 2;
    this.color = ["#ff1744", "#ff5252", "#ff6e40", "#ffeb3b", "#ff69b4"][
      Math.floor(Math.random() * 5)
    ];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.2; // gravity
    this.life -= this.decay;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function createParticles(x, y, count = 8) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter((p) => p.life > 0);

  particles.forEach((p) => {
    p.update();
    p.draw(ctx);
  });

  if (particles.length > 0) {
    requestAnimationFrame(animate);
  }
}

function shakePage() {
  card.classList.add("shake");
  setTimeout(() => card.classList.remove("shake"), 400);
}

function handleNoClick() {
  noCount++;
  message.textContent = messages[Math.min(noCount, messages.length - 1)];
  
  // Update the gif to match the message emotion - gifs will cycle/loop
  dynamicGif.style.opacity = "0.7";
  setTimeout(() => {
    // Use modulo to cycle through gifs if clicks exceed number of gifs
    const gifIndex = noCount % gifs.length;
    dynamicGif.src = gifs[gifIndex];
    dynamicGif.style.opacity = "1";
  }, 150);

  // YES grows with animation
  const yesScale = 1 + noCount * 0.15;
  yesBtn.style.transform = `scale(${Math.min(yesScale, 3)})`;

  // NO shrinks and changes position
  const noScale = Math.max(0.3, 1 - noCount * 0.12);
  noBtn.style.transform = `scale(${noScale}) rotate(${noCount * 5}deg)`;

  // Create particles at NO button location
  const rect = noBtn.getBoundingClientRect();
  createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
  animate();

  shakePage();
}

// Handle window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Works on PC & mobile
noBtn.addEventListener("click", handleNoClick);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  handleNoClick();
});

yesBtn.addEventListener("click", () => {
  // Create celebration particles
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    createParticles(x, y, 5);
  }
  animate();

  setTimeout(() => {
    window.location.href = "yes.html";
  }, 600);
});
