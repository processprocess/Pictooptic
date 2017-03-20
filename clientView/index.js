console.clear()
import newRequest from './handleRequestChange/newRequest.js';
import checkValue from './handleSubmitValue/checkValue.js';
import handleSubmitError from './handleSubmitValue/handleSubmitError.js';
import handleChange from './handleRequestChange/handleChange.js';

/////////// handle key presses ///////////

window.addEventListener('keydown', handleKeydown);

new Promise((resolve, reject) => { handleChange('error', resolve) })
.then(resolveResult => console.log(resolveResult))


function handleKeydown(e) {
  // console.log(e.keyCode);
  if (e.keyCode === 27) { // escape key
    closeOverlay();
  } else if (e.keyCode === 13) { // enter
    new Promise((resolve, reject) => { checkValue(overlayInput.value, resolve, reject); })
      .then(checkedValue => { handleChange(checkedValue); closeOverlay(); })
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
  searchButton.parentNode.classList.toggle('navFade');
}

function closeOverlay() {
  if(searchOverlay.classList.contains('searchFade') || infoOverlay.classList.contains('fadeIn')) {
    overlayInput.blur();
    document.body.click();
    searchOverlay.classList.remove('searchFade');
    infoOverlay.classList.remove('fadeIn');
    searchButton.parentNode.classList.remove('navFade');
  }
}

/////////// info window ///////////

const infoOverlay = document.querySelector('.infoOverlay');
const infoButton = document.querySelector('.infoButton');

infoButton.addEventListener('click', function(e) { toggleInfoOverlay(); });

function toggleInfoOverlay() {
  infoOverlay.classList.toggle('fadeIn');
  infoButton.parentNode.classList.toggle('navFade');
}

/////////// window resize ///////////

const pageWrapper = document.querySelector('.pageWrapper')

window.onload = function() { handleWindowResize() };

function handleWindowResize() {
  pageWrapper.style.height = window.innerHeight + 'px';
}

window.addEventListener('resize', () => {
  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) return;
  handleWindowResize();
  console.log(window.innerWidth, window.innerHeight);
})

document.addEventListener("orientationchange",() => {
  setTimeout(function(){ handleWindowResize(); }, 100 );
});

/////////// detect mobile ///////////

// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//  document.body.style.backgroundColor = 'red';
// }