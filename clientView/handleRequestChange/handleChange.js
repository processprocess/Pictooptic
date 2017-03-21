import { animateOut } from '../animations.js';
import removeDomNodes from './removeDomNodes.js';
import newRequest from './newRequest.js';
import { handleErrorRemove } from './handleError.js';

/////////// handle change ///////////

export default function handleChange(param, resolve) {
  let nodesArray = document.querySelectorAll('.compContainer > div');
  let errorContainer = document.querySelector('.errorContainer');
  handleErrorRemove()
  new Promise((resolve, reject) => { animateOut(nodesArray, resolve); })
      .then(() => { return new Promise((resolve, reject) => { removeDomNodes(nodesArray, resolve); })
      })
      // .then(() => { console.log('done with remove dom nodes');
      // })
      .then(() => { return new Promise((resolve, reject) => { newRequest(param, resolve); })
      })
      .then(() => { resolve('done with change request');
      })

}