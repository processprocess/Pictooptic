/////////// window resize ///////////

import { changeLocation } from './animations.js';
import { allAnimSets } from './generateAnimDomElements.js';

const pageWrapper = document.querySelector('.pageWrapper')

export default function handleWindowResize() {
  console.log(window.innerWidth, window.innerHeight);
  pageWrapper.style.height = window.innerHeight + 'px';
  staggerAnimation(allAnimSets)
}

function staggerAnimation(allAnimSets) {
  let animSetLength = allAnimSets.length;
  let elementsAnimatedIn = 0;
  let myInterval = setInterval(() => {
    let currentAnimSet = allAnimSets[elementsAnimatedIn];
    changeLocation(currentAnimSet[0], currentAnimSet[1])
    elementsAnimatedIn ++
    if (elementsAnimatedIn >= animSetLength) { clearInterval(myInterval); }
  }, 30);
}