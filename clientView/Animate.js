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
let centerX = winWidth * .5;
let centerY = winHeight * .5;
let maxRadius = -.5;
let maxDistance = winHeight * maxRadius;
let tick = 0;

window.addEventListener('resize', function(e) {
  winWidth = window.innerWidth;
  winHeight = window.innerHeight;
  centerX = winWidth * .5;
  centerY = winHeight * .5;
  maxDistance = winHeight * maxRadius;
})

class Animate {

  static setValues(animL, animR) {
    TweenMax.set(animL, {
      pixi: {
        anchor: 0.5,
        scaleX: 0,
        scaleY: 0,
        x: winWidth/2 + animL.width/2,
        y: winWidth/2,
      },
      colorProps: {
        tint: 0x000000,
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
        tint: 0x000000,
      },
    });
  }

  static randomLocaiton(elements, options, resolve) {

    elements.forEach((element, i) => {
      let animL = element[0]
      let animR = element[1]

      let radius = winHeight * randomInt(0, maxRadius);
      let angle = randomInt(0,3.14);

      let startX = centerX + Math.sin(angle) * radius;
      let startY = centerY + Math.cos(angle) * radius;

      let xDistance = startX - centerX;
      let yDistance = startY - centerY;
      let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
      let distancePercent = 1 - distance / Math.abs(maxDistance);

      let scale = distancePercent;

      options = options || {};
      let duration = options.duration || 0.2;

      // let tl = new TimelineLite( {onComplete:resolve} );

      // tl.add(
        TweenLite.to(animL, duration, { pixi: {
            x: startX,
            y: startY,
            scale: scale,
          },
          ease: Power1.easeInOut,
        })

        TweenLite.to(animR, duration, { pixi: {
            x: winWidth - startX,
            y: startY,
            scaleX: scale * -1,
            scaleY: scale,
          },
          ease: Power1.easeInOut,
        })
      // )

      // return tl;
    })
  }

  static changeElementColor(elements, options) {

    options = options || {};
    let duration = options.duration || 0.2;
    // let stagger = (options.stagger == null) ? 0.3 : options.stagger || 0;
    // let tl = new TimelineLite( {} );

    elements.forEach((element, i) => {
      let animL = element[0]
      let animR = element[1]
      let tint = colorPallete[Math.floor(getRandomVal(1, colorPallete.length))];
      // tl.add(
        TweenMax.to(animL, duration, {colorProps: {
            tint: tint, format:"number",
          },
        })

        TweenMax.to(animR, duration, {colorProps: {
            tint: tint, format:"number",
          }
        })
      // )
    })
    // return tl;
  }

  static animateOut(elements, options, resolve) {

    if(elements.length === 0) resolve()

    options = options || {};
    let duration = options.duration || 0.2;
    let stagger = (options.stagger == null) ? 0.3 : options.stagger || 0;
    let tl = new TimelineLite( {onComplete:resolve} );

    elements.forEach((element, i) => {
      let animL = element[0]
      let animR = element[1]
      tl.add(
        TweenLite.to(animL, duration, { pixi: {
          x: winWidth/2 + animL.width,
          y: winHeight/2,
        },
          ease: Power1.easeInOut,
        }, stagger * i),
        TweenLite.to(animR, duration, { pixi: {
          x: winWidth/2 - animR.width,
          y: winHeight/2,
        },
          ease: Power1.easeInOut,
        }, 0)
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
      tint: 0xffffff, format:"number"
    }});
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
      Animate.checkPos(animSet, diffy, diffx);
      Animate.updatePos(animSet, i, diffy, diffx);
    })
  }

  static updatePos(animSet, i, diffy, diffx) {

    // console.log(Math.sin(tick))

    if(i%2 === 0) {diffy = diffy/2; diffx = diffx/2;}
    else if(i%3 === 0) {diffy = diffy/3; diffx = diffx/3;}

    let animL = animSet[0];
    let animR = animSet[1];

    let xDistance = animL.x - centerX;
    let yDistance = animL.y - centerY;

    let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    let distancePercent = 1 - distance / Math.abs(maxDistance);

    let scale = distancePercent*1.25;

    TweenMax.set(animL, { pixi: {
      y: animL.y + diffy,
      x: animL.x + diffx,
      scaleX:scale,
      scaleY:scale,
    }});

    TweenMax.set(animR, { pixi: {
      y: animL.y,
      x: winWidth - (animL.x),
      scaleX:scale * -1,
      scaleY:scale,
    }});

  }

  static checkPos(animSet, diffy, diffx) {
    let animL = animSet[0];

    let xDistance = animL.x - centerX;
    let yDistance = animL.y - centerY;

    // let currentMaxX = Math.sqrt(maxDistance * maxDistance - yDistance * yDistance)
    // let currentMaxY =  Math.sqrt(maxDistance * maxDistance - xDistance * xDistance)

    let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    // let distancePercent = 1 - distance / Math.abs(maxDistance);

    // Math.sin(tick)

    let staticRadius = winHeight * maxRadius;
    let angle = Math.abs(Math.sin(tick/25)*randomInt(0,1)) * 3.14;
    // let angle = randomInt(0,3.14);

    let startX = centerX + Math.sin(angle) * staticRadius;
    let startY = centerY + Math.cos(angle) * staticRadius;
    let randomY = centerY + randomInt(-maxDistance, maxDistance);

    if ((animL.x - 100) > centerX) { TweenLite.set(animL, { pixi: { x: startX, y: startY }})}
    if (Math.abs(distance) > Math.abs(maxDistance)) { TweenLite.set(animL, { pixi: {x: centerX + 100, y: randomY }})}

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
          color: 0x000000,
          ease:Sine.easeInOut,
        })
      })
    } else {
      let elementSpans = Array.from(elements.querySelectorAll('span'));
      TweenMax.to(elementSpans, .5, {
        color: 0x000000,
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
      backgroundColor: 0x000000,
    })

    TweenMax.set(appendix, {
      backgroundColor: 0xFFFFFF,
    })

    let logoSVG = document.querySelectorAll('.logoSVG');
    TweenMax.to(logoSVG, .5, {
      fill:  0x000000,
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
  if(mouseIsDown) return
  if(!allSets) return
  allSets.forEach((animSet, i)=>{
    Animate.checkPos(animSet);
    Animate.updatePos(animSet, i, mouseDistanceY, mouseDistanceX);
  })

}

///////////// random int ////////////

function randomInt(min, max) {
  return Math.random() * (max - min) + min;
}