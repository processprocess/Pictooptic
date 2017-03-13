console.clear()

// click next comp
// current elements shrink
// current elements remove from dom
// background color changes
// next animation cycle starts

  let currentComp = 'comp1';
  let generateEls = true;

  let navButtons = document.querySelectorAll('nav > ul > li');
  navButtons.forEach(navButton => navButton.addEventListener('click', function(e) {
    handleChange(e.target.textContent);
  }))

  function handleChange(nextComp) {
    if (nextComp === currentComp) return;
    generateEls = false;
    currentComp = nextComp;
    let currentAnims = document.querySelectorAll('.compContainer > div');

    // currentAnims.forEach(currentAnim => {
    //   currentAnim.remove()
    // })

  }


  let colors = ['#f00', '#0f0', '#00f'];

  let i = 40;
  while (i-- && generateEls) {
    createEl();
  }

  function createEl() {

    let compContainer = document.querySelector('.compContainer');
    let animContainerL = document.createElement('div');
    let animContainerR = document.createElement('div');
    animContainerL.classList.add('animContainerL');
    animContainerR.classList.add('animContainerR');
    compContainer.appendChild(animContainerL);
    compContainer.appendChild(animContainerR);
    let animations = ['arrow', 'data', 'noSmoking','travel','trash', 'phone', ]
    let RandomAnim = animations[Math.floor(random(0, animations.length))];

    let animL;
    let animDataL = {
        container: animContainerL,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
          progressiveLoad: true
        },
        path: `animData/${RandomAnim}.json`
        // path: 'animData/arrow.json'
    };

    let animR;
    // let animDataR = animDataL;
    // animDataR.container = animContainerR
    let animDataR = {
        container: animContainerR,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad: true
        },
        path: `animData/${RandomAnim}.json`
        // path: 'animData/data.json'
    };

    animL = bodymovin.loadAnimation(animDataL);
    animR = bodymovin.loadAnimation(animDataR);

    animL.addEventListener('complete',function(e) { animL.goToAndStop(0, false); })
    animR.addEventListener('complete',function(e) { animR.goToAndStop(0, false); })
    animContainerL.addEventListener('mouseover',function(e) { animL.play(); animR.play(); })
    animContainerR.addEventListener('mouseover',function(e) { animR.play(); animL.play(); })

    TweenMax.set([animContainerL, animContainerR], { x:window.innerWidth/2, y:window.innerHeight });

    animR.addEventListener('DOMLoaded',function(e) {
      animateEl(animContainerL, animContainerR)
      animR.removeEventListener('config_ready')
    })
  }

  function animateEl(animContainerL, animContainerR) {

    let testFillL = animContainerL.querySelectorAll('.fill > g > path ')
    let testFillR = animContainerR.querySelectorAll('.fill > g > path ')

    let tl = new TimelineLite({onComplete:animateEl, onCompleteParams:[animContainerL, animContainerR]}),
        startY = window.innerHeight + animContainerL.offsetHeight/2 ,
        // startY = window.innerHeight + animContainerL.offsetHeight/2,
        startX = window.innerWidth / 2 - animContainerL.offsetWidth/2,
        endY = random(0 - animContainerL.offsetHeight / 4, window.innerHeight - window.innerHeight/2),
        endX = random(0, window.innerWidth / 2 - animContainerL.offsetWidth/2),
        rotation = random(0, 360),
        delay = random(1, 6),
        scale = random(.1, .8),
        randomColor1 = colors[Math.floor(random(0,3))],
        randomColor2 = colors[Math.floor(random(0,3))],
        randomColor3 = colors[Math.floor(random(0,3))],
        velocity = 30; //pixels per second on descent

    // TweenMax.set([animContainerL.querySelectorAll('path'), animContainerR.querySelectorAll('path')], {attr:{ stroke:randomColor}})

    tl.fromTo([animContainerL, animContainerR], 1, {
      y: startY,
      x: startX,
      rotation:0,
      scale: 0,
    }, {
      y:endY,
      x:endX,
      rotation:rotation,
      scale: scale,
      delay: delay,
      ease: Sine.easeOut,
      modifiers: {
        x: function(value, animContainer) {
          return (animContainer === animContainerR) ? window.innerWidth - value - animContainerR.offsetWidth : value;
        },
        scaleX: function(value, animContainer) {
          return (animContainer === animContainerR) ? -value : value;
        },
        rotation: function(value, animContainer) {
          return (animContainer === animContainerR) ? -value : value;
        }
      }
    }, 'start')
    .set([animContainerL.querySelectorAll('path'), animContainerR.querySelectorAll('path')], {attr:{ stroke:randomColor1}}, 'start')
    .set([ testFillL, testFillR ], {attr:{ fill:randomColor1}}, 'start')
    .to([animContainerL, animContainerR], (startY - endY) / velocity, {y:startY, ease:Linear.easeNone});
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  window.addEventListener('resize',function(e) {
    console.log(window.innerWidth);
  })