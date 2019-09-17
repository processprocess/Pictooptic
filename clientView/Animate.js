import 'gsap';
import Draggable from '../node_modules/gsap/Draggable.js';
import ThrowPropsPlugin from './libs/ThrowPropsPlugin.js';
import ColorPropsPlugin from '../node_modules/gsap/ColorPropsPlugin.js';
import 'pixi.js';
import './libs/PixiPlugin.min.js';
import newRequest, {
  randomColorRequest,
  colorPallete,
  rgbPallete
} from './request.js';
import { allSets, bgCover, controlCycle } from './generateAnimDomElements.js';
import getRandomVal from './getRandomVal.js';

let svgElements = document.querySelectorAll('svg');
let searchWord = document.querySelector('.searchWord');
let smallType = document.querySelectorAll('.smallType');
let logo = document.querySelector('.logo');
let appendix = document.querySelector('.appendix');
let bigRule = document.querySelector('.bigRule');
let smallRule = document.querySelector('.smallRule');
let topGradient = document.querySelector('.topGradient');
let centerItems = document.querySelectorAll('.centerItem');
let searchOverlay = document.querySelector('.searchOverlay');
let iconHolderWrapper = document.querySelector('.iconHolderWrapper');
let infoIconWrapper = document.querySelector('.infoIconWrapper');
let closeIconWrapper = document.querySelector('.closeIconWrapper');

let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

let centerX = winWidth / 2;
let centerY = winHeight / 2;

let Xradius = centerX;
let Yradius = centerY * 0.85;
let winScale = winWidth * winHeight;
let baseWinScale = 1920 * 1080;
let calcWinScale = winScale / baseWinScale;
let walkVal = 0.5;
let calcWalk = (1 - calcWinScale) * walkVal;
let responsiveScale = calcWinScale + calcWalk;
let logoWalkVal = 0.8;
let logoCalcWalk = (1 - calcWinScale) * logoWalkVal;
let logoResponsiveScale = calcWinScale + logoCalcWalk;

let mouseIsDown = false;
let tick = 0;

function setDomScale() {
  // winWidth = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
  // winHeight = window.innerHeight > window.innerWidth ?  window.innerWidth : window.innerHeight;
  winWidth = window.innerWidth;
  winHeight = window.innerHeight;

  centerX = winWidth / 2;
  centerY = winHeight / 2;
  Xradius = centerX;
  Yradius = centerY * 0.85;
  winScale = winWidth * winHeight;
  calcWinScale = winScale / baseWinScale;
  calcWalk = (1 - calcWinScale) * walkVal;
  responsiveScale = calcWinScale + calcWalk;
  logoCalcWalk = (1 - calcWinScale) * logoWalkVal;
  logoResponsiveScale = calcWinScale + logoCalcWalk;
  TweenMax.set(logo, {
    scale: () => {
      return 1 * logoResponsiveScale;
    }
  });
}

window.addEventListener('resize', setDomScale);
setDomScale();

class Animate {
  static setValues(animL, animR) {
    TweenMax.set(animL, {
      pixi: {
        anchor: 0.5,
        scale: 0,
        x: winWidth / 2 + animL.width / 2,
        y: winHeight / 2
      }
    });
    TweenMax.set(animR, {
      pixi: {
        anchor: 0.5,
        scale: 0,
        x: winWidth / 2 - animR.width / 2,
        y: winHeight / 2
      }
    });
  }

  static randomLocaiton(elements, options, resolve) {
    elements.forEach((element, i) => {
      let animL = element[0];
      let animR = element[1];
      let radiusX = getRandomVal(0, -Xradius);
      let radiusY = getRandomVal(0, Yradius);
      let angle = getRandomVal(0, 3.14);
      let randomX = centerX + Math.sin(angle) * radiusX;
      let randomY = centerY + Math.cos(angle) * radiusY;
      options = options || {};
      let duration = options.duration || 0.2;
      let tl = new TimelineLite({ onComplete: resolve });
      tl.add(
        TweenLite.to(animL, duration, {
          pixi: {
            x: randomX,
            y: randomY
          },
          ease: Power1.easeInOut
        }),
        TweenLite.to(animR, duration, {
          pixi: {
            x: winWidth - randomX,
            y: randomY
          },
          ease: Power1.easeInOut
        })
      );
      return tl;
    });
  }

  static animateOut(elements, options, resolve) {
    if (elements.length === 0) resolve();
    options = options || {};
    let duration = options.duration || 0.2;
    let stagger = options.stagger == null ? 0.3 : options.stagger || 0;
    let tl = new TimelineLite({
      onComplete: () => {
        resolve();
      }
    });
    elements.forEach((element, i) => {
      let animL = element[0];
      let animR = element[1];
      let randAngle = getRandomVal(0, 3.14);
      let randStartX = centerX - Math.sin(randAngle) * Xradius;
      let randStartY = centerY - Math.cos(randAngle) * Yradius;
      tl.add(
        TweenLite.to(
          animL,
          duration,
          {
            pixi: {
              x: randStartX,
              y: randStartY,
              scale: 0
            },
            ease: Power1.easeInOut
          },
          stagger * i
        ),
        TweenLite.to(animR, duration, {
          pixi: {
            x: randStartX - winWidth,
            y: randStartY,
            scale: 0
          },
          ease: Power1.easeInOut
        })
      );
    });
    return tl;
  }

  static shuffle() {
    appendix.classList.add('notVisible');
    closeIconWrapper.classList.add('notVisible');
    infoIconWrapper.classList.remove('notVisible');
    iconHolderWrapper.scrollTop = 0;

    let tags = appendix.querySelectorAll('li');
    let usernames = appendix.querySelectorAll('.userName');
    // let elementNodes = relatedMenu.querySelectorAll('li');

    new Promise(function(resolve, reject) {
      randomColorRequest(resolve);
    }).then(resolved => {
      Animate.randomLocaiton(allSets, { duration: 1, stagger: 0 });
      Animate.randomPixiBGColor(bgCover);
      Animate.letterColors([searchWord, smallType, centerItems]);
      Animate.randomColorDom([tags, usernames]);
      // Animate.randomColorDom([tags, usernames, elementNodes]);
      Animate.svgFillRandomAll();
      Animate.randomBackgroundDom([bigRule, smallRule]);
      Animate.gradientColorChange([topGradient]);
      Animate.colorBackgroundDom([appendix]);
      Animate.rgbaBackgroundDom(searchOverlay);
      Animate.setLightestColor();
      allSets.forEach(elementSet => {
        let animL = elementSet[0];
        let animR = elementSet[1];
        let animCanvas = elementSet[2];
        let randomVal = Math.floor(getRandomVal(1, colorPallete.length));
        let rgbColor = rgbPallete[randomVal];
        let hexColor = colorPallete[randomVal];
        Animate.changeCanvasColor(animCanvas, rgbColor);
        Animate.randomPixiElColor(animL, animR, hexColor);
      });
    });
  }

  static setLightestColor() {
    let searchOverlayText = searchOverlay.querySelectorAll(
      '.searchOverlay div'
    );
    let searchOverlayinput = document.querySelectorAll(
      '.searchOverlay input'
    );
    let color = colorPallete[4];
    TweenMax.set([searchOverlayText, searchOverlayinput], {
      color: color
    });
  }

  static rgbaBackgroundDom(element) {
    let color = rgbPallete[0];
    let r = color.r;
    let g = color.g;
    let b = color.b;
    element.style.background = `rgba(${r}, ${g}, ${b}, .8)`;
  }

  static gradientColorChange(elements) {
    let color = rgbPallete[0];
    let r = color.r;
    let g = color.g;
    let b = color.b;
    elements.forEach(element => {
      element.style.background = `linear-gradient(to bottom, rgba(${r}, ${g}, ${b}, 1), rgba(${r}, ${g}, ${b}, 0))`;
    });
  }

  static randomPixiBGColor(pixiEl) {
    TweenMax.to(pixiEl, 0.5, {
      colorProps: {
        tint: colorPallete[0],
        format: 'number'
      }
    });
  }

  static blackBGColor(pixiEl) {
    TweenMax.to(pixiEl, 1, {
      colorProps: {
        tint: 0x000000,
        format: 'number'
      }
    });
  }

  static randomPixiElColor(animL, animR, hexColor) {
    TweenMax.to(animL, 1, {
      colorProps: {
        tint: hexColor,
        format: 'number'
      }
    }),
      TweenMax.to(animR, 1, {
        colorProps: {
          tint: hexColor,
          format: 'number'
        }
      });
  }

  static colorBackgroundDom(elements) {
    TweenMax.to(elements, 0.5, {
      backgroundColor: colorPallete[0]
      // ease: Sine.easeInOut,
    });
  }

  static randomBackgroundDom(elements) {
    TweenMax.to(elements, 0.5, {
      backgroundColor: () =>
        colorPallete[Math.floor(getRandomVal(2, colorPallete.length))],
      ease: Sine.easeInOut
    });
  }

  static randomColorDom(elements) {
    TweenMax.to(elements, 0.5, {
      color: () =>
        colorPallete[Math.floor(getRandomVal(2, colorPallete.length))],
      ease: Sine.easeInOut
    });
  }

  static svgFillRandomAll() {
    TweenMax.to(svgElements, 0.5, {
      fill: () =>
        colorPallete[Math.floor(getRandomVal(1, colorPallete.length))],
      ease: Sine.easeInOut
    });
  }

  static letterColors(elements) {
    if (elements.length > 0) {
      elements.forEach(element => {
        if (element.length > 0) {
          element.forEach(singleElement => {
            let elementSpans = singleElement.querySelectorAll('span');
            TweenMax.to(elementSpans, 0.5, {
              color: () =>
                colorPallete[
                  Math.floor(getRandomVal(2, colorPallete.length))
                ],
              ease: Sine.easeInOut
            });
          });
        } else {
          let elementSpans = element.querySelectorAll('span');
          TweenMax.to(elementSpans, 0.5, {
            color: () =>
              colorPallete[Math.floor(getRandomVal(2, colorPallete.length))],
            ease: Sine.easeInOut
          });
        }
      });
    } else {
      let elementSpans = elements.querySelectorAll('span');
      TweenMax.to(elementSpans, 0.5, {
        color: () =>
          colorPallete[Math.floor(getRandomVal(2, colorPallete.length))],
        ease: Sine.easeInOut
      });
    }
  }

  static resetBW() {
    let searchOverlayText = searchOverlay.querySelectorAll(
      '.searchOverlay div'
    );
    let searchOverlayinput = document.querySelectorAll(
      '.searchOverlay input'
    );

    Animate.svgFillWhiteAll();
    Animate.backgroundsWhite([smallRule, bigRule]);
    Animate.backgroundsBlack([appendix]);
    // Animate.backgroundsBlack([appendix, centerItems]);
    Animate.backgroundsBlackOpacity(searchOverlay);
    Animate.letterColorsBW([smallType, centerItems]);
    Animate.setWhiteColor([searchOverlayText, searchOverlayinput]);
    Animate.gradientColorChangeBW([topGradient]);
    // Animate.gradientColorChangeBW([topGradient, bottomGradient]);
  }

  static setWhiteColor(element) {
    TweenMax.set(element, {
      color: 0xffffff
    });
  }

  static gradientColorChangeBW(elements) {
    elements.forEach(element => {
      element.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))`;
    });
  }

  static svgFillWhiteAll() {
    TweenMax.to(svgElements, 0.5, {
      fill: 0xffffff,
      ease: Sine.easeInOut
    });
  }

  static backgroundsWhite(elements) {
    TweenMax.set(elements, {
      backgroundColor: 0xffffff
    });
  }

  static backgroundsBlack(elements) {
    TweenMax.set(elements, {
      backgroundColor: 0x000000
    });
  }

  static backgroundsBlackOpacity(elements) {
    TweenMax.set(elements, {
      backgroundColor: 'rgba(0, 0, 0, .8)'
    });
  }

  static letterColorsBW(elements) {
    if (elements.length > 0) {
      elements.forEach(element => {
        if (element.length > 0) {
          element.forEach(singleElement => {
            let elementSpans = singleElement.querySelectorAll('span');
            TweenMax.to(elementSpans, 0.5, {
              color: 0xffffff,
              ease: Sine.easeInOut
            });
          });
        } else {
          let elementSpans = element.querySelectorAll('span');
          TweenMax.to(elementSpans, 0.5, {
            color: 0xffffff,
            ease: Sine.easeInOut
          });
        }
      });
    } else {
      let elementSpans = elements.querySelectorAll('span');
      TweenMax.to(elementSpans, 0.5, {
        color: 0xffffff,
        ease: Sine.easeInOut
      });
    }
  }

  static changeCanvasColor(canvasElement, rgb) {
    let canWidth = canvasElement.width;
    let canHeight = canvasElement.height;
    let ctx = canvasElement.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canWidth, canHeight);
    for (let i = 0; i < canHeight; i++) {
      let inpos = i * canWidth * 4;
      let outpos = i * canWidth * 4;
      for (let x = 0; x < canWidth; x++) {
        let r = (imageData.data[inpos++] = rgb.r);
        let g = (imageData.data[inpos++] = rgb.g);
        let b = (imageData.data[inpos++] = rgb.b);
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
    tick++;
    let newx = Math.floor(dragTrackercords.x);
    let newy = Math.floor(dragTrackercords.y);
    let diffx = newx - oldx;
    let diffy = newy - oldy;
    oldx = newx;
    oldy = newy;
    allSets.forEach((animSet, i) => {
      Animate.updateElement(animSet, i, diffy, diffx);
    });
  }

  static updateElement(animSet, i, diffy, diffx) {
    if (i % 2 === 0) {
      diffy = diffy / 2;
      diffx = diffx / 2;
    } else if (i % 3 === 0) {
      diffy = diffy / 3;
      diffx = diffx / 3;
    }

    let animL = animSet[0];
    let animR = animSet[1];

    let dx = animL.x - centerX;
    let dy = animL.y - centerY;

    let distance = Math.sqrt(dx * dx + dy * dy);

    let angle = Math.atan2(dy, dx);
    // let angleScaled = Math.atan2(dy, dx);;
    let angleScaled = Math.atan2(dy * (Xradius / Yradius), dx);

    let maxXCos = centerX + Math.cos(angleScaled) * Xradius;
    let maxYSin = centerY + Math.sin(angleScaled) * Yradius;

    var dxMax = maxXCos - centerX;
    var dyMax = maxYSin - centerY;
    let maxDistance = Math.sqrt(dxMax * dxMax + dyMax * dyMax);

    let distancePercent = 1 - distance / maxDistance;
    let scale = distancePercent * (responsiveScale * 1.17);

    TweenMax.set(animL, {
      pixi: {
        y: animL.y + diffy,
        x: animL.x + diffx,
        scaleX: scale,
        scaleY: scale
      }
    });

    TweenMax.set(animR, {
      pixi: {
        y: animL.y,
        x: winWidth - animL.x,
        scaleX: scale * -1,
        scaleY: scale
      }
    });

    //////// check bounds ////////

    if (animL.x > centerX + 100) {
      let randAngle = getRandomVal(0, 3.14);
      let randStartX = centerX - Math.sin(randAngle) * Xradius;
      let randStartY = centerY - Math.cos(randAngle) * Yradius;
      TweenLite.set(animL, {
        pixi: {
          x: randStartX,
          y: randStartY,
          scale: 0
        }
      });
    }

    if (distance > maxDistance) {
      let randomY = centerY + getRandomVal(-Yradius, Yradius);
      TweenLite.set(animL, {
        pixi: {
          x: centerX + 100,
          y: randomY,
          scale: 0
        }
      });
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
  dragResistance: 0.35,
  throwResistance: 7500,
  onThrowComplete: Animate.update,
  onThrowUpdate: Animate.update,
  onDrag: Animate.update,
  onDragStart: () => (mouseIsDown = true),
  onDragEnd: () => (mouseIsDown = false),
  trigger: dragWrap,
  onClick: () => {
    Animate.shuffle();
  }
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

TweenLite.ticker.addEventListener('tick', mouseAnim);

function mouseAnim() {
  if (controlCycle) return;
  if (mouseIsDown) return;
  if (!allSets) return;
  allSets.forEach((animSet, i) => {
    if (winScale <= 300000) {
      Animate.updateElement(animSet, i, 0, 0);
      return;
    }
    Animate.updateElement(animSet, i, mouseDistanceY, mouseDistanceX);
  });
}
