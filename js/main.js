'use strict'
const BOMB = '💣'
const TILE = '🟨'
var gBoard = []
var gLevel = {
  SIZE: 4,
  MINES: 2
}
var gGame = {
  isOn: false,
  revealedCount: 0,
  markedCount: 0,
  secsPassed: 0
}
function onInit() {
  gGame.isOn = true;
  gGame.revealedCount = 0,
    gGame.markedCount = 0,
    gGame.secsPassed = 0
  gBoard = []
  gBoard = buildField()
  renderBoard(gBoard);
  document.querySelector('.modal').classList.toggle('hide');
  document.querySelector('header h3 span').innerText = gGame.revealedCount;
}
function buildField() {
  var SIZE = gLevel.SIZE;
  var MINES = gLevel.MINES;


  for (var i = 0; i < SIZE; i++) {
    gBoard.push([])
    for (var j = 0; j < SIZE; j++) {
      gBoard[i][j] = {
        type: TILE,
        minesAroundCount: 0,
        isRevealed: false,
        isMine: false,
        isMarked: false
      }
    }
  }
  //set mine

  for (var i = 0; i < MINES; i++) {
    var rCollIdx = getRandomIntInclusive(0, SIZE - 1)
    var rRowIdx = getRandomIntInclusive(0, SIZE - 1)
    gBoard[rRowIdx][rCollIdx].isMine = true
  }
  //set mine neighbour count
  for (var i = 0; i < SIZE; i++) {
    for (var j = 0; j < SIZE; j++) {

      setMinesNegsCount(gBoard, i, j)
    }
  }

  console.table(gBoard)
  return gBoard;
}
function setMinesNegsCount(board, rowIdx, colIdx) {
  var aroundCount = 0
  var negs = getNegs(board, rowIdx, colIdx)
  for (var i = 0; i < negs.length; i++) {
    if (negs[i].isMine) {
      aroundCount += 1
    }
  }
  board[rowIdx][colIdx].minesAroundCount = aroundCount
}

function renderBoard(board) {

  const elBoard = document.querySelector('.board-container')
  var strHTML = '<table>'
  console.table('board:', board)
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>\n'
    for (var j = 0; j < board[0].length; j++) {
      const currCell = board[i][j]
      var cellClass = getClassName({ i: i, j: j })
      if (currCell.type === TILE) cellClass += ' tile'
      strHTML += `\t<td class="cell ${cellClass}" onclick="onCellClicked(${i},${j})">`
      strHTML += `\t${currCell.type}`
      strHTML += '</td>\n'
    }
    strHTML += '</tr>\n'
  }
  // console.log('strHTML is:')
  // console.log(strHTML)
  strHTML += '</table>\n'
  elBoard.innerHTML = strHTML
  if (checkGameOver()) {
    document.querySelector('.modal').classList.toggle('hide');
  }
}


function onCellClicked(i, j) {
  var cell = gBoard[i][j]
  console.log('cell:', cell)
  cell.isRevealed = true

  gGame.revealedCount += 1
  if (cell.isMine) {
    cell.type = BOMB
    gGame.isOn = false
    renderBoard(gBoard)
  } else
    if (cell.minesAroundCount === 0) {
      cell.type = cell.minesAroundCount
      expandReveal(gBoard, i, j)
    }
    else {
      cell.type = cell.minesAroundCount
    }
  document.querySelector('header h3 span').innerText = gGame.revealedCount;

  renderBoard(gBoard)
}
// function onCellMarked(elCell, i, j) {

// }
function checkGameOver() {
  if (!gGame.isOn) return true
}
function expandReveal(board, i, j) {
  var negs = getNegs(board, i, j)
  for (var i = 0; i < negs.length; i++) {
    if (negs[i].isRevealed === false) {
      negs[i].isRevealed = true
      gGame.revealedCount += 1
      negs[i].type = negs[i].minesAroundCount
    }
    // if(negs[i].minesAroundCount===0){

    // }
  }
}
