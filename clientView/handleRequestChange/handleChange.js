import removeDomNodes from './removeDomNodes.js';
import newRequest from './newRequest.js';
import { handleErrorRemove } from './handleError.js';
import { blackAndWhiteElements, blackAndWhiteBG, lettersOut, animateOut } from '../animations.js';
import { allAnimSets } from '../generateAnimDomElements.js';
import staggerAnimation from '../staggerAnimation.js';

/////////// handle change ///////////

// export let currentParam = document.querySelectorAll('.currentSearch').textContent;

export default function handleChange(param, resolve) {
  // currentParam = param;
  closeOverlay();
  const nodesAnimArrayL = Array.from(document.querySelectorAll('.leftContainer > .anim'));
  const nodesAnimArrayR = Array.from(document.querySelectorAll('.rightContainer > .anim'));
  const nodesDataArray = Array.from(document.querySelectorAll('.nounDataWrapper > div'));
  const errorContainer = document.querySelector('.errorContainer');
  const animOutSets = allAnimSets.map(element => {return [element[0], element[1]] });
  handleErrorRemove()
  blackAndWhiteBG()
  blackAndWhiteElements(allAnimSets, {stagger:-.39, duration:.4});
  new Promise((resolve, reject) => {
    lettersOut()
    animateOut(animOutSets, {stagger:.01, duration:.75}, resolve);
  })
  // new Promise((resolve, reject) => { animateOut([nodesAnimArrayL, nodesAnimArrayR], {stagger:.01, duration:.5}, resolve); })
      .then(() => { return new Promise((resolve, reject) => removeDomNodes([nodesAnimArrayL, nodesAnimArrayR, nodesDataArray], resolve))
      })
      .then(() => newRequest(param, resolve))
      .then( () => {if(!resolve) return ; resolve('done with change request')} ); // tied to handleError
}

const infoOverlay = document.querySelector('.infoOverlay');
const searchOverlay = document.querySelector('.searchOverlay');
const overlayInput = document.querySelector('.searchOverlay input');

function closeOverlay() {
  if(searchOverlay.classList.contains('searchFade') || infoOverlay.classList.contains('fadeIn')) {
    overlayInput.blur();
    document.body.click();
    searchOverlay.classList.remove('searchFade');
    infoOverlay.classList.remove('fadeIn');
  }
}