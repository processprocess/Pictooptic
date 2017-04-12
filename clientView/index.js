console.clear()
import { controlFlow } from './generateAnimDomElements.js';
import { substringMatcher } from './typeahead.js'
import { handleIntro } from './handleIntro.js';
import { randomColorRequest } from './handleRequestChange/newRequest.js';
import Animate from './Animate.js';

/////////// random search ///////////

let searchMenu = document.querySelector('.searchMenu');
let randomSuggestion = document.createElement('li');
randomSuggestion.textContent = 'search a random word';
randomSuggestion.classList.add('searchSuggestion')
randomSuggestion.addEventListener('click', function(e) {
  controlFlow('randomSample');
})
searchMenu.append(randomSuggestion);
// resentSearches.append(randomSuggestion);

///////////// logo button ////////////

const logo = document.querySelector('.logo');
logo.addEventListener('click', function(e) {
  controlFlow('randomSample')
})

/////////// handle key presses ///////////

let searchOverlay = document.querySelector('.searchOverlay');
let inputWrapper = document.querySelector('.inputWrapper');
let searchInput = document.querySelector('.searchInput');
let introWrapper = document.querySelector('.introWrapper');
let nav = document.querySelector('.nav');

function handleKeydown(e) {
  let submitValue = searchInput.value;
  if (e.keyCode === 27) { // escape key
  } else if (e.keyCode === 13) { // enter
    if (searchInput.value.length < 3) return;
    controlFlow(submitValue)
  } else if (e.keyCode === 32) { // spacebar
    Animate.shuffle()
  } else if (e.keyCode === 8) { // delete
    checkCloseSearch()
  } else if (e.keyCode < 64 || e.keyCode >= 91) { // check if alphabetic
    return;
  } else if (e.keyCode) { // any other key
    openSearch()
    introWrapper.classList.add('notVisible');
    nav.classList.remove('notVisible');
  }
}

function openSearch() {
  searchOverlay.classList.remove('notVisible')
  searchInput.focus()
}

function checkCloseSearch() {
  let inputLength = searchInput.value.length;
  if (inputLength > 0) return;
  searchOverlay.classList.add('notVisible');
  searchInput.blur();
}

let searchIconWrapper = document.querySelector('.searchIconWrapper')
// let resentSearches = document.querySelector('.resentSearches')

searchIconWrapper.addEventListener('click', function(e) {
  openSearch()
})

window.addEventListener('keydown', handleKeydown);