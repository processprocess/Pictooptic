import IntroAnim from './IntroAnim.js';
import { controlFlow } from './generateAnimDomElements.js';

let inputIntro = document.querySelector('.inputIntro');
let introWrapper = document.querySelector('.introWrapper');

window.onload = function() {
  new Promise((resolve, reject) => {
    IntroAnim.play(resolve);
  }).then(resOne => {
    return new Promise((resolve, reject) => {
      if (window.location.search) {
        controlFlow(window.location.search.replace('?', '').split('&')[0]);
      } else {
        controlFlow('randomSample');
      }
    });
  });
};
