console.log("It works");

const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const levels = document.querySelector(".levels");

let lastHole;
let timeUp = false;
let max = 5000;
let min = 500;
let factor = 1;

function selectLevel(event) {
  console.log(event.target.value == 1);
  if (event.target.value == 1) {
    min = 500;
    max = 5000;
    factor = 1;
  } else if (event.target.value == 2) {
    min = 400;
    max = 4000;
    factor = 2;
  } else if (event.target.value == 3) {
    min = 300;
    max = 3000;
    factor = 3;
  } else if (event.target.value == 4) {
    min = 200;
    max = 2000;
    factor = 4;
  } else {
    min = 100;
    max = 1000;
    factor = 5;
  }
  console.log(max);
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log("same hole");
    return randomHole(holes);
  }
  // console.log(hole)
  lastHole = hole;

  return hole;
}

function peep() {
  const time = randomTime(min, max);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 10000);
}

function bonk(e) {
  if (!e.isTrusted) return;
  score = score + factor;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener("click", bonk));

levels.addEventListener("change", selectLevel);
