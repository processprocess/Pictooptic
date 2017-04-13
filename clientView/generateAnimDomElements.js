import "pixi.js";
import "gsap";
import './libs/PixiPlugin.js';
import { randomColorRequest } from './handleRequestChange/newRequest.js';
import Animate from './Animate.js';
import newRequest from './handleRequestChange/newRequest.js';
import InfoDom from './InfoDom.js';
import IntroAnim from './IntroAnim.js';

export let allSets = [];
export let bgCover;

let leftBox;
let rightBox;
let filter;
let loader;
let stage;
let renderer;

/////////// set up pixi ///////////

function setUp() {
  renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
    view: document.querySelector("canvas"),
    antialias: true,
    transparent: true,
    resolution: 1
  });

  loader = new PIXI.loaders.Loader()
  stage = new PIXI.Container();

  stage.interactive = true;
  // stage.on('click', function(e) {
  //   shuffle()
  // });

  TweenLite.ticker.addEventListener("tick", () => { renderer.render(stage) });

  bgCover = new PIXI.Graphics();
  bgCover.beginFill(0xffffff, 1);
  bgCover.drawRect(0, 0, window.innerWidth, window.innerHeight);
  stage.addChild(bgCover);

  leftBox = new PIXI.Graphics();
  leftBox.beginFill(0xffffff, 1);
  leftBox.drawRect(0, 0, window.innerWidth/2, window.innerHeight);
  stage.addChild(leftBox);

  rightBox = new PIXI.Graphics();
  rightBox.beginFill(0xffffff, 1);
  rightBox.drawRect(window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight);
  stage.addChild(rightBox);
}
setUp()

/////////// parse response ///////////

export default function generateAnimDomElements (iconData, resolve) {
  loader.reset(true)
  iconData.forEach((data, index) => {
    let url = data.previewURL
    let newurl = url.replace('https', 'http')
    loader.add(`item${index}`, newurl)
    if(index === iconData.length - 1){
      loader.load(generateElements);
    }
  })

  function generateElements(loader, resources){
    let elementCount = iconData.length
    let iconHolder = document.querySelectorAll('.iconGraphic');
    for( let i = 0 ; i < elementCount ; i++){

      var ogTexture = eval(`resources.item${i}.texture`);
      var width  = ogTexture.width;
      var height = ogTexture.height;

      /////////// create canvas icons ////////////

      let animIcon = document.createElement('canvas');
      animIcon.width = 100;
      animIcon.height = 100;
      animIcon.classList.add('animIconCanvas');
      let ctx = animIcon.getContext('2d');
      ctx.drawImage(ogTexture.baseTexture.source, 0, 0, width, height, 0, 0, animIcon.width, animIcon.height);
      iconHolder[i].append(animIcon)

      /////////// create animating icons ////////////

      var renderTarget = new PIXI.CanvasRenderTarget(width, height);
      PIXI.CanvasTinter.tintWithOverlay(ogTexture, 0xffffff, renderTarget.canvas);
      var whiteTexture = PIXI.Texture.fromCanvas(renderTarget.canvas);
      var lightSprite = new PIXI.Sprite(whiteTexture);
      renderTarget.destroy();

      let animL = new PIXI.Sprite(whiteTexture);
      stage.addChild(animL);
      let animR = new PIXI.Sprite(whiteTexture);
      stage.addChild(animR);

      animL.mask = leftBox;
      animL.name = 'animL';

      animR.mask = rightBox;
      animR.name = 'animR';

      /////////// set starting values ////////////

      Animate.setValues(animL, animR)

      /////////// set events ////////////

      // animL.interactive = true;
      // animL.on('mouseover', function(e) {
      //   randomLocaiton([[animL, animR]], {duration:1, stagger:0})
      // });
      //
      // animR.interactive = true;
      // animR.on('mouseover', function(e) {
      //   randomLocaiton([[animL, animR]], {duration:1, stagger:0})
      // });

      allSets.push([animL, animR, animIcon]);

    }
    resolve()
  }
}

/////////// custom loader ///////////

loader.on("progress", loadProgressHandler)
let progress = document.querySelector('.progress')
function loadProgressHandler(loader, resource) {
  progress.textContent = loader.progress + "%"
}

///////////// size variables  ////////////

let vw = window.innerWidth;
let vh = window.innerHeight;

let xMin = vw/4;
let xMax = vw/2 + 50;
let yMin = vh/5.5 + 50;
let yMax = vh/1.50 + 50;

window.addEventListener('resize', function(e) {

  vw = window.innerWidth;
  vh = window.innerHeight;

  xMin = vw/4;
  xMax = vw/2 + 50;
  yMin = vh/5.5 + 50;
  yMax = vh/1.50 + 50;

  renderer.resize(vw, vh);
  leftBox.width = vw/2;
  leftBox.height = vh;
  rightBox.width = vw/2;
  rightBox.height = vh;
  bgCover.width = vw;
  bgCover.height = vh;

  Animate.shuffle(bgCover, allSets);

})

///////////// close windows ////////////

let searchOverlay = document.querySelector('.searchOverlay');
let appendix = document.querySelector('.appendix');
let searchInput = document.querySelector('.searchInput');
let searchWord = document.querySelector('.searchWord');
let relatedMenu = document.querySelector('.relatedMenu');

function close() {
  searchOverlay.classList.add('notVisible');
  appendix.classList.add('notVisible');
  // searchInput.value = '';
  searchWord.classList.remove('notVisible')
  relatedMenu.classList.remove('notVisible')
}

///////////// control flow ////////////

let loadingWrapper = document.querySelector('.loadingWrapper')

export function controlFlow(param) {
  new Promise((resolve, reject) => {
    close()
    Animate.animateOut(allSets, {duration:1, stagger:0}, resolve);
    Animate.whiteBGColor(bgCover);
  })
  .then((newDataFour) => { return new Promise((resolve, reject) => {
    destroyElements(allSets, resolve);
    })
  })
  // .then((iconDataOnetest) => { return new Promise((resolve, reject) => {
  //   IntroAnim.play(resolve)
  //   loadingWrapper.classList.remove('notVisible');
  //   })
  // })
  .then((iconDataOne) => { return new Promise((resolve, reject) => { newRequest(param, resolve) })
  })
  .then((cleanIconData) => { return new Promise((resolve, reject) => {
    InfoDom.relatedTagsDom(cleanIconData.topTags);
    InfoDom.searchTermDom(cleanIconData.icons[0].term);
    InfoDom.generateAppendix(cleanIconData);
    generateAnimDomElements(cleanIconData.icons, resolve);
    })
  })
  // .then((iconDataOnetesttest) => { return new Promise((resolve, reject) => {
  //   IntroAnim.reverse(resolve)
  //   loadingWrapper.classList.remove('notVisible');
  //   })
  // })
  .then((resolveData) => {
    // console.log('done with gen dom')
    Animate.randomLocaiton(allSets, {duration:1, stagger:.5})
  })
}

///////////// destroy elements ////////////

function destroyElements(setsToDestroy, resolve) {
  let setsDestroyed = 0;
  if(setsToDestroy.length === 0) resolve()
  setsToDestroy.forEach((set, index) => {
    stage.removeChild(set[0])
    stage.removeChild(set[1])
    set[0].destroy(true)
    set[1].destroy(true)
    setsDestroyed++
    if(setsToDestroy.length === setsDestroyed) {
      allSets = [];
      resolve();
    }
  })
}

controlFlow('randomSample') // debug