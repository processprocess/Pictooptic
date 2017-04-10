import controlFlow from './generateAnimDomElements.js';
import IntroAnim from './IntroAnim.js';

console.log('hookedUp');

let inputIntro = document.querySelector('.inputIntro')
let randomButtonIntro = document.querySelector('.randomButtonIntro')
let searchInput = document.querySelector('.searchInput')

window.onload = function() {

  new Promise((resolve, reject) => { IntroAnim.play(resolve)
  })
  .then((resOne) => { return new Promise((resolve, reject) => {
    inputIntro.classList.remove('notVisible');
    randomButtonIntro.classList.remove('notVisible');
    inputIntro.focus();
    // inputIntro.addEventListener('change', function(e) {
      // introWrapper.classList.add('notVisible');
      // searchInput.focus()
      // console.log(e, this)
    // })
    })
  })

};
