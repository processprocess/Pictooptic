import { changeLocation } from './animations.js';
const compContainer = document.querySelector('.compContainer');


export default function generateAnimDomElements (iconData, resolve) {
  let allAnimSets = []

  iconData.forEach(icon => {
    let imageURL = icon.preview_url;
    let animContainerL = document.createElement('div');
    let animContainerR = document.createElement('div');
    animContainerL.classList.add('animContainerL');
    animContainerR.classList.add('animContainerR');
    animContainerL.innerHTML = `<div class="maskImage" style="-webkit-mask-image: url('${imageURL}');"> </div>`;
    animContainerR.innerHTML = `<div class="maskImage" style="-webkit-mask-image: url('${imageURL}');"> </div>`;
    //  animContainerL.innerHTML = `<img src=${imageURL}>`;
    //  animContainerR.innerHTML = `<img src=${imageURL}>`;
    compContainer.appendChild(animContainerL);
    compContainer.appendChild(animContainerR);
    animContainerL.addEventListener('mouseover',function(e) { changeLocation(animContainerL, animContainerR); })
    animContainerR.addEventListener('mouseover',function(e) { changeLocation(animContainerL, animContainerR); })
    allAnimSets.push([animContainerL, animContainerR])
  })

  resolve(allAnimSets);

}