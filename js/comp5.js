function comp5() {

  let colors = ['#000000', '#464D70', '#757575', '#A1AC88', '#FFFFFF'];

  TweenMax.to(document.body, 1, {backgroundColor:colors[0], ease:Sine.easeOut})
  navButtons.forEach(navButton => TweenMax.to(navButton.querySelector('a'), 1, {color: colors[1], ease: Sine.easeOut}) )

  let totalElements = 20;

  let currentElements = 0;
  let myInterval = setInterval(function(){
    if (currentElements >= totalElements) {
      clearInterval(myInterval)
    } else {
      createEl();
      currentElements++;
    }
  }, 100);

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


  let startYpos = 0

  function animateEl(animContainerL, animContainerR) {

    if (startYpos > window.innerHeight) startYpos = 0;
    startYpos += window.innerHeight / totalElements; totalElements

    let fillL = animContainerL.querySelectorAll('.fill > g > path ')
    let fillR = animContainerR.querySelectorAll('.fill > g > path ')

    let tlGenerate = new TimelineLite({onComplete:animateEl, onCompleteParams:[animContainerL, animContainerR]}),
    // let tlGenerate = new TimelineLite({onComplete:changeLocation, onCompleteParams:[animContainerL, animContainerR]}),
    // let tl = new TimelineLite({onComplete:animateEl, onCompleteParams:[animContainerL, animContainerR]}),

        startY = startYpos,
        // startY = random(window.innerHeight / 4, window.innerHeight / 1.4),
        startX = window.innerWidth/2,
        // startX = random(window.innerWidth / 2, window.innerWidth / 4),
        endY = startY - 200,
        // endY = random(0, window.innerHeight),
        endX = random(window.innerWidth/3,  window.innerWidth/2),
        // endX = window.innerWidth / 2,
        rotation = random(0, 360),
        delay = 0,

        scalePure = (endY / window.innerHeight),
        // scale = random(0.1, 0.6) * scaleModifier,
        scale = (endY / window.innerHeight) * scaleModifier,

        randomColor1 = colors[Math.floor(random(1,colors.length))]

        tlGenerate.fromTo([animContainerL, animContainerR], 2, {
          y: startY,
          x: startX,
          rotation: 0,
          scale: 0,
        }, {
          y: endY,
          x: endX,
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
        .to([animContainerL, animContainerR], 1, {
          // vars,
          y: endY + 200,
          scale: 0,
          ease:Sine.easeInOut,
          // onComplete:functionName
        })

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