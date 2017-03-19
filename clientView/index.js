console.clear()
import request from 'superagent';
import removeDomNodes, { staggerRemoveDomNodes } from './removeDomNodes.js';
import generateAnimDomElements from './generateAnimDomElements.js';
import { animateIn, changeLocation, animateOut } from './animations.js';
import { iconSampleObject } from './iconSampleObject.js';

let currentAnimSet = [];
let lastParam;
// newRequest('fresh')

function newRequest(param) {

  if (param === lastParam || !param) return;
  lastParam = param;

  request.get(`/api${param}`)
         .then((data) => {
           console.log(data.body.returnItem);

            new Promise((resolve, reject) => { cleanDictData(data.body.returnItem.dictData.results[0], resolve); })
               .then(dictObject => { generateDictDom(dictObject); });

          //   let iconDataObject = data.body.returnItem.iconData;
           //
          //   new Promise((resolve, reject) => { cleanIconData(iconDataObject, resolve); })
          //    .then(cleanIconObjects => { generateIconDom(cleanIconObjects); });
           //
          //  new Promise((resolve, reject) => { generateAnimDomElements(iconDataObject, resolve); })
          //      .then(allAnimSets => {
           //
          //        let animSetLength = allAnimSets.length;
          //        let elementsAnimatedIn = 0;
           //
          //        let myInterval = setInterval(function(){
          //          let currentAnimSet = allAnimSets[elementsAnimatedIn];
          //          animateIn(currentAnimSet[0], currentAnimSet[1])
          //          elementsAnimatedIn ++
          //          if (elementsAnimatedIn >= animSetLength) { clearInterval(myInterval); }
          //        }, 50);
          //        return allAnimSets;
        //  })

      })
}

/////////// cleanDictData ///////////

function cleanDictData(dictData, resolve) {
  let dictObject = {
    word: dictData.word,
    category: dictData.lexicalEntries[0].lexicalCategory,
    definition: dictData.lexicalEntries[0].entries[0].senses[0].definitions[0],
    exampleOne: dictData.lexicalEntries[0].entries[0].senses[0].examples ? dictData.lexicalEntries[0].entries[0].senses[0].examples[0].text : undefined,
    origin: dictData.lexicalEntries[0].entries[0].etymologies ? dictData.lexicalEntries[0].entries[0].etymologies[0] : undefined,
    pronunciation: dictData.lexicalEntries[0].pronunciations[0].phoneticSpelling,
    audio: dictData.lexicalEntries[0].pronunciations[0].audioFile,
  }
  resolve(dictObject);
}

/////////// generate Dict Info ///////////

const infoOverlay = document.querySelector('.infoOverlay');

infoOverlay.classList.add('fadeIn'); // for debuging
let testDictObject = {
  word: "health",
  category: "Noun",
  definition: "the state of being free from illness or injury",
  exampleOne: "he was restored to health",
  origin: "Old English hǣlth, of Germanic origin; related to whole",
  pronunciation: "hɛlθ",
  audio: 'http://audio.oxforddictionaries.com/en/mp3/health_gb_1.mp3'
}
generateDictDom(testDictObject)

function generateDictDom(dictObject) {
  let dictWrapper = document.querySelector('.dictWrapper')
  dictWrapper.innerHTML = `
    <h1>${dictObject.word}</h1>
    <h2>${dictObject.category}</h2>
    <p>${dictObject.definition}</p>
    <p class="example">'${dictObject.exampleOne}'</p>
    <div class="origin">
      <h3>Origin</h3>
      <p>${dictObject.origin}</p>
    </div>
    <div class="pronunciation">
      <h3>Pronunciation</h3>
      <p> <span class="pronunciationWord"> ${dictObject.word} </span> /${dictObject.pronunciation}/</p>
    </div>
  `;
}

/////////// generate Icon Info ///////////

new Promise((resolve, reject) => { generateAnimDomElements(iconSampleObject, resolve); })
    .then(allAnimSets => {
      let animSetLength = allAnimSets.length;
      let elementsAnimatedIn = 0;
      let myInterval = setInterval(function(){
        let currentAnimSet = allAnimSets[elementsAnimatedIn];
        animateIn(currentAnimSet[0], currentAnimSet[1])
        elementsAnimatedIn ++
        if (elementsAnimatedIn >= animSetLength) { clearInterval(myInterval); }
      }, 50);
      return allAnimSets;
    }).then((allAnimSets) => { currentAnimSet = allAnimSets })

new Promise((resolve, reject) => { cleanIconData(iconSampleObject, resolve); })
  .then(cleanIconObjects => { generateIconDom(cleanIconObjects); });

function cleanIconData(iconData, resolve) {
  console.log();
  let cleanIconObjects = [];
  iconData.forEach((icon, i) => {
    let cleanIconObject = {
      previewURL: iconData[i].preview_url,
    }
    cleanIconObjects.push(cleanIconObject)
  })
  resolve(cleanIconObjects);
}

/////////// generate Icon Dom ///////////

function generateIconDom(cleanIconObjects) {
  let nounWrapper = document.querySelector('.nounDataWrapper')
  let domElementString = '';
  cleanIconObjects.forEach((cleanIconObject, i) => {
    domElementString += `
      <div class="iconDataHolder">
        <div class="iconDataImageMask" style="-webkit-mask-image: url('${cleanIconObject.previewURL}'); -webkit-mask-size: 100% 100%;"> </div>
        <div class="iconDataRule"></div>
      </div>
      `
  })

  nounWrapper.innerHTML = domElementString;
}

/////////// key presses ///////////

window.addEventListener('keydown', handleKeydown);

function handleKeydown(e) {
  console.log(e.keyCode);
  if (e.keyCode === 27) { // escape key
    closeOverlay();
  } else if (e.keyCode === 13) { // enter
    handleChange(overlayInput.value)
    closeOverlay();
  } else if (e.keyCode === 8) { // delete
    if (overlayInput.value.length === 0) closeOverlay();
  } else if (e.keyCode) { // any other key
    handleSearchWindow()
  }
}

/////////// close buttons ///////////

const closeButtons = document.querySelectorAll('.closeButton');
closeButtons.forEach(closeButton => closeButton.addEventListener('click', () => closeOverlay() ))

/////////// search window ///////////

const searchOverlay = document.querySelector('.searchOverlay');
const overlayInput = document.querySelector('.searchOverlay input');
const searchButton = document.querySelector('.searchButton');

searchButton.addEventListener('click', function(e) { handleSearchWindow(); })

function handleSearchWindow() {
  overlayInput.focus()
  if (infoOverlay.classList.contains('fadeIn')) infoOverlay.classList.remove('fadeIn');
  if (searchOverlay.classList.contains('searchFade')) return;
  overlayInput.value = '';
  toggleSearchOverlay()
}

function toggleSearchOverlay() {
  if(!searchOverlay.classList.contains('searchFade')) {overlayInput.value = ''};
  searchOverlay.classList.toggle('searchFade');
  searchButton.parentNode.classList.toggle('navFade');
}

function closeOverlay() {
  if(searchOverlay.classList.contains('searchFade') || infoOverlay.classList.contains('fadeIn')) {
    searchOverlay.classList.remove('searchFade')
    infoOverlay.classList.remove('fadeIn')
    searchButton.parentNode.classList.remove('navFade');
  }
}

/////////// info window ///////////
// const infoOverlay = document.querySelector('.infoOverlay');
// infoOverlay.classList.add('fadeIn'); // for debuging

const infoButton = document.querySelector('.infoButton');

infoButton.addEventListener('click', function(e) { toggleInfoOverlay(); })

function toggleInfoOverlay() {
  infoOverlay.classList.toggle('fadeIn');
  infoButton.parentNode.classList.toggle('navFade');
}

/////////// handle change ///////////

function handleChange(param) {
  let nodesArray = document.querySelectorAll('.compContainer > div');
  new Promise((resolve, reject) => { animateOut(nodesArray, resolve); })
       .then(() => { new Promise((resolve, reject) => { removeDomNodes(nodesArray, resolve); })
       .then(() => newRequest(param));
       })
}