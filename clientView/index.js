console.clear()
import request from 'superagent';
import removeDomNodes, { staggerRemoveDomNodes } from './removeDomNodes.js';
import generateAnimElements from './generateAnimElements.js';
import { animateIn, changeLocation, animateOut } from './animations.js';

let currentAnimSet = [];

// newRequest('fresh')

function newRequest(param) {

  request.get(`/api${param}`)
         .then((data) => {

          //  console.log(data.body.returnItem.dictData.results);
          //  console.log(data.body.returnItem.dictData.results);
           //
          //  dictData = data.body.returnItem.dictData.results;
           cleanDictData(data.body.returnItem.dictData.results[0])
          //  document.write(JSON.stringify(data.body.returnItem.dictData.results[0]))
          //  cleanIconData(data.body.returnItem.dictData.results[0])

           //
          //  let iconData = data.body.returnItem.iconData
           //
          //  new Promise((resolve, reject) => { generateAnimElements(iconData, resolve); })
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
           //
          //      }).then((allAnimSets) => { currentAnimSet = allAnimSets })

         })
}

/////////// key presses ///////////

function cleanDictData(dictData) {
  let dictObject = {
    word: dictData.word,
    phoneticSpelling: dictData.lexicalEntries[0].pronunciations[0].phoneticSpelling,
    category: dictData.lexicalEntries[0].lexicalCategory,
    etymologies: dictData.lexicalEntries[0].entries[0].etymologies[0],
    definition: dictData.lexicalEntries[0].entries[0].senses[0].definitions[0],
    subDefinitionOne: dictData.lexicalEntries[0].entries[0].senses[0].subsenses ? dictData.lexicalEntries[0].entries[0].senses[0].subsenses[0].definitions[0] : undefined,
    subDefinitionTwo: dictData.lexicalEntries[0].entries[0].senses[0].subsenses[1] ? dictData.lexicalEntries[0].entries[0].senses[0].subsenses[0].definitions[1] : undefined,
    exampleOne: dictData.lexicalEntries[0].entries[0].senses[0].examples ? dictData.lexicalEntries[0].entries[0].senses[0].examples[0].text : undefined,
    exampleTwo: dictData.lexicalEntries[0].entries[0].senses[0].examples[1] ? dictData.lexicalEntries[0].entries[0].senses[0].examples[1].text : undefined,
  }
  // document.write(JSON.stringify(dictObject));
  console.log(dictObject);
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

/////////// search window ///////////

function handleSearchWindow() {
  overlayInput.focus()
  if (infoOverlay.classList.contains('fadeIn')) infoOverlay.classList.remove('fadeIn');
  if (searchOverlay.classList.contains('fadeIn')) return;
  overlayInput.value = '';
  toggleOverlay()
}


const searchButton = document.querySelector('.searchButton');
const searchOverlay = document.querySelector('.searchOverlay');
const overlayInput = document.querySelector('.searchOverlay input');
const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(closeButton => closeButton.addEventListener('click', () => closeOverlay() ))


searchButton.addEventListener('click', function(e) { toggleOverlay() })
// infoButton.addEventListener('click', function(e) { toggleInfoOverlay() })



function toggleOverlay() {
  // if (!searchOverlay.classList.contains('fadeIn')) overlayInput.value = ''; ;
  searchOverlay.classList.toggle('fadeIn')
  // overlayInput.focus()
}

function closeOverlay() {
  if(searchOverlay.classList.contains('fadeIn') || infoOverlay.classList.contains('fadeIn')) {
    searchOverlay.classList.remove('fadeIn')
    infoOverlay.classList.remove('fadeIn')
  }
}


/////////// info window ///////////

const infoOverlay = document.querySelector('.infoOverlay');
const infoButton = document.querySelector('.infoButton');

infoButton.addEventListener('click', function(e) { toggleInfoOverlay() })

function toggleInfoOverlay() {
  infoOverlay.classList.toggle('fadeIn');
}

// infoOverlay.classList.add('fadeIn'); // for debuging








/////////// handle change ///////////

function handleChange(param) {
  let nodesArray = document.querySelectorAll('.compContainer > div');
  new Promise((resolve, reject) => { animateOut(nodesArray, resolve); })
       .then(() => { new Promise((resolve, reject) => { removeDomNodes(nodesArray, resolve); })
       .then(() => newRequest(param));
       })
}