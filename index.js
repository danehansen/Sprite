'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventDispatcher = typeof __BROWSER__ === 'undefined' ? require('@danehansen/event-dispatcher').default : ((window || {}).danehansen || {}).EventDispatcher || {};
var TweenLite = typeof __BROWSER__ === 'undefined' ? require('gsap/TweenLite') : (window || {}).TweenLite;

var Sprite = function (_EventDispatcher) {
	_inherits(Sprite, _EventDispatcher);

	function Sprite(element, columns, frames) {
		var loop = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
		var frameRate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 60;

		_classCallCheck(this, Sprite);

		var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this));

		_initialiseProps.call(_this);

		_this.loop = loop;
		_this.frameRate = frameRate;
		_this._progress = 0;
		_this._frame = 0;
		_this._actualFrame = 0;
		_this._dest = null;
		_this.ease = 'Linear.easeNone';

		if (element) {
			_this.element = element;
			_this._columns = columns;
			_this._frames = frames;
			_this.resize();
		}
		return _this;
	}

	_createClass(Sprite, [{
		key: '_showFrame',
		value: function _showFrame(integer) {
			this._actualFrame = integer;
			this.element.style.backgroundPosition = -this._width * (integer % this._columns) + 'px ' + -this._height * Math.floor(integer / this._columns) + 'px';
		}
	}, {
		key: '_progressToFrame',
		value: function _progressToFrame(num) {
			var progress = num * (this._frames - (this.loop ? 0 : 1));
			if (num < 0) {
				return Math.ceil(progress);
			} else {
				return Math.floor(progress);
			}
		}
	}, {
		key: '_frameToProgress',
		value: function _frameToProgress(integer) {
			if (this.loop) {
				return integer / this._frames;
			} else {
				return integer / (this._frames - 1);
			}
		}
	}, {
		key: '_limit',
		value: function _limit(num) {
			if (!this.loop) {
				return Math.max(0, Math.min(num, 1));
			} else {
				return num;
			}
		}
	}]);

	return Sprite;
}(EventDispatcher);

Sprite.ENTER_FRAME = 'ENTER_FRAME';
Sprite.COMPLETE = 'COMPLETE';
Sprite.REVERSE_COMPLETE = 'REVERSE_COMPLETE';

var _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.resize = function () {
		_this2._width = _this2.element.offsetWidth;
		_this2._height = _this2.element.offsetHeight;
		_this2._showFrame(_this2._frame);
	};

	this.progress = function (value) {
		if (typeof value === 'undefined') {
			return _this2._progress;
		} else {
			value = _this2._limit(value);
			var dispatch = void 0;
			var forward = void 0;
			if (_this2._progress !== value) {
				dispatch = true;
				forward = value > _this2._progress;
			}
			_this2._progress = value;
			var dest = _this2._progressToFrame(value);
			_this2._frame = dest;
			while (dest < 0) {
				dest += _this2._frames;
			}
			dest = dest % _this2._frames;
			if (_this2._actualFrame !== dest) {
				_this2._showFrame(dest);
				_this2.dispatchEvent(Sprite.ENTER_FRAME);
			}
			if (dispatch && value % 1 == 0) {
				_this2.dispatchEvent(forward ? Sprite.COMPLETE : Sprite.REVERSE_COMPLETE);
			}
		}
	};

	this.frame = function (value) {
		if (typeof value === 'undefined') {
			return _this2._frame;
		} else {
			_this2.progress(_this2._frameToProgress(value));
		}
	};

	this.progressTo = function (num, loopDir) {
		num = _this2._limit(num);
		if (_this2._progress !== num && _this2._dest !== num) {
			_this2._dest = num;
			var dur = Math.abs(num - _this2._progress) * _this2._frames / _this2.frameRate;
			TweenLite.to(_this2, dur, {
				ease: _this2.ease,
				onComplete: _this2._resetDest,
				onCompleteParams: [loopDir],
				progress: num
			});
		}
	};

	this.frameTo = function (integer) {
		_this2.progressTo(_this2._frameToProgress(integer));
	};

	this.nextFrame = function () {
		_this2.frame(_this2._frame + 1);
	};

	this.prevFrame = function () {
		_this2.frame(_this2._frame - 1);
	};

	this.play = function (loop) {
		_this2.progressTo(Math.round(_this2._progress + 0.5), loop === true ? 1 : null);
	};

	this.rewind = function (loop) {
		_this2.progressTo(Math.round(_this2._progress - 0.500000001), loop === true ? -1 : null);
	};

	this.stop = function () {
		_this2._dest = null;
		TweenLite.killTweensOf(_this2);
	};

	this._resetDest = function (loopDir) {
		_this2._dest = null;
		if (loopDir === 1) {
			_this2.progressTo(_this2._progress + 1, loopDir);
		} else if (loopDir === -1) {
			_this2.progressTo(_this2._progress - 1, loopDir);
		}
	};
};

exports.default = Sprite;
