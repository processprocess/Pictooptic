function comp3() {

  let colors = ['#3B8686', '#CFF09E', '#A8DBA8', '#79BD9A', '#0B486B'];
  // let colors = ['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58'];
  // let colors = ['#C37C82', '#DCDCDE', '#D2D1CF', '#797367', '#9FBDD7'];

  TweenMax.to(document.body, 1, {backgroundColor:colors[0], ease:Sine.easeOut})
  navButtons.forEach(navButton => TweenMax.to(navButton.querySelector('a'), 1, {color: colors[1], ease: Sine.easeOut}) )

  let totalElements = 30;
  let currentElements = 0;
  let myInterval = setInterval(function(){
    createEl();
    currentElements++;
    if (currentElements === totalElements) { clearInterval(myInterval) };
  }, 50);

  function createEl() {

    let compContainer = document.querySelector('.compContainer');
    let animContainerL = document.createElement('div');
    let animContainerR = document.createElement('div');
    animContainerL.classList.add('animContainerL');
    animContainerR.classList.add('animContainerR');
    compContainer.appendChild(animContainerL);
    compContainer.appendChild(animContainerR);

    let animations = ['arrow', 'data', 'noSmoking', 'travel', 'phone', ]
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
    };

    let animR;
    let animDataR = {
        container: animContainerR,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad: true
        },
        path: `animData/${RandomAnim}.json`
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
      animR.removeEventListener('DOMLoaded')
    })
  }

  function animateEl(animContainerL, animContainerR) {

    let fillL = animContainerL.querySelectorAll('.fill > g > path ')
    let fillR = animContainerR.querySelectorAll('.fill > g > path ')

    let tl = new TimelineLite({onComplete:animateEl, onCompleteParams:[animContainerL, animContainerR]}),

        // elementScaledSize = animContainerL.offsetWidth * scale,

        startY = adjustedWindowHeight / 2 - window.innerHeight/7,
        startX = window.innerWidth / 2 - animContainerL.offsetWidth / 2,

        endY = random(-200 + window.innerHeight/7, adjustedWindowHeight - window.innerHeight/7),
        endX = adjustedWindowWidth / 2 -100,
        // endX = random(adjustedWindowWidth / 2, adjustedWindowWidth / 2),
        // endX = random(0, window.innerWidth / 2 ),
        rotation = random(0, 360),
        delay = 0,
        // delay = random(0, 1.5),
        randomColor1 = colors[Math.floor(random(0,colors.length))]

        // scale = (.7 * scaleModifier) * (endY / window.innerHeight),
        // console.log( Math.abs((.7 * scaleModifier) * (endY / window.innerHeight)) );
        scale = (.7 * scaleModifier) * Math.abs((.7 * scaleModifier) * (endY / window.innerHeight) * 2 + .15),
        // scale = random(.1, .7) * scaleModifier,

    tl.fromTo([animContainerL, animContainerR], 1, {
      y: startY,
      x: startX,
      rotation:0,
      scale: 0,
    }, {
      y: endY,
      x: endX,
      rotation: rotation,
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
    .set([ fillL, fillR ], {attr:{ fill:randomColor1}}, 'start')
    .to([animContainerL, animContainerR], .25, {scale:0, ease:Sine.easeIn, delay: 3,});

  }

}