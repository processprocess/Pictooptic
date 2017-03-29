import handleChange from './handleChange.js';
const infoOverlay = document.querySelector('.infoOverlay');

import { currentParam } from './handleChange.js'

/////////// generate Icon Dom ///////////

export let currentSearchParam;

const currentSearchWord = document.querySelector('.currentSearchWord');
currentSearchWord.addEventListener('click', function(e) { infoOverlay.classList.remove('fadeIn') })

const currentSearch = document.querySelector('.currentSearch');
const nounDataWrapper = document.querySelector('.nounDataWrapper');

export default function generateIconDom(cleanIconObjects) {
  const searchTerm = cleanIconObjects[0].term.toLowerCase();

  if(currentParam === 'randomSample') {
    currentSearch.textContent = searchTerm;
    currentSearchWord.textContent = searchTerm;
    currentSearchParam = searchTerm;
  } else {
    currentSearch.textContent = currentParam;
    currentSearchWord.textContent = currentParam;
    currentSearchParam = currentParam;
  }

  // let domElementString = '';
  // cleanIconObjects.forEach((cleanIconObject, i) => {
  //   let author = '';
  //   if (currentParam.charAt(0) === '@' || cleanIconObject.user === undefined) {
  //     author = ''
  //   } else {
  //     author = `<p class="author">@${cleanIconObject.user}</p>`
  //   }
  //   let liTagString = '';
  //   let firstTag = cleanIconObject.tags[0];
  //   cleanIconObject.tags.forEach((tag, i) => {
  //     if (i === 0 || i > 3 || (tag.slug.indexOf('-') != -1) || tag.slug === searchTerm) return;
  //     liTagString += `<li>${tag.slug}</li>`;
  //   })
  //   domElementString += `
  //     <div class="iconDataHolder">
  //       <div class="iconDataImageMask" style="-webkit-mask-image: url('${cleanIconObject.previewURL}'); -webkit-mask-size: 100% 100%;"> </div>
  //       ${author}
  //         <ul class="iconTags">${liTagString}<ul>
  //     </div>
  //     `
  // })
  // nounDataWrapper.innerHTML = domElementString;

  // let authors = nounDataWrapper.querySelectorAll('.author');
  // authors.forEach(author => { author.addEventListener('click', function() {
  //   handleChange(this.textContent);
  //   infoOverlay.classList.remove('fadeIn');
  //   })
  // })

  // let tagSlugs = nounDataWrapper.querySelectorAll('li');
  // tagSlugs.forEach(slug => { slug.addEventListener('click', function() {
  //   handleChange(this.textContent);
  //   infoOverlay.classList.remove('fadeIn');
  //   })
  // })

}
