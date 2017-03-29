'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventDispatcher = typeof __BROWSER__ === 'undefined' ? require('@danehansen/event-dispatcher').default : ((window || {}).danehansen || {}).EventDispatcher || {};

var _ref = typeof __BROWSER__ === 'undefined' ? require('@danehansen/math') : ((window || {}).danehansen || {}).math || {},
    modulo = _ref.modulo;

var TweenLite = typeof __BROWSER__ === 'undefined' ? require('gsap/TweenLite') : (window || {}).TweenLite;

var Sprite = function (_EventDispatcher) {
  _inherits(Sprite, _EventDispatcher);

  function Sprite(element, columns, frames) {
    var loop = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var frameRate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 60;

    _classCallCheck(this, Sprite);

    var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this));

    _this.destroy = function () {
      TweenLite.killTweensOf(_this);
      _this.clearEventListeners();
    };

    _this.resize = function () {
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this._element.offsetWidth;
      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this._element.offsetHeight;

      _this._width = width;
      _this._height = height;
      _this._showFrame(_this._frame);
    };

    _this.progress = function (value) {
      if (value === undefined) {
        return _this._progress;
      }
      value = _this._limit(value);
      var dispatch = void 0;
      var forward = void 0;
      if (_this._progress !== value) {
        dispatch = true;
        forward = value > _this._progress;
      }
      _this._progress = value;
      var dest = _this._progressToFrame(value);
      _this._frame = dest;
      while (dest < 0) {
        dest += _this._frames;
      }
      dest = dest % _this._frames;
      if (_this._actualFrame !== dest) {
        _this._showFrame(dest);
        _this.dispatchEvent(Sprite.ENTER_FRAME);
      }
      if (dispatch && value % 1 === 0) {
        _this.dispatchEvent(forward ? Sprite.COMPLETE : Sprite.REWIND_COMPLETE);
      }
    };

    _this.frame = function (value) {
      if (value === undefined) {
        return _this._frame;
      }
      _this.progress(_this._frameToProgress(value));
    };

    _this.progressTo = function (num) {
      num = _this._limit(num);
      if (_this._progress !== num && _this._dest !== num) {
        var dur = Math.abs(num - _this._progress) * _this._frames / _this.frameRate;
        if (_this._dest !== null) {
          TweenLite.killTweensOf(_this);
        }
        _this._dest = num;
        TweenLite.to(_this, dur, {
          ease: _this.ease,
          onComplete: _this._resetDest,
          progress: num
        });
      }
    };

    _this.frameTo = function (integer) {
      _this.progressTo(_this._frameToProgress(integer));
    };

    _this.nextFrame = function () {
      _this.frame(_this._frame + 1);
    };

    _this.prevFrame = function () {
      _this.frame(_this._frame - 1);
    };

    _this.play = function () {
      _this._loopDir = 1;
      _this.progressTo(Math.round(_this._progress + 0.5));
    };

    _this.rewind = function () {
      _this._loopDir = -1;
      _this.progressTo(Math.round(_this._progress - 0.500000001));
    };

    _this.stop = function () {
      _this._dest = null;
      _this._loopDir = null;
      TweenLite.killTweensOf(_this);
    };

    _this._resetDest = function () {
      _this._dest = null;
      if (_this._loop) {
        if (_this._loopDir === 1) {
          _this.progressTo(_this._progress + 1);
        } else if (_this._loopDir === -1) {
          _this.progressTo(_this._progress - 1);
        }
      } else {
        _this._loopDir = null;
      }
    };

    _this.loop = function (bool) {
      if (bool === undefined || bool === _this._loop) {
        return _this._loop;
      }

      _this._loop = bool;
      var tweening = _this._dest !== null;

      if (!tweening) {
        _this.frame(_this._actualFrame);
        return;
      }

      if (_this._progress >= 0 && _this._progress <= 1 && _this._dest >= 0 && _this._dest <= 1 && _this._dest !== _this._progress) {
        return;
      }

      TweenLite.killTweensOf(_this);
      var direction = _this._loopDir || (_this._dest > _this._progress ? 1 : -1);
      _this._progress = modulo(_this._progress, 1);

      if (!_this._loopDir) {
        var dest = modulo(_this._dest, 1);
        _this.progressTo(dest);
        return;
      }

      if (direction === 1) {
        _this._dest = null;
        _this.play();
      } else {
        _this.rewind();
      }
    };

    _this._loop = loop;
    _this.frameRate = frameRate;
    _this._progress = 0;
    _this._frame = 0;
    _this._actualFrame = 0;
    _this._dest = null;
    _this.ease = 'Linear.easeNone';
    _this._element = element;
    _this._style = element.style;
    _this._columns = columns;
    _this._frames = frames;

    var rows = Math.ceil(frames / columns);
    _this._style.backgroundSize = columns * 100 + '% ' + rows * 100 + '%';
    _this.resize();
    return _this;
  }

  _createClass(Sprite, [{
    key: '_showFrame',
    value: function _showFrame(integer) {
      this._actualFrame = integer;
      this._style.backgroundPosition = -this._width * (integer % this._columns) + 'px ' + -this._height * Math.floor(integer / this._columns) + 'px';
    }
  }, {
    key: '_progressToFrame',
    value: function _progressToFrame(num) {
      var progress = num * (this._frames - (this._loop ? 0 : 1));
      if (num < 0) {
        return Math.ceil(progress);
      } else {
        return Math.floor(progress);
      }
    }
  }, {
    key: '_frameToProgress',
    value: function _frameToProgress(integer) {
      if (this._loop) {
        return integer / this._frames;
      } else {
        return integer / (this._frames - 1);
      }
    }
  }, {
    key: '_limit',
    value: function _limit(num) {
      if (this._loop) {
        return num;
      } else {
        return Math.max(0, Math.min(num, 1));
      }
    }
  }, {
    key: 'element',
    get: function get() {
      return this._element;
    }
  }, {
    key: 'frames',
    get: function get() {
      return this._frames;
    }
  }]);

  return Sprite;
}(EventDispatcher);

Sprite.ENTER_FRAME = 'ENTER_FRAME';
Sprite.COMPLETE = 'COMPLETE';
Sprite.REWIND_COMPLETE = 'REWIND_COMPLETE';
exports.default = Sprite;
