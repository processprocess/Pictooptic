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

  let stats = document.querySelector('.stats')

  let interval = 1,
      ticker = TweenLite.ticker,
      lastUpdate = ticker.time,
      lastFrame = ticker.frame;
  ticker.addEventListener("tick", function() {
      let time = ticker.time;
      if (time - lastUpdate >= interval) {
        stats.textContent = `fps: ${ Math.floor((ticker.frame - lastFrame) / (time - lastUpdate)) }`
          // console.log("fps: ", (ticker.frame - lastFrame) / (time - lastUpdate));
          lastUpdate = time;
          lastFrame = ticker.frame;
      }
  });