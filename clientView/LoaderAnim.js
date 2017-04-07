import bodymovin from 'bodymovin'

let anim;

let animData = {
    container: document.getElementById('loaderAnimation'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    rendererSettings: {
    progressiveLoad: false
    },
    path: './images/animation/loadAnim.json'
};

class LoaderAnim {
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


// document.querySelector('#play').addEventListener('click',function(e) { LoaderAnim.play() });
// document.querySelector('#reverse').addEventListener('click',function(e) { LoaderAnim.reverse() });

module.exports = LoaderAnim;




