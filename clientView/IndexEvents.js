import { controlFlow } from './generateAnimDomElements.js';
import Animate from './Animate.js';

let appendix = document.querySelector('.appendix');
let searchOverlay = document.querySelector('.searchOverlay');
let searchInput = document.querySelector('.searchInput');
let searchMenu = document.querySelector('.searchMenu');
let infoIconWrapper = document.querySelector('.infoIconWrapper');
let closeIconWrapper = document.querySelector('.closeIconWrapper');
let searchWord = document.querySelector('.searchWord');
let searchButton = document.querySelector('.centerItem.search');
let randomButton = document.querySelector('.centerItem.random');
let shuffleButton = document.querySelector('.centerItem.shuffle');
let iconHolderWrapper = document.querySelector('.iconHolderWrapper');
let hint = document.querySelector('.hint');

class IndexEvents {

  static closeWindows() {
    searchOverlay.classList.add('notVisible')
    appendix.classList.add('notVisible')
    searchInput.value = '';
    searchWord.classList.remove('notVisible')
    iconHolderWrapper.scrollTop = 0;
    closeIconWrapper.classList.add('notVisible');
    infoIconWrapper.classList.remove('notVisible');
    // relatedMenu.classList.remove('notVisible')
    searchInput.blur();
  }

  static openSearch() {
    appendix.classList.add('notVisible')
    searchOverlay.classList.remove('notVisible')
    searchInput.focus();
    searchWord.classList.remove('notVisible')
    closeIconWrapper.classList.add('notVisible');
    infoIconWrapper.classList.remove('notVisible');
    // relatedMenu.classList.remove('notVisible')
  }

  static checkCloseSearch() {
    let inputLength = searchInput.value.length;
    if (inputLength > 0) return;
    searchOverlay.classList.add('notVisible');
    searchInput.blur();
    closeIconWrapper.classList.add('notVisible');
    infoIconWrapper.classList.remove('notVisible');
  }

  static showAppendix() {
    appendix.classList.toggle('notVisible');
    closeIconWrapper.classList.remove('notVisible');
    infoIconWrapper.classList.add('notVisible');
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

shuffleButton.addEventListener('click', function(e) {
  Animate.shuffle();
})

searchButton.addEventListener('click', function(e) {
  IndexEvents.openSearch();
})

hint.addEventListener('click', function(e) {
  IndexEvents.openSearch();
})

infoIconWrapper.addEventListener('click', function(e) {
  IndexEvents.showAppendix()
  searchOverlay.classList.add('notVisible')
})

randomButton.addEventListener('click', function(e) {
  controlFlow('randomSample')
})