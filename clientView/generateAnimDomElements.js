import { changeLocation } from './animations.js';
const compContainer = document.querySelector('.compContainer');

export let allAnimSets = [];

// export default function generateAnimDomElements (iconData) {
export default function generateAnimDomElements (iconData, resolve) {
  allAnimSets = [];
  console.log(iconData);
  iconData.forEach(icon => {
    let imageURL = icon.previewURL;
    let animContainerL = document.createElement('div');
    let animContainerR = document.createElement('div');
    animContainerL.classList.add('animContainerL');
    animContainerR.classList.add('animContainerR');
    animContainerL.innerHTML = `<div class="maskImage" style="-webkit-mask-image: url('${imageURL}');"> </div>`;
    animContainerR.innerHTML = `<div class="maskImage" style="-webkit-mask-image: url('${imageURL}');"> </div>`;
    // //  animContainerL.innerHTML = `<img src=${imageURL}>`;
    // //  animContainerR.innerHTML = `<img src=${imageURL}>`;
    compContainer.appendChild(animContainerL);
    compContainer.appendChild(animContainerR);
    animContainerL.addEventListener('mouseover',function(e) { changeLocation(animContainerL, animContainerR); })
    animContainerR.addEventListener('mouseover',function(e) { changeLocation(animContainerL, animContainerR); })
    allAnimSets.push([animContainerL, animContainerR])
  })

  return allAnimSets;

  resolve(allAnimSets);

}