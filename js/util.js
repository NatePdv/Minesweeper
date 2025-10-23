function printMat(mat, selector) {
  var strHTML = '<table border="0" class="center-table"><tbody>'
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j]
      var className = 'cell cell-' + i + '-' + j
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'
  var elContainer = document.querySelector(selector)
  elContainer.innerHTML = strHTML
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('')
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  elCell.innerHTML = value
}

function getNegs(board, rowIdx, colIdx) {
  var negs=[]
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++){
        if (i < 0 || i >=board.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++){
            if (j < 0 || j >= board[i].length) continue
            if (i === rowIdx && j === colIdx) continue
            negs.push(board[i][j])
        }
    }
    return negs
}
function getClassName(location) {
	const cellClass = 'cell-' + location.i + '-' + location.j
	return cellClass
}
function renderCell(location, value) {
	const cellSelector = '.' + getClassName(location)
	const elCell = document.querySelector(cellSelector)
	elCell.innerHTML = value
}