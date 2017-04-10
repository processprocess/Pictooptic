console.clear()
import { controlFlow } from './generateAnimDomElements.js';
import { substringMatcher } from './typeahead.js'
import { handleIntro } from './handleIntro.js';

/////////// past searches ///////////

let searchIconWrapper = document.querySelector('.searchIconWrapper')
let resentSearches = document.querySelector('.resentSearches')

searchIconWrapper.addEventListener('click', function(e) {
  resentSearches.classList.toggle('notVisible')
})

// store local data

/////////// random search ///////////

let searchMenu = document.querySelector('.searchMenu');
let randomSuggestion = document.createElement('li');
randomSuggestion.textContent = 'search a random word';
randomSuggestion.classList.add('searchSuggestion')
randomSuggestion.addEventListener('click', function(e) {
  controlFlow('randomSample');
})
searchMenu.append(randomSuggestion);
resentSearches.append(randomSuggestion);

///////////// logo button ////////////

const logo = document.querySelector('.logo');
logo.addEventListener('click', function(e) {
  controlFlow('randomSample')
})

/////////// handle key presses ///////////

let searchInput = document.querySelector('.searchInput');
let introWrapper = document.querySelector('.introWrapper');
let nav = document.querySelector('.nav');

function handleKeydown(e) {
  let submitValue = searchInput.value;
  if (e.keyCode === 27) { // escape key
  } else if (e.keyCode === 13) { // enter
    controlFlow(submitValue)
  } else if (e.keyCode === 8) { // delete
  } else if (e.keyCode < 64 || e.keyCode >= 91) { // check if alphabetic
    return;
  } else if (e.keyCode) { // any other key
    searchInput.focus()
    // activateNav()
    introWrapper.classList.add('notVisible');
    nav.classList.remove('notVisible');
  }
}

window.addEventListener('keydown', handleKeydown);

