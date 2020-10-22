'use strict';

let naTahu = 'kolecko';

const hraje = document.querySelector('.ikona1');

const vyber = (event) => {
  if (naTahu === 'kolecko') {
    event.target.className = 'kolecko';
    hraje.src = 'obrazky/cross.svg';
    hraje.alt = 'Křížek';
    event.target.disabled = true;
    naTahu = 'krizek';
  } else {
    event.target.className = 'krizek';
    hraje.src = 'obrazky/circle.svg';
    hraje.alt = 'Kolečko';
    event.target.disabled = true;
    naTahu = 'kolecko';
  }
};

const buttons = document.querySelectorAll('.field');
for (let i = 0; i < buttons.length; i ++) {
  buttons[i].addEventListener('click', vyber);
};