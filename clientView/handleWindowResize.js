/////////// window resize ///////////

import { changeLocation } from './animations.js';
import { allAnimSets } from './generateAnimDomElements.js';
import staggerAnimation from './staggerAnimation.js';

document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

const pageWrapper = document.querySelector('.pageWrapper')

export default function handleWindowResize() {
  pageWrapper.style.height = window.innerHeight + 'px';
  pageWrapper.style.width = window.innerWidth + 'px';

  // new Promise((resolve, reject) => { staggerAnimation(allAnimSets, 'scale', resolve, 1); })
  // .then((returnOject) => { staggerAnimation(allAnimSets, 'changeLocation'); });

  staggerAnimation(allAnimSets, 'changeLocation');
  staggerAnimation(allAnimSets, 'scale');
}