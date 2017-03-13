console.clear()

  let currentComp = 'comp1';

  window.onload = () => {
    eval(currentComp)()
  }

  let navButtons = document.querySelectorAll('nav > ul > li');
  navButtons.forEach(navButton => navButton.addEventListener('click', function(e) {
    handleChange(e.target.textContent);
  }))

  function handleChange(nextComp) {
    if (nextComp === currentComp) return;
    currentComp = nextComp;
    let currentAnims = document.querySelectorAll('.compContainer > div');

    TweenMax.to(currentAnims, 1, {opacity:0, ease:Sine.easeInOut, onComplete:completeEvents})

    function completeEvents() {
      handleRemove()
      handleNextComp()
    }

    function handleRemove() {
      currentAnims.forEach(currentAnim => { currentAnim.remove() })
    }

    function handleNextComp() {
      eval(nextComp)()
    }

  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }