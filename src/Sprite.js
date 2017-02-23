const EventDispatcher = typeof __BROWSER__ === 'undefined' ? require('@danehansen/event-dispatcher').default : (((window || {}).danehansen || {}).EventDispatcher || {})
const TweenLite = typeof __BROWSER__ === 'undefined' ? require('gsap/TweenLite') : (window || {}).TweenLite

export default class Sprite extends EventDispatcher {
	static ENTER_FRAME = 'ENTER_FRAME'
	static COMPLETE = 'COMPLETE'
	static REWIND_COMPLETE = 'REWIND_COMPLETE'

	constructor(element, columns, frames, loop = false, frameRate = 60) {
		super()

		this.loop = loop
		this.frameRate = frameRate
		this._progress = 0
		this._frame = 0
		this._actualFrame = 0
		this._dest = null
		this.ease = 'Linear.easeNone'
		this.element = element
		this._style = element.style
		this._columns = columns
		this._frames = frames

		const rows = Math.ceil(frames / columns)
		this._style.backgroundSize = `${columns * 100}% ${rows * 100}%`
		this.resize()
	}

	resize = (width = this.element.offsetWidth, height = this.element.offsetHeight) => {
		this._width = width
		this._height = height
		this._showFrame(this._frame)
	}

	progress = (value) => {
		if (typeof value === 'undefined') {
			return this._progress
		} else {
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
	}

	frame = (value) => {
		if (typeof value === 'undefined') {
			return this._frame
		} else {
			this.progress(this._frameToProgress(value))
		}
	}

	progressTo = (num) => {
		num = this._limit(num)
		if (this._progress !== num && this._dest !== num) {
			this._dest = num
			const dur = Math.abs(num - this._progress) * this._frames / this.frameRate
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

	play = (loop = false) => { // TODO .play(false) not behaving correctly on looping Sprite
		this._loopDir = loop ? 1 : null
		this.progressTo(Math.round(this._progress + 0.5))
	}

	rewind = (loop = false) => { // TODO .rewind(false) not behaving correctly on looping Sprite
		this._loopDir = loop ? -1 : null
		this.progressTo(Math.round(this._progress - 0.500000001))
	}

	stop = () => {
		this._dest = null
		this._loopDir = null
		TweenLite.killTweensOf(this)
	}

	_showFrame(integer) {
		this._actualFrame = integer
		this.element.style.backgroundPosition = `${-this._width * (integer % this._columns)}px ${-this._height * Math.floor(integer / this._columns)}px`
	}

	_progressToFrame(num) {
		const progress = num * (this._frames - (this.loop ? 0 : 1))
		if (num < 0) {
			return Math.ceil(progress)
		} else {
			return Math.floor(progress)
		}
	}

	_frameToProgress(integer) {
		if (this.loop) {
			return integer / this._frames
		} else {
			return integer / (this._frames - 1)
		}
	}

	_limit(num) {
		if (!this.loop) {
			return Math.max(0, Math.min(num, 1))
		} else {
			return num
		}
	}

	_resetDest = () => {
		this._dest = null
		if (this._loopDir === 1) {
			this.progressTo(this._progress + 1)
		} else if (this._loopDir === -1) {
			this.progressTo(this._progress - 1)
		}
	}
}
