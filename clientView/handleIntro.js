import IntroAnim from './IntroAnim.js';
import { controlFlow } from './generateAnimDomElements.js';

console.log('hookedUp');

let inputIntro = document.querySelector('.inputIntro')
let introWrapper = document.querySelector('.introWrapper')
// let randomButtonIntro = document.querySelector('.randomButtonIntro')
// let searchInput = document.querySelector('.searchInput')

window.onload = function() {
// controlFlow('randomSample');
  new Promise((resolve, reject) => { IntroAnim.play(resolve)
  })
  .then((resOne) => { return new Promise((resolve, reject) => {
    setTimeout(function(){
      // IntroAnim.reverse()
      controlFlow('randomSample');
      // introWrapper.classList.add('notVisible');

      // setTimeout(function(){
        // introWrapper.classList.add('notVisible');
      // }, 2000 );

    }, 1000 );

    // IntroAnim.play(resolve)
    // inputIntro.classList.remove('notVisible');
    // randomButtonIntro.classList.remove('notVisible');
    // inputIntro.focus();
    })
  })

};
