console.clear()
import newRequest from './handleRequestChange/newRequest.js';
import checkValue from './handleRequestChange/checkValue.js';
import handleChange from './handleRequestChange/handleChange.js';
import handleWindowResize from './handleWindowResize.js';
import getRandomVal from './getRandomVal.js'

/////////// random search ///////////

handleChange('randomSample') // for debugging

const logo = document.querySelector('.logo');

logo.addEventListener('click', function(e) {
  if(infoOverlay.classList.contains('infoevents')) closeInfo();
  handleChange('randomSample');
})

/////////// handle key presses ///////////

window.addEventListener('keydown', handleKeydown);

function handleKeydown(e) {
  if(document.querySelector('.eventBlocker').classList.contains('noEvents')) return;
  let submitValue = overlayInput.value;
  if (e.keyCode === 27) { // escape key
    closeOverlay();
    if(infoOverlay.classList.contains('infoevents')) closeInfo();
  } else if (e.keyCode === 13) { // enter
    checkValue(submitValue)
  } else if (e.keyCode === 8) { // delete
    if (submitValue.length === 1) closeOverlay();
  } else if (e.keyCode < 64 || e.keyCode >= 91) { // check if alphabetic
    return;
  } else if (e.keyCode) { // any other key
    if(infoOverlay.classList.contains('infoevents')) closeInfo();
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
  // document.querySelector('.rightContainer').classList.remove('tilt');
  if(searchOverlay.classList.contains('searchFade')) {
    overlayInput.blur();
    // document.body.click();
    searchOverlay.classList.remove('searchFade');
  }
}

/////////// handle image touch ///////////

import { randomColorRequest } from './handleRequestChange/newRequest.js';
import { allAnimSets } from './generateAnimDomElements.js';
import { changeToBGColor, compChangeGrid, changeElementColors, changeBGColor, changeColor, changeBorderColor, letterColors, lettersIn, lettersOut } from './animations.js';
import staggerAnimation from './staggerAnimation.js';
const compContainer = document.querySelector('.compContainer');
const infoOverlay = document.querySelector('.infoOverlay');
const currentSearch = document.querySelectorAll('.currentSearch');
const currentSearchWord = document.querySelector('.currentSearchWord');
const topRelatedTags = document.querySelector('.topRelatedTags');
const mainRule = document.querySelector('.mainRule');
const searchLetters = document.querySelector('.searchLetters');

document.querySelector('.testButton').addEventListener('click', function(e) {
   changeElementColors(allAnimSets, {stagger:-.39, duration:.4});
})

compContainer.addEventListener('click', () => {
  document.querySelector('.eventBlocker').classList.add('noEvents');
  new Promise(function(resolve, reject) {
    staggerAnimation(allAnimSets, 'compChangeGrid', 30, resolve );
  }).then((resolve) => {
    document.querySelector('.eventBlocker').classList.remove('noEvents');
    console.log('compChangeGrid done')
  })
  randomColorRequest();
  setTimeout(function(){
    new Promise(function(resolve, reject) {
      staggerAnimation(allAnimSets, 'changeElementColors', 30, resolve );
    }).then((resolve) => {
      console.log('changeElementColors done')
    })
    changeBGColor(['.pageWrapper']);
    letterColors(currentSearch)
    letterColors(currentSearchWord)
    changeToBGColor([searchLetters])
    changeColor([topRelatedTags]);
    changeColor(document.querySelectorAll('.author'));
    changeColor(document.querySelectorAll('li'));
    changeBorderColor(mainRule);
  }, 100 );
})

compContainer.addEventListener('touchstart', () => {
})

/////////// info grid ///////////

import { gridIn, gridOut } from './animations.js';

const gridButton = document.querySelector('.gridButton')

gridButton.addEventListener('click', () => {
  document.querySelector('.eventBlocker').classList.add('noEvents');
  lettersOut()
  setTimeout(function(){
    infoOverlay.classList.add('infoevents');
  }, 750 );
  new Promise(function(resolve, reject) {
    staggerAnimation(allAnimSets, 'gridIn', 10, resolve );
  }).then((resolve) => {
    searchOverlay.classList.remove('searchFade');
    document.querySelector('.eventBlocker').classList.remove('noEvents');
    console.log('gridIn done');
  })
})

const closeInfoButton = document.querySelector('.infoOverlay .closeButton');
closeInfoButton.addEventListener('click', closeInfo)

function closeInfo() {
  lettersIn()
  document.querySelector('.eventBlocker').classList.add('noEvents');
  new Promise(function(resolve, reject) {
    staggerAnimation(allAnimSets, 'gridOut', 10, resolve );
  }).then((resolve) => {
    document.querySelector('.eventBlocker').classList.remove('noEvents');
    console.log('gridOut done')
  })

  // gridOut(allAnimSets, {stagger:-.89, duration:.9})

  setTimeout(function(){
    infoOverlay.classList.remove('infoevents');
    setTimeout(function(){
       infoOverlay.scrollTop = 0
     }, 1000 );
  }, 200 );

}

currentSearchWord.addEventListener('click', function(e) { closeInfo(); });


// if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
//   document.body.innerHTML =
//   `roRShock is not currently supported on firefox
//   <br>
//   please view this page in chrome or safari for now.
//   <br>
//   Thank you!
//   `
// }