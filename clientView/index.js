console.clear()
import { controlFlow } from './generateAnimDomElements.js';
import { substringMatcher } from './typeahead.js'
import { handleIntro } from './handleIntro.js';
import { randomColorRequest } from './handleRequestChange/newRequest.js';
import Animate from './Animate.js';

///////////// logo button ////////////

const logo = document.querySelector('.logo');
logo.addEventListener('click', function(e) {
  controlFlow('randomSample')
})

/////////// handle key presses ///////////

let appendix = document.querySelector('.appendix');
let searchOverlay = document.querySelector('.searchOverlay');
let inputWrapper = document.querySelector('.inputWrapper');
let searchInput = document.querySelector('.searchInput');
let introWrapper = document.querySelector('.introWrapper');
let nav = document.querySelector('.nav');
let gradient = document.querySelector('.gradient');
let searchMenu = document.querySelector('.searchMenu');

function handleKeydown(e) {
  let submitValue = searchInput.value;
  if (e.keyCode === 27) { // escape key
    closeWindows()
  } else if (e.keyCode === 13) { // enter
    if (searchInput.value.length < 3) return;
    closeWindows()
    controlFlow(submitValue)
  } else if (e.keyCode === 32) { // spacebar
    Animate.shuffle()
  } else if (e.keyCode === 8) { // delete
    checkCloseSearch()
  } else if (e.keyCode < 64 || e.keyCode >= 91) { // check if alphabetic
    return;
  } else if (e.keyCode) { // any other key
    openSearch()
  }
}

export function closeWindows() {
  searchOverlay.classList.add('notVisible')
  appendix.classList.add('notVisible')
  searchInput.value = '';
}

function openSearch() {
  appendix.classList.add('notVisible')
  searchOverlay.classList.remove('notVisible')
  searchInput.focus();
}

searchMenu.addEventListener('click', function(e) {
  controlFlow(searchInput.value);
  closeWindows();
})

searchOverlay.addEventListener('click', function(e) {
  if (e.target === searchInput) return
  closeWindows();
})

function checkCloseSearch() {
  let inputLength = searchInput.value.length;
  if (inputLength > 0) return;
  searchOverlay.classList.add('notVisible');
  searchInput.blur();
}

let searchIconWrapper = document.querySelector('.searchIconWrapper')
searchIconWrapper.addEventListener('click', function(e) {
  openSearch();
})

function showAppendix() {
  appendix.classList.toggle('notVisible')
}

let infoIconWrapper = document.querySelector('.infoIconWrapper');
infoIconWrapper.addEventListener('click', function(e) {
  showAppendix()
  searchOverlay.classList.add('notVisible')
})

window.addEventListener('keydown', handleKeydown);