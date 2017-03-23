export default function removeDomNodes(nodesArray, resolve) {
  nodesArray.forEach(nodesArray => { nodesArray.remove(); })
  TweenMax.killAll();
  if (!resolve) return;
  resolve();
}