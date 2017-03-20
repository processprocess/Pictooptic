import handleChange from '../handleChange.js';
const infoOverlay = document.querySelector('.infoOverlay');
const searchButton = document.querySelector('.searchButton');

/////////// generate Icon Dom ///////////

export default function generateIconDom(cleanIconObjects) {
  let nounWrapper = document.querySelector('.nounDataWrapper')
  let domElementString = '';
  let searchTerm = cleanIconObjects[0].term.toLowerCase();
  cleanIconObjects.forEach((cleanIconObject, i) => {
    let liTagString = '';
    let firstTag = cleanIconObject.tags[0];
    cleanIconObject.tags.forEach((tag, i) => {
      if (i === 0 || i > 10 || (tag.slug.indexOf('-') != -1) || tag.slug === searchTerm) return;
      liTagString += `<li>${tag.slug}</li>`;
    })
    domElementString += `
      <div class="iconDataHolder">
        <div class="iconDataImageMask" style="-webkit-mask-image: url('${cleanIconObject.previewURL}'); -webkit-mask-size: 100% 100%;"> </div>
        <div class="iconAndDataWrapper">
          <p class="author"> ${cleanIconObject.author}</p>
          <div class="subInfo">
            <p>${cleanIconObject.location}</p>
            <p>uploaded: ${cleanIconObject.date}</p>
            <a class="id" href="https://thenounproject.com/icon/${cleanIconObject.id}" target="new">Noun id: ${cleanIconObject.id}</a>
          </div>
        </div>
      </div>
      <div class="searchByTag">
        <p>Search by tag:</p>
        <ul class="iconTags">
          ${liTagString}
        <ul>
      </div>
      <div class="iconDataRule"></div>
      `
  })
  nounWrapper.innerHTML = domElementString;

  let tagSlugs = nounWrapper.querySelectorAll('li');

  tagSlugs.forEach(slug => { slug.addEventListener('click', function() {
    handleChange(this.textContent);
    infoOverlay.classList.remove('fadeIn');
    searchButton.parentNode.classList.remove('navFade');}) })
}