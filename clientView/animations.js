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

  let startX = window.innerWidth/2 ;
  let startY = getRandomVal(window.innerHeight/2, window.innerHeight/2);
  let endX = getRandomVal(window.innerWidth/5, window.innerWidth/2);
  let endY = getRandomVal(window.innerHeight/5.7, window.innerHeight/1.27);
  let scale = getRandomVal(0.2, responsiveScale);
  let rotation = getRandomVal(0, 30);

  TweenMax.set([animContainerL, animContainerR], {
    scaleY: scale,
    scaleX: scale,
    modifiers: {
      scaleX: function(value, animContainer) {
        return (animContainer === animContainerR) ? -value : value;
      },
    }
  })

  animateInRef = TweenMax.fromTo([animContainerL, animContainerR], 2, {
    y: startY,
    x: () => startX + animContainerL.getBoundingClientRect().height,
    rotation: 0,
  }, {
    y: endY,
    x: endX,
    rotation: rotation,
    modifiers: {
      x: function(value, animContainer) {
        return (animContainer === animContainerR) ? window.innerWidth / 2 - value : value;
      },
      rotation: function(value, animContainer) {
        return (animContainer === animContainerR) ? -value : value;
      }
    },
    ease: Sine.easeInOut
  })

}

/////////// animate out ///////////

export function animateOut(elements, options, resolve) {
  let windowCalc = window.innerWidth/2;

  options = options || {};
  let duration = options.duration || 0.1;
  let stagger = (options.stagger == null) ? 0.3 : options.stagger || 0;
  let tl = new TimelineLite({onComplete:resolve});

  tl.staggerTo(elements, duration, {
    x: function(index, element) {
      let windowAndBounding = windowCalc + element.getBoundingClientRect().width;
      // return element.classList.contains('rightContainer') ? element._gsTransform.x - windowAndBounding : element._gsTransform.x + windowAndBounding;
      return element.classList.contains('animContainerR') ? element._gsTransform.x - windowAndBounding : element._gsTransform.x + windowAndBounding;
    },
    ease:Sine.easeIn,
  }, stagger)
  return tl;

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
    x: window.innerWidth / 2 - endX,
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

/////////// change colors ///////////

export function changeBGColor(elements) {
  TweenMax.to(elements, 1, { backgroundColor:colorPallete[0], ease:Sine.easeInOut })
}

export function changeElementColors(animContainerL, animContainerR, animData, elementsAnimatedIn) {
  animContainerL = animContainerL.querySelector('.maskImage');
  animContainerR = animContainerR.querySelector('.maskImage');
  let color = colorPallete[Math.floor(getRandomVal(0, colorPallete.length))];
  TweenMax.to([animContainerL, animContainerR], .2, {
    backgroundColor: color,
    ease:Sine.easeInOut
  })
  animData = animData.querySelector('.iconDataHolder > .iconDataImageMask');
  TweenMax.set(animData, {
    backgroundColor: color
  })
}

export function changeColor(element) {
  TweenMax.to(element, .3, { color:colorPallete[4], ease:Sine.easeInOut, delay:0, })
}

export function changeBorderColor(element) {
  TweenMax.to(element, .3, { borderColor:colorPallete[4], ease:Sine.easeInOut, delay:0, })
}

/////////// letter colors ///////////

export function letterColors(elements) {
  if(elements.length > 0) {
    elements.forEach(element => {
      let elementSpans = Array.from(element.querySelectorAll('span'));
      let lastColor;

      TweenMax.to(elementSpans, .5, {
        color: () => colorPallete[Math.floor(getRandomVal(1, colorPallete.length))] ,
        ease:Sine.easeInOut,
      })
    })
  } else {
    let elementSpans = Array.from(elements.querySelectorAll('span'));
    let lastColor;

    TweenMax.to(elementSpans, .5, {
      color: () => colorPallete[Math.floor(getRandomVal(1, colorPallete.length))] ,
      ease:Sine.easeInOut,
    })
  }

}

/////////// move letters in ///////////

export function lettersIn() {
  let currentSearch = document.querySelectorAll('.currentSearch');
  TweenMax.to(currentSearch, 1.5, {
    x: function(index, element) {
      return element.offsetParent.classList.contains('leftContainer') ? window.innerWidth/4 : window.innerWidth/4 * -1
    },
    ease:Sine.easeInOut
  })
}

/////////// move letters out ///////////

export function lettersOut() {
  let currentSearch = document.querySelectorAll('.currentSearch');
  TweenMax.to(currentSearch, 1.5, {
    x: function(index, element) {
      const children = element.children;
      let elementInnerWidth = 0;
      for (var i = 0; i < children.length; i++) {
        elementInnerWidth += children[i].offsetWidth;
      }
      return element.offsetParent.classList.contains('leftContainer') ? window.innerWidth/4 + elementInnerWidth : window.innerWidth/4 * -1 - elementInnerWidth
    },
    ease:Sine.easeInOut
  })
}

/////////// info animations ///////////

export function gridIn(animContainerL, animData) {
  const animDataX = animData.offsetLeft + animData.offsetWidth/2;
  const animDataY = animData.offsetTop + animData.offsetHeight/2 - animData.offsetParent.scrollTop;

  TweenMax.to(animContainerL, .9, {
    x: animDataX,
    y: animDataY,
    rotation: 0,
    scaleX: .5,
    scaleY: .5,
    ease: Sine.easeInOut,
    onComplete: ()=> {animContainerL.classList.add('hidden'); animData.classList.add('show')}
  })
}

export function gridOut(animContainerL, animContainerR,  animData) {
  animData.classList.remove('show')
  animContainerL.classList.remove('hidden')
  const animDataX = animData.offsetLeft + animData.offsetWidth/2;
  const animDataY = animData.offsetTop + animData.offsetHeight/2 - animData.offsetParent.scrollTop;
  const endX = window.innerWidth/2 - animContainerR._gsTransform.x;
  const endY = animContainerR._gsTransform.y;
  const endRotation = animContainerR._gsTransform.rotation * -1;
  const endscaleX = (animContainerR._gsTransform.scaleX) * -1;
  const endscaleY = animContainerR._gsTransform.scaleY;

  TweenMax.fromTo(animContainerL, .9, {
    x: animDataX,
    y: animDataY,
    rotation: 0,
    scaleX: .5,
    scaleY: .5,
  }, {
    x: endX,
    y: endY,
    rotation: endRotation,
    scaleX: endscaleX,
    scaleY: endscaleY,
    ease: Sine.easeInOut
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

/////////// comp change Two grid angle ///////////

export function compChangeFunctionTwo(animContainerL, animContainerR) {
  let minX = window.innerWidth/7;
  let maxX = window.innerWidth/2;
  let endY = getRandomVal(window.innerHeight/5.7, window.innerHeight/1.27);
  let endX = getRandomVal(minX, maxX);

  let rotation = 0
  let scale = (((endX - minX) * responsiveScale) / (maxX - minX))  ;
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
    x: window.innerWidth / 2 - endX,
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

  let scale = .5
  // let scale = ( (centerX/endX)/2 )

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