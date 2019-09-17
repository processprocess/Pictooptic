import 'pixi.js';
import 'gsap';
import './libs/PixiPlugin.min.js';
import Animate from './Animate.js';
import newRequest from './request.js';
import InfoDom from './InfoDom.js';
import IntroAnim from './IntroAnim.js';
import getRandomVal from './getRandomVal.js';

export let allSets = [];
export let bgCover;
export let controlCycle = false;

let leftBox;
let rightBox;
let loader;
let stage;
let renderer;

let whiteRGB = { r: 255, g: 255, b: 255 };
let greyTones = [0xffffff, 0xeeeeee, 0xdddddd, 0xcccccc];

/////////// set up pixi ///////////

function setUp() {
  renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
    view: document.querySelector('canvas'),
    antialias: true,
    transparent: true,
    resolution: 1
  });

  loader = new PIXI.loaders.Loader();
  stage = new PIXI.Container();

  TweenLite.ticker.addEventListener('tick', () => {
    renderer.render(stage);
  });

  bgCover = new PIXI.Graphics();
  bgCover.beginFill(0xffffff, 1);
  bgCover.tint = 0x000000;
  bgCover.drawRect(0, 0, window.innerWidth, window.innerHeight);
  stage.addChild(bgCover);

  leftBox = new PIXI.Graphics();
  leftBox.beginFill(0x000000, 1);
  leftBox.drawRect(0, 0, window.innerWidth / 2, window.innerHeight);
  stage.addChild(leftBox);

  rightBox = new PIXI.Graphics();
  rightBox.beginFill(0x000000, 1);
  rightBox.drawRect(
    window.innerWidth / 2,
    0,
    window.innerWidth / 2,
    window.innerHeight
  );
  stage.addChild(rightBox);
}
setUp();

/////////// parse response ///////////

export default function generateAnimDomElements(iconData, resolve) {
  loader.reset(true);
  iconData.forEach((data, index) => {
    let url = data.previewURL;
    loader.add(`item${index}`, url);
    if (index === iconData.length - 1) {
      loader.load(generateElements);
    }
  });

  function generateElements(loader, resources) {
    let elementCount = iconData.length;
    let iconHolder = document.querySelectorAll('.iconGraphic');
    for (let i = 0; i < elementCount; i++) {
      var ogTexture = eval(`resources.item${i}.texture`);
      var width = ogTexture.width;
      var height = ogTexture.height;

      /////////// create animating icons ////////////

      var renderTarget = new PIXI.CanvasRenderTarget(width, height);
      PIXI.CanvasTinter.tintWithOverlay(
        ogTexture,
        0xffffff,
        renderTarget.canvas
      );
      var whiteTexture = PIXI.Texture.fromCanvas(renderTarget.canvas);
      var lightSprite = new PIXI.Sprite(whiteTexture);
      renderTarget.destroy();

      let randomVal = Math.floor(getRandomVal(0, greyTones.length));
      let colorVal = greyTones[randomVal];

      let animL = new PIXI.Sprite(whiteTexture);
      animL.tint = colorVal;
      stage.addChild(animL);
      animL.mask = leftBox;
      let animR = new PIXI.Sprite(whiteTexture);
      animR.tint = colorVal;
      stage.addChild(animR);
      animR.mask = rightBox;

      /////////// create canvas icons ////////////

      let animIcon = document.createElement('canvas');
      animIcon.width = 100;
      animIcon.height = 100;
      animIcon.classList.add('animIconCanvas');
      let ctx = animIcon.getContext('2d');
      ctx.drawImage(
        ogTexture.baseTexture.source,
        0,
        0,
        width,
        height,
        0,
        0,
        animIcon.width,
        animIcon.height
      );
      iconHolder[i].append(animIcon);
      Animate.changeCanvasColor(animIcon, whiteRGB);

      /////////// push into array for reference ////////////

      allSets.push([animL, animR, animIcon]);

      /////////// set starting values ////////////

      Animate.setValues(animL, animR);
    }
    resolve();
  }
}

///////////// renderer size variables  ////////////

let vw = window.innerWidth;
let vh = window.innerHeight;

window.addEventListener('resize', function(e) {
  vw = window.innerWidth;
  vh = window.innerHeight;

  renderer.resize(vw, vh);
  leftBox.width = vw / 2;
  leftBox.height = vh;
  rightBox.width = vw / 2;
  rightBox.height = vh;
  bgCover.width = vw;
  bgCover.height = vh;

  Animate.shuffle(bgCover, allSets);
});

///////////// control flow ////////////

let searchOverlay = document.querySelector('.searchOverlay');
let appendix = document.querySelector('.appendix');
let searchWord = document.querySelector('.searchWord');
let searchWordHolder = document.querySelector('.searchWordHolder');
let related = document.querySelector('.related');
let nav = document.querySelector('.nav');
// let centeredUIWrapper = document.querySelector('.centeredUIWrapper');
let logo = document.querySelector('.logo');
let iconHolderWrapper = document.querySelector('.iconHolderWrapper');
let closeIconWrapper = document.querySelector('.closeIconWrapper');
let infoIconWrapper = document.querySelector('.infoIconWrapper');

function close() {
  searchOverlay.classList.add('notVisible');
  appendix.classList.add('notVisible');
  iconHolderWrapper.scrollTop = 0;
  nav.classList.add('notVisible');
  // centeredUIWrapper.classList.add('notVisible');
  logo.classList.add('notVisible');
}

function open() {
  nav.classList.remove('notVisible');
  // centeredUIWrapper.classList.remove('notVisible');
  logo.classList.remove('notVisible');
  closeIconWrapper.classList.add('notVisible');
  infoIconWrapper.classList.remove('notVisible');
}

export function controlFlow(param) {
  new Promise((resolve, reject) => {
    close();
    setTimeout(function() {
      IntroAnim.play();
    }, 100);
    Animate.animateOut(allSets, { duration: 1, stagger: 0 }, resolve);
    Animate.blackBGColor(bgCover);
  })
    .then(newDataFour => {
      return new Promise((resolve, reject) => {
        destroyElements(allSets, resolve);
        controlCycle = true;
      });
    })
    .then(iconDataOne => {
      return new Promise((resolve, reject) => {
        newRequest(param, resolve);
      });
    })
    .then(cleanIconData => {
      return new Promise((resolve, reject) => {
        Animate.resetBW();
        // InfoDom.relatedTagsDom(cleanIconData.topTags);
        InfoDom.searchTermDom(cleanIconData.searchParam);
        InfoDom.generateAppendix(cleanIconData);
        generateAnimDomElements(cleanIconData.icons, resolve);
      });
    })
    .then(iconDataOnetesttest => {
      return new Promise((resolve, reject) => {
        IntroAnim.reverse(resolve);
      });
    })
    .then(resolveData => {
      open();
      Animate.randomLocaiton(allSets, { duration: 1, stagger: 0.5 });
      console.log('done with gen dom');
      controlCycle = false;
    });
}

///////////// destroy elements ////////////

function destroyElements(setsToDestroy, resolve) {
  let setsDestroyed = 0;
  if (setsToDestroy.length === 0) resolve();
  setsToDestroy.forEach((set, index) => {
    stage.removeChild(set[0]);
    stage.removeChild(set[1]);
    set[0].destroy(true);
    set[1].destroy(true);
    setsDestroyed++;
    if (setsToDestroy.length === setsDestroyed) {
      allSets = [];
      resolve();
    }
  });
}
