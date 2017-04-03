import "gsap";
import ColorPropsPlugin from '../node_modules/gsap/ColorPropsPlugin.js';
import './libs/PixiPlugin.js';
import { changeLocation } from './animations.js';
import { currentParam } from './handleRequestChange/handleChange.js';
import handleChange from './handleRequestChange/handleChange.js';
import getRandomVal from './getRandomVal.js';
import "pixi.js";

const leftContainer = document.querySelector('.leftContainer');
const rightContainer = document.querySelector('.rightContainer');
const compContainer = document.querySelector('.compContainer');
const nounDataWrapper = document.querySelector('.nounDataWrapper');
const currentSearch = document.querySelectorAll('.currentSearch');
const currentSearchWord = document.querySelector('.currentSearchWord');
const topRelatedTags = document.querySelector('.topRelatedTags');
const mainRule = document.querySelector('.mainRule');

export let allAnimSets = [];

var renderer;
var leftBox;
var rightBox;
var bgCover;
var filter;
var allSets = [];

export default function generateAnimDomElements (iconData, resolve) {

  // console.log(PixiPlugin);

  // console.log(iconData);

  // var loader = new PIXI.loaders.Loader()
  //   .add("plant", 'https://d30y9cdsu7xlg0.cloudfront.net/png/6741-200.png')
  //   .load(init);
  //
  //   function init(loader, resources) {
  //     console.log();
  //   }

  let options = { crossOrigin: true }

  var loader = new PIXI.loaders.Loader(options)

  // // iconData.forEach((data, index, options) => {
  //   let url = 'https://d30y9cdsu7xlg0.cloudfront.net/png/60202-200.png'
  //   // let url = data.previewURL
  //   loader.add(`item1`, url)
  //   // if(index === iconData.length - 1){
  //     loader.load(init)
  //   // }
  // // })

  iconData.forEach((data, index, options) => {
    // let url = 'https://d30y9cdsu7xlg0.cloudfront.net/png/60202-200.png'
    let url = data.previewURL
    loader.add(`item${index}`, url)
    if(index === iconData.length - 1){
      loader.load(init)
    }
  })

  function init(loader, resources){

    renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
      view: document.querySelector("canvas"),
      antialias: true,
      transparent: true,
      resolution: 1
    });
    // renderer.backgroundColor = 0x000000;

    var stage = new PIXI.Container();

    bgCover = new PIXI.Graphics();
    // bgCover.beginFill(0x000000, 1);
    // bgCover.beginFill(0xffffff, 1);
    bgCover.beginFill(0xcccccc, 1);
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

    for( let i = 0 ; i < iconData.length ; i++){

    var ogTexture = eval(`resources.item${i}.texture`);
    var width  = ogTexture.width;
    var height = ogTexture.height;

    var renderTarget = new PIXI.CanvasRenderTarget(width, height);
    PIXI.CanvasTinter.tintWithOverlay(ogTexture, 0xffffff, renderTarget.canvas);

    var whiteTexture = PIXI.Texture.fromCanvas(renderTarget.canvas);
    var lightSprite = new PIXI.Sprite(whiteTexture);

    renderTarget.destroy();

    let plantL = new PIXI.Sprite(whiteTexture);
    stage.addChild(plantL);
    let plantR = new PIXI.Sprite(whiteTexture);
    stage.addChild(plantR);

    plantL.mask = leftBox;
    plantL.name = 'plantL';

    plantR.mask = rightBox;
    plantR.name = 'plantR';

    allSets.push([plantL, plantR]);

     /////////// set values ////////////

    TweenMax.set(plantL, { pixi: {
        anchor: 0.5,
        scaleX: 0,
        scaleY: 0,
        x: window.innerWidth/2,
        y: window.innerHeight/2,
    }});

    TweenMax.set(plantR, { pixi: {
        anchor: 0.5,
        scaleX: 0,
        scaleY: 0,
        x: window.innerWidth/2,
        y: window.innerHeight/2,
    }});
  //
  // ///////////// blast out ////////////
  //
    function blastOut(elements) {
      let plantL = elements[0];
      let plantR = elements[1];
      let xMin = elements[0].width/2 + 100;
      let xMax = renderer.view.width/2 - 100;
      let endX = getRandomVal(xMin, xMax);
      let yMin = elements[0].height/2 + 100;
      let yMax = renderer.view.height - elements[0].width/2 -100;
      let endY = getRandomVal(yMin, yMax);
      let scale = getRandomVal(.03, 1);

      TweenLite.to(plantL, 1, { pixi: {
        x: endX,
        y: endY,
        scale: scale,
      }});

      TweenLite.to(plantR, 1, { pixi: {
        x: renderer.view.width - endX,
        y: endY,
        scaleX: scale * -1,
        scaleY: scale,
      }});

    }
    blastOut([plantL, plantR])

    plantL.interactive = true;
    plantL.on('mouseover', function(e) {
      randomLocaiton([plantL, plantR])
    });
    plantR.interactive = true;
    plantR.on('mouseover', function(e) {
      randomLocaiton([plantL, plantR])
    });

  }

    TweenLite.ticker.addEventListener("tick", () => { renderer.render(stage) });


    // console.log(resources);
  }





  ///////////// random location and color ////////////

  function randomLocaiton(elements) {
    let plantL = elements[0]
    let plantR = elements[1]
    // let scale = 1;
    // let scale = randomInt(.5, 1);
    let xMin = elements[0].width/2 + 50;
    let xMax = renderer.view.width/2 + 50;
    let endX = randomInt(xMin, xMax);
    let yMin = elements[0].height/2 + 50;
    let yMax = renderer.view.height - elements[0].width/2 -75;
    let endY = randomInt(yMin, yMax);
    let rotation = randomInt(0, 4);
    let scale = ((endX - xMin)) / (xMax - xMin)

    TweenLite.to(plantL, 1, {
      pixi: {
        x:(index, element) => {
          return endX
        },
        y: endY,
        scale: scale,
        rotation: ()=>rotation*-1,
      },
      ease: Power1.easeInOut,
      // onComplete: () => console.log('done'),
    });

    TweenLite.to(plantR, 1, {
      pixi: {
        x: () => renderer.view.width - endX,
        y: endY,
        scaleX: ()=> scale*-1,
        scaleY: scale,
        rotation: rotation,
      },
      ease: Power1.easeInOut,
      // onComplete: () => console.log('done'),
    });

  }

  ///////////// changeBG color ////////////

  function changeBGColor() {
    TweenMax.to(bgCover, 0.5, {colorProps: {
        tint: Math.random() * 0xFFFFFF, format:"number"
      }
    });
  }

  ///////////// change element color ////////////

  function changeElementColor(elements) {
    let plantL = elements[0];
    let plantR = elements[1];
    let tint = Math.random() * 0xFFFFFF;

    TweenMax.to(plantL, 0.5, {colorProps: {
        tint: tint, format:"number",
      },
    });
    TweenMax.to(plantR, 0.5, {colorProps: {
        tint: tint, format:"number",
      }
    });

  }

  ///////////// animateOut ////////////

  function animateOut(elements) {
    let plantL = elements[0];
    let plantR = elements[1];

    TweenLite.to(plantL, 1, { pixi: {
      x: window.innerWidth/2 + plantL.width,
      y: window.innerHeight/2,
    },
      ease: Power1.easeInOut,
    });

    TweenLite.to(plantR, 1, { pixi: {
      x: window.innerWidth/2 - plantR.width,
      y: window.innerHeight/2,
    },
      ease: Power1.easeInOut,
    });

  }

  ///////////// random int ////////////

  function randomInt(min, max) {
    return Math.random() * (max - min) + min;
    // return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ///////////// test buttons ////////////

  let testVar1 = document.querySelector('.testButton1');
  testVar1.addEventListener('click', function(e) {
    // allSets
    console.log(allSets);
    changeBGColor();
    allSets.forEach(set => {
      randomLocaiton(set);
      changeElementColor(set);
    })
  })

  let testVar2 = document.querySelector('.testButton2');
  testVar2.addEventListener('click', function(e) {
    // changeBGColor();
    allSets.forEach(set => {
      animateOut(set);
      // randomLocaiton(set);
      // changeElementColor(set);
    })
  })

  ///////////// resizing ////////////

  window.addEventListener('resize', function(e) {

    renderer.resize(window.innerWidth, window.innerHeight);
    leftBox.width = window.innerWidth/2;
    leftBox.height = window.innerHeight;
    rightBox.width = window.innerWidth/2;
    rightBox.height = window.innerHeight;

    allSets.forEach(set => {
      randomLocaiton(set);
      changeElementColor(set);
    })

  })







  // let term = iconData[0].term;
  // let spanText = '';
  // for(let i = 0 ; i < term.length ; i++) {
  //   spanText += `<span>${term[i]}</span>`
  // }
  // currentSearchWord.innerHTML = spanText;
  // currentSearchWord.setAttribute('style', 'color:black');
  //
  // currentSearch.forEach(element => {
  //   element.innerHTML = spanText;
  //   element.setAttribute('style', 'color:black');
  // })
  //
  // topRelatedTags.setAttribute('style', 'color:black');
  // mainRule.setAttribute('style', 'border-color:black');
  //
  // iconData.forEach((icon, index) => {
  //   // ICON ANIM
  //   let imageURL = icon.previewURL;
  //   let animContainerL = document.createElement('div');
  //   let animContainerR = document.createElement('div');
  //   animContainerL.classList.add('animContainerL');
  //   animContainerL.classList.add('anim');
  //   animContainerR.classList.add('animContainerR');
  //   animContainerR.classList.add('anim');
  //   animContainerL.innerHTML = `<div class="maskImage" style="-webkit-mask-image: url('${imageURL}');"> </div>`;
  //   animContainerR.innerHTML = `<div class="maskImage" style="-webkit-mask-image: url('${imageURL}');"> </div>`;
  //   // //  animContainerL.innerHTML = `<img src=${imageURL}>`;
  //   // //  animContainerR.innerHTML = `<img src=${imageURL}>`;
  //   leftContainer.appendChild(animContainerL);
  //   rightContainer.appendChild(animContainerR);
  //   animContainerL.addEventListener('mouseover',()=> { changeLocation([[animContainerL, animContainerR]], {stagger:-.89, duration:.9}); })
  //   animContainerR.addEventListener('mouseover',()=> { changeLocation([[animContainerL, animContainerR]], {stagger:-.89, duration:.9}); })
  //
  //   // ICON DATA
  //   let iconDataHolder = document.createElement('div');
  //   iconDataHolder.classList.add('iconDataHolder');
  //   let iconDataImageMask = document.createElement('div');
  //   iconDataHolder.appendChild(iconDataImageMask);
  //   iconDataImageMask.classList.add('iconDataImageMask');
  //   iconDataImageMask.setAttribute('style', `-webkit-mask-image: url('${imageURL}'); -webkit-mask-size: 100% 100%;`);
  //   iconDataImageMask.addEventListener('click',()=> { changeLocation([[animContainerL, animContainerR]], {stagger:-.89, duration:.9});  })
  //   let iconDataAuthor = document.createElement('p');
  //   iconDataAuthor.classList.add('author');
  //   iconDataHolder.appendChild(iconDataAuthor);
  //   iconDataAuthor.textContent = `@${icon.user}`;
  //   iconDataAuthor.addEventListener('click', function(e) {
  //     handleChange(this.textContent);
  //   })
  //   let iconTags = document.createElement('ul');
  //   iconDataHolder.append(iconTags);
  //   for(let i=1 ; i <= 3 ; i++) {
  //     if(!icon.tags[i]) return
  //     let tag = document.createElement('li');
  //     tag.classList.add('iconTag');
  //     tag.textContent = `${icon.tags[i].slug}`;
  //     iconTags.appendChild(tag);
  //     tag.addEventListener('click', function(e) {
  //       handleChange(this.textContent);
  //     })
  //   }
  //
  //   nounDataWrapper.appendChild(iconDataHolder);
  //   allAnimSets.push([animContainerL, animContainerR, iconDataHolder])
  //
  // })
  //
  // return allAnimSets;
  // resolve(allAnimSets);
}