import "gsap";
import ModifiersPlugin from '../node_modules/gsap/ModifiersPlugin.js';
import random from './random.js';

export function animateIn(animContainerL, animContainerR) {
  let animateIn = new TimelineLite();
  // let startY = random(window.innerHeight/8.5, window.innerHeight/1.15);
  // let startX = random(window.innerWidth/9, window.innerWidth/2);
  let startY = random(window.innerHeight / 4, window.innerHeight / 1.4);
  let startX = random(window.innerWidth / 2, window.innerWidth / 4);
  let endY = random(0, window.innerHeight);
  let endX = window.innerWidth / 2;
  let rotation = random(0, 30);
  let delay = 0;
  let scalePure = (endY / window.innerHeight);
  let scale = random(0.1, .45);
  // let scale = random(0.1, 0.5) * scaleModifier;

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
  // let endY = random(window.innerHeight/8.5, window.innerHeight/1.15);
  // let endX = random(window.innerWidth/9, window.innerWidth/2);
  let endY = random(window.innerHeight / 4, window.innerHeight / 1.4);
  let endX = random(window.innerWidth / 2, window.innerWidth / 4);
  let rotation = random(0, 360);

  TweenMax.to([animContainerL, animContainerR], 1, {
    y: endY,
    x: endX,
    rotation: rotation,
    modifiers: {
      x: function(value, animContainer) {
        return (animContainer === animContainerR) ? window.innerWidth - animContainerL._gsTransform.x : value;
      },
      rotation: function(value, animContainer) {
        return (animContainer === animContainerR) ? animContainerL._gsTransform.rotation * -1 : value;
      }
    },
    ease:Sine.easeInOut
  })

}

// export function animateOut(animContainerL, animContainerR) {
//
// }