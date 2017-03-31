import "gsap";
import { changeLocation } from './animations.js';
import { currentParam } from './handleRequestChange/handleChange.js'
import handleChange from './handleRequestChange/handleChange.js'


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

  iconData.forEach((icon, index) => {
    // ICON ANIM
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
    animContainerL.addEventListener('mouseover',()=> { changeLocation([[animContainerL, animContainerR]], {stagger:-.89, duration:.9}); })
    animContainerR.addEventListener('mouseover',()=> { changeLocation([[animContainerL, animContainerR]], {stagger:-.89, duration:.9}); })

    // ICON DATA
    let iconDataHolder = document.createElement('div');
    iconDataHolder.classList.add('iconDataHolder');
    let iconDataImageMask = document.createElement('div');
    iconDataHolder.appendChild(iconDataImageMask);
    iconDataImageMask.classList.add('iconDataImageMask');
    iconDataImageMask.setAttribute('style', `-webkit-mask-image: url('${imageURL}'); -webkit-mask-size: 100% 100%;`);
    iconDataImageMask.addEventListener('click',()=> { changeLocation([[animContainerL, animContainerR]], {stagger:-.89, duration:.9});  })
    let iconDataAuthor = document.createElement('p');
    iconDataAuthor.classList.add('author');
    iconDataHolder.appendChild(iconDataAuthor);
    iconDataAuthor.textContent = `@${icon.user}`;
    iconDataAuthor.addEventListener('click', function(e) {
      handleChange(this.textContent);
    })
    let iconTags = document.createElement('ul');
    iconDataHolder.append(iconTags);
    for(let i=1 ; i <= 3 ; i++) {
      if(!icon.tags[i]) return
      let tag = document.createElement('li');
      tag.classList.add('iconTag');
      tag.textContent = `${icon.tags[i].slug}`;
      iconTags.appendChild(tag);
      tag.addEventListener('click', function(e) {
        handleChange(this.textContent);
      })
    }

    nounDataWrapper.appendChild(iconDataHolder);
    allAnimSets.push([animContainerL, animContainerR, iconDataHolder])

  })

  return allAnimSets;
  resolve(allAnimSets);
}