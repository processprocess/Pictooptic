function comp5() {

  // let colors = ['#3B8686', '#CFF09E', '#A8DBA8', '#79BD9A', '#0B486B'];
  // let colors = ['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58'];
  let colors = [
                '#111111',
                'hsl(207, 23%, 70%)',
                // 'hsl(207, 23%, 70%)',
                // '#42433F',
                // '#FC4000',
                // '#E23C03',
                // '#FFFFFF',
              ];

  TweenMax.to(document.body, 1, {backgroundColor:colors[0], ease:Sine.easeOut})
  navButtons.forEach(navButton => TweenMax.to(navButton.querySelector('a'), 1, {color: colors[1], ease: Sine.easeOut}) )

  let totalElements = 20;
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

  let counterNum = 0;

  function animateEl(animContainerL, animContainerR) {



        let fillL = animContainerL.querySelectorAll('.fill > g > path ')
        let fillR = animContainerR.querySelectorAll('.fill > g > path ')

        let tl = new TimelineLite({onComplete:animateEl, onCompleteParams:[animContainerL, animContainerR]}),

            startY = window.innerHeight,
            startX = window.innerWidth / 2,
            endY = random(0, window.innerHeight),
            endX = window.innerWidth / 2,
            rotation = random(0, 360),
            delay = 0,

            scalePure = (endY / window.innerHeight),
            // scalePure = (.7) * Math.abs((.7) * (endY / window.innerHeight) * 2 + .15),
            scale = (.7 * scaleModifier) * Math.abs((.7 * scaleModifier) * (endY / window.innerHeight) * 2 + .15),
            // randomColor1 = `hsl( ${scale * 720}, 23%, 70%)`
            // randomColor1 = `hsl( ${scale * 720}, ${scale * 100}%, 70%)`
            // randomColor1 = `hsl( ${scale * 720}, ${scale * 100}%, ${scale * 100}%)`
            // randomColor1 = `hsl( 200, ${scalePure * 200}%, ${scalePure * 100}%)`
            randomColor1 = `hsl( ${counterNum}, 100%, ${scalePure * 100}%)`
            randomColor1 = `hsl( ${counterNum}, 100%, ${scalePure * 100}%)`

            console.log(scalePure);

        tl.fromTo([animContainerL, animContainerR], 1, {
          y: startY,
          x: startX,
          rotation:0,
          scale: 1,
        }, {
          y: endY,
          x: endX,
          rotation: rotation,
          scale: scale,
          delay: delay,
          ease: Sine.easeOut,
          modifiers: {
            x: function(value, animContainer) {
              return (animContainer === animContainerR) ? window.innerWidth - value : value;
            },
            scaleX: function(value, animContainer) {
              return (animContainer === animContainerR) ? -value : value;
            },
            rotation: function(value, animContainer) {
              counterNum+=.015
              return (animContainer === animContainerR) ? -value : value;
            }
          }
        }, 'start')
        .set([animContainerL.querySelectorAll('path'), animContainerR.querySelectorAll('path')], {attr:{ stroke:randomColor1}}, 'start')
        .set([ fillL, fillR ], {attr:{ fill:randomColor1}}, 'start')
        .to([animContainerL, animContainerR], .25, {scale:0, ease:Sine.easeIn, delay: 3,});

  }

}