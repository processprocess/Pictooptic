import handleChange from './handleChange.js';
const infoOverlay = document.querySelector('.infoOverlay');
const searchButton = document.querySelector('.searchButton');

import { currentParam } from './handleChange.js'

/////////// generate Icon Dom ///////////

const currentSearchWord = document.querySelector('.currentSearchWord');
currentSearchWord.addEventListener('click', function(e) { infoOverlay.classList.remove('fadeIn') })

export default function generateIconDom(cleanIconObjects) {
  const searchTerm = cleanIconObjects[0].term.toLowerCase();
  const currentSearchWord = document.querySelector('.currentSearchWord');
  const currentSearch = document.querySelector('.currentSearch');
  if(currentParam === 'randomSample') {
    currentSearch.textContent = searchTerm;
    currentSearchWord.textContent = searchTerm;
  } else {
    currentSearch.textContent = currentParam;
    currentSearchWord.textContent = currentParam;
  }
  const nounDataWrapper = document.querySelector('.nounDataWrapper');
  let domElementString = '';
  cleanIconObjects.forEach((cleanIconObject, i) => {
    let liTagString = '';
    let firstTag = cleanIconObject.tags[0];
    // let collectionHTML;
    // if (cleanIconObject.collectionID !== undefined) {
    //   collectionHTML = `<p class="collection" data-id="#${cleanIconObject.collectionID}">${cleanIconObject.collection}</p>`
    // } else { collectionHTML = '' }
    cleanIconObject.tags.forEach((tag, i) => {
      if (i === 0 || i > 3 || (tag.slug.indexOf('-') != -1) || tag.slug === searchTerm) return;
      liTagString += `<li>${tag.slug}</li>`;
    })
    domElementString += `
      <div class="iconDataHolder">
        <div class="iconDataImageMask" style="-webkit-mask-image: url('${cleanIconObject.previewURL}'); -webkit-mask-size: 100% 100%;"> </div>
        <p class="author">@${cleanIconObject.user}</p>
          <ul class="iconTags">${liTagString}<ul>
      </div>
      `
  })
  nounDataWrapper.innerHTML = domElementString;

  // ${collectionHTML}
  // let collections = nounDataWrapper.querySelectorAll('.collection');
  // collections.forEach(collection => { collection.addEventListener('click', function() {
  //   console.log(this.dataset.id);
  //   // handleChange(this.dataset.id);
  //   // infoOverlay.classList.remove('fadeIn');
  // }) })

  let authors = nounDataWrapper.querySelectorAll('.author');

  authors.forEach(author => { author.addEventListener('click', function() {
    handleChange(this.textContent);
    infoOverlay.classList.remove('fadeIn');
    })
    author.classList.add('clickable')
  })

  let tagSlugs = nounDataWrapper.querySelectorAll('li');
  tagSlugs.forEach(slug => { slug.addEventListener('click', function() {
    handleChange(this.textContent);
    infoOverlay.classList.remove('fadeIn');
    searchButton.parentNode.classList.remove('navFade');
    })
  })

  // resolve('doneGenerating')
}

// `
// <div class="iconDataHolder">
//   <div class="iconDataImageMask" style="-webkit-mask-image: url('${cleanIconObject.previewURL}'); -webkit-mask-size: 100% 100%;"> </div>
//   <div class="iconAndDataWrapper">
//     <p class="author"> ${cleanIconObject.author}</p>
//     <div class="subInfo">
//       <p>${cleanIconObject.location}</p>
//       <p>uploaded: ${cleanIconObject.date}</p>
//       <a class="id" href="https://thenounproject.com/icon/${cleanIconObject.id}" target="new">Noun id: ${cleanIconObject.id}</a>
//     </div>
//   </div>
// </div>
// <div class="searchByTag">
//   <p>Search by tag:</p>
//   <ul class="iconTags">
//     ${liTagString}
//   <ul>
// </div>
// <div class="iconDataRule"></div>
// `

