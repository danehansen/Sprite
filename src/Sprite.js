import EventDispatcher from '@danehansen/event-dispatcher'
import { modulo } from '@danehansen/math'
import TweenLite from 'gsap/TweenLite'

class Sprite extends EventDispatcher {
  static ENTER_FRAME = 'ENTER_FRAME'
  static COMPLETE = 'COMPLETE'
  static REWIND_COMPLETE = 'REWIND_COMPLETE'

  constructor(element, columns, frames, loop = false, frameRate = 60) {
    super()

    this._loop = loop
    this.frameRate = frameRate
    this._progress = 0
    this._frame = 0
    this._actualFrame = 0
    this._dest = null
    this.ease = 'Linear.easeNone'
    this._element = element
    this._style = element.style
    this._columns = columns
    this._frames = frames

    const rows = Math.ceil(frames / columns)
    this._style.backgroundSize = `${columns * 100}% ${rows * 100}%`
    this.resize()
  }

  destroy = () => {
    TweenLite.killTweensOf(this)
    this.clearEventListeners()
  }

  get element() {
    return this._element
  }

  resize = (width = this._element.offsetWidth, height = this._element.offsetHeight) => {
    this._width = width
    this._height = height
    this._showFrame(this._frame)
  }

  progress = (value) => {
    if (value === undefined) {
      return this._progress
    }
    value = this._limit(value)
    let dispatch
    let forward
    if (this._progress !== value) {
      dispatch = true
      forward = value > this._progress
    }
    this._progress = value
    let dest = this._progressToFrame(value)
    this._frame = dest
    while (dest < 0) {
      dest += this._frames
    }
    dest = dest % this._frames
    if (this._actualFrame !== dest) {
      this._showFrame(dest)
      this.dispatchEvent(Sprite.ENTER_FRAME)
    }
    if (dispatch && value % 1 === 0) {
      this.dispatchEvent(forward ? Sprite.COMPLETE : Sprite.REWIND_COMPLETE)
    }
  }

  frame = (value) => {
    if (value === undefined) {
      return this._frame
    }
    this.progress(this._frameToProgress(value))
  }

  get frames() {
    return this._frames
  }

  progressTo = (num) => {
    num = this._limit(num)
    if (this._progress !== num && this._dest !== num) {
      const dur = Math.abs(num - this._progress) * this._frames / this.frameRate
      if (this._dest !== null) {
        TweenLite.killTweensOf(this)
      }
      this._dest = num
      TweenLite.to(this, dur, {
        ease: this.ease,
        onComplete: this._resetDest,
        progress: num,
      })
    }
  }

  frameTo = (integer) => {
    this.progressTo(this._frameToProgress(integer))
  }

  nextFrame = () => {
    this.frame(this._frame + 1)
  }

  prevFrame = () => {
    this.frame(this._frame - 1)
  }

  play = () => {
    this._loopDir = 1
    this.progressTo(Math.round(this._progress + 0.5))
  }

  rewind = () => {
    this._loopDir = -1
    this.progressTo(Math.round(this._progress - 0.500000001))
  }

  stop = () => {
    this._dest = null
    this._loopDir = null
    TweenLite.killTweensOf(this)
  }

  _showFrame(integer) {
    this._actualFrame = integer
    this._style.backgroundPosition = `${-this._width * (integer % this._columns)}px ${-this._height * Math.floor(integer / this._columns)}px`
  }

  _progressToFrame(num) {
    const progress = num * (this._frames - (this._loop ? 0 : 1))
    if (num < 0) {
      return Math.ceil(progress)
    } else {
      return Math.floor(progress)
    }
  }

  _frameToProgress(integer) {
    if (this._loop) {
      return integer / this._frames
    } else {
      return integer / (this._frames - 1)
    }
  }

  _limit(num) {
    if (this._loop) {
      return num
    } else {
      return Math.max(0, Math.min(num, 1))
    }
  }

  _resetDest = () => {
    this._dest = null
    if (this._loop) {
      if (this._loopDir === 1) {
        this.progressTo(this._progress + 1)
      } else if (this._loopDir === -1) {
        this.progressTo(this._progress - 1)
      }
    } else {
      this._loopDir = null
    }
  }

  loop = (bool) => {
    if (bool === undefined || bool === this._loop) {
      return this._loop
    }

    this._loop = bool
    const tweening = this._dest !== null

    if (!tweening) {
      this.frame(this._actualFrame)
      return
    }

    if (this._progress >= 0 && this._progress <= 1 && this._dest >= 0 && this._dest <= 1 && this._dest !== this._progress) {
      return
    }

    TweenLite.killTweensOf(this)
    const direction = this._loopDir || (this._dest > this._progress ? 1 : -1)
    this._progress = modulo(this._progress, 1)

    if (!this._loopDir) {
      const dest = modulo(this._dest, 1)
      this.progressTo(dest)
      return
    }

    if (direction === 1) {
      this._dest = null
      this.play()
    } else {
      this.rewind()
    }
  }
}

module.exports = Sprite
