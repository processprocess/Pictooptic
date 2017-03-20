import { animateOut } from '../animations.js';
import removeDomNodes from './removeDomNodes.js';
import newRequest from './newRequest.js';

/////////// handle change ///////////

export default function handleChange(param) {
  let nodesArray = document.querySelectorAll('.compContainer > div');
  new Promise((resolve, reject) => { animateOut(nodesArray, resolve); })
       .then(() => { new Promise((resolve, reject) => { removeDomNodes(nodesArray, resolve); })
       .then(() => newRequest(param));
       })
}