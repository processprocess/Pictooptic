import { animateIn, changeLocation, animateOut } from './animations.js';

export default function removeDomNodes(nodesArray, resolve) {
  nodesArray.forEach(nodesArray => { nodesArray.remove(); })
  TweenMax.killAll();
  resolve();
}

// export function staggerRemoveDomNodes(nodesArray, resolve) {
// let nodesArrayLength = nodesArray.length;
// let removedNodesArray = 0;
//
// let myInterval = setInterval(function(){
//   let currentAnimSet = nodesArray[removedNodesArray];
//   animateOut(nodesArray[removedNodesArray], nodesArray[removedNodesArray+1]);
//   removedNodesArray+=2;
//   if (removedNodesArray >= nodesArrayLength) { clearInterval(myInterval); }
// }, 50);
//
// resolve();
// }