import { animateOut } from '../animations.js';
import removeDomNodes from './removeDomNodes.js';
import newRequest from './newRequest.js';
import { handleErrorRemove } from './handleError.js';
import { blackAndWhiteBG } from '../animations.js';

/////////// handle change ///////////

export default function handleChange(param, resolve) {
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