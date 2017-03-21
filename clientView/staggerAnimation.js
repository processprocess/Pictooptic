import { animateIn } from './animations.js';

/////////// stagger animation ///////////

export default function staggerAnimation(allAnimSets) {
  let animSetLength = allAnimSets.length;
  let elementsAnimatedIn = 0;
  let myInterval = setInterval(() => {
    let currentAnimSet = allAnimSets[elementsAnimatedIn];
    animateIn(currentAnimSet[0], currentAnimSet[1])
    elementsAnimatedIn ++

    if (elementsAnimatedIn >= animSetLength) { clearInterval(myInterval); }
  }, 100);
}