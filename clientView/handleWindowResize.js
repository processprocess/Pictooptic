import { changeLocation } from './animations.js';
import { allAnimSets } from './generateAnimDomElements.js';
import staggerAnimation from './staggerAnimation.js';

const pageWrapper = document.querySelector('.pageWrapper')
window.onload = function() { document.querySelector('.pageWrapper').style.height = window.innerHeight + 'px'; }; // set page wrapper at start
document.addEventListener('gesturestart', function (e) { e.preventDefault(); }); // dissable pinch re-sizing

export default function handleWindowResize() {
  pageWrapper.style.height = window.innerHeight + 'px';
  pageWrapper.style.width = window.innerWidth + 'px';
  staggerAnimation(allAnimSets, 'changeLocation');
  staggerAnimation(allAnimSets, 'scale');
}

document.addEventListener("orientationchange",() => { setTimeout(function(){ handleWindowResize(); }, 100 ); });

window.addEventListener('resize', () => {
  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) return;
  delay(function(){
    handleWindowResize();
  }, 300);
})

const delay = (function(){
  let timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();



