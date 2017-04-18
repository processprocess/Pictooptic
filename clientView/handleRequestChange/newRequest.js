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
export let rgbPallete = []

export function randomColorRequest(resolve) {
  request.get(`/color`)
         .then((data) => {
            console.log(data.body);
            let sortedColors = sortColors(data.body);
            rgbPallete = hexToRgb(data.body);
            console.log(rgbPallete)
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

function hexToRgb(hexColors){
  let newRGBpallette = []

  hexColors.forEach(hex => {
    let c;
    let rgb = {}
    c = hex.substring(1).split('');
    if(c.length === 3){
      c= [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    rgb.r = (c>>16)&255;
    rgb.g = (c>>8)&255;
    rgb.b = c&255;
    newRGBpallette.push(rgb)
  })

  return newRGBpallette
}