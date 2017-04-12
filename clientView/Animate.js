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

let width = window.innerWidth;
let height = window.innerHeight;
let centerX = width * .5;
let centerY = height * .5;
let maxRadius = -.5;
let maxDistance = height * maxRadius;
let tick = 0;

window.addEventListener('resize', function(e) {
  width = window.innerWidth;
  height = window.innerHeight;
  centerX = width * .5;
  centerY = height * .5;
  maxDistance = height * maxRadius;
})

class Animate {

  static setValues(animL, animR) {
    TweenMax.set(animL, {
      pixi: {
        anchor: 0.5,
        scaleX: 0,
        scaleY: 0,
        x: window.innerWidth/2 + animL.width/2,
        y: window.innerHeight/2,
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
        x: window.innerWidth/2 - animR.width/2,
        y: window.innerHeight/2,
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

      // let staticRadius = height * maxRadius;
      let radius = height * randomInt(0, maxRadius);
      let angle = randomInt(0,3.14);

      // let startX = centerX + Math.sin(angle) * staticRadius;
      // let startY = centerY + Math.cos(angle) * staticRadius;
      let startX = centerX + Math.sin(angle) * radius;
      let startY = centerY + Math.cos(angle) * radius;

      let xDistance = startX - centerX;
      let yDistance = startY - centerY;
      let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
      let distancePercent = 1 - distance / Math.abs(maxDistance);

      let scale = distancePercent;

      options = options || {};
      let duration = options.duration || 0.2;
      let stagger = (options.stagger == null) ? 0.3 : options.stagger || 0;

      let tl = new TimelineLite( {onComplete:resolve} );

      tl.add(
        TweenLite.to(animL, duration, { pixi: {
            x: startX,
            y: startY,
            scale: scale,
          },
          ease: Power1.easeInOut,
        }, stagger * i),
        TweenLite.to(animR, duration, { pixi: {
            x: window.innerWidth - startX,
            y: startY,
            scaleX: scale * -1,
            scaleY: scale,
          },
          ease: Power1.easeInOut,
        }, 0)
      )

      return tl;
    })
  }

  static changeElementColor(elements, options) {

    options = options || {};
    let duration = options.duration || 0.2;
    let stagger = (options.stagger == null) ? 0.3 : options.stagger || 0;
    let tl = new TimelineLite( {} );

    elements.forEach((element, i) => {
      let animL = element[0]
      let animR = element[1]
      let tint = colorPallete[Math.floor(getRandomVal(1, colorPallete.length))];
      tl.add(
        TweenMax.to(animL, duration, {colorProps: {
            tint: tint, format:"number",
          },
        }, stagger * i),

        TweenMax.to(animR, duration, {colorProps: {
            tint: tint, format:"number",
          }
        }, 0)
      )
    })
    return tl;
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
          x: window.innerWidth/2 + animL.width,
          y: window.innerHeight/2,
        },
          ease: Power1.easeInOut,
        }, stagger * i),
        TweenLite.to(animR, duration, { pixi: {
          x: window.innerWidth/2 - animR.width,
          y: window.innerHeight/2,
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

    let scale = distancePercent;

    TweenMax.set(animL, { pixi: {
      y: animL.y + diffy,
      x: animL.x + diffx,
      scaleX:scale,
      scaleY:scale,
    }});

    TweenMax.set(animR, { pixi: {
      y: animL.y,
      x: window.innerWidth - (animL.x),
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

    let staticRadius = height * maxRadius;
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
    randomColorRequest();
    Animate.randomLocaiton(allSets, {duration:1, stagger:0});
    setTimeout(function(){
      Animate.randomBGColor(bgCover);
      Animate.changeElementColor(allSets, {duration:1, stagger:0});
      Animate.letterColors(searchWord);
      Animate.letterColors(appendixWord);
      Animate.letterColors(subHeadAppendix);
      Animate.relatedWordColors();
      Animate.appendixColors();
    }, 10 );
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
    let appendix = document.querySelector('.appendix');
    let appendixBG = appendix.querySelector('.appendix');
    let tags = appendix.querySelectorAll('li');
    let usernames = appendix.querySelectorAll('.userName');

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

  static changeCanvasColor(element, color) {

    let animLcanvas = element
    let rgb = Animate.hexToRgb(color)

    let width = animLcanvas.width;
    let height = animLcanvas.height;

    let ctx = animLcanvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);

    for (let i = 0; i < height; i++) {
      let inpos = i * (width) * 4;
      let outpos = i * (width) * 4;
      for (let x = 0; x < width; x++) {
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
  mouseDistanceX = ((e.clientX - window.innerWidth/2) / window.innerWidth*2)*2;
  mouseDistanceY = ((e.clientY - window.innerHeight/2) / window.innerHeight*2*2);
})

let mouseIsDown = false

TweenLite.ticker.addEventListener("tick", mouseAnim);

function mouseAnim() {
  if(mouseIsDown) return
  allSets.forEach((animSet, i)=>{
    Animate.checkPos(animSet);
    Animate.updatePos(animSet, i, mouseDistanceY, mouseDistanceX);
  })

}

///////////// random int ////////////

function randomInt(min, max) {
  return Math.random() * (max - min) + min;
}