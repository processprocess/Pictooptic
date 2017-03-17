console.clear()
import request from 'superagent';
import { animateIn, changeLocation, animateOut } from './animations.js';
import random from './random.js';

// import "jquery";
// import $ from "jquery";
// import "jqueryimgmask";

// import testString from './testModule.js';
// import { apiKey as key, sayHi, old, dog } from './testModule.js';
// console.log(testString, key, old, dog);
// sayHi('phil');

// import User, { createURL, avatar } from './objectModule.js';
// const phil = new User('philip', 'phil@gmail.com', 'phil.com');
// const profile = createURL(phil.name);
// const image = avatar(phil.email);
// console.log(phil);
// console.log(profile);
// console.log(image);

// newRequest('test')

const compContainer = document.querySelector('.compContainer');

function newRequest(value) {

  const text = value;

  let definitionData;

  request.get(`/api${text}`)
         .then((data) => {

           console.log(data.body.returnItem);
          //  console.log(data.body.returnItem.dictData.results);

          //  definitionData = data.body.returnItem.dictData.results;
          //  handleDicta(definitionData)

           let iconData = data.body.returnItem.iconData


           iconData.forEach(icon => {
             let imageURL = icon.preview_url;
            //  console.log(icon)
             let animContainerL = document.createElement('div');
             let animContainerR = document.createElement('div');
             animContainerL.classList.add('animContainerL');
             animContainerR.classList.add('animContainerR');
             animContainerL.innerHTML = `<div class="maskImage" style="-webkit-mask-image: url('${imageURL}');"> </div>`;
             animContainerR.innerHTML = `<div class="maskImage" style="-webkit-mask-image: url('${imageURL}');"> </div>`;
            //  animContainerL.innerHTML = `<img src=${imageURL}>`;
            //  animContainerR.innerHTML = `<img src=${imageURL}>`;
             compContainer.appendChild(animContainerL);
             compContainer.appendChild(animContainerR);
             animContainerL.addEventListener('mouseover',function(e) { changeLocation(animContainerL, animContainerR); })
             animContainerR.addEventListener('mouseover',function(e) { changeLocation(animContainerL, animContainerR); })
             TweenMax.set([animContainerL, animContainerR], { x:window.innerWidth/2, y:window.innerHeight });
             animateIn(animContainerL, animContainerR)
           })

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

/////////// search window ///////////

// console.log(closeSearch);
const btn = document.querySelector('.btn');
const searchOverlay = document.querySelector('.searchOverlay');
const closeSearch = document.querySelector('#closeSearch');
const overlayInput = document.querySelector('.searchOverlay input');
btn.addEventListener('click', function(e) { toggleOverlay() })
closeSearch.addEventListener('click', function(e) { closeOverlay() })
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

newRequest('test')

function handleChange(changeValue) {

  let currentAnims = document.querySelectorAll('.compContainer > div');

  // function animateOut(currentAnims, resolve) {
  //   TweenMax.to(currentAnims, 1, { scale:0, ease:Sine.easeInOut, onComplete:resolve })
  // }

  new Promise((resolve, reject) => { animateOut(currentAnims, resolve); })
       .then(() => { new Promise((resolve, reject) => {
         currentAnims.forEach(currentAnim => {
           currentAnim.remove();
         })
         TweenMax.killAll();
         resolve();
         })
         .then(() => newRequest(changeValue));
  })

}

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