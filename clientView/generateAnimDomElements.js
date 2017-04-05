import "gsap";
import "pixi.js";
import { colorPallete } from './handleRequestChange/newRequest.js'
import { randomColorRequest } from './handleRequestChange/newRequest.js';
import ColorPropsPlugin from '../node_modules/gsap/ColorPropsPlugin.js';
import { changeLocation } from './animations.js';
import { currentParam } from './handleRequestChange/handleChange.js';
import handleChange from './handleRequestChange/handleChange.js';
import getRandomVal from './getRandomVal.js';
import './libs/PixiPlugin.js';
import newRequest from './handleRequestChange/newRequest.js';

export let allAnimSets = [];

let leftBox;
let rightBox;
let bgCover;
let filter;
let allSets = [];
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
  stage.on('click', function(e) {
    shuffle()
  });

  TweenLite.ticker.addEventListener("tick", () => { renderer.render(stage) });

  bgCover = new PIXI.Graphics();
  bgCover.beginFill(0xffffff, 1);
  bgCover.drawRect(0, 0, window.innerWidth, window.innerHeight);
  stage.addChild(bgCover);

  leftBox = new PIXI.Graphics();
  leftBox.beginFill(0xeeeeee, 1);
  leftBox.drawRect(0, 0, window.innerWidth/2, window.innerHeight);
  stage.addChild(leftBox);

  rightBox = new PIXI.Graphics();
  rightBox.beginFill(0xeeffff, 1);
  rightBox.drawRect(window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight);
  stage.addChild(rightBox);
}
setUp()

/////////// parse Json ///////////

export default function generateAnimDomElements (iconData, resolve) {
  loader.reset(true)
  iconData.forEach((data, index) => {
    let url = data.previewURL
    let newurl = url.replace('https', 'http')
    loader.add(`item${index}`, newurl)
    if(index === iconData.length - 1){
      resolve();
    }
  })
}

/////////// custom loader ///////////

loader.on("progress", loadProgressHandler)
let progress = document.querySelector('.progress')
function loadProgressHandler(loader, resource) {
  progress.textContent = loader.progress + "%"
}

/////////// generate animItems ///////////

function generateElements(loader, resources){
  for( let i = 0 ; i < 50 ; i++){

    var ogTexture = eval(`resources.item${i}.texture`);
    var width  = ogTexture.width;
    var height = ogTexture.height;

    for( let i = 0 ; i < 4 ; i++){

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

      allSets.push([animL, animR]);

      /////////// set values ////////////

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

    }

  }

  /////////// animate in ////////////

  randomLocaiton(allSets, {duration:1, stagger:0})

}

///////////// random location  ////////////

export function randomLocaiton(elements, options, resolve) {

  options = options || {};
  let duration = options.duration || 0.2;
  let stagger = (options.stagger == null) ? 0.3 : options.stagger || 0;
  let tl = new TimelineLite( {onComplete:resolve} );

  elements.forEach((element, i) => {
    let animL = element[0]
    let animR = element[1]

    let xMin = animL.width/2 + window.innerWidth/4;
    let xMax = window.innerWidth/2 + 50;

    let yMin = window.innerHeight/5.5 + 50;
    let yMax = window.innerHeight/1.50 + 50;

    let endX = randomInt(xMin, xMax);
    let endY = randomInt(yMin, yMax);
    let scale = ((endX - xMin)) / (xMax - xMin)

    tl.add(
      TweenLite.to(animL, 1, {
        pixi: {
          x:(index, element) => {
            return endX
          },
          y: endY,
          scale: scale,
        },
        ease: Power1.easeInOut,
      }, stagger * i),

      TweenLite.to(animR, 1, {
        pixi: {
          x: () => renderer.view.width - endX,
          y: endY,
          scaleX: ()=> scale*-1,
          scaleY: scale,
        },
        ease: Power1.easeInOut,
      }, 0)
    )

  })
  return tl;
}


///////////// changeBG color ////////////

function changeBGColor() {
  TweenMax.to(bgCover, 0.5, {colorProps: {
      tint: colorPallete[0], format:"number"
    }
  });
}

///////////// change element color ////////////

export function changeElementColor(elements, options) {

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

///////////// animateOut ////////////

export function animateOut(elements, options, resolve) {

  if(elements.length === 0) resolve()

  TweenMax.to(bgCover, 0.5, {colorProps: {
      tint: 0xffffff, format:"number"
    }
  });

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


///////////// shuffle all elements ////////////

function shuffle() {
  randomColorRequest();
  changeBGColor();
  randomLocaiton(allSets, {duration:1, stagger:0})
  changeElementColor(allSets, {duration:1, stagger:0})
}

///////////// random int ////////////

function randomInt(min, max) {
  return Math.random() * (max - min) + min;
}

///////////// window resize ////////////

window.addEventListener('resize', function(e) {

  renderer.resize(window.innerWidth, window.innerHeight);
  leftBox.width = window.innerWidth/2;
  leftBox.height = window.innerHeight;
  rightBox.width = window.innerWidth/2;
  rightBox.height = window.innerHeight;
  bgCover.width = window.innerWidth;
  bgCover.height = window.innerHeight;

  shuffle();

})

///////////// logo button ////////////

const logo = document.querySelector('.logo');
logo.addEventListener('click', function(e) {
  handleChangeFlow('randomSample')
})

///////////// new request ////////////

export function handleChangeFlow(param) {
  new Promise((resolve, reject) => { animateOut(allSets, {duration:1, stagger:0}, resolve)
  })
  .then((newDataFour) => { return new Promise((resolve, reject) => { destroyElements(allSets, resolve) })
  })
  .then((iconDataOne) => { return new Promise((resolve, reject) => { newRequest(param, resolve) })
  })
  .then((cleanIconData) => { return new Promise((resolve, reject) => {
    relatedTagsDom(cleanIconData.topTags)
    searchTermDom(cleanIconData.icons[0].term)
    generateAnimDomElements(cleanIconData.icons, resolve)
  })
  })
  .then((iconDataFive) => { return new Promise((resolve, reject) => { loader.load(generateElements); })
  })
  .then((resolveData) => { console.log('done with gen dom')})
}
handleChangeFlow('randomSample')

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

/////////// related tags ///////////

let relatedTagsMenu = document.querySelector('.relatedTagsMenu');
function relatedTagsDom(tags) {
  while (relatedTagsMenu.firstChild) {
    relatedTagsMenu.removeChild(relatedTagsMenu.firstChild);
  }
  for (let i = 0 ; i < 5; i++) {
    let tagItem = document.createElement('li');
    tagItem.textContent = tags[i][0]
    tagItem.addEventListener('click', function(e) {
      handleChangeFlow(tagItem.textContent)
    })
    relatedTagsMenu.append(tagItem)
  }
}

/////////// search term ///////////

let searchTerm = document.querySelector('.searchTerm');
function searchTermDom(term) {
  console.log(term)
  searchTerm.innerHTML = '';
  searchTerm.innerHTML = term;
}

// let searchTerm = cleanData.icons[0].term;
// console.log(searchTerm)
// let searchTerm = document.querySelector('.searchTerm')
// searchTerm.textContent = (iconData[0].term).charAt(0).toUpperCase() + iconData[0].term.slice(1)
// console.log(iconData[0].term);