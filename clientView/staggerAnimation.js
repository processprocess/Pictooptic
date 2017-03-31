import { animateIn, animateOut, changeElementColors, compChangeGrid, gridIn, gridOut } from './animations.js';

/////////// stagger animation ///////////

export default function staggerAnimation(allAnimSets, animationName, interval, resolve) {
  if (!interval) {interval = 30}
  let animSetLength = allAnimSets.length;
  if (animSetLength === 0) return;
  let elementsAnimatedIn = 0;
  let animationsComplete = 0;

  let myInterval = setInterval(() => {
    let currentAnimSet = allAnimSets[elementsAnimatedIn];
    let animContainerR = currentAnimSet[0];
    let animContainerL = currentAnimSet[1];
    let animData = currentAnimSet[2];

    if (animationName === 'animateIn') {
      new Promise(function(resolve) { animateIn(animContainerR, animContainerL, resolve) })
      .then((resolve) => { animationsComplete++; if (animationsComplete === animSetLength) { triggerResolve() } })
    }

    if (animationName === 'animateOut') {
      new Promise(function(resolve) { animateOut(animContainerR, animContainerL, resolve) })
      .then((resolve) => { animationsComplete++; if (animationsComplete === animSetLength) { triggerResolve() } })
    }

    if (animationName === 'changeElementColors') {
      new Promise(function(resolve) { changeElementColors(animContainerR, animContainerL, animData, resolve) })
      .then((resolve) => { animationsComplete++; if (animationsComplete === animSetLength) { triggerResolve() } })
    }

    if (animationName === 'compChangeGrid') {
      new Promise(function(resolve) { compChangeGrid(animContainerR, animContainerL, resolve) })
      .then((resolve) => { animationsComplete++; if (animationsComplete === animSetLength) { triggerResolve() } })
    }

    if (animationName === 'gridIn') {
      new Promise(function(resolve) { gridIn(animContainerR, animData, resolve) })
      .then((resolve) => { animationsComplete++; if (animationsComplete === animSetLength) { triggerResolve() } })
    }

    if (animationName === 'gridOut') {
      new Promise(function(resolve) { gridOut(animContainerR, animContainerL, currentAnimSet[2], resolve) })
      .then((resolve) => { animationsComplete++; if (animationsComplete === animSetLength) { triggerResolve() } })
    }

    elementsAnimatedIn ++
    if (elementsAnimatedIn === animSetLength) {
      clearInterval(myInterval);
      if(!resolve) return;
    }
  }, interval)

  function triggerResolve() {
    resolve()
  }

}