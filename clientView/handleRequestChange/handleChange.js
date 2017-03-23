import { animateOut } from '../animations.js';
import removeDomNodes from './removeDomNodes.js';
import newRequest from './newRequest.js';
import { handleErrorRemove } from './handleError.js';

/////////// handle change ///////////

export default function handleChange(param, resolve) {
  let nodesArray = document.querySelectorAll('.compContainer > div');
  let errorContainer = document.querySelector('.errorContainer');
  handleErrorRemove()
  TweenMax.to('.pageWrapper', 1, {backgroundColor:'rgba(255,255,255,0)', ease:Sine.easeInOut}) // re-set background-color
  new Promise((resolve, reject) => { animateOut(nodesArray, resolve); })
      .then(() => { return new Promise((resolve, reject) => removeDomNodes(nodesArray, resolve))
      })
      .then(() => newRequest(param, resolve))
      .then( () => {if(!resolve) return ; resolve('done with change request')} ); // tied to handleError

}