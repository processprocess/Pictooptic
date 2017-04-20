import { controlFlow } from './generateAnimDomElements.js';
import Animate from './Animate.js';

let appendix = document.querySelector('.appendix');
let searchOverlay = document.querySelector('.searchOverlay');
let inputWrapper = document.querySelector('.inputWrapper');
let searchInput = document.querySelector('.searchInput');
let introWrapper = document.querySelector('.introWrapper');
let nav = document.querySelector('.nav');
let gradient = document.querySelector('.gradient');
let searchMenu = document.querySelector('.searchMenu');
let searchIconWrapper = document.querySelector('.searchIconWrapper')
let infoIconWrapper = document.querySelector('.infoIconWrapper');
let logo = document.querySelector('.logo');
let searchWord = document.querySelector('.searchWord');
// let relatedMenu = document.querySelector('.relatedMenu');
let searchButton = document.querySelector('.centerItem.search');
let randomButton = document.querySelector('.centerItem.random');
let shuffleButton = document.querySelector('.centerItem.shuffle');

class IndexEvents {

  static closeWindows() {
    searchOverlay.classList.add('notVisible')
    appendix.classList.add('notVisible')
    searchInput.value = '';
    searchWord.classList.remove('notVisible')
    // relatedMenu.classList.remove('notVisible')
    searchInput.blur();
  }

  static openSearch() {
    appendix.classList.add('notVisible')
    searchOverlay.classList.remove('notVisible')
    searchInput.focus();
    searchWord.classList.remove('notVisible')
    // relatedMenu.classList.remove('notVisible')
  }

  static checkCloseSearch() {
    let inputLength = searchInput.value.length;
    if (inputLength > 0) return;
    searchOverlay.classList.add('notVisible');
    searchInput.blur();
  }

  static showAppendix() {
    appendix.classList.toggle('notVisible')
    // searchWord.classList.toggle('notVisible')
    // relatedMenu.classList.toggle('notVisible')
  }

}

module.exports = IndexEvents;

searchMenu.addEventListener('click', function(e) {
  controlFlow(searchInput.value);
  IndexEvents.closeWindows();
})

searchOverlay.addEventListener('click', function(e) {
  if (e.target === searchInput) return
  IndexEvents.closeWindows();
})

// searchIconWrapper.addEventListener('click', function(e) {
//   IndexEvents.openSearch();
// })

shuffleButton.addEventListener('click', function(e) {
  Animate.shuffle();
})

searchButton.addEventListener('click', function(e) {
  IndexEvents.openSearch();
})

infoIconWrapper.addEventListener('click', function(e) {
  IndexEvents.showAppendix()
  searchOverlay.classList.add('notVisible')
})

// logo.addEventListener('click', function(e) {
//   controlFlow('randomSample')
// })

randomButton.addEventListener('click', function(e) {
  controlFlow('randomSample')
})