import "pixi.js";
import "gsap";
import Draggable from '../node_modules/gsap/Draggable.js';
import './libs/PixiPlugin.js';
import ThrowPropsPlugin from './libs/ThrowPropsPlugin.js';
import { colorPallete } from './handleRequestChange/newRequest.js';
import { randomColorRequest } from './handleRequestChange/newRequest.js';
import ColorPropsPlugin from '../node_modules/gsap/ColorPropsPlugin.js';
import getRandomVal from './getRandomVal.js';
import { allSets, bgCover } from './generateAnimDomElements.js'

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
let tick = 0;

window.addEventListener('resize', function(e) {
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

  setDomScale()
})




function setDomScale() {

  let searchWord = document.querySelector('.searchWord');
  TweenMax.set(searchWord, {
    scale:() => { return 1 * responsiveScale;},
  })

  let logo = document.querySelector('.logo');
  let logoWalkVal = .8;
  let logoCalcWalk = (1 - calcWinScale) * logoWalkVal;
  let logoResponsiveScale = calcWinScale + logoCalcWalk;
  TweenMax.set(logo, {
    scale:() => { return 1 * logoResponsiveScale},
  })

  // let infoIconWrapper = document.querySelectorAll('.infoIconWrapper');
  // TweenMax.set(infoIconWrapper, {
  //   scale:() => { return 1 * responsiveScale;},
  // })




  // let relatedMenu = document.querySelectorAll('.relatedMenu');
  // TweenMax.set(relatedMenu, {
  //   scale:() => { return 1 * responsiveScale;},
  // })

}

setDomScale()




class Animate {

  static setValues(animL, animR) {
    TweenMax.set(animL, {
      pixi: {
        anchor: 0.5,
        scaleX: 0,
        scaleY: 0,
        x: winWidth/2 + animL.width/2,
        y: winHeight/2,
      },
      colorProps: {
        tint: 0xFFFFFF,
        // tint: 0x000000,
      },
    });
    TweenMax.set(animR, {
      pixi: {
        anchor: 0.5,
        scaleX: 0,
        scaleY: 0,
        x: winWidth/2 - animR.width/2,
        y: winHeight/2,
      },
      colorProps: {
        tint: 0xFFFFFF,
        // tint: 0x000000,
      },
    });
  }

  static randomLocaiton(elements, options, resolve) {

    elements.forEach((element, i) => {
      let animL = element[0]
      let animR = element[1]

      let radiusX = randomInt(0, -Xradius);
      let radiusY = randomInt(0, Yradius);
      let angle = randomInt(0, 3.14);

      let startX = centerX + Math.sin(angle) * radiusX;
      let startY = centerY + Math.cos(angle) * radiusY;

      options = options || {};
      let duration = options.duration || 0.2;

      let tl = new TimelineLite( {onComplete:resolve} );

      tl.add(
        TweenLite.to(animL, duration, { pixi: {
            x: startX,
            y: startY,
          },
          ease: Power1.easeInOut,
        }),
        TweenLite.to(animR, duration, { pixi: {
            x: winWidth - startX,
            y: startY,
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
      // tint: 0xffffff, format:"number"
    }});
  }

  static shuffle() {
    let searchWord = document.querySelector('.searchWord')
    let appendixWord = document.querySelector('.appendixWord')
    let subHeadAppendix = document.querySelector('.subHeadAppendix')
    let instructions = document.querySelector('.instructions')
    randomColorRequest();
    Animate.randomLocaiton(allSets, {duration:1, stagger:0});
    setTimeout(function(){
      Animate.randomBGColor(bgCover);
      Animate.changeElementColor(allSets, {duration:1, stagger:0});
      Animate.letterColors(instructions);
      Animate.letterColors(searchWord);
      Animate.letterColors(appendixWord);
      Animate.letterColors(subHeadAppendix);
      Animate.relatedWordColors();
      Animate.appendixColors();
      Animate.svgFillRandom()
    }, 10 );
  }

  static svgFillRandom() {
    let logoSVG = document.querySelectorAll('.logoSVG');
    TweenMax.to(logoSVG, .5, {
      fill: () => colorPallete[Math.floor(getRandomVal(1, colorPallete.length))] ,
      ease:Sine.easeInOut,
    })

    let searchSVG = document.querySelectorAll('.searchSVG');
    TweenMax.to(searchSVG, .5, {
      fill: () => colorPallete[Math.floor(getRandomVal(1, colorPallete.length))] ,
      ease:Sine.easeInOut,
    })

    let infoSVG = document.querySelectorAll('.infoSVG');
    TweenMax.to(infoSVG, .5, {
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

  static letterColorsBW(elements) {

    if(elements.length > 0) {
      elements.forEach(element => {
        let elementSpans = Array.from(element.querySelectorAll('span'));
        TweenMax.to(elementSpans, .5, {
          color: 0xffffff,
          // color: 0x000000,
          ease:Sine.easeInOut,
        })
      })
    } else {
      let elementSpans = Array.from(elements.querySelectorAll('span'));
      TweenMax.to(elementSpans, .5, {
        color: 0xffffff,
        // color: 0x000000,
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
    let appendix = document.querySelector('.appendix');
    let appendixBG = appendix.querySelector('.appendix');
    let bigRule = document.querySelector('.bigRule');
    let tags = appendix.querySelectorAll('li');
    let usernames = appendix.querySelectorAll('.userName');

    TweenMax.to(bigRule, .5, {
      backgroundColor: colorPallete[Math.floor(getRandomVal(2, colorPallete.length))],
      ease: Sine.easeInOut,
    })

    TweenMax.to(appendix, .5, {
      // backgroundColor: 0x000000,
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
      let color = colorPallete[Math.floor(getRandomVal(2, colorPallete.length))];
      Animate.changeCanvasColor(animLcanvas, color);
    })

  }

  static resetBW() {
    let appendix = document.querySelector('.appendix');
    let instructions = document.querySelector('.instructions');
    let appendixBG = appendix.querySelector('.appendix');
    let subHeadAppendix = appendix.querySelector('.subHeadAppendix')
    let bigRule = appendix.querySelector('.bigRule');

    TweenMax.set(bigRule, {
      backgroundColor: 0xFFFFFF,
      // backgroundColor: 0x000000,
    })

    TweenMax.set(appendix, {
      backgroundColor: 0x000000,
      // backgroundColor: 0xFFFFFF,
    })

    let logoSVG = document.querySelectorAll('.logoSVG');
    TweenMax.to(logoSVG, .5, {
      fill:  0xFFFFFF,
      // fill:  0x000000,
      ease:Sine.easeInOut,
    })

    let searchSVG = document.querySelectorAll('.searchSVG');
    TweenMax.to(searchSVG, .5, {
      fill:  0xFFFFFF,
      // fill:  0x000000,
      ease:Sine.easeInOut,
    })

    let infoSVG = document.querySelectorAll('.infoSVG');
    TweenMax.to(infoSVG, .5, {
      fill:  0xFFFFFF,
      // fill:  0x000000,
      ease:Sine.easeInOut,
    })

    Animate.letterColorsBW(subHeadAppendix)
    Animate.letterColorsBW(instructions)

  }

  static changeCanvasColor(element, color) {

    let animLcanvas = element
    let rgb = Animate.hexToRgb(color)

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
    // console.log(element);
    let animLcanvas = element
    // let rgb = Animate.hexToRgb(color)

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

  static hexToRgb(hex){
    let c;
    let rgb = {}
    c = hex.substring(1).split('');
    if(c.length === 3){
      c= [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    rgb.r = (c>>16)&255;
    rgb.g = (c>>8)&255;
    rgb.b = c&255;
    return rgb
  }

  static update() {
    tick++
    let newx = Math.floor(testDivcords.x);
    let newy = Math.floor(testDivcords.y);
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
    // let scale = distancePercent * 1.25;

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
let testDiv = document.querySelector('.testDiv');

Draggable.create(testDiv, {
  throwProps: true,
  dragResistance: 0.25,
  edgeResistance: 1,
  throwResistance: 1000,
  onThrowComplete: Animate.update,
  onThrowUpdate: Animate.update,
  onDrag: Animate.update,
  onDragStart: ()=> mouseIsDown = true,
  onDragEnd: ()=> mouseIsDown = false,
  trigger: dragWrap,
  onClick: ()=> { Animate.shuffle() }
});

let testDivcords = Draggable.get(testDiv);

///////////// idle animation ////////////

let mouseDistanceX = 0;
let mouseDistanceY = 0;

window.addEventListener('mousemove', function(e) {
  mouseDistanceX = ((e.clientX - winWidth/2) / winWidth*2)*2;
  mouseDistanceY = ((e.clientY - winHeight/2) / winHeight*2*2);
})

let mouseIsDown = false

TweenLite.ticker.addEventListener("tick", mouseAnim);

function mouseAnim() {
  // alert(winScale)
  if(mouseIsDown) return
  if(!allSets) return
  allSets.forEach((animSet, i)=>{
    if (winScale <= 300000) {Animate.updateElement(animSet, i, 0, 0); return}
    Animate.updateElement(animSet, i, mouseDistanceY, mouseDistanceX);
  })

}

///////////// random int ////////////

function randomInt(min, max) {
  return Math.random() * (max - min) + min;
}