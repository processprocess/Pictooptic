import "gsap";
import ModifiersPlugin from '../node_modules/gsap/ModifiersPlugin.js';
import getRandomVal from './getRandomVal.js';

export function animateIn(animContainerL, animContainerR) {
  let animateIn = new TimelineLite();
  // let startY = getRandomVal(window.innerHeight/8.5, window.innerHeight/1.15);
  // let startX = getRandomVal(window.innerWidth/9, window.innerWidth/2);
  let startY = getRandomVal(window.innerHeight / 4, window.innerHeight / 1.4);
  let startX = getRandomVal(window.innerWidth / 2, window.innerWidth / 4);
  let endY = getRandomVal(0, window.innerHeight);
  let endX = window.innerWidth / 2;
  let rotation = getRandomVal(0, 30);
  let delay = 0;
  let scalePure = (endY / window.innerHeight);
  let scale = getRandomVal(0.1, .7);
  // let scale = getRandomVal(0.1, .45);
  // let scale = getRandomVal(0.1, 0.5) * scaleModifier;

  animateIn.fromTo([animContainerL, animContainerR], 1, {
    y: startY,
    x: startX,
    rotation: 0,
    scale: 0,
  }, {
    y: startY,
    x: startX,
    rotation: rotation,
    scale: scale,
    modifiers: {
      x: function(value, animContainer) {
        return (animContainer === animContainerR) ? window.innerWidth - value : value;
      },
      scaleX: function(value, animContainer) {
        return (animContainer === animContainerR) ? -value : value;
      },
      rotation: function(value, animContainer) {
        return (animContainer === animContainerR) ? -value : value;
      }
    },
    ease:Sine.easeInOut
  }, 'start')

}

export function changeLocation(animContainerL, animContainerR) {
  // let endY = getRandomVal(window.innerHeight/8.5, window.innerHeight/1.15);
  // let endX = getRandomVal(window.innerWidth/9, window.innerWidth/2);
  let endY = getRandomVal(window.innerHeight / 4, window.innerHeight / 1.4);
  let endX = getRandomVal(window.innerWidth / 2, window.innerWidth / 4);
  let rotation = getRandomVal(0, 360);

  TweenMax.fromTo(animContainerL, 1, {
    y: animContainerL._gsTransform.y,
    x: animContainerL._gsTransform.x,
    rotation: animContainerL._gsTransform.rotation,
  }, {
    y: endY,
    x: endX,
    rotation: rotation,
    ease:Sine.easeInOut
  })

  TweenMax.fromTo(animContainerR, 1, {
    y: animContainerR._gsTransform.y,
    x: animContainerR._gsTransform.x,
    rotation: animContainerR._gsTransform.rotation,
  }, {
    y: endY,
    x: window.innerWidth - endX,
    rotation: rotation,
    modifiers: {
      rotation: function(value, animContainer) {
        return (animContainer === animContainerR) ? animContainerL._gsTransform.rotation * -1 : value;
      }
    },
    ease:Sine.easeInOut
  })

}


export function animateOut(currentAnims, resolve) {
  TweenMax.to(currentAnims, 1, { scale:0, ease:Sine.easeInOut, onComplete:resolve })
}