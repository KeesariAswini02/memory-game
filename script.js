const board = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const movesDisplay = document.getElementById("moves");
const timeDisplay = document.getElementById("time");
const message = document.getElementById("message");

let cards = [];
let firstCard = null;
let secondCard = null;

let score = 0;
let moves = 0;
let time = 0;

setInterval(() => {
time++;
timeDisplay.textContent = time;
},1000);

function generateCards(size){

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let selected = letters.slice(0,size/2).split("");

cards = [...selected,...selected];

}

function startGame(){

board.innerHTML="";

cards.sort(()=>0.5 - Math.random());

cards.forEach(letter => {

const card = document.createElement("div");

card.classList.add("card");

card.dataset.letter = letter;

card.innerHTML="?";

card.addEventListener("click",flipCard);

board.appendChild(card);

});

}

function flipCard(){

if(this.classList.contains("flipped")) return;

this.innerHTML = this.dataset.letter;

this.classList.add("flipped");

if(!firstCard){

firstCard = this;

}else{

secondCard = this;

moves++;

movesDisplay.textContent = moves;

checkMatch();

}

}

function checkMatch(){

if(firstCard.dataset.letter === secondCard.dataset.letter){

score++;

scoreDisplay.textContent = score;

if(score === cards.length/2){

message.textContent="🎉 You Won!";

confetti();

}

resetCards();

}else{

setTimeout(()=>{

firstCard.innerHTML="?";

secondCard.innerHTML="?";

firstCard.classList.remove("flipped");

secondCard.classList.remove("flipped");

resetCards();

},800);

}

}

function resetCards(){

firstCard=null;

secondCard=null;

}

function restartGame(){

score=0;

moves=0;

time=0;

message.textContent="";

scoreDisplay.textContent=0;

movesDisplay.textContent=0;

timeDisplay.textContent=0;

startGame();

}

function changeDifficulty(){

let value = document.getElementById("difficulty").value;

generateCards(parseInt(value));

restartGame();

}

generateCards(8);

startGame();