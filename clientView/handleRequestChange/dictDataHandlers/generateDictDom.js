/////////// generate Dict Dom ///////////

// const infoOverlay = document.querySelector('.infoOverlay');
// infoOverlay.classList.add('fadeIn'); // for debuging

export default function generateDictDom(dictObject) {
  let dictWrapper = document.querySelector('.dictWrapper')
  dictWrapper.innerHTML = `
    <h1>${dictObject.word}</h1>
    <h2>${dictObject.category}</h2>
    <p>${dictObject.definition}</p>
    <p class="example">'${dictObject.exampleOne}'</p>
    <div class="origin">
      <h3>Origin</h3>
      <p>${dictObject.origin}</p>
    </div>
    <div class="pronunciation">
      <h3>Pronunciation</h3>
      <p> <span class="pronunciationWord"> ${dictObject.word} </span> /${dictObject.pronunciation}/</p>
    </div>
  `;
}