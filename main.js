const GameBoardModule = () => {
  const gameBoard = document.querySelector('#gameBoard');
  const startCells = [
    "","","","","","","","",""
  ]
  
  function createBoard(addSymbol) {

      startCells.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addSymbol)
    
        gameBoard.append(cellElement);
      }
        
      )
    }

  return {
    createBoard
  }
}




const GameLogicModule = () => {
  const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  const infoDisplay = document.querySelector('#message');
  const result = document.querySelector('#result-display');
  let symbol = 'circle'
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
    function checkWinner(symbolToCheck) {
      for (const combo of winningCombos) {
        const wins = combo.every(cell =>
          allSquares[cell].firstChild?.classList.contains(symbolToCheck))
    
          if (wins) {
            document.querySelector('body').classList.add('blur')
            result.textContent = `${symbolToCheck.charAt(0).toUpperCase() + symbolToCheck.slice(1)} Wins!!`
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            infoDisplay.textContent = ''
            return
          }
      }
    }
    checkWinner('cross');
    checkWinner('circle')
  }
  return {
    addSymbol,
    checkScore
  }
}

const start = (() => {
  const gameBoard = GameBoardModule();
  const gameLogic = GameLogicModule()

  gameBoard.createBoard(gameLogic.addSymbol)
}
)()
// const createPlayer = (name, symbol) => {
//   return {
//     name, 
//     symbol
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
//     renderBoard()
// })()






