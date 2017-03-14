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
    return animContainerL
    // animateEl(animContainerL, animContainerR)
    // animR.removeEventListener('DOMLoaded')
  })
}