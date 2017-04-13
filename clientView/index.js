console.clear();
import { controlFlow } from './generateAnimDomElements.js';
import { substringMatcher } from './typeahead.js';
import Animate from './Animate.js';
import IndexEvents from './IndexEvents.js';

/////////// handle key presses ///////////

let searchInput = document.querySelector('.searchInput');

function handleKeydown(e) {
  let submitValue = searchInput.value;
  if (e.keyCode === 27) { // escape key
    IndexEvents.closeWindows();
  } else if (e.keyCode === 13) { // enter
    if (searchInput.value.length < 3) return;
    IndexEvents.closeWindows();
    controlFlow(submitValue);
  } else if (e.keyCode === 32) { // spacebar
    e.preventDefault();
    Animate.shuffle();
  } else if (e.keyCode === 8) { // delete
    IndexEvents.checkCloseSearch()
  } else if (e.keyCode < 64 || e.keyCode >= 91) { // check if alphabetic
    return;
  } else if (e.keyCode) { // any other key
    IndexEvents.openSearch();
  }
}

window.addEventListener('keydown', handleKeydown);