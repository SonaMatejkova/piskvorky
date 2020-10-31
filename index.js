'use strict';

let naTahu = 'kolecko';

const hraje = document.querySelector('.ikona1');

const vyber = (event) => {
  if (naTahu === 'kolecko') {
    event.target.className = 'kolecko';
    hraje.src = 'obrazky/cross.svg';
    hraje.alt = 'Křížek';
    event.target.disabled = true;
    isWinningMove(event.target);
    if (isWinningMove(event.target)) {
      window.confirm(`Vyhrává hráč s kolečkem! Spustit novou hru?`);
      location.reload();
    }
    naTahu = 'krizek';
  } else {
    event.target.className = 'krizek';
    hraje.src = 'obrazky/circle.svg';
    hraje.alt = 'Kolečko';
    event.target.disabled = true;
    isWinningMove(event.target);
    if (isWinningMove(event.target)) {
      window.confirm(`Vyhrává hráč s křížkem! Spustit novou hru?`);
      location.reload();
    }
    naTahu = 'kolecko';
  }
};

const buttons = document.querySelectorAll('.field');
for (let i = 0; i < buttons.length; i ++) {
  buttons[i].addEventListener('click', vyber);
};

const gridSize = 10;

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < buttons.length) {
    if (field === buttons[fieldIndex]) {
      break
    }
    fieldIndex++
  }
  return {
          row: Math.floor(fieldIndex / gridSize),
          column: fieldIndex % gridSize,
  }
};

const getField = (row, column) => {
  return buttons[row * gridSize + column]
};

const getSymbol = (field) => {
  if (field.className === 'kolecko') {
    return 'kolecko';
  } else if (field.className === 'krizek') {
    return 'krizek';
  }
}; 

const winSymbols = 5;
const isWinningMove = (field) => {
  const position = getPosition(field)
  const symbol = getSymbol(field)

  let i
  let k
  let inRow = 1
  i = position.column
  while (i > 0 && symbol === getSymbol(getField(position.row, i - 1))) {
    inRow++
    i--
  }
  i = position.column
  while (i < gridSize - 1 && symbol === getSymbol(getField(position.row, i + 1))) {
    inRow++
    i++
  }
  if (inRow >= winSymbols) {
    return true
  }
  let inColumn = 1
  i = position.row
  while (i > 0 && symbol === getSymbol(getField(i - 1, position.column))) {
    inColumn++
    i--
  }
  i = position.row
  while (i < gridSize - 1 && symbol === getSymbol(getField(i + 1, position.column))) {
    inColumn++
    i++
  }
  if (inColumn >= winSymbols) {
    return true
  }
  let inRightDiag = 1
  i = position.row
  k = position.column
  while (i > 0 && k > 0 && symbol === getSymbol(getField(i - 1, k - 1))) {
    inRightDiag++
    i--
    k--
  }
  i = position.row
  k = position.column
  while (i > gridSize -1 && k > gridSize -1 && symbol === getSymbol(getField(i + 1, k + 1))) {
    inRightDiag++
    i++
    k++
  }
  if (inRightDiag >= winSymbols) {
    return true
  }
  let inLeftDiag = 1
  i = position.row
  k = position.column
  while (i > 0 && k < gridSize - 1 && symbol === getSymbol(getField(i - 1, k + 1))) {
    inLeftDiag++
    i--
    k++
  }
  i = position.row
  k = position.column
  while (i < gridSize -1 && k > 0 && symbol === getSymbol(getField(i + 1, k - 1))) {
    inLeftDiag++
    i++
    k--
  }
  if (inLeftDiag >= winSymbols) {
    return true
  }
  return false
};