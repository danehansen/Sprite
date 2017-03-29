import { expect } from 'chai'
import { spy } from 'sinon'
import Sprite from '../src/Sprite'
import * as math from '@danehansen/math'
const cleanup = require('jsdom-global')()
import { Cubic } from 'gsap/EasePack'

describe('resize', function() {
  it('resizes Sprite', function() {
    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11)
    s.frame(5)
    s.resize(100, 100)
    expect(div.style.backgroundPosition).to.equal('-100px -100px')
    s.resize(200, 200)
    expect(div.style.backgroundPosition).to.equal('-200px -200px')
  })
})

describe('destroy', function() {
  it('stops progress of sprite and removes all listeners', function(done) {
    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, true, 100)
    s.resize(100, 100)
    const enterFrameSpy = spy()
    s.addEventListener(Sprite.ENTER_FRAME, onEnterFrame)
    s.play()

    function onEnterFrame() {
      enterFrameSpy()
      const progress = s.progress()
      s.destroy()

      setTimeout(function() {
        expect(s.progress()).to.equal(progress)
        expect(enterFrameSpy.callCount).to.equal(1)
        done()
      }, 200)
    }
  })
})

describe('element', function() {
  it('returns element node', function() {
    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, true, 100)
    expect(s.element).to.equal(div)
  })
})

describe('progress', function() {
  document.body.innerHTML = '<div class="test"></div>'
  const div = document.querySelector('.test')
  const s = new Sprite(div, 4, 10, true)
  s.resize(100, 100)

  it('gets progress', function() {
    for (let i = 0; i <= 10; i++) {
      s.frame(i)
      expect(s.progress()).to.equal(i / 10)
    }
  })

  it('sets progress', function() {
    for (let i = -5; i <= 10; i++) {
      s.progress(i / 10)
      const { backgroundPosition } = div.style
      switch(i) {
        case 0:
        case 10:
          expect(backgroundPosition).to.equal('0px 0px')
          break
        case 1:
          expect(backgroundPosition).to.equal('-100px 0px')
          break
        case 2:
          expect(backgroundPosition).to.equal('-200px 0px')
          break
        case 3:
          expect(backgroundPosition).to.equal('-300px 0px')
          break
        case 4:
          expect(backgroundPosition).to.equal('0px -100px')
          break
        case 5:
        case -5:
          expect(backgroundPosition).to.equal('-100px -100px')
          break
        case 6:
        case -4:
          expect(backgroundPosition).to.equal('-200px -100px')
          break
        case 7:
        case -3:
          expect(backgroundPosition).to.equal('-300px -100px')
          break
        case 8:
        case -2:
          expect(backgroundPosition).to.equal('0px -200px')
          break
        case 9:
        case -1:
          expect(backgroundPosition).to.equal('-100px -200px')
          break
      }
    }
  })
})

describe('frame', function() {
  document.body.innerHTML = '<div class="test"></div>'
  const div = document.querySelector('.test')
  const s = new Sprite(div, 4, 11)
  s.resize(100, 100)

  it('gets frame', function() {
    for (let i = 0; i <= 10; i++) {
      s.progress(i / 10)
      expect(s.frame()).to.equal(i)
    }
  })

  it('sets frame', function() {
    for (let i = 0; i <= 10; i++) {
      s.frame(i)
      const { backgroundPosition } = div.style
      switch(i) {
        case 0:
          expect(backgroundPosition).to.equal('0px 0px')
          break
        case 1:
          expect(backgroundPosition).to.equal('-100px 0px')
          break
        case 2:
          expect(backgroundPosition).to.equal('-200px 0px')
          break
        case 3:
          expect(backgroundPosition).to.equal('-300px 0px')
          break
        case 4:
          expect(backgroundPosition).to.equal('0px -100px')
          break
        case 5:
          expect(backgroundPosition).to.equal('-100px -100px')
          break
        case 6:
          expect(backgroundPosition).to.equal('-200px -100px')
          break
        case 7:
          expect(backgroundPosition).to.equal('-300px -100px')
          break
        case 8:
          expect(backgroundPosition).to.equal('0px -200px')
          break
        case 9:
          expect(backgroundPosition).to.equal('-100px -200px')
          break
        case 10:
          expect(backgroundPosition).to.equal('-200px -200px')
          break
      }
    }
  })
})

describe('progressTo', function() {
  it('moves playhead to progress value', function(done) {
    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, false, 500)
    s.resize(100, 100)
    const rand = Math.random()
    s.progress(rand)
    expect(s.progress()).to.equal(rand)
    const dest = Math.random()
    s.progressTo(dest)
    setTimeout(function() {
      expect(s.progress()).to.equal(dest)
      s.progressTo(dest)
      setTimeout(function() {
        expect(s.progress()).to.equal(dest)
        done()
      }, 100)
    }, 100)
  })

  it('changes progress destination mid play', function(done) {
    function onEnterFrame() {
      s.removeEventListener(Sprite.ENTER_FRAME, onEnterFrame)
      s.progressTo(0.2)
      s.progressTo(0.2)
      setTimeout(function() {
        expect(math.round(s.progress(), 0.0001)).to.equal(0.2)
        done()
      }, 100)
    }
    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, false, 500)
    s.resize(100, 100)
    s.progress(0.5)
    s.addEventListener(Sprite.ENTER_FRAME, onEnterFrame)
    s.progressTo(0.8)
  })
})

describe('frames', function() {
  it('returns number of frames', function() {
    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const frames = math.random(5, 20, true)
    const s = new Sprite(div, 4, frames, false, 500)
    expect(s.frames).to.equal(frames)
  })
})

describe('frameTo', function() {
  it('moves playhead to frame value', function(done) {
    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, false, 500)
    s.resize(100, 100)
    const rand = math.random(0, 10, true)
    s.frame(rand)
    expect(s.frame()).to.equal(rand)
    let dest
    do {
      dest = math.random(0, 10, true)
    } while (dest === rand)
    s.frameTo(dest)
    setTimeout(function() {
      expect(s.frame()).to.equal(dest)
      done()
    }, 100)
  })
})

describe('nextFrame', function() {
  document.body.innerHTML = '<div class="test"></div>'
  const div = document.querySelector('.test')
  const s = new Sprite(div, 4, 11)
  s.resize(100, 100)

  it('increments current frame', function() {
    for (let i = 0; i <= 15; i++) {
      const { backgroundPosition } = div.style
      expect(s.frame()).to.equal(Math.min(10, i))
      switch(i) {
        case 0:
          expect(backgroundPosition).to.equal('0px 0px')
          break
        case 1:
          expect(backgroundPosition).to.equal('-100px 0px')
          break
        case 2:
          expect(backgroundPosition).to.equal('-200px 0px')
          break
        case 3:
          expect(backgroundPosition).to.equal('-300px 0px')
          break
        case 4:
          expect(backgroundPosition).to.equal('0px -100px')
          break
        case 5:
          expect(backgroundPosition).to.equal('-100px -100px')
          break
        case 6:
          expect(backgroundPosition).to.equal('-200px -100px')
          break
        case 7:
          expect(backgroundPosition).to.equal('-300px -100px')
          break
        case 8:
          expect(backgroundPosition).to.equal('0px -200px')
          break
        case 9:
          expect(backgroundPosition).to.equal('-100px -200px')
          break
        default:
          expect(backgroundPosition).to.equal('-200px -200px')
          break
      }
      s.nextFrame()
    }
  })
})

describe('prevFrame', function() {
  document.body.innerHTML = '<div class="test"></div>'
  const div = document.querySelector('.test')
  const s = new Sprite(div, 4, 11)
  s.resize(100, 100)
  s.progress(1)

  it('decrements current frame', function() {
    for (let i = 10; i > -5; i--) {
      const { backgroundPosition } = div.style
      expect(s.frame()).to.equal(Math.max(0, i))
      switch(i) {
        case 1:
          expect(backgroundPosition).to.equal('-100px 0px')
          break
        case 2:
          expect(backgroundPosition).to.equal('-200px 0px')
          break
        case 3:
          expect(backgroundPosition).to.equal('-300px 0px')
          break
        case 4:
          expect(backgroundPosition).to.equal('0px -100px')
          break
        case 5:
          expect(backgroundPosition).to.equal('-100px -100px')
          break
        case 6:
          expect(backgroundPosition).to.equal('-200px -100px')
          break
        case 7:
          expect(backgroundPosition).to.equal('-300px -100px')
          break
        case 8:
          expect(backgroundPosition).to.equal('0px -200px')
          break
        case 9:
          expect(backgroundPosition).to.equal('-100px -200px')
          break
        case 10:
          expect(backgroundPosition).to.equal('-200px -200px')
          break
        default:
          expect(backgroundPosition).to.equal('0px 0px')
          break
      }
      s.prevFrame()
    }
  })
})

describe('play', function() {
  it('plays Sprite once', function(done) {
    function onComplete() {
      expect(s.progress()).to.equal(1)
      done()
    }

    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, false, 500)
    s.resize(100, 100)
    expect(s.progress()).to.equal(0)
    s.addEventListener(Sprite.COMPLETE, onComplete)
    s.play()
  })

  it('resumes Sprite', function(done) {
    function onComplete() {
      expect(s.progress()).to.equal(1)
      done()
    }

    function onEnterFrame() {
      const p = s.progress()
      expect(p).to.be.above(0)
      s.removeEventListener(Sprite.ENTER_FRAME, onEnterFrame)
      s.stop()
      setTimeout(function() {
        expect(s.progress()).to.equal(p)
        s.play()
      }, 100)
    }

    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, false, 500)
    s.resize(100, 100)
    expect(s.progress()).to.equal(0)
    s.addEventListener(Sprite.COMPLETE, onComplete)
    s.addEventListener(Sprite.ENTER_FRAME, onEnterFrame)
    s.play()
  })

  it('plays Sprite looped', function(done) {
    let increment = 0
    function onComplete() {
      increment++
      expect(s.progress()).to.equal(increment)
      if (increment === 5) {
        s.stop()
        done()
      }
    }

    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, true, 1000)
    s.resize(100, 100)
    expect(s.progress()).to.equal(0)
    s.addEventListener(Sprite.COMPLETE, onComplete)
    s.play(true)
  })
})

describe('rewind', function() {
  it('plays Sprite backwards once', function(done) {
    function onComplete() {
      expect(s.progress()).to.equal(0)
      done()
    }

    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, false, 500)
    s.resize(100, 100)
    s.progress(1)
    expect(s.progress()).to.equal(1)
    s.addEventListener(Sprite.REWIND_COMPLETE, onComplete)
    s.rewind()
  })

  it('resumes Sprite backwards', function(done) {
    function onComplete() {
      expect(s.progress()).to.equal(0)
      done()
    }

    function onEnterFrame() {
      const p = s.progress()
      expect(p).to.be.below(1)
      s.removeEventListener(Sprite.ENTER_FRAME, onEnterFrame)
      s.stop()
      setTimeout(function() {
        expect(s.progress()).to.equal(p)
        s.rewind()
      }, 100)
    }

    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, false, 500)
    s.resize(100, 100)
    s.progress(1)
    expect(s.progress()).to.equal(1)
    s.addEventListener(Sprite.REWIND_COMPLETE, onComplete)
    s.addEventListener(Sprite.ENTER_FRAME, onEnterFrame)
    s.rewind()
  })

  it('plays Sprite backwards looped', function(done) {
    let increment = 0
    function onComplete() {
      increment--
      expect(s.progress()).to.equal(increment)
      if (increment === -5) {
        s.stop()
        done()
      }
    }

    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, true, 1000)
    s.resize(100, 100)
    expect(s.progress()).to.equal(0)
    s.addEventListener(Sprite.REWIND_COMPLETE, onComplete)
    s.rewind(true)
  })
})

describe('stop', function() {
  it('stops playback', function(done) {
    function onEnterFrame() {
      s.removeEventListener(Sprite.ENTER_FRAME, onEnterFrame)
      s.stop()
      const p = s.progress()
      expect(p).to.be.above(0)
      setTimeout(function() {
        expect(s.progress()).to.equal(p)
        done()
      }, 100)
    }

    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, true, 100)
    s.resize(100, 100)
    expect(s.progress()).to.equal(0)
    s.addEventListener(Sprite.ENTER_FRAME, onEnterFrame)
    s.play()
  })
})

describe('loop', function() {
  it('returns current loop state', function() {
    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, false, 500)
    s.resize(100, 100)
    expect(s.loop()).to.equal(false)
    s.loop(true)
    expect(s.loop()).to.equal(true)
  })

  it('adjusts progress without changing frame when toggled while stopped', function() {
    document.body.innerHTML = '<div class="test"></div>'
    let div = document.querySelector('.test')
    let s = new Sprite(div, 4, 11, true, 100)
    s.resize(100, 100)

    let progress = math.random(-1,2)
    s.progress(progress)
    let actualFrame = s._actualFrame
    s.loop(false)
    expect(s.progress()).to.not.equal(progress)
    expect(s._actualFrame).to.equal(actualFrame)

    document.body.innerHTML = '<div class="test"></div>'
    div = document.querySelector('.test')
    s = new Sprite(div, 4, 11, false, 100)
    s.resize(100, 100)

    progress = math.random(-1,2)
    s.progress(progress)
    actualFrame = s._actualFrame
    s.loop(true)
    expect(s.progress()).to.not.equal(progress)
    expect(s._actualFrame).to.equal(actualFrame)
  })

  it('progresses as already set when toggled while progressing to and from within boundaries', function(done) {
    document.body.innerHTML = '<div class="testA"></div><div class="testB"></div>'
    const sA = new Sprite(document.querySelector('.testA'), 4, 11, true, 100)
    const sB = new Sprite(document.querySelector('.testB'), 4, 11, false, 100)
    sA.resize(100, 100)
    sB.resize(100, 100)
    sA.progress(Math.random())
    sB.progress(Math.random())
    const destA = Math.random()
    const destB = Math.random()
    sA.progressTo(destA)
    sB.progressTo(destB)
    sA.loop(false)
    sA.loop(true)

    setTimeout(function() {
      expect(sA.progress()).to.equal(destA)
      expect(sB.progress()).to.equal(destB)
      done()
    }, 200)
  })

  it('stops at 1 when set false while playing within boundaries', function(done) {
    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, true, 200)
    s.resize(100, 100)
    s.progress(Math.random() / 2)
    s.addEventListener(Sprite.ENTER_FRAME, onEnterFrame)
    s.play()

    function onEnterFrame() {
      s.loop(false)
      s.removeEventListener(Sprite.ENTER_FRAME, onEnterFrame)

      setTimeout(() => {
        expect(s.progress()).to.equal(1)
        done()
      }, 200)
    }
  })

  it('plays past 1 when set true while playing within boundaries', function(done) {
    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, false, 200)
    s.resize(100, 100)
    s.progress(Math.random() / 2)
    s.addEventListener(Sprite.ENTER_FRAME, onEnterFrame)
    s.play()

    function onEnterFrame() {
      s.loop(true)
      s.removeEventListener(Sprite.ENTER_FRAME, onEnterFrame)

      setTimeout(() => {
        expect(s.progress()).to.be.above(1)
        s.stop()
        done()
      }, 200)
    }
  })

  it('stops at 0 when set false while rewinding within boundaries', function(done) {
    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, true, 200)
    s.resize(100, 100)
    s.progress(math.random(0.5, 1))
    s.addEventListener(Sprite.ENTER_FRAME, onEnterFrame)
    s.rewind()

    function onEnterFrame() {
      s.loop(false)
      s.removeEventListener(Sprite.ENTER_FRAME, onEnterFrame)

      setTimeout(() => {
        expect(s.progress()).to.equal(0)
        done()
      }, 200)
    }
  })

  it('rewinds past 0 when set true while rewinding within boundaries', function(done) {
    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, true, 200)
    s.resize(100, 100)
    s.progress(math.random(0.5, 1))
    s.addEventListener(Sprite.ENTER_FRAME, onEnterFrame)
    s.rewind()

    function onEnterFrame() {
      s.loop(true)
      s.removeEventListener(Sprite.ENTER_FRAME, onEnterFrame)

      setTimeout(() => {
        expect(s.progress()).to.be.below(0)
        s.stop()
        done()
      }, 200)
    }
  })

  it('sets progress to moduloed value then progresses to moduloed destination when set false while progressing out of boundaries', function(done) {
    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, true, 400)
    s.resize(100, 100)

    s.progress(math.random(-1,2))
    s.addEventListener(Sprite.ENTER_FRAME, onEnterFrame)
    const dest = math.randomChoice([math.random(1,2), math.random(0,-1)])
    s.progressTo(dest)

    function onEnterFrame() {
      s.removeEventListener(Sprite.ENTER_FRAME, onEnterFrame)
      const progress = s.progress()
      s.loop(false)
      expect(math.round(s.progress())).to.equal(math.round(math.modulo(progress, 1)))

      setTimeout(function() {
        expect(s.progress()).to.equal(math.modulo(dest, 1))
        done()
      }, 200)
    }
  })

  it('sets progress to moduloed value then plays when set false while playing', function(done) {
    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, true, 100)
    s.resize(100, 100)

    s.progress(math.randomChoice([math.random(-1,0), math.random(1,2)]))
    s.addEventListener(Sprite.ENTER_FRAME, onEnterFrame)
    s.play()

    function onEnterFrame() {
      s.removeEventListener(Sprite.ENTER_FRAME, onEnterFrame)
      const progress = s.progress()
      s.loop(false)
      expect(math.round(s.progress())).to.equal(math.round(math.modulo(progress, 1)))

      setTimeout(function() {
        expect(s.progress()).to.equal(1)
        done()
      }, 200)
    }
  })

  it('sets progress to moduloed value then rewinds when set false while rewinding', function(done) {
    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, true, 100)
    s.resize(100, 100)

    s.progress(math.randomChoice([math.random(-1,0), math.random(1,2)]))
    s.addEventListener(Sprite.ENTER_FRAME, onEnterFrame)
    s.rewind()

    function onEnterFrame() {
      s.removeEventListener(Sprite.ENTER_FRAME, onEnterFrame)
      const progress = s.progress()
      s.loop(false)
      expect(math.round(s.progress())).to.equal(math.round(math.modulo(progress, 1)))

      setTimeout(function() {
        expect(s.progress()).to.equal(0)
        done()
      }, 200)
    }
  })

  describe('frameRate', function() {
    it('sets the speed of playback', function(done) {
      document.body.innerHTML = '<div class="test"></div>'
      const div = document.querySelector('.test')
      const s = new Sprite(div, 4, 11, false, 100)
      s.resize(100, 100)

      let slowDiff
      let fastStart
      s.addEventListener(Sprite.COMPLETE, onSlowComplete)
      const slowStart = Date.now()
      s.play()

      function onSlowComplete() {
        slowDiff = Date.now() - slowStart
        s.removeEventListener(Sprite.COMPLETE, onSlowComplete)
        s.addEventListener(Sprite.COMPLETE, onFastComplete)
        s.frameRate = 200
        s.progress(0)
        setTimeout(() => {
          fastStart = Date.now()
          s.play()
        }, 10)
      }

      function onFastComplete() {
        const fastDiff = Date.now() - fastStart
        expect(fastDiff).to.be.below(slowDiff)
        done()
      }
    })
  })

  describe('ease', function() {
    it('sets the easing equation of playback', function(done) {
      document.body.innerHTML = '<div class="test"></div>'
      const div = document.querySelector('.test')
      const s = new Sprite(div, 4, 11, false, 24)
      s.resize(100, 100)

      const linearTimes = []
      const inOutTimes = []

      s.addEventListener(Sprite.ENTER_FRAME, onLinearEnterFrame)
      s.addEventListener(Sprite.COMPLETE, onLinearComplete)
      s.play()

      function onLinearEnterFrame() {
        linearTimes.push(Date.now())
      }

      function onLinearComplete() {
        s.removeEventListener(Sprite.ENTER_FRAME, onLinearEnterFrame)
        s.removeEventListener(Sprite.COMPLETE, onLinearComplete)
        s.progress(0)
        s.ease = Cubic.easeInOut
        setTimeout(() => {
          s.addEventListener(Sprite.ENTER_FRAME, onInOutEnterFrame)
          s.addEventListener(Sprite.COMPLETE, onInOutComplete)
          s.play()
        }, 10)
      }

      function onInOutEnterFrame() {
        inOutTimes.push(Date.now())
      }

      function onInOutComplete() {
        let diffA = linearTimes[9] - linearTimes[8]
        let diffB = linearTimes[6] - linearTimes[5]
        let diffDiff = Math.abs(diffA - diffB)
        expect(diffDiff).to.be.below(20)

        diffA = inOutTimes[9] - inOutTimes[8]
        diffB = inOutTimes[6] - inOutTimes[5]
        expect(diffB).to.be.below(diffA)
        done()
      }
    })
  })
})
