console.clear()
import { controlFlow } from './generateAnimDomElements.js';
// import { substringMatcher } from './typeahead.js'

/////////// nav ///////////

let related = document.querySelector('.related');
let relatedTagsMenu = document.querySelector('.relatedTagsMenu');
related.addEventListener('mouseover', function(e) {
  relatedTagsMenu.classList.remove('notVisible')
})
related.addEventListener('mouseout', function(e) {
  relatedTagsMenu.classList.add('notVisible')
})

///////////// logo button ////////////

const logo = document.querySelector('.logo');
logo.addEventListener('click', function(e) {
  controlFlow('randomSample')
})

/////////// handle key presses ///////////

let searchInput = document.querySelector('.searchInput')

function handleKeydown(e) {
  let submitValue = searchInput.value;
  if (e.keyCode === 27) { // escape key
  } else if (e.keyCode === 13) { // enter
    controlFlow(submitValue)
  } else if (e.keyCode === 8) { // delete
  } else if (e.keyCode < 64 || e.keyCode >= 91) { // check if alphabetic
    return;
  } else if (e.keyCode) { // any other key
    // activateNav()
  }
}

window.addEventListener('keydown', handleKeydown);

