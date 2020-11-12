'use strict';
//Vytvoření hracího pole
const mrizka = () => {
  for (let i = 0; i < 100; i++) {
    const field = document.createElement('button');
    field.className = 'field';
    const mrizka = document.querySelector('.mrizka');
    mrizka.appendChild(field);
  }
};
mrizka();

let naTahu = 'kolecko';
const hraje = document.querySelector('.ikona1');

//Funkce zajišťující hru
const vyber = (event) => {
  if (naTahu === 'kolecko') {
    event.target.className = 'kolecko';
    hraje.src = 'obrazky/cross.svg';
    hraje.alt = 'Křížek';
    event.target.disabled = true;
    isWinningMove(event.target);
    if (isWinningMove(event.target)) {
      setTimeout(() => {
        window.confirm(`Vyhrává hráč s kolečkem! Spustit novou hru?`);
        location.reload();
      }, 100);
    }
    naTahu = 'krizek';
  } else {
    event.target.className = 'krizek';
    hraje.src = 'obrazky/circle.svg';
    hraje.alt = 'Kolečko';
    event.target.disabled = true;
    isWinningMove(event.target);
    if (isWinningMove(event.target)) {
      setTimeout(() => {
        window.confirm(`Vyhrává hráč s křížkem! Spustit novou hru?`);
        location.reload();
      }, 100);
    }
    naTahu = 'kolecko';
  }
};

const buttons = document.querySelectorAll('.field');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', vyber);
}

const gridSize = 10;

//Přiřazení indexů políčkům
const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < buttons.length) {
    if (field === buttons[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }
  return {
    row: Math.floor(fieldIndex / gridSize),
    column: fieldIndex % gridSize,
  };
};

//Přiřazení políček
const getField = (row, column) => {
  return buttons[row * gridSize + column];
};

//Rozpoznání symbolů na políčku
const getSymbol = (field) => {
  if (field.className === 'kolecko') {
    return 'kolecko';
  } else if (field.className === 'krizek') {
    return 'krizek';
  }
};

//Kontrola výher
const winSymbols = 5;
const isWinningMove = (field) => {
  const position = getPosition(field);
  const symbol = getSymbol(field);

  let i;
  let k;
  let inRow = 1;
  i = position.column;
  while (i > 0 && symbol === getSymbol(getField(position.row, i - 1))) {
    inRow++;
    i--;
  }
  i = position.column;
  while (
    i < gridSize - 1 &&
    symbol === getSymbol(getField(position.row, i + 1))
  ) {
    inRow++;
    i++;
  }
  if (inRow >= winSymbols) {
    return true;
  }
  let inColumn = 1;
  i = position.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, position.column))) {
    inColumn++;
    i--;
  }
  i = position.row;
  while (
    i < gridSize - 1 &&
    symbol === getSymbol(getField(i + 1, position.column))
  ) {
    inColumn++;
    i++;
  }
  if (inColumn >= winSymbols) {
    return true;
  }
  let inRightDiag = 1;
  i = position.row;
  k = position.column;
  while (i > 0 && k > 0 && symbol === getSymbol(getField(i - 1, k - 1))) {
    inRightDiag++;
    i--;
    k--;
  }
  i = position.row;
  k = position.column;
  while (
    i < gridSize - 1 &&
    k < gridSize - 1 &&
    symbol === getSymbol(getField(i + 1, k + 1))
  ) {
    inRightDiag++;
    i++;
    k++;
  }
  if (inRightDiag >= winSymbols) {
    return true;
  }
  let inLeftDiag = 1;
  i = position.row;
  k = position.column;
  while (
    i > 0 &&
    k < gridSize - 1 &&
    symbol === getSymbol(getField(i - 1, k + 1))
  ) {
    inLeftDiag++;
    i--;
    k++;
  }
  i = position.row;
  k = position.column;
  while (
    i < gridSize - 1 &&
    k > 0 &&
    symbol === getSymbol(getField(i + 1, k - 1))
  ) {
    inLeftDiag++;
    i++;
    k--;
  }
  if (inLeftDiag >= winSymbols) {
    return true;
  }
  return false;
};
