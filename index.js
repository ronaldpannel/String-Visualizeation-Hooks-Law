/**@type{HTMLCanvasElement} */

// hooks Law
// F = -k * x
// F = spring force
// K = spring strength constant
// X = extension of displacement
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

let particles = [];
let springs = [];
let spacing = 10;
let k = 0.01;

let mouse = {
  x: undefined,
  y: undefined,
  pressed: false,
};
let offset = canvas.getBoundingClientRect();
for (let i = 0; i < 20; i++) {
  particles[i] = new Particle(200, i * spacing);
  if (i !== 0) {
    let a = particles[i];
    let b = particles[i - 1];
    let spring = new Spring(k, spacing, a, b);
    springs.push(spring);
  }
}
particles[0].locked = true;

let gravity = new Vector(0, 0.1);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let s of springs) {
    s.update();
    s.draw();
  }
  for (let p of particles) {
    p.applyForce(gravity);
    p.update();
    p.draw();
  }
  let tail = particles[particles.length - 1];
  if (mouse.pressed) {
    tail.pos.set(mouse.x, mouse.y);
    tail.vel.set(0, 0);
  }
  requestAnimationFrame(animate);
}
animate();

canvas.addEventListener("pointerdown", (e) => {
  mouse.pressed = true;
  if (mouse.pressed == true) {
    mouse.x = e.x - offset.left;
    mouse.y = e.y - offset.top;
  }
});

canvas.addEventListener("pointermove", (e) => {
  if (mouse.pressed == true) {
    mouse.x = e.x - offset.left;
    mouse.y = e.y - offset.top;

    console.log(mouse.x, mouse.y);
  }
});

canvas.addEventListener("pointerup", (e) => {
  mouse.pressed = false;
});

window.addEventListener("resize", (e) => {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
  offset = canvas.getBoundingClientRect();
  mouse.x = e.x - offset.left;
  mouse.y = e.y - offset.top;
});
