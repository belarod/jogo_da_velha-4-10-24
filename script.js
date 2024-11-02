const currentPlayer = document.querySelector(".currentPlayer")
const startButton = document.getElementById("start")
const cells = document.querySelectorAll(".game__button--empty")
const result = document.getElementById("result");

let selected
let player = "X"

const positions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];


function init() {
  selected = Array(9).fill(null);
  player = "X"

  currentPlayer.innerHTML = `Turno do jogador: ${player}`
  cells.forEach((cell, index) => {
    cell.innerHTML = ""
    cell.removeEventListener("click", newMove)
    cell.addEventListener("click", newMove)
    cell.setAttribute("data-i", index)
  });
}

startButton.addEventListener("click", init);

function newMove(e) {
  const index = e.target.getAttribute("data-i")
  e.target.innerHTML = player
  e.target.removeEventListener("click", newMove)
  selected[index] = player

  setTimeout(() => {
    check()
  }, 100)

  player = player === "X" ? "O" : "X"
  currentPlayer.innerHTML = `Vez do ${player}!`
}

function check() {
  const playerLastMove = player === "X" ? "O" : "X"

  const lastPlayerMoves = selected
    .map((value, index) => (value === playerLastMove ? index : null))
    .filter(index => index !== null)

  for (const position of positions) {
    if (position.every(index => lastPlayerMoves.includes(index))) {
        result.innerHTML = `O jogador '${playerLastMove}' ganhou!`
        setTimeout(() => {
            result.innerHTML = ""
        }, 3000)
        init()
         return
    }
  }

  if (selected.every(cell => cell !== null)) {
    result.innerHTML = "Empate!"
    setTimeout(() => {
        result.innerHTML = "" 
    }, 3000)
    init()
    return
  }
}