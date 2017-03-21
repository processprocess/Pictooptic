/////////// window resize ///////////

import { changeLocation } from './animations.js';
import { allAnimSets } from './generateAnimDomElements.js';
import staggerAnimation from './staggerAnimation.js';

const pageWrapper = document.querySelector('.pageWrapper')

export default function handleWindowResize() {
  console.log(window.innerWidth, window.innerHeight);
  pageWrapper.style.height = window.innerHeight + 'px';
  staggerAnimation(allAnimSets, 'changeLocation');
}