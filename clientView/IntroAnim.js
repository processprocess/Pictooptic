import bodymovin from 'bodymovin'

let pictoAnimHolder = document.querySelector('.introAnimation');
let ccAnimHolder = document.querySelector('.ccAnimation');

let pictoAnim;
let ccAnim;

let pictoData = {
  container: pictoAnimHolder,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  rendererSettings: {
  progressiveLoad: false
  },
  path: './images/animation/loadAnim.json'
};

let ccData = {
  container: ccAnimHolder,
  renderer: 'svg',
  loop: true,
  autoplay: false,
  rendererSettings: {
  progressiveLoad: false
  },
  path: './images/animation/ccLoading.json'
};

pictoAnim = bodymovin.loadAnimation(pictoData);
ccAnim = bodymovin.loadAnimation(ccData);

let resolve;

class IntroAnim {

  static play(resolveData) {
    resolve = resolveData;
    pictoAnim.setDirection(1)
    pictoAnim.play();
  }

  static reverse(resolveData) {
    resolve = resolveData;
    IntroAnim.stopLoader()
    pictoAnim.setDirection(-1)
    pictoAnim.play();
  }

  static playLoader() {
    ccAnim.loop = true;
    ccAnimHolder.classList.remove('notVisible');
    ccAnim.play();
  }

  static stopLoader() {
    ccAnimHolder.classList.add('notVisible');
    ccAnim.loop = false;
  }

  static errorLoader() {
    setTimeout(function(){
      ccAnim.stop();
      console.log('test');
      ccAnim.loop = false;
    }, 500 );
  }

}

pictoAnim.addEventListener('complete', function(e) {
  if (pictoAnim.currentFrame > 0) {
    IntroAnim.playLoader()
  } else if (pictoAnim.currentFrame === 0) {
  }
  // console.log(pictoAnim);
  // console.log(e);
  if (!resolve) return
  resolve()
})

module.exports = IntroAnim;




