console.clear()
import { handleChangeFlow } from './generateAnimDomElements.js';
import { substringMatcher } from './typeahead.js'

let related = document.querySelector('.related');
let relatedTagsMenu = document.querySelector('.relatedTagsMenu');
related.addEventListener('mouseover', function(e) {
  relatedTagsMenu.classList.remove('notVisible')
})
related.addEventListener('mouseout', function(e) {
  relatedTagsMenu.classList.add('notVisible')
})

/////////// handle navigation ///////////

// let items = document.querySelectorAll('.item');
let searchInput = document.querySelector('.searchInput')
// let offNav = document.querySelector('.offNav')
// // let canvas = document.querySelector('canvas')

// let searching = false;
//
// items.forEach(item => {
//   let thisClass = item.classList[1];
//   let children = Array.from(item.querySelectorAll(`.${thisClass} > *`));
//
//   item.addEventListener('mouseover',function(e) {
//     !searching ? item.classList.add('hovering') : undefined;
//     children.forEach(child => {child.classList.remove('notVisible')})
//   })
//
//   item.addEventListener('mouseleave',function(e) {
//     !searching ? item.classList.remove('hovering') : undefined;
//     children.forEach(child => {
//       !searching ? child.classList.add('notVisible') : undefined;
//     })
//   })
//
// })
//
// export function resetNav() {
//   searching = false;
//   searchInput.blur();
//   searchInput.value = null;
//   items.forEach((item, i) => {
//     item.classList.remove('hovering');
//     if (item.classList.contains('logo')) {
//       // console.log(item)
//       return;
//     } else {
//       item.classList.add('notVisible');
//     }
//   });
//
// }
//
// function activateNav() {
//   items.forEach((item, i) => {
//     if (item.classList.contains('info')) return;
//     item.classList.add('hovering');
//     item.classList.remove('notVisible');
//   });
//   searchInput.focus();
// }
//
// searchInput.addEventListener('mouseover', function(){
//   searchInput.focus();
// })
//
// searchInput.addEventListener('mouseout', function(){
//   if (!searching) {searchInput.blur()}
// })
//
// searchInput.addEventListener('input', function(){
//   let textLength = this.value.length;
//   if (textLength > 0) {
//     searching = true;
//   } else if (textLength === 0){
//     resetNav()
//   }
// })

// canvas.addEventListener('click', function(e) {
//   resetNav()
// })

/////////// handle key presses ///////////

window.addEventListener('keydown', handleKeydown);

function handleKeydown(e) {
  // if(document.querySelector('.eventBlocker').classList.contains('noEvents')) return;
  let submitValue = searchInput.value;
  if (e.keyCode === 27) { // escape key
    // closeOverlay();
    // if(infoOverlay.classList.contains('infoevents')) closeInfo();
  } else if (e.keyCode === 13) { // enter
    handleChangeFlow(submitValue)
    // resetNav()
  } else if (e.keyCode === 8) { // delete
    // if (submitValue.length === 1) closeOverlay();
  } else if (e.keyCode < 64 || e.keyCode >= 91) { // check if alphabetic
    return;
  } else if (e.keyCode) { // any other key
    // if(infoOverlay.classList.contains('infoevents')) closeInfo();
    // handleSearchWindow()
    // activateNav()
  }
}


/////////// Search Overlay //////////

const closeSearch = document.querySelector('.searchOverlay .closeButton');

const searchOverlay = document.querySelector('.searchOverlay');
const overlayInput = document.querySelector('.searchOverlay input');
const searchButton = document.querySelector('.searchButton');
const searchInstructions = document.querySelector('.searchInstructions');

// searchButton.addEventListener('click', function(e) { handleSearchWindow(); })

function handleSearchWindow() {
  searchInstructions.textContent = 'enter any word';
  overlayInput.focus();
  // if (infoOverlay.classList.contains('infoevents')) infoOverlay.classList.remove('infoevents');
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
