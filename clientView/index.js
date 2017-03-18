console.clear()
import request from 'superagent';
import removeDomNodes, { staggerRemoveDomNodes } from './removeDomNodes.js';
import generateAnimElements from './generateAnimElements.js';
import { animateIn, changeLocation, animateOut } from './animations.js';

let currentAnimSet = [];

function newRequest(param) {

  let definitionData;

  request.get(`/api${param}`)
         .then((data) => {

           console.log(data.body.returnItem);
          //  console.log(data.body.returnItem.dictData.results);

          //  definitionData = data.body.returnItem.dictData.results;
          //  handleDicta(definitionData)

           let iconData = data.body.returnItem.iconData

           new Promise((resolve, reject) => { generateAnimElements(iconData, resolve); })
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

         })
}

function handleDicta(definitionData) {
  let dictObject = {}
  // console.log(definitionData);
  // dictObject.word = definitionData.word;
  // dictObject.language = definitionData.lexicalEntries[0]language;
  // dictObject.lexicalCategory = definitionData.lexicalEntries[0]lexicalCategory;
  // dictObject.phoneticSpelling = definitionData.lexicalEntries[0]phoneticSpelling;
  // dictObject.entry = definitionData.lexicalEntries[0]phoneticSpelling;
}

/////////// key presses ///////////

window.addEventListener('keydown', handleKeydown);

function handleKeydown(e) {
  if (e.keyCode === 27) {
    closeOverlay();
  } else if (e.keyCode === 13) {
    handleChange(overlayInput.value)
    closeOverlay();
  } else if (e.keyCode) {
    if (searchOverlay.classList.contains('fadeIn')) return ;
    overlayInput.value = '';
    toggleOverlay()
    overlayInput.focus()
  }
}


/////////// handle change ///////////

function handleChange(param) {
  let nodesArray = document.querySelectorAll('.compContainer > div');
  new Promise((resolve, reject) => { animateOut(nodesArray, resolve); })
       .then(() => { new Promise((resolve, reject) => { removeDomNodes(nodesArray, resolve); })
       .then(() => newRequest(param));
       })
}

/////////// search window ///////////

const btn = document.querySelector('.btn');
const searchOverlay = document.querySelector('.searchOverlay');
const closeSearch = document.querySelector('#closeSearch');
const overlayInput = document.querySelector('.searchOverlay input');
btn.addEventListener('click', function(e) { toggleOverlay() })
closeSearch.addEventListener('click', function(e) { closeOverlay() })

function toggleOverlay() {
  if (!searchOverlay.classList.contains('fadeIn')) overlayInput.value = ''; ;
  searchOverlay.classList.toggle('fadeIn')
  overlayInput.focus()
}

function closeOverlay() {
  if(searchOverlay.classList.contains('fadeIn')) {
    searchOverlay.classList.remove('fadeIn')
  }
}


/////////// info window ///////////

const infoOverlay = document.querySelector('.infoOverlay');
const info = document.querySelector('.info');
const closeInfoOverlay = document.querySelector('.closeInfoOverlay');
info.addEventListener('click', function(e) { toggleInfoOverlay() })
closeInfoOverlay.addEventListener('click', function(e) { fadeoutInfoOverlay() })

function toggleInfoOverlay() {
  infoOverlay.classList.toggle('fadeIn');
}

function fadeoutInfoOverlay() {
  if( infoOverlay.classList.contains('fadeIn') ) {
    infoOverlay.classList.remove('fadeIn')
  }
}