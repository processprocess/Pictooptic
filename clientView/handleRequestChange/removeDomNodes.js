export default function removeDomNodes(nodeArrays, resolve) {
  nodeArrays.forEach(nodeArray => {
    nodeArray.forEach(node => {
      node.remove();
    })
  })
  TweenMax.killAll();
  if (!resolve) return;
  resolve();
}