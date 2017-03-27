import { animateOut } from '../animations.js';
import removeDomNodes from './removeDomNodes.js';
import newRequest from './newRequest.js';
import { handleErrorRemove } from './handleError.js';
import { blackAndWhiteBG } from '../animations.js';

/////////// handle change ///////////

export let currentParam = document.querySelector('.currentSearch').textContent;

export default function handleChange(param, resolve) {
  currentParam = param;
  closeOverlay();
  let nodesArray = document.querySelectorAll('.compContainer > div');
  let errorContainer = document.querySelector('.errorContainer');
  handleErrorRemove()
  blackAndWhiteBG()
  new Promise((resolve, reject) => { animateOut(nodesArray, resolve); })
      .then(() => { return new Promise((resolve, reject) => removeDomNodes(nodesArray, resolve))
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