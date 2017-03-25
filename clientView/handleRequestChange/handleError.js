import "gsap";
import handleChange from './handleChange.js';
import getRandomVal from '../getRandomVal.js';
let errorContainer = document.querySelector('.errorContainer')

let animElements = document.querySelectorAll('.compContainer .maskImage')

/////////// handle error ///////////

export default function handleError(err) {

  let suggestionArray = ['pattern', 'geometry', 'puppy'];
  let randSuggestion = suggestionArray[Math.floor(getRandomVal(0, suggestionArray.length))];
  // handleChange('error')
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
  TweenMax.to(document.body, 1, {backgroundColor:'#fff', ease:Sine.easeInOut})
  TweenMax.set(animElements, {backgroundColor:'#fff',})
  errorContainer.querySelector('.errorSuggestion').addEventListener('click', function() {
    handleChange(this.textContent);
  })
}

export function handleErrorRemove() {
  errorContainer.classList.remove('errorFade');
  errorContainer.addEventListener('animationend', function(e) { errorContainer.innerHTML = ''; })
}