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
    /*if (isWinningMove(event.target)) {
      window.confirm(`Vyhrává ${naTahu}! Spustit novou hru?`);
      location.reload();
    }*/
    naTahu = 'krizek';
  } else {
    event.target.className = 'krizek';
    hraje.src = 'obrazky/circle.svg';
    hraje.alt = 'Kolečko';
    event.target.disabled = true;
    isWinningMove(event.target);
    /*if (isWinningMove(event.target)) {
      window.confirm(`Vyhrává ${naTahu}! Spustit novou hru?`);
      location.reload();
    }*/
    naTahu = 'kolecko';
  }
};

const buttons = document.querySelectorAll('.field');
for (let i = 0; i < buttons.length; i ++) {
  buttons[i].addEventListener('click', vyber);
};

const gridSize = 10;
const fields = document.querySelectorAll('.field');
const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
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
  buttons[row * gridSize + column]
};

const getSymbol = (field) => {
  if (field.classList.contains('kolecko')) {
    console.log(field.className);
    return 'kolecko';
  } else if (field.classList.contains('krizek')) {
    console.log(field.className);
    return 'krizek';
  }
}; 

const winSymbols = 5;
const isWinningMove = (field) => {
  const position = getPosition(field)
  const symbol = getSymbol(field)

  let i
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
  return false
};