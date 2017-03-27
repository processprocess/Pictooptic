console.clear()
import newRequest from './handleRequestChange/newRequest.js';
import checkValue from './handleRequestChange/checkValue.js';
// import handleSubmitError from './handleRequestChange/handleSubmitError.js';
import handleChange from './handleRequestChange/handleChange.js';
import handleWindowResize from './handleWindowResize.js';
import { changeBGColor } from './animations.js'

/////////// load random on enter ///////////

handleChange('randomSample')

/////////// random search ///////////

import { animateInRef } from './animations.js';
import getRandomVal from './getRandomVal.js'

const logo = document.querySelector('.logo');

logo.addEventListener('click', function(e) {
  if (animateInRef.isActive()) return;
  handleChange('randomSample')
})

/////////// handle key presses ///////////

window.addEventListener('keydown', handleKeydown);

function handleKeydown(e) {
  let submitValue = overlayInput.value;
  if (e.keyCode === 27) { // escape key
    closeOverlay();
  } else if (e.keyCode === 13) { // enter
    checkValue(submitValue)
  } else if (e.keyCode === 8) { // delete
    if (submitValue.length === 0) closeOverlay();
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
  searchInstructions.textContent = 'enter any word';
  overlayInput.focus();
  if (infoOverlay.classList.contains('fadeIn')) infoOverlay.classList.remove('fadeIn');
  if (searchOverlay.classList.contains('searchFade')) return;
  overlayInput.value = '';
  toggleSearchOverlay();
}

function toggleSearchOverlay() {
  if(!searchOverlay.classList.contains('searchFade')) {overlayInput.value = ''};
  searchOverlay.classList.toggle('searchFade');
}

function closeOverlay() {
  if(searchOverlay.classList.contains('searchFade') || infoOverlay.classList.contains('fadeIn')) {
    overlayInput.blur();
    document.body.click();
    searchOverlay.classList.remove('searchFade');
    infoOverlay.classList.remove('fadeIn');
  }
}

/////////// handle image touch ///////////

import { randomColorRequest } from './handleRequestChange/newRequest.js'
import { allAnimSets } from './generateAnimDomElements.js';
import staggerAnimation from './staggerAnimation.js';
let compContainer = document.querySelector('.compContainer')

compContainer.addEventListener('touchstart', () => {
  // staggerAnimation(allAnimSets, 'compChangeFunctionThree');
  const animComps = ['compChangeFunctionOne', 'compChangeFunctionTwo', 'compChangeFunctionThree']
  const randomIndex = Math.floor(Math.random() * (animComps.length - 0) + 0);
  staggerAnimation(allAnimSets, animComps[randomIndex]);

  // alert('touched');
  // staggerAnimation(allAnimSets, 'changeLocation');
  // staggerAnimation(allAnimSets, 'scale' );
  // randomColorRequest();
  staggerAnimation(allAnimSets, 'changeElementColors' );
  // changeBGColor(['.pageWrapper']);
  closeOverlay()
})

compContainer.addEventListener('click', () => {
  // staggerAnimation(allAnimSets, 'compChangeFunctionThree');

  const animComps = ['compChangeFunctionOne', 'compChangeFunctionTwo', 'compChangeFunctionThree']
  const randomIndex = Math.floor(Math.random() * (animComps.length - 0) + 0);
  staggerAnimation(allAnimSets, animComps[randomIndex]);
  console.log(randomIndex);

  // staggerAnimation(allAnimSets, 'changeLocation');
  // staggerAnimation(allAnimSets, 'scale' );
  // randomColorRequest();
  staggerAnimation(allAnimSets, 'changeElementColors' );
  // changeBGColor(['.pageWrapper']);
  closeOverlay()
})


/////////// black and white mode ///////////
import { blackAndWhiteBG, blackAndWhiteElements } from './animations.js';
// import staggerAnimation from './staggerAnimation.js';

// let blackAndWhiteButton = document.querySelector('.blackWhiteButton');

// blackAndWhiteButton.addEventListener('click', function(e) {
//   blackAndWhiteBG();
//   staggerAnimation(allAnimSets, 'changeLocation');
//   staggerAnimation(allAnimSets, 'scale' );
//   staggerAnimation(allAnimSets, 'blackAndWhiteElements');
// })

/////////// current search container ///////////

const infoOverlay = document.querySelector('.infoOverlay');
let currentSearch = document.querySelector('.currentSearch');

currentSearch.addEventListener('click', function(e) { toggleInfoOverlay(); });

function toggleInfoOverlay() {
  infoOverlay.classList.toggle('fadeIn');
  searchOverlay.classList.remove('searchFade');
}

//
// currentSearch.addEventListener('animationend', function(e) {
//   currentSearch.classList.remove('currentSearchFade');
// })
//
// currentSearch.addEventListener('mouseenter', function(e) {
//   currentSearch.classList.add('currentSearchFade')
//   currentSearch.addEventListener('mouseleave', function(e) {
//     delay(function(){
//       currentSearch.classList.remove('currentSearchFade');
//     }, 1000);
//   })
// })
//
// const delay = (function(){
//   let timer = 0;
//   return function(callback, ms){
//     clearTimeout (timer);
//     timer = setTimeout(callback, ms);
//   };
// })();

/////////// detect unusable browser ///////////

if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
  document.body.innerHTML =
  `roRShock is not currently supported on firefox
  <br>
  please view this page in chrome or safari for now.
  <br>
  Thank you!
  `
}