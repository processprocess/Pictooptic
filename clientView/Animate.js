import "pixi.js";
import "gsap";
import Draggable from '../node_modules/gsap/Draggable.js';
import './libs/PixiPlugin.js';
import ThrowPropsPlugin from './libs/ThrowPropsPlugin.js';
import { colorPallete, rgbPallete } from './handleRequestChange/newRequest.js';
import { randomColorRequest } from './handleRequestChange/newRequest.js';
import ColorPropsPlugin from '../node_modules/gsap/ColorPropsPlugin.js';
import getRandomVal from './getRandomVal.js';
import { allSets, bgCover, controlCycle } from './generateAnimDomElements.js';

let svgElements = document.querySelectorAll('svg');
let searchWord = document.querySelector('.searchWord');
let appendixWord = document.querySelector('.appendixWord');
let subHeadAppendix = document.querySelector('.subHeadAppendix');
let description = document.querySelector('.description');
let instructions = document.querySelector('.instructions');
let smallType = document.querySelector('.smallType');
let logo = document.querySelector('.logo');
let appendix = document.querySelector('.appendix');
let bigRule = document.querySelector('.bigRule');
let smallRule = document.querySelector('.smallRule');

let winWidth = window.innerWidth;
let winHeight = window.innerHeight;
let centerX = winWidth / 2;
let centerY = winHeight / 2;
let Xradius = centerX;
let Yradius = centerY * .85;
let winScale = winWidth * winHeight;
let baseWinScale = 1920 * 1080;
let calcWinScale = winScale / baseWinScale;
let walkVal = .5;
let calcWalk = (1 - calcWinScale) * walkVal;
let responsiveScale = calcWinScale + calcWalk;
let logoWalkVal = .8;
let logoCalcWalk = (1 - calcWinScale) * logoWalkVal;
let logoResponsiveScale = calcWinScale + logoCalcWalk;

let mouseIsDown = false;
let tick = 0;

function setDomScale() {
  winWidth = window.innerWidth;
  winHeight = window.innerHeight;
  centerX = winWidth / 2;
  centerY = winHeight / 2;
  Xradius = centerX;
  Yradius = centerY * .85;
  winScale = winWidth * winHeight;
  calcWinScale = winScale / baseWinScale;
  calcWalk = (1 - calcWinScale) * walkVal;
  responsiveScale = calcWinScale + calcWalk;
  logoCalcWalk = (1 - calcWinScale) * logoWalkVal;
  logoResponsiveScale = calcWinScale + logoCalcWalk;
  TweenMax.set(searchWord, {
    scale:() => { return 1 * responsiveScale;},
  })
  TweenMax.set(logo, {
    scale:() => { return 1 * logoResponsiveScale},
  })
}

window.addEventListener('resize', setDomScale )
setDomScale()

class Animate {

  static setValues(animL, animR) {
    TweenMax.set(animL, { pixi: {
      anchor: 0.5,
      scale: 0,
      x: winWidth/2 + animL.width/2,
      y: winHeight/2,
    }});
    TweenMax.set(animR, { pixi: {
      anchor: 0.5,
      scale: 0,
      x: winWidth/2 - animR.width/2,
      y: winHeight/2,
    }});
  }

  static randomLocaiton(elements, options, resolve) {

    elements.forEach((element, i) => {
      let animL = element[0]
      let animR = element[1]
      let radiusX = randomInt(0, -Xradius);
      let radiusY = randomInt(0, Yradius);
      let angle = randomInt(0, 3.14);
      let randomX = centerX + Math.sin(angle) * radiusX;
      let randomY = centerY + Math.cos(angle) * radiusY;
      options = options || {};
      let duration = options.duration || 0.2;
      let tl = new TimelineLite( {onComplete:resolve} );
      tl.add(
        // TweenLite.to([animL, animR], duration, { pixi: {
        //     x: (element) => { return element === animR ? winWidth - randomX : randomX },
        //     y: randomY,
        //   },
        //   ease: Power1.easeInOut,
        // }),
        TweenLite.to(animL, duration, { pixi: {
            x: randomX,
            y: randomY,
          },
          ease: Power1.easeInOut,
        }),
        TweenLite.to(animR, duration, { pixi: {
            x: winWidth - randomX,
            y: randomY,
          },
          ease: Power1.easeInOut,
        })
      )
      return tl;
    })
  }

  static changeElementColor(elements, options) {

    options = options || {};
    let duration = options.duration || 0.2;
    let tl = new TimelineLite( {} );

    elements.forEach((element, i) => {
      let animL = element[0]
      let animR = element[1]
      let tint = colorPallete[Math.floor(getRandomVal(1, colorPallete.length))];
      tl.add(
        TweenMax.to(animL, duration, {colorProps: {
            tint: tint, format:"number",
          },
        }),
        TweenMax.to(animR, duration, {colorProps: {
            tint: tint, format:"number",
          }
        })
      )
    })
    return tl;
  }

  static animateOut(elements, options, resolve) {
    if(elements.length === 0) resolve()
    options = options || {};
    let duration = options.duration || 0.2;
    let stagger = (options.stagger == null) ? 0.3 : options.stagger || 0;
    let tl = new TimelineLite( {onComplete:()=>{ resolve() }} );
    // stagger = .01
    elements.forEach((element, i) => {
      let animL = element[0];
      let animR = element[1];
      let randAngle = randomInt(0, 3.14);
      let randStartX = (centerX) - Math.sin(randAngle) * Xradius;
      let randStartY = (centerY) - Math.cos(randAngle) * Yradius;
      tl.add(
        // tl.to(animL, duration, { pixi: {
        TweenLite.to(animL, duration, { pixi: {
          x: randStartX,
          y: randStartY,
          scale: 0,
        },
          ease: Power1.easeInOut,
        }, stagger * i),
        TweenLite.to(animR, duration, { pixi: {
          x: randStartX - winWidth,
          y: randStartY,
          scale: 0,
        },
          ease: Power1.easeInOut,
        })
      )
    })
    return tl;
  }

  static randomBGColor(bgCover) {
    TweenMax.to(bgCover, 0.5, {colorProps: {
      tint: colorPallete[0], format:"number"
    }});
  }

  static whiteBGColor(bgCover) {
    TweenMax.to(bgCover, 0.5, {colorProps: {
      tint: 0x000000, format:"number"
    }});
  }

  static shuffle() {
    new Promise(function(resolve, reject) {
      randomColorRequest(resolve);
    })
    .then((data) => {
      Animate.randomLocaiton(allSets, {duration:1, stagger:0});
      Animate.randomBGColor(bgCover);
      Animate.changeElementColor(allSets, {duration:1, stagger:0});
      Animate.letterColors([instructions, searchWord, appendixWord, subHeadAppendix, description, smallType]);
      Animate.relatedWordColors();
      Animate.appendixColors();
      Animate.svgFillRandomAll();
    })
  }

  static svgFillRandomAll() {
    TweenMax.to(svgElements, .5, {
      fill: () => colorPallete[Math.floor(getRandomVal(1, colorPallete.length))] ,
      ease:Sine.easeInOut,
    })
  }

  static letterColors(elements) {
    if(elements.length > 0) {
      elements.forEach(element => {
        let elementSpans = Array.from(element.querySelectorAll('span'));
        TweenMax.to(elementSpans, .5, {
          color: () => colorPallete[Math.floor(getRandomVal(1, colorPallete.length))] ,
          ease:Sine.easeInOut,
        })
      })
    } else {
      let elementSpans = Array.from(elements.querySelectorAll('span'));
      TweenMax.to(elementSpans, .5, {
        color: () => colorPallete[Math.floor(getRandomVal(1, colorPallete.length))] ,
        ease:Sine.easeInOut,
      })
    }
  }

  static relatedWordColors() {
    let relatedMenu = document.querySelector('.relatedMenu')
    let elements = relatedMenu
    let elementNodes = Array.from(elements.querySelectorAll('li'));
    TweenMax.to(elementNodes, .5, {
      color: () => colorPallete[Math.floor(getRandomVal(1, colorPallete.length))],
      ease:Sine.easeInOut,
    })
  }

  static appendixColors() {
    let tags = appendix.querySelectorAll('li');
    let usernames = appendix.querySelectorAll('.userName');

    TweenMax.to(bigRule, .5, {
      backgroundColor: colorPallete[Math.floor(getRandomVal(2, colorPallete.length))],
      ease: Sine.easeInOut,
    })

    TweenMax.to(smallRule, .5, {
      backgroundColor: colorPallete[Math.floor(getRandomVal(2, colorPallete.length))],
      ease: Sine.easeInOut,
    })

    TweenMax.to(appendix, .5, {
      backgroundColor: colorPallete[0],
      ease: Sine.easeInOut,
    })

    TweenMax.to(tags, .5, {
      color: () => colorPallete[Math.floor(getRandomVal(2, colorPallete.length))],
      ease: Sine.easeInOut,
    })

    TweenMax.to(usernames, .5, {
      color: () => colorPallete[Math.floor(getRandomVal(2, colorPallete.length))],
      ease: Sine.easeInOut,
    })

    allSets.forEach(elementSet => {
      let animLcanvas = elementSet[2];
      let randomColorVal = Math.floor(getRandomVal(2, colorPallete.length))
      let color = colorPallete[randomColorVal];
      Animate.changeCanvasColor(animLcanvas, randomColorVal);
    })

  }

  static resetBW() {
    Animate.svgFillWhiteAll();
    Animate.backgroundsWhite([smallRule, bigRule]);
    Animate.backgroundsBlack(appendix);
    Animate.letterColorsBW([subHeadAppendix, instructions, description, smallType]);
  }

  static svgFillWhiteAll() {
    TweenMax.to(svgElements, .5, {
      fill: 0xFFFFFF,
      ease:Sine.easeInOut,
    })
  }

  static backgroundsWhite(elements) {
    TweenMax.set(elements, {
      backgroundColor: 0xFFFFFF,
    })
  }

  static backgroundsBlack(elements) {
    TweenMax.set(elements, {
      backgroundColor: 0x000000,
    })
  }

  static letterColorsBW(elements) {
    if(elements.length > 0) {
      elements.forEach(element => {
        let elementSpans = Array.from(element.querySelectorAll('span'));
        TweenMax.to(elementSpans, .5, {
          color: 0xffffff,
          ease: Sine.easeInOut,
        })
      })
    } else {
      let elementSpans = Array.from(elements.querySelectorAll('span'));
      TweenMax.to(elementSpans, .5, {
        color: 0xffffff,
        ease: Sine.easeInOut,
      })
    }
  }

  static changeCanvasColor(element, colorVal) {
    let animLcanvas = element
    let rgb = rgbPallete[colorVal]
    let canWidth = animLcanvas.width;
    let canHeight = animLcanvas.height;
    let ctx = animLcanvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canWidth, canHeight);
    for (let i = 0; i < canHeight; i++) {
      let inpos = i * (canWidth) * 4;
      let outpos = i * (canWidth) * 4;
      for (let x = 0; x < canWidth; x++) {
        let r = imageData.data[inpos++] = rgb.r;
        let g = imageData.data[inpos++] = rgb.g;
        let b = imageData.data[inpos++] = rgb.b;
        let a = imageData.data[inpos++];
        imageData.data[outpos++] = r;
        imageData.data[outpos++] = g;
        imageData.data[outpos++] = b;
        imageData.data[outpos++] = a;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  static changeCanvasColorWhite(element) {
    let animLcanvas = element
    let canWidth = animLcanvas.width;
    let canHeight = animLcanvas.height;
    let ctx = animLcanvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canWidth, canHeight);
    for (let i = 0; i < canHeight; i++) {
      let inpos = i * (canWidth) * 4;
      let outpos = i * (canWidth) * 4;
      for (let x = 0; x < canWidth; x++) {
        let r = imageData.data[inpos++] = 250;
        let g = imageData.data[inpos++] = 250;
        let b = imageData.data[inpos++] = 250;
        let a = imageData.data[inpos++];
        imageData.data[outpos++] = r;
        imageData.data[outpos++] = g;
        imageData.data[outpos++] = b;
        imageData.data[outpos++] = a;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  static update() {
    tick++
    let newx = Math.floor(dragTrackercords.x);
    let newy = Math.floor(dragTrackercords.y);
    let diffx = newx - oldx;
    let diffy = newy - oldy;
    oldx = newx;
    oldy = newy;
    allSets.forEach((animSet, i)=>{
      Animate.updateElement(animSet, i, diffy, diffx);
    })
  }

  static updateElement(animSet, i, diffy, diffx) {

    if(i % 2 === 0) {diffy = diffy / 2; diffx = diffx / 2}
    else if(i % 3 === 0) {diffy = diffy / 3; diffx = diffx / 3}

    let animL = animSet[0];
    let animR = animSet[1];

    let dx = animL.x - centerX;
    let dy = animL.y - centerY;

    let distance = Math.sqrt(dx * dx + dy * dy);

    let angle = Math.atan2(dy, dx);
    let angleScaled = Math.atan2(dy * (Xradius / Yradius), dx);

    let maxXCos = centerX + Math.cos(angleScaled) * Xradius;
    let maxYSin = centerY + Math.sin(angleScaled) * Yradius;

    var dxMax = maxXCos - centerX;
    var dyMax = maxYSin - centerY;
    let maxDistance = Math.sqrt(dxMax * dxMax + dyMax * dyMax);

    let distancePercent = 1 - distance / maxDistance;
    let scale = distancePercent * responsiveScale;

    TweenMax.set(animL, { pixi: {
      y: animL.y + diffy,
      x: animL.x + diffx,
      scaleX:scale,
      scaleY:scale,
    }});

    TweenMax.set(animR, { pixi: {
      y: animL.y,
      x: winWidth - animL.x,
      scaleX:scale * -1,
      scaleY:scale,
    }});

    //////// check bounds ////////

    if (animL.x > centerX + 100) {
      let randAngle = randomInt(0, 3.14);
      let randStartX = (centerX) - Math.sin(randAngle) * Xradius;
      let randStartY = (centerY) - Math.cos(randAngle) * Yradius;
      TweenLite.set(animL, { pixi: {
        x: randStartX,
        y: randStartY,
        scale: 0
      }})
    }

    if (distance > maxDistance) {
      let randomY = centerY + randomInt(-Yradius, Yradius);
      TweenLite.set(animL, { pixi: {
        x: centerX + 100,
        y: randomY,
        scale: 0
      }})
    }

  }

}

module.exports = Animate;

///////////// draggable ////////////

let oldx = 0;
let oldy = 0;

let body = document.body;
let dragWrap = document.querySelector('.dragWrap');
let dragTracker = document.querySelector('.dragTracker');

Draggable.create(dragTracker, {
  throwProps: true,
  dragResistance: .35,
  throwResistance: 7500,
  onThrowComplete: Animate.update,
  onThrowUpdate: Animate.update,
  onDrag: Animate.update,
  onDragStart: () => mouseIsDown = true,
  onDragEnd: () => mouseIsDown = false,
  trigger: dragWrap,
  onClick: () => { Animate.shuffle() }
});

let dragTrackercords = Draggable.get(dragTracker);

///////////// idle animation ////////////

let mouseDistanceX = 0;
let mouseDistanceY = 0;
let idleAnimSpeed = 3.5;

window.addEventListener('mousemove', function(e) {
  mouseDistanceX = ((e.clientX - centerX) / winWidth) * idleAnimSpeed;
  mouseDistanceY = ((e.clientY - centerY) / winHeight) * idleAnimSpeed;
});

TweenLite.ticker.addEventListener("tick", mouseAnim);

function mouseAnim() {
  if(controlCycle) return
  if(mouseIsDown) return
  if(!allSets) return
  allSets.forEach((animSet, i) => {
    if (winScale <= 300000) {Animate.updateElement(animSet, i, 0, 0); return}
    Animate.updateElement(animSet, i, mouseDistanceY, mouseDistanceX);
  })
}

///////////// random int ////////////

function randomInt(min, max) {
  return Math.random() * (max - min) + min;
}