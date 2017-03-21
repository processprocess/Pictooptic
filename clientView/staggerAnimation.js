import { animateIn, changeLocation } from './animations.js';

/////////// stagger animation ///////////

export default function staggerAnimation(allAnimSets, animationName) {
  let animSetLength = allAnimSets.length;
  let elementsAnimatedIn = 0;
  let myInterval = setInterval(() => {
    let currentAnimSet = allAnimSets[elementsAnimatedIn];
    if (animationName === 'animateIn') { animateIn(currentAnimSet[0], currentAnimSet[1]) }
    else if (animationName === 'changeLocation') { changeLocation(currentAnimSet[0], currentAnimSet[1]) }
    elementsAnimatedIn ++
    if (elementsAnimatedIn >= animSetLength) { clearInterval(myInterval); }
  }, 30);
}