console.clear()
import request from 'superagent';
import "gsap";
// import "jquery";
// import $ from "jquery";
// import "jqueryimgmask";

import ModifiersPlugin from "../node_modules/gsap/ModifiersPlugin.js";

const generateButton = document.querySelector('.generate-button');

const compContainer = document.querySelector('.compContainer');
generateButton.addEventListener('submit', generate);

// let testParam = 'fish';
// generate(testParam)


function generate(e) {
  e.preventDefault();

  const text = (this.querySelector('[name=item]')).value;
  // const text = testParam

  console.log(text);

  request.get(`/api/colors${text}`)
        //  .then((colorData) => {
        //    console.log(colorData.body.colors);
        //    let colors = colorData.body.colors;
        //    colors.forEach(color => {
        //      let colorHolder = document.createElement('div');
        //      colorHolder.classList.add('colorHolder');
        //      colorHolder.style.backgroundColor = `#${color}`;
        //      document.body.append(colorHolder);
        //    })
        //    document.body.style.backgroundColor = `#${colorData.body.colors[0]}`;
        //  })
         .then((data) => {
          //  let colorData = data.body.returnItem.colorData
           let iconData = data.body.returnItem.iconData
          //  console.log(colorData);
           iconData.forEach(icon => {
            //  setTimeout(function(){ console.log("test"); }, 500 );
             let imageURL = icon.preview_url;
             console.log(icon)

            //  let imageHolder = document.createElement('div');
            //  imageHolder.classList.add('animContainerL')
            //  imageHolder.innerHTML = `<img src=${imageURL}>`;
            //  document.body.append(imageHolder);

             let animContainerL = document.createElement('div');
             let animContainerR = document.createElement('div');

             animContainerL.classList.add('animContainerL');
             animContainerR.classList.add('animContainerR');

            //  animContainerL.innerHTML = `<div class="maskImage"> </div>`;
            //  animContainerR.innerHTML = `<div class="maskImage"> </div>`;
             animContainerL.innerHTML = `<div class="maskImage" style="-webkit-mask-image: url('${imageURL}');"> </div>`;
             animContainerR.innerHTML = `<div class="maskImage" style="-webkit-mask-image: url('${imageURL}');"> </div>`;
            //  animContainerL.innerHTML = `<img src=${imageURL}>`;
            //  animContainerR.innerHTML = `<img src=${imageURL}>`;





             compContainer.appendChild(animContainerL);
             compContainer.appendChild(animContainerR);

             animContainerL.addEventListener('mouseover',function(e) { changeLocation(animContainerL, animContainerR); })
             animContainerR.addEventListener('mouseover',function(e) { changeLocation(animContainerL, animContainerR); })

             TweenMax.set([animContainerL, animContainerR], { x:window.innerWidth/2, y:window.innerHeight });

             console.log('test');

             animateEl(animContainerL, animContainerR)

           })
         })

}



function random(min, max) {
  return Math.random() * (max - min) + min;
}

function changeLocation(animContainerL, animContainerR) {
  // let endY = random(window.innerHeight/8.5, window.innerHeight/1.15);
  // let endX = random(window.innerWidth/9, window.innerWidth/2);
  let endY = random(window.innerHeight / 4, window.innerHeight / 1.4);
  let endX = random(window.innerWidth / 2, window.innerWidth / 4);
  let rotation = random(0, 360);

  TweenMax.to(animContainerL, 1, {
    y: endY,
    x: endX,
    rotation: rotation,
    ease: Sine.easeInOut,
  })

  TweenMax.to(animContainerR, 1, {
    y: endY,
    x: window.innerWidth - endX,
    rotation: rotation * -1,
    ease: Sine.easeInOut,
  })

}


function animateEl(animContainerL, animContainerR) {

  let tlGenerate = new TimelineLite(),

      // startY = random(window.innerHeight/8.5, window.innerHeight/1.15),
      // startX = random(window.innerWidth/9, window.innerWidth/2),
      startY = random(window.innerHeight / 4, window.innerHeight / 1.4),
      startX = random(window.innerWidth / 2, window.innerWidth / 4),
      endY = random(0, window.innerHeight),
      endX = window.innerWidth / 2,
      rotation = random(0, 360),
      delay = 0,
      scalePure = (endY / window.innerHeight),
      scale = random(0.1, .45)
      // scale = random(0.1, 0.5) * scaleModifier,
  //
  //     // randomColor1 = colors[Math.floor(random(1,colors.length))]
  //
      tlGenerate.fromTo([animContainerL, animContainerR], .5, {
        y: startY,
        x: startX,
        rotation: 0,
        scale: 0,
      }, {
        y: startY,
        x: startX,
        rotation: rotation,
        scale: scale,
        ease:Sine.easeInOut,
        modifiers: {
          x: function(value, animContainer) {
            return (animContainer === animContainerR) ? window.innerWidth - value : value;
          },
          scaleX: function(value, animContainer) {
            return (animContainer === animContainerR) ? -value : value;
          },
          rotation: function(value, animContainer) {
            return (animContainer === animContainerR) ? -value : value;
          }
        }
      }, 'start')

}



// // set image pixel size and hex color
// let color = '33CC33';
//
//
// color = '33CC33';
//
// function changeIconColor() {
//     var canvas = document.createElement("canvas"), // shared instance
//         context = canvas.getContext("2d");
//
//     // set image pixel size and hex color
//
//     canvas.width = 136;
//     canvas.height = 23;
//
//     function desaturate() {
//         var imageData = context.getImageData(0, 0, canvas.width, canvas.height),
//             pixels = imageData.data,
//             i, l, r, g, b, a, average;
//
//         for (i = 0, l = pixels.length; i < l; i += 4) {
//             a = pixels[i + 3];
//             if (a === 0) {
//                 continue;
//             } // skip if pixel is transparent
//
//             r = pixels[i];
//             g = pixels[i + 1];
//             b = pixels[i + 2];
//
//             average = (r + g + b) / 3 >>> 0; // quick floor
//             pixels[i] = pixels[i + 1] = pixels[i + 2] = average;
//         }
//
//         context.putImageData(imageData, 0, 0);
//     }
//
//     function colorize(color, alpha) {
//         context.globalCompositeOperation = "source-atop";
//         context.globalAlpha = alpha;
//         context.fillStyle = color;
//         context.fillRect(0, 0, canvas.width, canvas.height);
//         // reset
//         context.globalCompositeOperation = "source-over";
//         context.globalAlpha = 1.0;
//     }
//
//     return function (iconElement, color, alpha) {
//         context.clearRect(0, 0, canvas.width, canvas.height);
//         context.drawImage(iconElement, 0, 0, canvas.width, canvas.height);
//         desaturate();
//         colorize(color, alpha);
//         return canvas.toDataURL("image/png", 1);
//     };
//
// });
//
//
//
// window.onload = function() {
//   let targets = document.querySelectorAll('.target-image');
//   targets.forEach(target => {
//     target.src = changeIconColor(target, '#' + color, '1');
//   })
// };



// let canvas = document.querySelector("canvas")
// let ctx = canvas.getContext("2d")
// let image = document.querySelector(".testImage")
// // image.crossOrigin="Anonymous";
// console.log(image);
//
// ctx.drawImage(image,0,0);
//
// var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height),
//     pix = imgd.data,
//     uniqueColor = [0,0,255]; // Blue for an example, can change this value to be anything.
//
// for (var i = 0, n = pix.length; i <n; i += 4) {
//       pix[i] = uniqueColor[0];   // Red component
//       pix[i+1] = uniqueColor[1]; // Blue component
//       pix[i+2] = uniqueColor[2]; // Green component
//       //pix[i+3] is the transparency.
// }
//
// ctx.putImageData(imgd, 0, 0);
//
// var newImage = document.querySelector(".newImage");
// newImage.src = canvas.toDataURL("image/png");
//
// canvas.remove()
// image.remove()






// console.log('test');

// $( document ).ready( function() {
    // $( ".mySelector" ).imageMask( "mask.png", null );
// } );