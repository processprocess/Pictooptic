import request from 'superagent';
import cleanDictData from './dictDataHandlers/cleanDictData.js';
import generateDictDom from './dictDataHandlers/generateDictDom.js';
import cleanIconData from './iconDataHandlers/cleanIconData.js';
import generateIconDom from './iconDataHandlers/generateIconDom.js';
import generateAnimDomElements from '../generateAnimDomElements.js';
import staggerAnimation from '../staggerAnimation.js';

/////////// handle request ///////////

export default function newRequest(param, resolve) {
  request.get(`/api${param}`)
         .then((data) => {

          // document.write(JSON.stringify(data.body.returnItem.dictData))
          console.log(data.body.returnItem);

          new Promise((resolve, reject) => { cleanDictData(data.body.returnItem.dictData.results[0], resolve); })
            .then(dictObject => { generateDictDom(dictObject); });

          new Promise((resolve, reject) => { cleanIconData(data.body.returnItem.iconData, resolve); })
            .then((cleanIconObjects, resolve) => { generateIconDom(cleanIconObjects, resolve); });

          new Promise((resolve, reject) => { generateAnimDomElements(data.body.returnItem.iconData, resolve); })
            .then(allAnimSets => { staggerAnimation(allAnimSets); })
          })
          .catch(err => { handleError(err); })
          // if (!resolve) return;
          resolve('donewithRequest');
}

/////////// handle error ///////////

function handleError(err) {
  // newRequest('error');

  console.log('from handle error 404');

  // new Promise((resolve, reject) => { newRequest('error', resolve); console.log(resolve);})
  //   .then((resolve) => {
  //     console.log('test');
  //     let errorContainer = document.querySelector('.errorContainer')
  //       errorContainer.innerHTML =
  //       `<div class='errorInfo'>
  //         <p class="errorBold">error</p>
  //         <p>word not found</p>
  //       </div>
  //       <div class="error404"><p>404</p></div>
  //       <div class='errorInfo'>
  //         <p>how about searching</p>
  //         <p class="errorBold errorSuggestion">banana</p>
  //       </div>`;
  //
  //    })



  // change background color of page
  // add error message
  // suggest other things to search

  // console.log(err);

}