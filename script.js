console.log("Welcome to Tic Tac Toe");

let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isGameOver = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2, 5, 5, 0],   // Top row
        [3, 4, 5, 5, 15, 0],  // Middle row
        [6, 7, 8, 5, 25, 0],  // Bottom row
        [0, 3, 6, -5, 15, 90], // Left column
        [1, 4, 7, 5, 15, 90],  // Middle column
        [2, 5, 8, 15, 15, 90], // Right column
        [0, 4, 8, 5, 15, 45],  // Diagonal (top-left to bottom-right)
        [2, 4, 6, 5, 15, 135], // Diagonal (top-right to bottom-left)
    ];

    wins.forEach((e) => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector(".info").innerText =
                boxtext[e[0]].innerText + " Won!";
            isGameOver = true;
            gameover.play(); // Play game over sound
            document.querySelector(".imgbox img").style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
        }
    });
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !isGameOver) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play(); // Play turn sound
            checkWin();
            if (!isGameOver) {
                document.querySelector(".info").innerText = "Turn for " + turn;
            }
        }
    });
});

// Add onclick listener to reset button
document.getElementById("reset").addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach((element) => {
        element.innerText = "";
    });
    turn = "X";
    isGameOver = false;
    document.querySelector(".line").style.width = "0vw";
    document.querySelector(".line").style.transform = "none"; // Reset transform
    document.querySelector(".info").innerText = "Turn for " + turn;
    document.querySelector(".imgbox img").style.width = "0px";
});

