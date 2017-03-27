import request from 'superagent';
import generateIconDom from './generateIconDom.js';
import generateAnimDomElements from '../generateAnimDomElements.js';
import staggerAnimation from '../staggerAnimation.js';
import handleError from './handleError.js';

/////////// handle request ///////////

export default function newRequest(param, resolve) {
  request.get(`/api/words/${param}`)
         .then((data) => {
          //  console.log(data);
            const cleanIconObjects = data.body;
            generateIconDom(cleanIconObjects);
            const allAnimSets = generateAnimDomElements(cleanIconObjects);
            staggerAnimation(allAnimSets, 'animateIn');
         })
         .catch(err => { handleError(err); })
         if (!resolve) return;
         resolve('donewithRequest');
}

/////////// new Color Request ///////////

export let colorPallete = ["#00A0B0", "#6A4A3C", "#CC333F", "#EB6841", "#EDC951"];

export function randomColorRequest() {
  request.get(`/color`)
         .then((data) => {
          colorPallete = data.body
          return data.body
          })
}