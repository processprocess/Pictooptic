import bodymovin from 'bodymovin'

let anim;

let animData = {
    container: document.querySelector('.introAnimation'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    rendererSettings: {
    progressiveLoad: false
    },
    path: './images/animation/loadAnim.json'
};

anim = bodymovin.loadAnimation(animData);

class IntroAnim {
  static play(resolve) {
    anim.setDirection(1)
    anim.play();
    anim.addEventListener('complete', function(e) {
      // console.log(anim);
      // console.log(e);
      if (!resolve) return
      resolve()
    })
  }
  static reverse(resolve) {
    anim.setDirection(-1)
    anim.play();
    anim.addEventListener('complete', function(e) {
      // console.log(anim);
      // console.log(e);
      if (!resolve) return
      resolve()
    })
  }
}

module.exports = IntroAnim;




