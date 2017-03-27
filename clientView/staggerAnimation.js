import { animateIn, changeLocation, scale, changeElementColors, blackAndWhiteElements, compChangeFunctionOne, compChangeFunctionTwo, compChangeFunctionThree } from './animations.js';

/////////// stagger animation ///////////

export default function staggerAnimation(allAnimSets, animationName, interval) {
  if (!interval) {interval = 30}
  let animSetLength = allAnimSets.length;
  if (animSetLength == 0) return;
  let elementsAnimatedIn = 0;
  let myInterval = setInterval(() => {
    let currentAnimSet = allAnimSets[elementsAnimatedIn];
    if (animationName === 'animateIn') { animateIn(currentAnimSet[0], currentAnimSet[1], elementsAnimatedIn) }
    else if (animationName === 'changeLocation') { changeLocation(currentAnimSet[0], currentAnimSet[1], elementsAnimatedIn ) }
    else if (animationName === 'scale') { scale(currentAnimSet[0], currentAnimSet[1], elementsAnimatedIn) }
    else if (animationName === 'changeElementColors') { changeElementColors(currentAnimSet[0], currentAnimSet[1], elementsAnimatedIn) }
    else if (animationName === 'blackAndWhiteElements') { blackAndWhiteElements(currentAnimSet[0], currentAnimSet[1], elementsAnimatedIn) }
    else if (animationName === 'compChangeFunctionOne') { compChangeFunctionOne(currentAnimSet[0], currentAnimSet[1], elementsAnimatedIn) }
    else if (animationName === 'compChangeFunctionTwo') { compChangeFunctionTwo(currentAnimSet[0], currentAnimSet[1], elementsAnimatedIn) }
    else if (animationName === 'compChangeFunctionThree') { compChangeFunctionThree(currentAnimSet[0], currentAnimSet[1], elementsAnimatedIn) }
    elementsAnimatedIn ++
    if (elementsAnimatedIn >= animSetLength) {
      clearInterval(myInterval);
    }
  }, interval)
}

