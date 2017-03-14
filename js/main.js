console.clear()

  let currentComp = 'comp5';
  let scaleModifier = 1;
  let adjustedWindowHeight = window.innerHeight - 200;
  let adjustedWindowWidth = window.innerWidth - 200;

  window.onload = () => {
    console.log(scaleModifier);
    setScaleModifier(window.innerWidth)
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
      // handleNextComp()
    }

    function handleRemove() {
      currentAnims.forEach(currentAnim => { currentAnim.remove() })
      setTimeout( function() {
        handleNextComp();
      }, 50 );

    }

    function handleNextComp() {
      eval(nextComp)()
    }

  }

  window.addEventListener('resize', function(e) {
    adjustedWindowHeight = window.innerHeight - 200,
    adjustedWindowWidth = window.innerWidth - 200;
    setScaleModifier(window.innerWidth);
    resetComp();
  })

  function setScaleModifier(windowWidth) {
    if (windowWidth > 1200) {
      scaleModifier = 1;
    } else if( windowWidth <= 1200 && windowWidth >= 600) {
      scaleModifier = .8;
    } else if( windowWidth <= 600 ) {
      scaleModifier = .6;
    }
    console.log(scaleModifier);
  }

  function resetComp() {
    let currentAnims = document.querySelectorAll('.compContainer > div');
    currentAnims.forEach(currentAnim => { currentAnim.remove() })
    eval(currentComp)()
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