function comp1() {

  let colors = ['#E87162', '#F2EEEA', '#5F5E5D', '#B4B2AE', '#E24A37'];

  TweenMax.to(document.body, 1, {backgroundColor:colors[0], ease:Sine.easeInOut})
  navButtons.forEach(navButton =>
    TweenMax.to(navButton.querySelector('a'), 1, {color: colors[1], ease: Sine.easeInOut})
  )

  let i = 40;

  while (i--) {
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
    let animations = ['arrow', 'data', 'noSmoking', 'travel', 'trash', 'phone', ]
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
      animR.removeEventListener('config_ready')
    })
  }

  function animateEl(animContainerL, animContainerR) {

    let testFillL = animContainerL.querySelectorAll('.fill > g > path ')
    let testFillR = animContainerR.querySelectorAll('.fill > g > path ')

    let tl = new TimelineLite({onComplete:animateEl, onCompleteParams:[animContainerL, animContainerR]}),
        startY = window.innerHeight + animContainerL.offsetHeight/2 ,
        startX = window.innerWidth / 2 - animContainerL.offsetWidth/2,
        endY = random(0 - animContainerL.offsetHeight / 4, window.innerHeight - window.innerHeight/2),
        endX = random(0, window.innerWidth / 2 - animContainerL.offsetWidth/2),
        rotation = random(0, 360),
        delay = random(1, 6),
        scale = random(.1, .8),
        randomColor1 = colors[Math.floor(random(0,colors.length))],
        randomColor2 = colors[Math.floor(random(0,colors.length))],
        randomColor3 = colors[Math.floor(random(0,colors.length))],
        velocity = 30;

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

}