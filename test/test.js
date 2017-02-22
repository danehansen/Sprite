import { expect } from 'chai'
import { spy } from 'sinon'
import Sprite from '../src/Sprite'
const cleanup = require('jsdom-global')()

// resize

// describe('progress', function() {
//   document.body.innerHTML = '<div class="test"></div>'
//   const div = document.querySelector('.test')
//   const s = new Sprite(div, 4, 11)
//   s._width = s._height = 100 // cheating
//
//   it('gets progress', function() {
//     for (let i = 0; i <= 10; i++) {
//       s.frame(i)
//       expect(s.progress()).to.equal(i / 10)
//     }
//   })
//
//   it('sets progress', function() {
//     for (let i = 0; i <= 10; i++) {
//       s.progress(i / 10)
//       const { backgroundPosition } = div.style
//       switch(i) {
//         case 0:
//           expect(backgroundPosition).to.equal('0px 0px')
//           break
//         case 1:
//           expect(backgroundPosition).to.equal('-100px 0px')
//           break
//         case 2:
//           expect(backgroundPosition).to.equal('-200px 0px')
//           break
//         case 3:
//           expect(backgroundPosition).to.equal('-300px 0px')
//           break
//         case 4:
//           expect(backgroundPosition).to.equal('0px -100px')
//           break
//         case 5:
//           expect(backgroundPosition).to.equal('-100px -100px')
//           break
//         case 6:
//           expect(backgroundPosition).to.equal('-200px -100px')
//           break
//         case 7:
//           expect(backgroundPosition).to.equal('-300px -100px')
//           break
//         case 8:
//           expect(backgroundPosition).to.equal('0px -200px')
//           break
//         case 9:
//           expect(backgroundPosition).to.equal('-100px -200px')
//           break
//         case 10:
//           expect(backgroundPosition).to.equal('-200px -200px')
//           break
//       }
//     }
//   })
// })
//
// describe('frame', function() {
//   document.body.innerHTML = '<div class="test"></div>'
//   const div = document.querySelector('.test')
//   const s = new Sprite(div, 4, 11)
//   s._width = s._height = 100 // cheating
//
//   it('gets frame', function() {
//     for (let i = 0; i <= 10; i++) {
//       s.progress(i / 10)
//       expect(s.frame()).to.equal(i)
//     }
//   })
//
//   it('sets frame', function() {
//     for (let i = 0; i <= 10; i++) {
//       s.frame(i)
//       const { backgroundPosition } = div.style
//       switch(i) {
//         case 0:
//           expect(backgroundPosition).to.equal('0px 0px')
//           break
//         case 1:
//           expect(backgroundPosition).to.equal('-100px 0px')
//           break
//         case 2:
//           expect(backgroundPosition).to.equal('-200px 0px')
//           break
//         case 3:
//           expect(backgroundPosition).to.equal('-300px 0px')
//           break
//         case 4:
//           expect(backgroundPosition).to.equal('0px -100px')
//           break
//         case 5:
//           expect(backgroundPosition).to.equal('-100px -100px')
//           break
//         case 6:
//           expect(backgroundPosition).to.equal('-200px -100px')
//           break
//         case 7:
//           expect(backgroundPosition).to.equal('-300px -100px')
//           break
//         case 8:
//           expect(backgroundPosition).to.equal('0px -200px')
//           break
//         case 9:
//           expect(backgroundPosition).to.equal('-100px -200px')
//           break
//         case 10:
//           expect(backgroundPosition).to.equal('-200px -200px')
//           break
//       }
//     }
//   })
// })
//
// // progressTo
// // frameTo
//
// describe('nextFrame', function() {
//   document.body.innerHTML = '<div class="test"></div>'
//   const div = document.querySelector('.test')
//   const s = new Sprite(div, 4, 11)
//   s._width = s._height = 100 // cheating
//   s.progress(0)
//
//   it('increments current frame', function() {
//     for (let i = 0; i <= 15; i++) {
//       const { backgroundPosition } = div.style
//       expect(s.frame()).to.equal(Math.min(10, i))
//       switch(i) {
//         case 0:
//           expect(backgroundPosition).to.equal('0px 0px')
//           break
//         case 1:
//           expect(backgroundPosition).to.equal('-100px 0px')
//           break
//         case 2:
//           expect(backgroundPosition).to.equal('-200px 0px')
//           break
//         case 3:
//           expect(backgroundPosition).to.equal('-300px 0px')
//           break
//         case 4:
//           expect(backgroundPosition).to.equal('0px -100px')
//           break
//         case 5:
//           expect(backgroundPosition).to.equal('-100px -100px')
//           break
//         case 6:
//           expect(backgroundPosition).to.equal('-200px -100px')
//           break
//         case 7:
//           expect(backgroundPosition).to.equal('-300px -100px')
//           break
//         case 8:
//           expect(backgroundPosition).to.equal('0px -200px')
//           break
//         case 9:
//           expect(backgroundPosition).to.equal('-100px -200px')
//           break
//         default:
//           expect(backgroundPosition).to.equal('-200px -200px')
//           break
//       }
//       s.nextFrame()
//     }
//   })
// })
//
// describe('prevFrame', function() {
//   document.body.innerHTML = '<div class="test"></div>'
//   const div = document.querySelector('.test')
//   const s = new Sprite(div, 4, 11)
//   s._width = s._height = 100 // cheating
//   s.progress(1)
//
//   it('decrements current frame', function() {
//     for (let i = 10; i > -5; i--) {
//       const { backgroundPosition } = div.style
//       expect(s.frame()).to.equal(Math.max(0, i))
//       switch(i) {
//         case 1:
//           expect(backgroundPosition).to.equal('-100px 0px')
//           break
//         case 2:
//           expect(backgroundPosition).to.equal('-200px 0px')
//           break
//         case 3:
//           expect(backgroundPosition).to.equal('-300px 0px')
//           break
//         case 4:
//           expect(backgroundPosition).to.equal('0px -100px')
//           break
//         case 5:
//           expect(backgroundPosition).to.equal('-100px -100px')
//           break
//         case 6:
//           expect(backgroundPosition).to.equal('-200px -100px')
//           break
//         case 7:
//           expect(backgroundPosition).to.equal('-300px -100px')
//           break
//         case 8:
//           expect(backgroundPosition).to.equal('0px -200px')
//           break
//         case 9:
//           expect(backgroundPosition).to.equal('-100px -200px')
//           break
//         case 10:
//           expect(backgroundPosition).to.equal('-200px -200px')
//           break
//         default:
//           expect(backgroundPosition).to.equal('0px 0px')
//           break
//       }
//       s.prevFrame()
//     }
//   })
// })

describe('play', function() {
  // it('plays Sprite once', function() {
  //   function onComplete() {
  //     expect(s.progress()).to.equal(1)
  //   }
  //
  //   document.body.innerHTML = '<div class="test"></div>'
  //   const div = document.querySelector('.test')
  //   const s = new Sprite(div, 4, 11, false, 500)
  //   s._width = s._height = 100 // cheating
  //   s.progress(0)
  //   expect(s.progress()).to.equal(0)
  //   s.addEventListener(Sprite.COMPLETE, onComplete)
  //   s.play()
  // })

  // it('resumes Sprite', function() {
  //   function onComplete() {
  //     expect(s.progress()).to.equal(1)
  //   }
  //
  //   function onEnterFrame() {
  //     const p = s.progress()
  //     expect(p).to.be.above(0)
  //     s.removeEventListener(Sprite.ENTER_FRAME, onEnterFrame)
  //     s.stop()
  //     setTimeout(function() {
  //       expect(s.progress()).to.equal(p)
  //       s.play()
  //     }, 100)
  //   }
  //
  //   document.body.innerHTML = '<div class="test"></div>'
  //   const div = document.querySelector('.test')
  //   const s = new Sprite(div, 4, 11, false, 500)
  //   s._width = s._height = 100 // cheating
  //   s.progress(0)
  //   expect(s.progress()).to.equal(0)
  //   s.addEventListener(Sprite.COMPLETE, onComplete)
  //   s.addEventListener(Sprite.ENTER_FRAME, onEnterFrame)
  //   s.play()
  // })

  it('plays Sprite looped', function() {
    let increment = 0
    function onComplete() {
      increment++
      expect(s.progress()).to.equal(increment)
      console.log('COMPLETE', increment)
      if (increment === 5) {
        console.log('HERE', s._width)
        s.stop()
      }
    }

    document.body.innerHTML = '<div class="test"></div>'
    const div = document.querySelector('.test')
    const s = new Sprite(div, 4, 51, true, 60)
    s._width = s._height = 100 // cheating
    s.progress(0)
    expect(s.progress()).to.equal(0)
    s.addEventListener(Sprite.COMPLETE, onComplete)
    s.play(true)
  })
})
// rewind
// stop
