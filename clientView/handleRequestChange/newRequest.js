import request from 'superagent';
import generateAnimDomElements, { updateElements } from '../generateAnimDomElements.js';

/////////// new icon request ///////////

export default function newRequest(param, resolve) {
  request.get(`/api/icons/${param}`)
         .then(data => {
            let cleanIconObjects = data.body;
            // console.log(data.body.searchParam)
            resolve(cleanIconObjects);
         })
         .catch(err => { console.log(err)})
         if (!resolve) return;
}

/////////// new color Request ///////////

export let colorPallete = ["#00A0B0", "#6A4A3C", "#CC333F", "#EB6841", "#EDC951"];

export function randomColorRequest(resolve) {
  request.get(`/color`)
         .then((data) => {
            console.log(data.body);
            let sortedColors = sortColors(data.body)
            colorPallete = sortedColors;
            resolve();
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