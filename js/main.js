'use strict'
var WALL = '#';

var gBoard = {
    minesAroundCount: 4,
    isRevealed: false,
    isMine: false,
    isMarked: false
}
var gLevel = {
    SIZE: 5,
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
  gField =buildField(gLevel)
  printMat(gBoard, '.board-container');
  gCherryInterval = setInterval(createCherry, 15000);
  document.querySelector('.modal').classList.toggle('hide');
  document.querySelector('header h3 span').innerText = gGame.score;
}
function buildField(level) {
  var SIZE = level.SIZE+2;
  var MINES =level.MINES;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([])
    for (var j = 0; j < SIZE; j++) {
        board[i][j]=gBoard
        
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 
      ) {
        board[i][j] = WALL;
      }

    }
  }
  console.table(board)
  return board;
}
function setMinesNegsCount(board) {

}
function renderBoard() {

}
function onCellClicked(elCell, i, j) {

}
function onCellMarked(elCell, i, j) {

}
function checkGameOver() {

}
function expandReveal(board, elCell, i, j) { 
    
}