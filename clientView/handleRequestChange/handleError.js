import "gsap";
import handleChange from './handleChange.js';
import getRandomVal from '../getRandomVal.js';
let errorContainer = document.querySelector('.errorContainer')

let animElements = document.querySelectorAll('.compContainer .maskImage')
/////////// handle error ///////////

export default function handleError(err) {
  // console.log(err);

  let suggestionArray = ['pattern', 'geometry', 'puppy'];
  let randSuggestion = suggestionArray[Math.floor(getRandomVal(0, suggestionArray.length))];
  let docbody = document.body

  new Promise((resolve, reject) => { handleChange('error', resolve); })
    .then((resolve) => {
      errorContainer.classList.add('errorFade')
      errorContainer.innerHTML =
        `<div class='errorInfo'>
          <p class="errorBold">error</p>
          <p>word not found</p>
        </div>
        <div class="error404"><p>404</p></div>
        <div class='errorInfo'>
          <p>how about searching</p>
          <p class="errorBold errorSuggestion">${randSuggestion}</p>
        </div>`;
        errorContainer.querySelector('.errorSuggestion').addEventListener('click', function() {
          new Promise((resolve, reject) => { handleChange(this.textContent, resolve); });
          console.log(this.textContent) })
          TweenMax.to(document.body, 1, {backgroundColor:'#7D4444', ease:Sine.easeInOut})
          TweenMax.set(animElements, {backgroundColor:'#401717',})
     })

}

export function handleErrorRemove() {
  let errorContainer = document.querySelector('.errorContainer');
  errorContainer.classList.remove('errorFade');
  errorContainer.addEventListener('animationend', function(e) { errorContainer.innerHTML = ''; })
  TweenMax.to(document.body, 1, {backgroundColor:'#A7A7A7', ease:Sine.easeInOut})
}