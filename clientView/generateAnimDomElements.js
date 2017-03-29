import "gsap";
import { changeLocation } from './animations.js';
const compContainer = document.querySelector('.compContainer');
const nounDataWrapper = document.querySelector('.nounDataWrapper');
import { currentParam } from './handleRequestChange/handleChange.js'

export let allAnimSets = [];

let currentSearchWord = document.querySelector('.currentSearchWord');
let currentSearch = document.querySelector('.currentSearch');
let topRelatedTags = document.querySelector('.topRelatedTags');
let mainRule = document.querySelector('.mainRule');

export default function generateAnimDomElements (iconData, resolve) {
  let term = iconData[0].term;
  let spanText = '';
  for(let i = 0 ; i < term.length ; i++) {
    spanText += `<span>${term[i]}</span>`
  }
  currentSearchWord.innerHTML = spanText;
  currentSearch.innerHTML = spanText;
  currentSearchWord.setAttribute('style', 'color:black');
  currentSearch.setAttribute('style', 'color:black');
  topRelatedTags.setAttribute('style', 'color:black');
  mainRule.setAttribute('style', 'border-color:black');

  allAnimSets = [];
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


    //   let author = '';
    //   if (currentParam.charAt(0) === '@' || cleanIconObject.user === undefined) {
    //     author = ''
    //   } else {
    //     author = `<p class="author">@${cleanIconObject.user}</p>`
    //   }
    let iconDataHolder = document.createElement('div');
    iconDataHolder.classList.add('iconDataHolder');
    let iconDataImageMask = document.createElement('div');
    iconDataHolder.appendChild(iconDataImageMask);
    iconDataImageMask.classList.add('iconDataImageMask');
    iconDataImageMask.setAttribute('style', `-webkit-mask-image: url('${imageURL}'); -webkit-mask-size: 100% 100%;`);
    iconDataImageMask.addEventListener('click',function(e) { changeLocation(animContainerL, animContainerR);  })
    let iconDataAuthor = document.createElement('p');
    iconDataHolder.appendChild(iconDataAuthor);
    iconDataAuthor.textContent = 'author <br> tag tag tag'

    // ${author}
    // <ul class="iconTags">${liTagString}<ul>

    nounDataWrapper.appendChild(iconDataHolder);

    allAnimSets.push([animContainerL, animContainerR, iconDataHolder])
  })

  return allAnimSets;

  resolve(allAnimSets);

}