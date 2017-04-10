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

anim = bodymovin.loadAnimation(animData);


// document.querySelector('#play').addEventListener('click',function(e) { IntroAnim.play() });
// document.querySelector('#reverse').addEventListener('click',function(e) { IntroAnim.reverse() });

module.exports = IntroAnim;




