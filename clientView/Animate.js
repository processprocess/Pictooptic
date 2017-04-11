import "pixi.js";
import "gsap";
import Draggable from '../node_modules/gsap/Draggable.js';
import './libs/PixiPlugin.js';
import ThrowPropsPlugin from './libs/ThrowPropsPlugin.js';
import { colorPallete } from './handleRequestChange/newRequest.js';
import { randomColorRequest } from './handleRequestChange/newRequest.js';
import ColorPropsPlugin from '../node_modules/gsap/ColorPropsPlugin.js';
import getRandomVal from './getRandomVal.js';
import { allSets } from './generateAnimDomElements.js'

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

    let xMin = window.innerWidth/4;
    let xMax = window.innerWidth/2 + 50;

    let yMin = window.innerHeight/5.5 + 50;
    let yMax = window.innerHeight/1.50 + 50;

    options = options || {};
    let duration = options.duration || 0.2;
    let stagger = (options.stagger == null) ? 0.3 : options.stagger || 0;
    let tl = new TimelineLite( {onComplete:resolve} );

    elements.forEach((element, i) => {
      let animL = element[0]
      let animR = element[1]

      let endX = randomInt(xMin, xMax);
      let endY = randomInt(yMin, yMax);
      let scale = ((endX - xMin)) / (xMax - xMin)

      tl.add(
        TweenLite.to(animL, duration, { pixi: {
            x: endX,
            y: endY,
            scale: scale,
          },
          ease: Power1.easeInOut,
        }, stagger * i),
        TweenLite.to(animR, duration, { pixi: {
            x: window.innerWidth - endX,
            y: endY,
            scaleX: scale * -1,
            scaleY: scale,
          },
          ease: Power1.easeInOut,
        }, 0)
      )

    })
    return tl;
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

    let xMin = window.innerWidth/4;
    let xMax = window.innerWidth/2 + 50;

    let yMin = window.innerHeight/5.5 + 50;
    let yMax = window.innerHeight/1.50 + 50;

    if(i%2 === 0) {diffy = diffy/2; diffx = diffx/2}
    else if(i%3 === 0) {diffy = diffy/3; diffx = diffx/3}

    let animL = animSet[0];
    let animR = animSet[1];

    let scale = ((animL.x - xMin)) / (xMax - xMin);

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

    let xMin = window.innerWidth/4;
    let xMax = window.innerWidth/2 + 50;

    let yMin = window.innerHeight/5.5 + 50;
    let yMax = window.innerHeight/1.50 + 50;

    if (animL.x < xMin) { TweenLite.set(animL, { pixi: { x: xMax + 50 }})}
    if (animL.x > xMax + 50) { TweenLite.set(animL, { pixi: { x: xMin }})}
    if (animL.y < yMin - animL.height/2) { TweenLite.set(animL, { pixi: { y: yMax + animL.height/2 }})}
    if (animL.y > yMax + animL.height/2) { TweenLite.set(animL, { pixi: { y: yMin - animL.height/2 }})}
  }

}

module.exports = Animate;

///////////// draggable ////////////

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
  trigger: body,
});

let testDivcords = Draggable.get(testDiv);

let oldx = 0;
let oldy = 0;

///////////// random int ////////////

function randomInt(min, max) {
  return Math.random() * (max - min) + min;
}


///////////// idle animation ////////////

// TweenLite.ticker.addEventListener("tick", yourFunction);
//
// function yourFunction() {
//   allSets.forEach((animSet, i)=>{
//     checkPos(animSet);
//     updatePos(animSet, i, 0, .5);
//   })
// }