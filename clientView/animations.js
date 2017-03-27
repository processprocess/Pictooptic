import "gsap";
import ModifiersPlugin from '../node_modules/gsap/ModifiersPlugin.js';
import getRandomVal from './getRandomVal.js';
import { colorPallete } from './handleRequestChange/newRequest.js'

/////////// responsive scaling ///////////

let responsiveScale;

function setResponsiveScale() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    responsiveScale = .35
  } else {
    // responsiveScale = (window.innerWidth * window.innerHeight) / 2073600;
    responsiveScale = ((window.innerWidth * window.innerHeight) / (window.screen.availHeight * window.screen.availWidth)) * 1.5;
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

export let changingLocation;

export function changeLocation(animContainerL, animContainerR) {
  let endY = getRandomVal(window.innerHeight/5.7, window.innerHeight/1.27);
  let endX = getRandomVal(window.innerWidth/5, window.innerWidth/2);
  let rotation = getRandomVal(0, 360);

  changingLocation = TweenMax.fromTo(animContainerL, 1, { // from
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

export function scale(animContainerL, animContainerR, currentSet) {

  let scale = getRandomVal(0.2, responsiveScale);

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    scale = getRandomVal(0.05, responsiveScale)
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

export function changeBGColor(elements) {
  // TweenMax.to('.pageWrapper', 1, { backgroundColor:colorPallete[Math.floor(getRandomVal(0, colorPallete.length))], ease:Sine.easeInOut, delay:0, })
  TweenMax.to(elements, 1, { backgroundColor:colorPallete[Math.floor(getRandomVal(0, colorPallete.length))], ease:Sine.easeInOut, delay:0, })
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

/////////// make black and white ///////////

export function blackAndWhiteBG() {
  TweenMax.to('.pageWrapper', 1, {backgroundColor:'rgba(255,255,255,0)', ease:Sine.easeInOut})
}

export function blackAndWhiteElements(animContainerL, animContainerR) {
  animContainerL = animContainerL.querySelector('.maskImage')
  animContainerR = animContainerR.querySelector('.maskImage')
  let oddOrEven = Math.floor(getRandomVal(0, 2));
  TweenMax.to([animContainerL, animContainerR], .2, {
    backgroundColor: oddOrEven%2 === 0 ? 'black' : 'white',
    ease:Sine.easeInOut
  })
}

/////////// animate out ///////////

export function animateOut(currentAnims, resolve) {
  TweenMax.to(currentAnims, 1, { scale:0, ease:Sine.easeInOut, onComplete:resolve })
}

/////////// comp change One ///////////

export let compChangeOne;

export function compChangeFunctionOne(animContainerL, animContainerR, elementsAnimatedIn) {
  let endY = getRandomVal(window.innerHeight/5.7, window.innerHeight/1.27);
  let rotation = getRandomVal(0, 180);

  let xPositions = [window.innerWidth/4, window.innerWidth/2]
  const randomInt = Math.floor(Math.random() * (xPositions.length - 0) + 0);
  let endX = xPositions[randomInt]

  // let endX = getRandomVal(window.innerWidth/2, window.innerWidth/2);

  let scale = (endY * responsiveScale) / (window.innerHeight/1.27);

  compChangeOne = TweenMax.fromTo(animContainerL, 1, { // from
    y: animContainerL._gsTransform.y,
    x: animContainerL._gsTransform.x,
    rotation: animContainerL._gsTransform.rotation,
    scaleX: animContainerL._gsTransform.scaleX,
    scaleY: animContainerL._gsTransform.scaleY,
  }, { // to
    y: endY,
    x: endX,
    rotation: rotation,
    scale: scale,
    ease:Sine.easeInOut
  })

  TweenMax.fromTo(animContainerR, 1, { // from
    y: animContainerR._gsTransform.y,
    x: animContainerR._gsTransform.x,
    rotation: animContainerR._gsTransform.rotation,
    scaleX: animContainerR._gsTransform.scaleX,
    scaleY: animContainerR._gsTransform.scaleY,
  }, { // to
    y: endY,
    x: window.innerWidth - endX,
    rotation: function(index, target) { return rotation * -1; },
    scaleX: function(index, target) { return scale * -1; },
    scaleY: function(index, target) { return scale; },
    ease: Sine.easeInOut
  })

}

/////////// comp change Two GRID ///////////

export function compChangeFunctionTwo(animContainerL, animContainerR) {

  // let minX = 0;
  let minX = window.innerWidth/7;
  let maxX = window.innerWidth/2;

  let endY = getRandomVal(window.innerHeight/5.7, window.innerHeight/1.27);
  let rotation = 0
  // let rotation = getRandomVal(0, 180);

  let endX = getRandomVal(minX, maxX);
  // let endX = getRandomVal(0, maxX);
  // let scale = ((endX - minX) / (maxX - minX));
  let scale = (((endX - minX) * responsiveScale) / (maxX - minX))  ;
  // let scale = (endX) / (maxX);
  // let scale = (maxX - endX) / (maxX);
  // console.log(scale);
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    scale = (((endX - minX)* responsiveScale) / (maxX - minX));
  }


  TweenMax.fromTo(animContainerL, 1, { // from
    y: animContainerL._gsTransform.y,
    x: animContainerL._gsTransform.x,
    rotation: animContainerL._gsTransform.rotation,
    scaleX: animContainerL._gsTransform.scaleX,
    scaleY: animContainerL._gsTransform.scaleY,
  }, { // to
    y: endY,
    x: endX,
    rotation: rotation,
    scale: scale,
    ease:Sine.easeInOut
  })

  TweenMax.fromTo(animContainerR, 1, { // from
    y: animContainerR._gsTransform.y,
    x: animContainerR._gsTransform.x,
    rotation: animContainerR._gsTransform.rotation,
    scaleX: animContainerR._gsTransform.scaleX,
    scaleY: animContainerR._gsTransform.scaleY,
  }, { // to
    y: endY,
    x: window.innerWidth - endX,
    rotation: function(index, target) { return rotation * -1; },
    scaleX: function(index, target) { return scale * -1; },
    scaleY: function(index, target) { return scale; },
    ease: Sine.easeInOut
  })

}

/////////// comp change Three Circle ///////////

export function compChangeFunctionThree(animContainerL, animContainerR) {
  let rotation = getRandomVal(0, 180);

  let radii = [window.innerWidth/4, window.innerWidth/6, window.innerWidth/13];
  const randomInt = Math.floor(Math.random() * (radii.length - 0) + 0);
  let radius = radii[randomInt];

  let centerX = window.innerWidth / 2;
  let centerY = window.innerHeight / 2;

  let angle = Math.floor(Math.random() * (360 - 0) + 0);

  let endX = centerX + Math.cos(angle) * radius;
  let endY = centerY + Math.sin(angle) * radius;

  // console.log( centerX/endX )
  // console.log( (((centerX/endX)/2) + ((centerY/endY)/2)) / 2 )

  let scale = ( (centerX/endX)/2 )

  // let minX = window.innerWidth/7;
  // let maxX = window.innerWidth/2;
  // let endY = getRandomVal(window.innerHeight/5.7, window.innerHeight/1.27);
  // let endX = getRandomVal(minX, maxX);
  // let scale = (((endX - minX) * responsiveScale) / (maxX - minX))  ;
  // if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  //   scale = (((endX - minX)* responsiveScale) / (maxX - minX));
  // }


  TweenMax.fromTo(animContainerL, 1, { // from
    y: animContainerL._gsTransform.y,
    x: animContainerL._gsTransform.x,
    rotation: animContainerL._gsTransform.rotation,
    scaleX: animContainerL._gsTransform.scaleX,
    scaleY: animContainerL._gsTransform.scaleY,
  }, { // to
    y: endY,
    x: endX,
    rotation: rotation,
    scale: scale,
    ease:Sine.easeInOut
  })

  TweenMax.fromTo(animContainerR, 1, { // from
    y: animContainerR._gsTransform.y,
    x: animContainerR._gsTransform.x,
    rotation: animContainerR._gsTransform.rotation,
    scaleX: animContainerR._gsTransform.scaleX,
    scaleY: animContainerR._gsTransform.scaleY,
  }, { // to
    y: endY,
    x: window.innerWidth - endX,
    rotation: function(index, target) { return rotation * -1; },
    scaleX: function(index, target) { return scale * -1; },
    scaleY: function(index, target) { return scale; },
    ease: Sine.easeInOut
  })

}