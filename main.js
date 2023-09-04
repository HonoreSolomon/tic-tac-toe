// const Gameboard = (() => {
//   let gBoard = ["","","","","","","","",""] ;

//   const render = () => {
//     let boardHTML = "";
//     gBoard.forEach((square, index) => {
//       boardHTML+= `<div class="square" id="square-${index}">${square}</div>`
//     });
//     document.querySelector("#gameboard").innerHTML = boardHTMfL;
    

//   }
//   return {render,}
// }
// )()

// const createPlayer = (name, mark) => {
//   return {
//     name, 
//     mark
//   }
// }

// const Game = (() => {
//     let players = [];
//     let currentPlayerIndex = 0;
//     let gameOver = false;

//     const start = () => {
//       players = [createPlayer(document.querySelector('#player1').value, 'X'),
//       createPlayer(document.querySelector('#player2').value,'O')]
//     }
// })()

// const startButton = document.querySelector('#start-button');
// startButton.addEventListener('click', () => Gameboard.render )


// MVP Build

const gameBoard = document.querySelector('#gameBoard');
const infoDisplay = document.querySelector('#message');
const result = document.querySelector('#result-display')
const startCells = [
  "","","","","","","","",""
]

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]

let symbol = 'circle'

function createBoard() {

  startCells.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('square');
    cellElement.id = index;
    cellElement.addEventListener('click', addSymbol)

    gameBoard.append(cellElement);
  }
    
  )
}



function addSymbol(e) {
  
  const symbolDisplay = document.createElement('div');
  symbolDisplay.classList.add(symbol);
  e.target.append(symbolDisplay)
  symbol = symbol === 'circle' ? 'cross' : 'circle'
  e.target.removeEventListener("click", addSymbol)
  infoDisplay.textContent = `It is the ${symbol} 's turn`
  checkScore()
}

function checkScore ()  {
  let allSquares = Array.from(document.querySelectorAll('.square'));
  winningCombos.forEach(array => {
    const circleWins = array.every(cell =>
      allSquares[cell].firstChild?.classList.contains('circle'))

      if (circleWins) {
        result.textContent = "Circle Wins!!"
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
        infoDisplay.textContent = ''
        return
      }
  })

  winningCombos.forEach(array => {
    const crossWins = array.every(cell =>
      allSquares[cell].firstChild?.classList.contains('cross'))

      if (crossWins) {
        result.textContent = "Cross Wins!!"
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
        infoDisplay.textContent = ''
        return
      }
  })
}

createBoard();

