import { changeLocation, scale } from './animations.js';
import { allAnimSets } from './generateAnimDomElements.js';

export let windowSize = {};
export let responsiveScale;

const pageWrapper = document.querySelector('.pageWrapper')

windowSize.width = window.innerWidth;
windowSize.height = window.innerHeight;
window.onload = function() {  // set page wrapper at start
  document.querySelector('.pageWrapper').style.height = window.innerHeight + 'px';
};
setResponsiveScale();

document.addEventListener('gesturestart', function (e) { // dissable pinch re-sizing
  e.preventDefault();
});

export default function handleWindowResize() {
  pageWrapper.style.width = windowSize.width + 'px';
  pageWrapper.style.height = windowSize.height + 'px';
  changeLocation(allAnimSets, {stagger:-.89, duration:.9});
  scale(allAnimSets, {stagger:-.199, duration:.2});
}

document.addEventListener("orientationchange",() => {
  setTimeout(function(){
    handleWindowResize();
  }, 100 );
});

window.addEventListener('resize', () => {
  setResponsiveScale()
  windowSize.width = window.innerWidth;
  windowSize.height = window.innerHeight;
  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) return;
  delay(function(){
    handleWindowResize();
  }, 300);
})

// delay detect for window resize

const delay = (function(){
  let timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

/////////// responsive scaling ///////////

function setResponsiveScale() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    responsiveScale = .35
  } else {
    responsiveScale = ((window.innerWidth * window.innerHeight) / (window.screen.availHeight * window.screen.availWidth)) * 1.5;
  }
}


