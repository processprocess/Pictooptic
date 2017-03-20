export default function removeDomNodes(nodesArray, resolve) {
  nodesArray.forEach(nodesArray => { nodesArray.remove(); })
  TweenMax.killAll();
  resolve();
}