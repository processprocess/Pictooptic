import "gsap";
import ModifiersPlugin from '../node_modules/gsap/ModifiersPlugin.js';
import getRandomVal from './getRandomVal.js';

// let scaleModifier = .2;
let scaleModifier;



window.addEventListener('resize', () => {
  handleScaleModifier()
})

function handleScaleModifier() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    scaleModifier = .35
  } else {
      scaleModifier = (window.innerWidth * window.innerHeight) / (window.screen.availHeight * window.screen.availWidth);
  }
}
handleScaleModifier()


export let animateInRef;

export function animateIn(animContainerL, animContainerR) {
  let animateIn = new TimelineLite();
  let startY = getRandomVal(window.innerHeight/5.7, window.innerHeight/1.27);
  let startX = getRandomVal(window.innerWidth/5, window.innerWidth/2);
  // let startY = getRandomVal(window.innerHeight / 4, window.innerHeight / 1.4);
  // let startX = getRandomVal(window.innerWidth / 4, window.innerWidth / 2);
  let endY = getRandomVal(0, window.innerHeight);
  let endX = window.innerWidth / 2;
  let rotation = getRandomVal(0, 30);
  let delay = 0;
  let scalePure = (endY / window.innerHeight);
  let scale = getRandomVal(0.2, scaleModifier);

  animateInRef = animateIn.fromTo([animContainerL, animContainerR], 1, {
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
  let endY = getRandomVal(window.innerHeight/5.7, window.innerHeight/1.27);
  let endX = getRandomVal(window.innerWidth/5, window.innerWidth/2);
  // let endY = getRandomVal(window.innerHeight / 4, window.innerHeight / 1.4);
  // let endX = getRandomVal(window.innerWidth / 2, window.innerWidth / 4);
  let rotation = getRandomVal(0, 360);

  TweenMax.fromTo(animContainerL, 1, { // from
    y: animContainerL._gsTransform.y,
    x: animContainerL._gsTransform.x,
    rotation: animContainerL._gsTransform.rotation,
  }, { // to
    y: endY,
    x: endX,
    rotation: rotation,
    ease:Sine.easeInOut
  })

  TweenMax.fromTo(animContainerR, 1, { // from
    y: animContainerR._gsTransform.y,
    x: animContainerR._gsTransform.x,
    rotation: animContainerR._gsTransform.rotation,
  }, { // to
    y: endY,
    x: window.innerWidth - endX,
    rotation: function(index, target) { return rotation * -1; },
    ease:Sine.easeInOut
  })

}

export function scale(animContainerL, animContainerR) {
  let scale = getRandomVal(0.2, scaleModifier);

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    console.log('test');
    scale = getRandomVal(0.05, scaleModifier);
  }

  TweenMax.fromTo(animContainerL, .2, { // from
    scaleX: animContainerL._gsTransform.scaleX,
    scaleY: animContainerL._gsTransform.scaleY,
  }, { // to
    scale: scale,
    // scaleX: function(index, target) { return target._gsTransform.scaleX * .5; },
    // scaleY: function(index, target) { return target._gsTransform.scaleY * .5; },
    ease:Sine.easeInOut
  })

  TweenMax.fromTo(animContainerR, .2, { // from
    scaleX: animContainerR._gsTransform.scaleX,
    scaleY: animContainerR._gsTransform.scaleY,
  }, { // to
    scaleX: function(index, target) { return scale * -1; },
    scaleY: function(index, target) { return scale; },
    // scaleX: function(index, target) { return target._gsTransform.scaleX * .5; },
    // scaleY: function(index, target) { return target._gsTransform.scaleY * .5; },
    ease:Sine.easeInOut
  })

}

export function animateOut(currentAnims, resolve) {
  TweenMax.to(currentAnims, 1, { scale:0, ease:Sine.easeInOut, onComplete:resolve })
}

/////////// random color function ///////////

import { colorPallete } from './handleRequestChange/randomColorRequest.js'

// let colorPallete = ["#00A0B0", "#6A4A3C", "#CC333F", "#EB6841", "#EDC951"];

export function changeBGColor() {
  TweenMax.to(document.body, 1, { backgroundColor:colorPallete[Math.floor(getRandomVal(0, colorPallete.length))], ease:Sine.easeInOut })
}

export function changeElementColors(animContainerL, animContainerR) {
  animContainerL = animContainerL.querySelector('.maskImage')
  animContainerR = animContainerR.querySelector('.maskImage')
  let color = colorPallete[Math.floor(getRandomVal(0, colorPallete.length))];
  TweenMax.to([animContainerL, animContainerR], .2, {
    backgroundColor: color,
    ease:Sine.easeInOut
  })

}