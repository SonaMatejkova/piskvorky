'use strict';

let hraje = 'kolecko';

const vyber = (event) => {
  if (hraje === 'kolecko') {
    event.target.className = 'kolecko';
    /*btn.setAtribute(disabled);*/
    hraje = 'krizek';
  } else {
    event.target.className = 'krizek';
    /*btn.disabled = true;*/
    hraje = 'kolecko';
  }
};

const buttons = document.querySelectorAll('.field');
for (let i = 0; i < buttons.length; i ++) {
  buttons[i].addEventListener('click', vyber);
};