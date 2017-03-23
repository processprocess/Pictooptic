console.clear()
import newRequest from './handleRequestChange/newRequest.js';
import checkValue from './handleSubmitValue/checkValue.js';
import handleSubmitError from './handleSubmitValue/handleSubmitError.js';
import handleChange from './handleRequestChange/handleChange.js';
import handleWindowResize from './handleWindowResize.js';
import { changeBGColor } from './animations.js'

new Promise((resolve, reject) => { handleChange('explosion', resolve) }) //for debugging
// .then(resolveResult => console.log(resolveResult))

/////////// handle key presses ///////////

window.addEventListener('keydown', handleKeydown);

function handleKeydown(e) {
  // console.log(e.keyCode);
  if (e.keyCode === 27) { // escape key
    closeOverlay();
  } else if (e.keyCode === 13) { // enter
    new Promise((resolve, reject) => { checkValue(overlayInput.value, resolve, reject); })
      .then(checkedValue => { new Promise((resolve, reject) => { handleChange(checkedValue, resolve) }); closeOverlay(); })
      .catch(err => { handleSubmitError(err); });
  } else if (e.keyCode === 8) { // delete
    if (overlayInput.value.length === 0) closeOverlay();
  } else if (e.keyCode < 64 || e.keyCode >= 91) { // check if alphabetic
    return;
  } else if (e.keyCode) { // any other key
    handleSearchWindow()
  }
}

/////////// close buttons ///////////

const closeButtons = document.querySelectorAll('.closeButton');
closeButtons.forEach(closeButton => closeButton.addEventListener('click', () => closeOverlay() ))

/////////// search window ///////////

const searchOverlay = document.querySelector('.searchOverlay');
const overlayInput = document.querySelector('.searchOverlay input');
const searchButton = document.querySelector('.searchButton');
const searchInstructions = document.querySelector('.searchInstructions');

searchButton.addEventListener('click', function(e) { handleSearchWindow(); })

function handleSearchWindow() {
  searchInstructions.textContent = 'Search any Noun by typing';
  overlayInput.focus();
  if (infoOverlay.classList.contains('fadeIn')) infoOverlay.classList.remove('fadeIn');
  if (searchOverlay.classList.contains('searchFade')) return;
  overlayInput.value = '';
  toggleSearchOverlay();
}

function toggleSearchOverlay() {
  if(!searchOverlay.classList.contains('searchFade')) {overlayInput.value = ''};
  searchOverlay.classList.toggle('searchFade');
  // searchButton.parentNode.classList.toggle('navFade');
}

function closeOverlay() {
  if(searchOverlay.classList.contains('searchFade') || infoOverlay.classList.contains('fadeIn')) {
    overlayInput.blur();
    document.body.click();
    searchOverlay.classList.remove('searchFade');
    infoOverlay.classList.remove('fadeIn');
    // searchButton.parentNode.classList.remove('navFade');
  }
}

/////////// info window ///////////

const infoOverlay = document.querySelector('.infoOverlay');
const infoButton = document.querySelector('.infoButton');

// infoButton.addEventListener('click', function(e) { toggleInfoOverlay(); });

function toggleInfoOverlay() {
  infoOverlay.classList.toggle('fadeIn');
  // infoButton.parentNode.classList.toggle('navFade');
}

/////////// handle image touch ///////////

import { randomColorRequest } from './handleRequestChange/newRequest.js'

import { allAnimSets } from './generateAnimDomElements.js';
import staggerAnimation from './staggerAnimation.js';
let compContainer = document.querySelector('.compContainer')

compContainer.addEventListener('touchstart', () => {
  // alert('touched');
  staggerAnimation(allAnimSets, 'changeLocation');
  staggerAnimation(allAnimSets, 'scale' );
  staggerAnimation(allAnimSets, 'changeElementColors' );
  randomColorRequest();
  changeBGColor();
})

compContainer.addEventListener('click', () => {
  staggerAnimation(allAnimSets, 'changeLocation');
  staggerAnimation(allAnimSets, 'scale' );
  staggerAnimation(allAnimSets, 'changeElementColors' );
  randomColorRequest();
  changeBGColor();
})

