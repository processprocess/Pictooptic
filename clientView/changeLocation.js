import "gsap";
import ModifiersPlugin from '../node_modules/gsap/ModifiersPlugin.js';
import random from './random.js';

export default function changeLocation(animContainerL, animContainerR) {
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