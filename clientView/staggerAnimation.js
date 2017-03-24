import { animateIn, changeLocation, scale, changeElementColors, blackAndWhiteElements } from './animations.js';

/////////// stagger animation ///////////

export default function staggerAnimation(allAnimSets, animationName, interval) {
  if (!interval) {interval = 30}
  let animSetLength = allAnimSets.length;
  if (animSetLength == 0) return;
  let elementsAnimatedIn = 0;
  let myInterval = setInterval(() => {
    let currentAnimSet = allAnimSets[elementsAnimatedIn];
    if (animationName === 'animateIn') { animateIn(currentAnimSet[0], currentAnimSet[1]) }
    else if (animationName === 'changeLocation') { changeLocation(currentAnimSet[0], currentAnimSet[1]) }
    else if (animationName === 'scale') { scale(currentAnimSet[0], currentAnimSet[1]) }
    else if (animationName === 'changeElementColors') { changeElementColors(currentAnimSet[0], currentAnimSet[1]) }
    else if (animationName === 'blackAndWhiteElements') { blackAndWhiteElements(currentAnimSet[0], currentAnimSet[1]) }
    elementsAnimatedIn ++
    if (elementsAnimatedIn >= animSetLength) {
      clearInterval(myInterval);
    }
  }, interval)
}

