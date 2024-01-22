const btn = document.getElementById("btn");
const poza = document.getElementById("poza");
const litere = document.getElementById("litere");
const greseli = document.getElementById("greseli");
const mesaj = document.getElementById("mesaj");

let cuvant;
let mistakes = 7;
let gameEnded = false;

document.addEventListener("DOMContentLoaded", onLoad);
document.addEventListener("keyup", onKeyUp);

//Reset when load the site and press the Reset button
function onLoad() {
    onReset();
    btn.addEventListener("click", onReset);
}
//Resets the game to start point
function onReset() {
    gameEnded = false;
    mesaj.innerHTML = "START GAME!!";
    mistakes = 7;
    greseli.innerHTML = "";
    //This selects the all elements win an id and hide them
    poza.querySelectorAll("[id]").forEach((x) => (x.style.display = "none"));
    cuvant = chooseWord();
    drawWord(cuvant);
}

function drawWord(cuvant) {
    let litera;
    litere.innerHTML = "";
    //This transforms the word into an array of letters and I go through it 1 by 1
    // and transmits the parameter and position of letter
    cuvant.split("").forEach((l, i) => {
        litera = document.createElement("span");
        if (i == 0 || i == cuvant.length - 1) litera.textContent = l;
        else litera.k = l;
        litere.appendChild(litera);
    });
}
//This selects the word for puzzle
function chooseWord() {
    let cuvinte = ["ceainic", "balenozaur", "cighiristan", "pachiderm", "rinoplastie"];
    let ndx = generateNumber(-1, cuvinte.length - 1);
    return cuvinte[ndx];
}
//This create a random number
function generateNumber(minValue, maxValue) {
    return Math.ceil(minValue + Math.random() * (maxValue - minValue));
}

function onKeyUp(e) {
    if (gameEnded) return;
    mesaj.innerHTML = "";
    let guess = e.key;
    //Check if the pressed key is a letter
    if (e.keyCode < 65 || e.keyCode > 90) return;
    let empty = getEmptySlots();
    let ghicite = 0;
    empty.forEach((l) => {
        if (l.k == guess) {
            l.textContent = guess;
            delete l.k;
            ghicite++;
        }
    });
    //If the guess is wrong , display the letter , draw the caracter
    //  and lower the mistakes
    if (ghicite == 0) {
        greseli.textContent = `${greseli.textContent} ${guess} | `;
        greseli.style.color = "white";
        addPenalty(mistakes);
        mistakes--;
    }
    if (getEmptySlots().length == 0) {
        gameEnded = true;
        mesaj.innerHTML = "YOU WON!!!!";
    } else if (mistakes == 0) {
        gameEnded = true;
        mesaj.innerHTML = "YOU LOST!";
    }
}

function getEmptySlots() {
    return Array.from(litere.querySelectorAll("span")).filter((l) => l.textContent == "");
}
function addPenalty(id) {
    poza.getElementById(`id${7 - id + 1}`).style.display = "inherit";
}
