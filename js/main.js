'use strict'
const BOMB = '💣'
const TILE = '🟨'
var gBoard = {
  type: TILE,
  minesAroundCount: 4,
  isRevealed: false,
  isMine: false,
  isMarked: false
}
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
var gField;
function onInit() {
  gGame.isOn = true;
  gGame.countOfFood = 0;
  gGame.score = 0;
  gField = buildField(gLevel)
  renderBoard(gField);
  document.querySelector('.modal').classList.toggle('hide');
  document.querySelector('header h3 span').innerText = gGame.score;
}
function buildField(level) {
  var SIZE = level.SIZE;
  var MINES = level.MINES;
  var board = [];
  var randCol = [];
  var randRow = [];

  for (var i = 0; i < SIZE; i++) {
    board.push([])
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = gBoard
    }
  }
  //set mine
  console.log('board:', board)
  for (var i = 0; i < MINES; i++) {
    randCol[i]=(getRandomIntInclusive(0, level.SIZE))
    randRow[i]=(getRandomIntInclusive(0, level.SIZE))
  }
  console.log('randCol:', randCol)
  console.log('randRow:', randCol)

  for (var i = 0; i < MINES; i++) {
    var rColIdx = randCol[i]
    var rRowIdx = randCol[i]
    board[rRowIdx][rColIdx].isMine=true
  }
  //set mine neighbour count
  for (var i = 0; i < SIZE; i++) {
    for (var j = 0; j < SIZE; j++) {
      setMinesNegsCount(board, i, j)
    }
  }

  console.table(board)
  return board;
}
function setMinesNegsCount(board, rowIdx, colIdx) {
  var aroundCount = 0
  var negs = getNegs(board, rowIdx, colIdx)
  for (var i = 0; i < negs.length; i++) {
    if (negs[i].isMine) {
      aroundCount = +1
    }
  }
  board[rowIdx][colIdx].minesAroundCount = aroundCount
}

function renderBoard(board) {

  const elBoard = document.querySelector('.board-container')
  var strHTML = '<table>'

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
}


function onCellClicked(i, j) {
  var cell = gField[i][j]
  console.log('cell:', cell)
  cell.isRevealed = true
  if (cell.isMine) {
    cell.type = BOMB
  }
  if (cell.minesAroundCount === 0) {
    // expandReveal(gField,elCell,i,j)
  }
  else {
    cell.type = cell.minesAroundCount
  }
  renderBoard(gField)
}
// function onCellMarked(elCell, i, j) {

// }
// function checkGameOver() {

// }
// function expandReveal(board, elCell, i, j) {

// }
