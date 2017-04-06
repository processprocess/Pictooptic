import { handleChangeFlow } from './generateAnimDomElements.js'

class InfoDom {
  static searchTermDom(term) {
    let searchTerm = document.querySelector('.searchTerm');
    searchTerm.innerHTML = '';
    searchTerm.innerHTML = term;
  }
  static relatedTagsDom(tags) {
    let relatedTagsMenu = document.querySelector('.relatedTagsMenu');
    while (relatedTagsMenu.firstChild) {
      relatedTagsMenu.removeChild(relatedTagsMenu.firstChild);
    }
    for (let i = 0 ; i < 5; i++) {
      let tagItem = document.createElement('li');
      tagItem.textContent = tags[i][0];
      tagItem.addEventListener('click', function(e) {
        handleChangeFlow(tagItem.textContent);
      })
      relatedTagsMenu.append(tagItem);
    }
  }
  static generateAppendix(cleanIconData) {
    let iconHolder = document.querySelector('.iconHolder')
    while (iconHolder.firstChild) {
      iconHolder.removeChild(iconHolder.firstChild);
    }
    cleanIconData.icons.forEach(icon => {
      let iconData = document.createElement('div');
      iconData.classList.add('iconData');
      iconHolder.append(iconData);
      let iconGraphic = document.createElement('div');
      iconGraphic.classList.add('iconGraphic');
      iconGraphic.innerHTML = `<img src="${icon.previewURL}">`
      iconData.append(iconGraphic);
      let userName = document.createElement('div');
      userName.classList.add('userName');
      userName.textContent = icon.user
      iconData.append(userName);
      let iconTagList = document.createElement('ul');
      iconTagList.classList.add('iconTagList');
      iconData.append(iconTagList);
      let tags = icon.tags;
      tags.forEach(tag => {
        let iconTag = document.createElement('li');
        iconTag.textContent = tag;
        iconTag.addEventListener('click',() => handleChangeFlow(tag))
        iconTagList.append(iconTag);
      })
    })
  }
  static showAppendix() {
    let appendix = document.querySelector('.appendix');
    appendix.classList.toggle('notVisible')
  }
}

module.exports = InfoDom;

let searchTerm = document.querySelector('.searchTerm');
searchTerm.addEventListener('click', function(e) {
  InfoDom.showAppendix()
})
