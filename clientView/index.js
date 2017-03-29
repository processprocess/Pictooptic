console.clear()
import newRequest from './handleRequestChange/newRequest.js';
import checkValue from './handleRequestChange/checkValue.js';
// import handleSubmitError from './handleRequestChange/handleSubmitError.js';
import handleChange from './handleRequestChange/handleChange.js';
import handleWindowResize from './handleWindowResize.js';

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
    if(infoOverlay.classList.contains('infoevents')) closeInfo();
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

/////////// Search Overlay //////////

const closeSearch = document.querySelector('.searchOverlay .closeButton');
closeSearch.addEventListener('click', () =>  closeOverlay())

const searchOverlay = document.querySelector('.searchOverlay');
const overlayInput = document.querySelector('.searchOverlay input');
const searchButton = document.querySelector('.searchButton');
const searchInstructions = document.querySelector('.searchInstructions');

searchButton.addEventListener('click', function(e) { handleSearchWindow(); })

function handleSearchWindow() {
  searchInstructions.textContent = 'enter any word';
  overlayInput.focus();
  if (infoOverlay.classList.contains('infoevents')) infoOverlay.classList.remove('infoevents');
  if (searchOverlay.classList.contains('searchFade')) return;
  overlayInput.value = '';
  toggleSearchOverlay();
}

function toggleSearchOverlay() {
  if(!searchOverlay.classList.contains('searchFade')) {overlayInput.value = ''};
  searchOverlay.classList.toggle('searchFade');
}

function closeOverlay() {
  if(searchOverlay.classList.contains('searchFade')) {
    overlayInput.blur();
    document.body.click();
    searchOverlay.classList.remove('searchFade');
  }
}

/////////// handle image touch ///////////

import { randomColorRequest } from './handleRequestChange/newRequest.js';
import { allAnimSets } from './generateAnimDomElements.js';
import staggerAnimation from './staggerAnimation.js';
import { changeBGColor, changeColor, changeBorderColor } from './animations.js';
const compContainer = document.querySelector('.compContainer');
const infoOverlay = document.querySelector('.infoOverlay');
const currentSearch = document.querySelector('.currentSearch');
const currentSearchWord = document.querySelector('.currentSearchWord');
const topRelatedTags = document.querySelector('.topRelatedTags');
const mainRule = document.querySelector('.mainRule');

compContainer.addEventListener('click', () => {

  const animComps = ['compChangeFunctionOne', 'compChangeFunctionTwo'];
  const randomIndex = Math.floor(Math.random() * (animComps.length - 0) + 0);
  staggerAnimation(allAnimSets, animComps[randomIndex]);
  randomColorRequest();
  staggerAnimation(allAnimSets, 'changeElementColors' );
  changeBGColor(['.pageWrapper']);
  // changeBGColor(['.pageWrapper', '.infoOverlay']);
  setTimeout(function(){
    changeColor([currentSearch, currentSearchWord, topRelatedTags]);
    changeBorderColor(mainRule);
  }, 500 );
  // closeOverlay();
})

/////////// info grid ///////////

const gridButton = document.querySelector('.gridButton')
gridButton.addEventListener('click', () => {
  document.querySelector('.eventBlocker').classList.add('noEvents');
  new Promise((resolve, reject) => { staggerAnimation(allAnimSets, 'gridIn', 10, resolve); })
    .then((resolve) => document.querySelector('.eventBlocker').classList.remove('noEvents'))
  infoOverlay.classList.add('infoevents')
  searchOverlay.classList.remove('searchFade');
})

const closeInfoButton = document.querySelector('.infoOverlay .closeButton');
closeInfoButton.addEventListener('click', closeInfo)

function closeInfo() {
  staggerAnimation(allAnimSets, 'gridOut', 1);
  setTimeout(function(){
    infoOverlay.classList.remove('infoevents');
    setTimeout(function(){
       infoOverlay.scrollTop = 0
     }, 1000 );
  }, 200 );
}

currentSearchWord.addEventListener('click', function(e) { closeInfo(); });

compContainer.addEventListener('touchstart', () => {
})


// if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
//   document.body.innerHTML =
//   `roRShock is not currently supported on firefox
//   <br>
//   please view this page in chrome or safari for now.
//   <br>
//   Thank you!
//   `
// }