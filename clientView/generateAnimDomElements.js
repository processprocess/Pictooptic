import "gsap";
import { changeLocation } from './animations.js';
import { currentParam } from './handleRequestChange/handleChange.js'


const leftContainer = document.querySelector('.leftContainer');
const rightContainer = document.querySelector('.rightContainer');
const compContainer = document.querySelector('.compContainer');
const nounDataWrapper = document.querySelector('.nounDataWrapper');
const currentSearch = document.querySelectorAll('.currentSearch');
const currentSearchWord = document.querySelector('.currentSearchWord');
const topRelatedTags = document.querySelector('.topRelatedTags');
const mainRule = document.querySelector('.mainRule');

export let allAnimSets = [];

export default function generateAnimDomElements (iconData, resolve) {

  let term = iconData[0].term;
  let spanText = '';
  for(let i = 0 ; i < term.length ; i++) {
    spanText += `<span>${term[i]}</span>`
  }
  currentSearchWord.innerHTML = spanText;
  currentSearchWord.setAttribute('style', 'color:black');

  currentSearch.forEach(element => {
    element.innerHTML = spanText;
    element.setAttribute('style', 'color:black');
  })

  topRelatedTags.setAttribute('style', 'color:black');
  mainRule.setAttribute('style', 'border-color:black');


  allAnimSets = [];
  iconData.forEach(icon => {
    let imageURL = icon.previewURL;
    let animContainerL = document.createElement('div');
    let animContainerR = document.createElement('div');
    animContainerL.classList.add('animContainerL');
    animContainerL.classList.add('anim');
    animContainerR.classList.add('animContainerR');
    animContainerR.classList.add('anim');
    animContainerL.innerHTML = `<div class="maskImage" style="-webkit-mask-image: url('${imageURL}');"> </div>`;
    animContainerR.innerHTML = `<div class="maskImage" style="-webkit-mask-image: url('${imageURL}');"> </div>`;
    // //  animContainerL.innerHTML = `<img src=${imageURL}>`;
    // //  animContainerR.innerHTML = `<img src=${imageURL}>`;
    leftContainer.appendChild(animContainerL);
    rightContainer.appendChild(animContainerR);
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
    // let iconDataAuthor = document.createElement('p');
    // iconDataHolder.appendChild(iconDataAuthor);
    // iconDataAuthor.textContent = 'author <br> tag tag tag'

    // ${author}
    // <ul class="iconTags">${liTagString}<ul>

    nounDataWrapper.appendChild(iconDataHolder);

    allAnimSets.push([animContainerL, animContainerR, iconDataHolder])
  })

  return allAnimSets;

  resolve(allAnimSets);

}