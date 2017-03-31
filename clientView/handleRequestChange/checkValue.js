import handleChange from './handleChange.js';

const searchInstructions = document.querySelector('.searchInstructions');

export default function checkValue(value, resolve, reject) {
  // if (animateInRef.isActive()) {
  //   handleSubmitError(`please wait for the current animation to complete`)
  if (value.length <= 2) {
  // } else if (value.length <= 2) {
    handleSubmitError('nouns and verbs work best')
  // } else if (value === currentSearchParam) {
  //   handleSubmitError(`that's your latest search, try seraching something new`)
  } else {
    handleChange(value);
    if(!resolve) return
    resolve(value);
  }
}

function handleSubmitError(err) {
  searchInstructions.textContent = err;
  searchInstructions.classList.add('searchFlash');
  searchInstructions.addEventListener('animationend', function(e) { searchInstructions.classList.remove('searchFlash') });
}