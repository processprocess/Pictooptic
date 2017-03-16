console.clear()
import request from "superagent";
import "gsap";
import ModifiersPlugin from "../node_modules/gsap/ModifiersPlugin.js";
// import "jquery";
// import $ from "jquery";
// import "jqueryimgmask";

const generateButton = document.querySelector('.generate-button');
const compContainer = document.querySelector('.compContainer');
generateButton.addEventListener('submit', generate);

// generate()

function generate(value) {
  // const text = 'lab'
  const text = value;

  // e.preventDefault();
  // const text = (this.querySelector('[name=item]')).value;

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
          //  console.log(colorData);
           let iconData = data.body.returnItem.iconData

           iconData.forEach(icon => {

             let imageURL = icon.preview_url;
             console.log(icon)

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

             animateEl(animContainerL, animContainerR)

           })
         })

}


function changeLocation(animContainerL, animContainerR) {
  // let endY = random(window.innerHeight/8.5, window.innerHeight/1.15);
  // let endX = random(window.innerWidth/9, window.innerWidth/2);
  let endY = random(window.innerHeight / 4, window.innerHeight / 1.4);
  let endX = random(window.innerWidth / 2, window.innerWidth / 4);
  let rotation = random(0, 360);

  TweenMax.to([animContainerL, animContainerR], 1, {
    y: endY,
    x: endX,
    rotation: rotation,
    modifiers: {
      x: function(value, animContainer) {
        return (animContainer === animContainerR) ? window.innerWidth - animContainerL._gsTransform.x : value;
      },
      rotation: function(value, animContainer) {
        return (animContainer === animContainerR) ? animContainerL._gsTransform.rotation * -1 : value;
      }
    },
    ease:Sine.easeInOut
  })

}


function animateEl(animContainerL, animContainerR) {

  let animateEl = new TimelineLite();
  // let startY = random(window.innerHeight/8.5, window.innerHeight/1.15);
  // let startX = random(window.innerWidth/9, window.innerWidth/2);
  let startY = random(window.innerHeight / 4, window.innerHeight / 1.4);
  let startX = random(window.innerWidth / 2, window.innerWidth / 4);
  let endY = random(0, window.innerHeight);
  let endX = window.innerWidth / 2;
  let rotation = random(0, 360);
  let delay = 0;
  let scalePure = (endY / window.innerHeight);
  let scale = random(0.1, .45);
  // let scale = random(0.1, 0.5) * scaleModifier;

  animateEl.fromTo([animContainerL, animContainerR], .5, {
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


function random(min, max) {
  return Math.random() * (max - min) + min;
}

/////////// search window ///////////

const btn = document.querySelector('.btn');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('#close');
const overlayInput = document.querySelector('.overlay input');

btn.addEventListener('click', function(e) { toggleOverlay() })
close.addEventListener('click', function(e) { closeOverlay() })
window.addEventListener('keydown', handleKeydown);

function handleKeydown(e) {
  if (e.keyCode === 27) {
    closeOverlay();
  } else if (e.keyCode === 13) {
    // console.log(overlayInput.value);
    generate(overlayInput.value)
    closeOverlay();
  } else if (e.keyCode) {
    console.log(overlayInput.value);
    if (overlay.classList.contains('fadeIn')) return ;
    overlayInput.value = '';
    toggleOverlay()
    overlayInput.focus()
  }
}

function toggleOverlay() {
  if (!overlay.classList.contains('fadeIn')) overlayInput.value = ''; ;
  overlay.classList.toggle('fadeIn')
  overlayInput.focus()
}

function closeOverlay() {
  if(overlay.classList.contains('fadeIn')) {
    overlay.classList.remove('fadeIn')
  }
}