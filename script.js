// Loader
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("loader").classList.add("hidden"), 600);
});

// ===============================
// Chinmay's Cursor (as-is)
// ===============================
const cursor = document.getElementById('cursor');
const trails = [
  document.getElementById('trail1'),
  document.getElementById('trail2'),
  document.getElementById('trail3')
];

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;

  cursorX += dx * 0.2;
  cursorY += dy * 0.2;

  cursor.style.left = (cursorX - 10) + 'px';
  cursor.style.top  = (cursorY - 10) + 'px';

  trails.forEach((trail, index) => {
    const delay = (index + 1) * 0.05;
    const trailX = cursorX - (dx * delay * 5);
    const trailY = cursorY - (dy * delay * 5);

    trail.style.left = (trailX - 5) + 'px';
    trail.style.top  = (trailY - 5) + 'px';
    trail.style.opacity = 0.3 - (index * 0.1);
  });

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover expand
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
});

// ===============================
// Hero Line Chart (Chart.js)
// ===============================
const ctx = document.getElementById("chart").getContext("2d");

const gradient = ctx.createLinearGradient(0, 0, 0, 250);
gradient.addColorStop(0, "rgba(0, 212, 170, 0.6)");
gradient.addColorStop(1, "rgba(0, 212, 170, 0)");

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: Array.from({length: 20}, (_, i) => i),
    datasets: [{
      label: "Live Data",
      data: Array.from({length: 20}, () => Math.floor(Math.random()*100)),
      borderColor: "#00D4AA",
      borderWidth: 2,
      fill: true,
      backgroundColor: gradient,
      tension: 0.4,
      pointRadius: 0
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false }},
    scales: {
      x: { display: false },
      y: { display: false }
    },
    animation: {
      duration: 500,
      easing: "easeOutQuart"
    }
  }
});

// Update every second
setInterval(() => {
  chart.data.datasets[0].data.shift();
  chart.data.datasets[0].data.push(Math.floor(Math.random()*100));
  chart.update();
}, 1000);











// ===============================
// Hero Network Graph
// ===============================
const canvasNet = document.getElementById("network");
const ctxNet = canvasNet.getContext("2d");

canvasNet.width = canvasNet.offsetWidth;
canvasNet.height = canvasNet.offsetHeight;

window.addEventListener("resize", () => {
  canvasNet.width = canvasNet.offsetWidth;
  canvasNet.height = canvasNet.offsetHeight;
});

// Node class
class Node {
  constructor() {
    this.x = Math.random() * canvasNet.width;
    this.y = Math.random() * canvasNet.height;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.radius = 3;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvasNet.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvasNet.height) this.vy *= -1;
  }
  draw() {
    ctxNet.beginPath();
    ctxNet.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctxNet.fillStyle = "#00D4AA"; // teal nodes
    ctxNet.fill();
  }
}

const nodes = Array.from({ length: 25 }, () => new Node());

function animateNetwork() {
  ctxNet.clearRect(0, 0, canvasNet.width, canvasNet.height);

  // draw connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        ctxNet.beginPath();
        ctxNet.strokeStyle = "rgba(0, 212, 170, " + (1 - dist / 150) + ")";
        ctxNet.lineWidth = 1;
        ctxNet.moveTo(nodes[i].x, nodes[i].y);
        ctxNet.lineTo(nodes[j].x, nodes[j].y);
        ctxNet.stroke();
      }
    }
  }

  // update + draw nodes
  nodes.forEach(node => {
    node.update();
    node.draw();
  });

  requestAnimationFrame(animateNetwork);
}
animateNetwork();








// ===============================
// Typewriter Effect for Hero
// ===============================
const roles = ["Data Scientist ", "Data Analyst ", "ML Engineer ", "NLP Enthusiast ", "Developer "];
let roleIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;
const typedText = document.getElementById("typed-text");

function typeEffect() {
  const fullText = roles[roleIndex];

  if (isDeleting) {
    currentText = fullText.substring(0, charIndex--);
  } else {
    currentText = fullText.substring(0, charIndex++);
  }

  typedText.textContent = currentText;

  if (!isDeleting && charIndex === fullText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000); // pause at full word
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 300); // pause before typing new word
  } else {
    setTimeout(typeEffect, isDeleting ? 60 : 120);
  }
}

typeEffect();
