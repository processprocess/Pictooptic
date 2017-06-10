// console.clear();

// document.onload = function() {

import { controlFlow } from './generateAnimDomElements.js';
import { substringMatcher } from './typeahead.js';
import Animate from './Animate.js';
import IndexEvents from './IndexEvents.js';
import handleIntro from './handleIntro.js';

/////////// handle key presses ///////////

let searchInput = document.querySelector('.searchInput');

let searchWord = document.querySelector('.searchWord');
searchWord.addEventListener('click', function(e) {
  Animate.shuffle();
})

let appendixCloser = document.querySelector('.appendixCloser');
appendixCloser.addEventListener('click', function(e) {
  IndexEvents.closeWindows();
})

searchInput.addEventListener('blur', function(e) {
  IndexEvents.closeWindows();
})

let closeIconWrapper = document.querySelector('.closeIconWrapper');
closeIconWrapper.addEventListener('click', function(e) {
  IndexEvents.closeWindows();
})

function handleKeydown(e) {
  let submitValue = searchInput.value;
  if (e.keyCode === 27) { // escape key
    IndexEvents.closeWindows();
  } else if (e.keyCode === 13) { // enter
    // alert(e.keyCode === 13)
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

/////////// prevent defaults ///////////

let nav = document.querySelector('.nav')
// let logo = document.querySelector('.logo')

nav.addEventListener('touchmove', function(event) {
  event.preventDefault();
});

let searchOverlay = document.querySelector('.searchOverlay')
searchOverlay.addEventListener('touchmove', function(event) {
  event.preventDefault();
});

let logo = document.querySelector('.logo')
logo.addEventListener('touchmove', function(event) {
  event.preventDefault();
});

appendixCloser.addEventListener('touchmove', function(e) {
  event.preventDefault();
})

// };