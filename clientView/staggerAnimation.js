import { animateIn, changeLocation, scale, changeElementColors, gridIn, gridOut, blackAndWhiteElements, compChangeFunctionOne, compChangeFunctionTwo, compChangeFunctionThree } from './animations.js';

/////////// stagger animation ///////////

export default function staggerAnimation(allAnimSets, animationName, interval, resolve) {
  if (!interval) {interval = 30}
  let animSetLength = allAnimSets.length;
  if (animSetLength == 0) return;
  let elementsAnimatedIn = 0;
  let elementsCompletedAnimating = 0;

  let myInterval = setInterval(() => {
    let currentAnimSet = allAnimSets[elementsAnimatedIn];

    if (animationName === 'animateIn') { animateIn(currentAnimSet[0], currentAnimSet[1]) }

    else if (animationName === 'changeLocation') { changeLocation(currentAnimSet[0], currentAnimSet[1], elementsAnimatedIn )}
    else if (animationName === 'scale') { scale(currentAnimSet[0], currentAnimSet[1], elementsAnimatedIn)}
    else if (animationName === 'changeElementColors') { changeElementColors(currentAnimSet[0], currentAnimSet[1], currentAnimSet[2], elementsAnimatedIn)}

    else if (animationName === 'gridIn') {
      console.log('going');
      new Promise(function(resolve, reject) {
        // gridIn(currentAnimSet[0], currentAnimSet[2])
        gridIn(currentAnimSet[0], currentAnimSet[2], resolve)
      }).then((resolve) => {
        elementsCompletedAnimating++
        if(elementsCompletedAnimating === animSetLength){
          console.log('done animating')
        }
      })
    }

    else if (animationName === 'gridOut') { gridOut(currentAnimSet[0], currentAnimSet[1], currentAnimSet[2])}
    else if (animationName === 'blackAndWhiteElements') { blackAndWhiteElements(currentAnimSet[0], currentAnimSet[1], elementsAnimatedIn)}
    else if (animationName === 'compChangeFunctionOne') { compChangeFunctionOne(currentAnimSet[0], currentAnimSet[1], elementsAnimatedIn)}
    else if (animationName === 'compChangeFunctionTwo') { compChangeFunctionTwo(currentAnimSet[0], currentAnimSet[1], elementsAnimatedIn)}
    else if (animationName === 'compChangeFunctionThree') { compChangeFunctionThree(currentAnimSet[0], currentAnimSet[1], elementsAnimatedIn)}
    elementsAnimatedIn ++
    if (elementsAnimatedIn === animSetLength) {
      clearInterval(myInterval);
      if(!resolve) return;
      resolve()
    }
  }, interval)
}

