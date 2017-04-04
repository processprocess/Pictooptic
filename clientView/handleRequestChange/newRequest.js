import request from 'superagent';
import generateAnimDomElements, { updateElements } from '../generateAnimDomElements.js';
import handleError from './handleError.js';
import { lettersIn, animateIn } from '../animations.js';
import staggerAnimation from '../staggerAnimation.js';

/////////// handle request ///////////

// let turns = 0
export default function newRequest(param, resolve) {
  request.get(`/api/words/${param}`)
         .then((data) => {
            const cleanIconObjects = data.body;
            // if (turns > 0) {
            //   updateElements(cleanIconObjects)
            // } else {
              generateAnimDomElements(cleanIconObjects);
            // }
            // turns++

            new Promise(function(resolve, reject) {
              // staggerAnimation(animSets, 'animateIn', 30, resolve );
              // lettersIn()
            }).then((resolve) => {
              // document.querySelector('.eventBlocker').classList.remove('noEvents');
              // console.log('animateIn done')
            })

         })
         .catch(err => { handleError(err); console.log(err)})
         if (!resolve) return;
         resolve('donewithRequest');
}

/////////// new Color Request ///////////

export let colorPallete = ["#00A0B0", "#6A4A3C", "#CC333F", "#EB6841", "#EDC951"];

export function randomColorRequest() {
  request.get(`/color`)
         .then((data) => {
          let sortedColors = sortColors(data.body)
          colorPallete = sortedColors;
          // colorPallete = data.body;
          })
}

function sortColors(colors){
  let newPallete = colors.sort(function(hexcolorA, hexcolorB) {
    let a = parseInt(hexcolorA.substr(1,2), 16) + parseInt(hexcolorA.substr(3,4), 16) + parseInt(hexcolorA.substr(5,6), 16);
    let b = parseInt(hexcolorB.substr(1,2), 16) + parseInt(hexcolorB.substr(3,4), 16) + parseInt(hexcolorB.substr(5,6), 16);
    return a - b;
  });
  return newPallete;
}