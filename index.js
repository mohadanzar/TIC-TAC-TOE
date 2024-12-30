const boxes = document.querySelectorAll(".box");
const resetGameBtn = document.querySelector("#reset");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const scoreXElement = document.querySelector("#scoreX");
const scoreOElement = document.querySelector("#scoreO");

let turnO = true;
let scoreX = 0;
let scoreO = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Reset the board for a new game
const resetBoard = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true;
};

// Update the score for the winner
const updateScore = (winner) => {
    if (winner === "X") {
        scoreX++;
        scoreXElement.innerText = scoreX;
    } else if (winner === "O") {
        scoreO++;
        scoreOElement.innerText = scoreO;
    }
};

// Show the winner and prepare for the next game
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}!`;
    msgContainer.classList.remove("hide");
    updateScore(winner);
};

// Check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        const pos1 = boxes[pattern[0]].innerText;
        const pos2 = boxes[pattern[1]].innerText;
        const pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return true;
        }
    }
    return false;
};

// Check if the game is a draw
const checkDraw = () => {
    return Array.from(boxes).every((box) => box.innerText !== "");
};

// Handle box click
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        box.innerText = turnO ? "O" : "X";
        box.disabled = true;
        turnO = !turnO;

        if (!checkWinner() && checkDraw()) {
            msg.innerText = "It's a Draw!";
            msgContainer.classList.remove("hide");
        }
    });
});

// Reset game button
resetGameBtn.addEventListener("click", () => {
    resetBoard();
    scoreX = 0;
    scoreO = 0;
    scoreXElement.innerText = scoreX;
    scoreOElement.innerText = scoreO;
    msgContainer.classList.add("hide");
});

// New game button
newGameBtn.addEventListener("click", () => {
    resetBoard();
    msgContainer.classList.add("hide");
});

