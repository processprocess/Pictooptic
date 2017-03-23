import "gsap";
import ModifiersPlugin from '../node_modules/gsap/ModifiersPlugin.js';
import getRandomVal from './getRandomVal.js';
import { colorPallete } from './handleRequestChange/newRequest.js'
// import { colorPallete } from './handleRequestChange/randomColorRequest.js'

/////////// responsive scaling ///////////

let responsiveScale;

function setResponsiveScale() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    responsiveScale = .35
  } else {
    responsiveScale = (window.innerWidth * window.innerHeight) / (window.screen.availHeight * window.screen.availWidth);
    console.log(responsiveScale);
  }
}
window.addEventListener('resize', () => setResponsiveScale())
setResponsiveScale()

/////////// animateIn ///////////

export let animateInRef; //used in checkvalue.js

export function animateIn(animContainerL, animContainerR) {
  let animateIn = new TimelineLite();
  let startY = getRandomVal(window.innerHeight/5.7, window.innerHeight/1.27);
  let startX = getRandomVal(window.innerWidth/5, window.innerWidth/2);
  let rotation = getRandomVal(0, 30);
  let scale = getRandomVal(0.2, responsiveScale);

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
    ease: Sine.easeInOut
  }, 'start')

}

/////////// changeLocation ///////////

export function changeLocation(animContainerL, animContainerR) {
  let endY = getRandomVal(window.innerHeight/5.7, window.innerHeight/1.27);
  let endX = getRandomVal(window.innerWidth/5, window.innerWidth/2);
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
    ease: Sine.easeInOut
  })

}

/////////// scale ///////////

export function scale(animContainerL, animContainerR) {
  let scale = getRandomVal(0.2, responsiveScale);

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    console.log('test');
    scale = getRandomVal(0.05, responsiveScale);
  }

  TweenMax.fromTo(animContainerL, .2, { // from
    scaleX: animContainerL._gsTransform.scaleX,
    scaleY: animContainerL._gsTransform.scaleY,
  }, { // to
    scale: scale,
    ease: Sine.easeInOut
  })

  TweenMax.fromTo(animContainerR, .2, { // from
    scaleX: animContainerR._gsTransform.scaleX,
    scaleY: animContainerR._gsTransform.scaleY,
  }, { // to
    scaleX: function(index, target) { return scale * -1; },
    scaleY: function(index, target) { return scale; },
    ease: Sine.easeInOut
  })

}

/////////// random color ///////////

export function changeBGColor() {
  TweenMax.to('.pageWrapper', 1, { backgroundColor:colorPallete[Math.floor(getRandomVal(0, colorPallete.length))], ease:Sine.easeInOut })
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

/////////// animate out ///////////

export function animateOut(currentAnims, resolve) {
  TweenMax.to(currentAnims, 1, { scale:0, ease:Sine.easeInOut, onComplete:resolve })
}