console.clear()
import { controlFlow } from './generateAnimDomElements.js';
import LoaderAnim from './LoaderAnim.js';
// import { substringMatcher } from './typeahead.js'

window.onload = function() {
  LoaderAnim.play();
};



/////////// nav ///////////

// let related = document.querySelector('.related');
// let relatedTagsMenu = document.querySelector('.relatedTagsMenu');
// related.addEventListener('mouseover', function(e) {
//   relatedTagsMenu.classList.remove('notVisible')
// })
// related.addEventListener('mouseout', function(e) {
//   relatedTagsMenu.classList.add('notVisible')
// })

///////////// logo button ////////////

const logo = document.querySelector('.logo');
logo.addEventListener('click', function(e) {
  controlFlow('randomSample')
})


// let relatedMenu = document.querySelector('.relatedMenu');
// let randomButton = document.createElement('li');
// randomButton.innerHTML = `<li class='relatedMenu::after'>random</li>`
// relatedMenu.append(randomButton)
// randomButton.addEventListener('click', function(e) {
//   controlFlow('randomSample')
// })

// .relatedMenu:after {
//   border: thin black solid;
//   content: "random";
// }

/////////// handle key presses ///////////

let searchInput = document.querySelector('.searchInput')

function handleKeydown(e) {
  let submitValue = searchInput.value;
  if (e.keyCode === 27) { // escape key
  } else if (e.keyCode === 13) { // enter
    controlFlow(submitValue)
  } else if (e.keyCode === 8) { // delete
  } else if (e.keyCode < 64 || e.keyCode >= 91) { // check if alphabetic
    return;
  } else if (e.keyCode) { // any other key
    // activateNav()
  }
}

window.addEventListener('keydown', handleKeydown);

