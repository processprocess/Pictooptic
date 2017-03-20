import request from 'superagent';
import cleanDictData from './dictDataHandlers/cleanDictData.js';
import generateDictDom from './dictDataHandlers/generateDictDom.js';
import cleanIconData from './iconDataHandlers/cleanIconData.js';
import generateIconDom from './iconDataHandlers/generateIconDom.js';
import generateAnimDomElements from '../generateAnimDomElements.js';
import staggerAnimation from '../staggerAnimation.js';

import { errorDictObject } from '../sampleObjects/errorDictObject.js';
import { errorNounObject } from '../sampleObjects/errorNounObject.js';
import { iconSampleObject } from '../sampleObjects/iconSampleObject.js';


new Promise((resolve, reject) => { generateAnimDomElements(iconSampleObject, resolve); }) // health request for debugging
   .then(allAnimSets => { staggerAnimation(allAnimSets); })
new Promise((resolve, reject) => { cleanIconData(iconSampleObject, resolve); })
  .then(cleanIconObjects => { generateIconDom(cleanIconObjects); });


export default function newRequest(param) {
  console.log(param);

  request.get(`/api${param}`)
         .then((data) => {

          console.log(data.body.returnItem);

          new Promise((resolve, reject) => { cleanDictData(data.body.returnItem.dictData.results[0], resolve); })
            .then(dictObject => { generateDictDom(dictObject); });

          new Promise((resolve, reject) => { cleanIconData(data.body.returnItem.iconData, resolve); })
            .then(cleanIconObjects => { generateIconDom(cleanIconObjects); });

          new Promise((resolve, reject) => { generateAnimDomElements(data.body.returnItem.iconData, resolve); })
            .then(allAnimSets => { staggerAnimation(allAnimSets); })
          })
          .catch(err => { handleError(); console.log(err); })
}

/////////// handle error ///////////

function handleError() {
  new Promise((resolve, reject) => { cleanDictData(errorDictObject, resolve); })
     .then(dictObject => { generateDictDom(dictObject); });

  new Promise((resolve, reject) => { cleanIconData(errorNounObject, resolve); })
     .then(cleanIconObjects => { generateIconDom(cleanIconObjects); });

  new Promise((resolve, reject) => { generateAnimDomElements(errorNounObject, resolve); })
     .then(allAnimSets => { staggerAnimation(allAnimSets); })
}