import { expect } from 'chai'
import { spy } from 'sinon'
import Sprite from '../src/Sprite'
import { random } from '@danehansen/math'
const cleanup = require('jsdom-global')()

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
  it('moves playhead to progress value', function() {
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
      }, 100)
    }, 100)
  })
})

describe('frameTo', function() {
  it('moves playhead to frame value', function() {
    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, false, 500)
    s.resize(100, 100)
    const rand = random(0, 10, true)
    s.frame(rand)
    expect(s.frame()).to.equal(rand)
    let dest
    do {
      dest = random(0, 10, true)
    } while (dest === rand)
    s.frameTo(dest)
    setTimeout(function() {
      expect(s.frame()).to.equal(dest)
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
  it('plays Sprite once', function() {
    function onComplete() {
      expect(s.progress()).to.equal(1)
    }

    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, false, 500)
    s.resize(100, 100)
    expect(s.progress()).to.equal(0)
    s.addEventListener(Sprite.COMPLETE, onComplete)
    s.play()
  })

  it('resumes Sprite', function() {
    function onComplete() {
      expect(s.progress()).to.equal(1)
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

  it('plays Sprite looped', function() {
    let increment = 0
    function onComplete() {
      increment++
      expect(s.progress()).to.equal(increment)
      if (increment === 5) {
        s.stop()
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
  it('plays Sprite backwards once', function() {
    function onComplete() {
      expect(s.progress()).to.equal(0)
    }

    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, false, 500)
    s.resize(100, 100)
    s.progress(1)
    expect(s.progress()).to.equal(1)
    s.addEventListener(Sprite.COMPLETE, onComplete)
    s.rewind()
  })

  it('resumes Sprite backwards', function() {
    function onComplete() {
      expect(s.progress()).to.equal(0)
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

  it('plays Sprite backwards looped', function() {
    let increment = 0
    function onComplete() {
      increment--
      expect(s.progress()).to.equal(increment)
      if (increment === -5) {
        s.stop()
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
  it('stops playback', function() {
    function onEnterFrame() {
      s.removeEventListener(Sprite.ENTER_FRAME, onEnterFrame)
      const p = s.progress()
      expect(p).to.be.above(0)
      setTimeout(function() {
        expect(s.progress()).to.equal(p)
      }, 100)
    }

    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 11, true, 1000)
    s.resize(100, 100)
    expect(s.progress()).to.equal(0)
    s.addEventListener(Sprite.ENTER_FRAME, onEnterFrame)
    s.play()
  })
})

// TODO test events emmitted in correct places
// TODO changing public properties
