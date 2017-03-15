function hazard() {

  let colors = [
                '#AB4231',
                // '#B27569',
                '#231F20',
                // '#91392A',
                // '#E2E4E6',
                // '#FFFFFF',
              ];

  TweenMax.to(document.body, 1, {backgroundColor:colors[0], ease:Sine.easeOut})
  navButtons.forEach(navButton => TweenMax.to(navButton.querySelector('a'), 1, {color: colors[1], ease: Sine.easeOut}) )

  let totalElements = 40;

  let currentElements = 0;
  let myInterval = setInterval(function(){
    if (currentElements >= totalElements) {
      clearInterval(myInterval)
    } else {
      createEl();
      currentElements++;
    }
  }, 50);

  function createEl() {

    let compContainer = document.querySelector('.compContainer');
    let animContainerL = document.createElement('div');
    let animContainerR = document.createElement('div');
    animContainerL.classList.add('animContainerL');
    animContainerR.classList.add('animContainerR');
    compContainer.appendChild(animContainerL);
    compContainer.appendChild(animContainerR);

    let animations = [
      'biosign',
      'bioSuit',
      'blowupfoot',
      'bolt1',
      'bolt2',
      'bolt3',
      'boltperson',
      'bomn',
      'breath',
      'carFall',
      'death',
      'elecFinger',
      'electrocute',
      'exclSign',
      'explode',
      'fall',
      'fingerElec',
      'flame',
      'hazard2',
      'ice',
      'latter',
      'lines',
      'sign',
      'stripes',
      'trip',
      'xSign',
    ]
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
        path: `animData/hazard/${RandomAnim}.json`
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
        path: `animData/hazard/${RandomAnim}.json`
    };

    animL = bodymovin.loadAnimation(animDataL);
    animR = bodymovin.loadAnimation(animDataR);

    animL.addEventListener('complete',function(e) { animL.goToAndStop(0, false); })
    animR.addEventListener('complete',function(e) { animR.goToAndStop(0, false); })

    animContainerL.addEventListener('mouseover',function(e) { animL.play(); animR.play(); changeLocation(animContainerL, animContainerR); })
    animContainerR.addEventListener('mouseover',function(e) { animR.play(); animL.play(); changeLocation(animContainerL, animContainerR); })
    // animContainerL.addEventListener('mouseover',function(e) { animL.play(); animR.play(); changeLocation(animContainerL, animContainerR); })
    // animContainerR.addEventListener('mouseover',function(e) { animR.play(); animL.play(); changeLocation(animContainerL, animContainerR); })

    TweenMax.set([animContainerL, animContainerR], { x:window.innerWidth/2, y:window.innerHeight });

    animR.addEventListener('DOMLoaded',function(e) {
      animateEl(animContainerL, animContainerR)
      animR.removeEventListener('DOMLoaded')
    })
  }

  function changeLocation(animContainerL, animContainerR) {
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

    let fillL = animContainerL.querySelectorAll('.fill > g > path ')
    let fillR = animContainerR.querySelectorAll('.fill > g > path ')

    let tlGenerate = new TimelineLite(),
    // let tl = new TimelineLite({onComplete:animateEl, onCompleteParams:[animContainerL, animContainerR]}),

        startY = random(window.innerHeight / 4, window.innerHeight / 1.4),
        startX = random(window.innerWidth / 2, window.innerWidth / 4),
        endY = random(0, window.innerHeight),
        endX = window.innerWidth / 2,
        rotation = random(0, 360),
        delay = 0,

        scalePure = (endY / window.innerHeight),
        scale = random(0.1, 0.5) * scaleModifier,

        randomColor1 = colors[Math.floor(random(1,colors.length))]

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
          // onComplete:functionName
        }, 'start')
        .set([animContainerL.querySelectorAll('path'), animContainerR.querySelectorAll('path')], {attr:{ stroke:randomColor1}}, 'start')
        .set([ fillL, fillR ], {attr:{ fill:randomColor1}}, 'start')

    // tl.fromTo([animContainerL, animContainerR], 1, {
    //   y: startY,
    //   x: startX,
    //   rotation:0,
    //   scale: 1,
    // }, {
    //   y: endY,
    //   x: endX,
    //   rotation: rotation,
    //   scale: scale,
    //   delay: delay,
    //   ease: Sine.easeOut,
      // modifiers: {
      //   x: function(value, animContainer) {
      //     return (animContainer === animContainerR) ? window.innerWidth - value : value;
      //   },
      //   scaleX: function(value, animContainer) {
      //     return (animContainer === animContainerR) ? -value : value;
      //   },
      //   rotation: function(value, animContainer) {
      //     // counterNum+=.015
      //     return (animContainer === animContainerR) ? -value : value;
      //   }
      // }
    // }, 'start')
    // .set([animContainerL.querySelectorAll('path'), animContainerR.querySelectorAll('path')], {attr:{ stroke:randomColor1}}, 'start')
    // .set([ fillL, fillR ], {attr:{ fill:randomColor1}}, 'start')
    // .to([animContainerL, animContainerR], .25, {scale:0, ease:Sine.easeIn, delay: 3,});

  }

}