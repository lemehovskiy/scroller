(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 Version: 1.0.0
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/scroller
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {
    var Scroller = function () {
        function Scroller(element, options) {
            _classCallCheck(this, Scroller);

            var self = this;

            //extend by function call
            this.settings = $.extend(true, {
                triggerOffset: {
                    top: 0,
                    bottom: 0
                },
                $elementTo: false
            }, options);

            this.$element = $(element);

            //extend by data options
            this.data_options = self.$element.data('scroller');
            this.settings = $.extend(true, self.settings, self.data_options);

            this.availableUnits = ['%', 'vh', 'vw', 'px'];

            this.state = {
                isVisible: false,
                windowSize: {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                viewport: {
                    top: 0,
                    bottom: 0
                },
                sectionOffset: {
                    top: 0,
                    bottom: 0
                },
                progress: {
                    px: 0,
                    percent: 0,
                    length: 0
                },
                sectionHeight: 0,
                triggerOffset: {
                    top: {
                        value: 0,
                        valuePX: 0,
                        units: 'px'
                    },
                    bottom: {
                        value: 0,
                        valuePX: 0,
                        units: 'px'
                    }
                }
            };

            this.init();
        }

        _createClass(Scroller, [{
            key: 'init',
            value: function init() {
                var self = this;

                this.setSectionHeight(this.getSectionHeight());
                this.setTriggerOffset();
                this.setViewport();
                this.onResize();
                this.onResizeScroll();
                this.onInit();

                $(window).on('scroll', function () {
                    self.onScroll();
                });

                $(window).on('resize', function () {
                    self.setTriggerOffset();
                    self.onResize();
                });
                $(window).on('scroll resize', function () {
                    self.onResizeScroll();
                });
            }
        }, {
            key: 'getSectionHeight',
            value: function getSectionHeight() {
                var sectionHeight = 0;

                if (this.settings.$elementTo) {
                    sectionHeight = this.settings.$elementTo.offset().top + this.settings.$elementTo.outerHeight() - this.$element.offset().top;
                } else {
                    sectionHeight = this.$element.outerHeight();
                }

                return sectionHeight;
            }
        }, {
            key: 'onInit',
            value: function onInit() {
                var progress = this.getProgress();
                if (progress > 100) progress = 100;
                if (progress < 100) progress = 0;
                this.$element.trigger('init.scroller', progress);
            }
        }, {
            key: 'setTriggerOffset',
            value: function setTriggerOffset() {
                var triggerOffsetInputValue = this.settings.triggerOffset;
                var _state = this.state,
                    windowSize = _state.windowSize,
                    sectionHeight = _state.sectionHeight,
                    triggerOffset = _state.triggerOffset;
                var availableUnits = this.availableUnits;


                this.setTriggerOffsetUnits({
                    top: typeof triggerOffsetInputValue.top === 'string' ? (0, _helpers.getUnitsFromString)(triggerOffsetInputValue.top, availableUnits) : 'px',
                    bottom: typeof triggerOffsetInputValue.bottom === 'string' ? (0, _helpers.getUnitsFromString)(triggerOffsetInputValue.bottom, availableUnits) : 'px'
                });

                this.setTriggerOffsetValue({
                    top: triggerOffsetInputValue.top,
                    bottom: triggerOffsetInputValue.bottom
                });
                this.setTriggerOffsetValuePX({
                    top: (0, _helpers.getTriggerOffsetPxValue)({
                        triggerOffsetValue: this.state.triggerOffset.top.value,
                        windowSize: windowSize,
                        sectionHeight: sectionHeight,
                        units: triggerOffset.top.units
                    }),
                    bottom: (0, _helpers.getTriggerOffsetPxValue)({
                        triggerOffsetValue: this.state.triggerOffset.bottom.value,
                        windowSize: windowSize,
                        sectionHeight: sectionHeight,
                        units: triggerOffset.bottom.units
                    })
                });
            }
        }, {
            key: 'setTriggerOffsetUnits',
            value: function setTriggerOffsetUnits(units) {
                this.state.triggerOffset.top.units = units.top;
                this.state.triggerOffset.bottom.units = units.bottom;
            }
        }, {
            key: 'setTriggerOffsetValue',
            value: function setTriggerOffsetValue(value) {
                this.state.triggerOffset.top.value = parseFloat(value.top);
                this.state.triggerOffset.bottom.value = parseFloat(value.bottom);
            }
        }, {
            key: 'setTriggerOffsetValuePX',
            value: function setTriggerOffsetValuePX(value) {
                this.state.triggerOffset.top.valuePX = value.top;
                this.state.triggerOffset.bottom.valuePX = value.bottom;
            }
        }, {
            key: 'setSectionHeight',
            value: function setSectionHeight(value) {
                this.state.sectionHeight = value;
            }
        }, {
            key: 'setWindowSize',
            value: function setWindowSize() {
                this.state.windowSize.width = window.innerWidth;
                this.state.windowSize.height = window.innerHeight;
            }
        }, {
            key: 'setViewport',
            value: function setViewport() {
                this.state.viewport.top = $(window).scrollTop();
                this.state.viewport.bottom = this.state.viewport.top + this.state.windowSize.height;
            }
        }, {
            key: 'setOffset',
            value: function setOffset() {
                var $elementOffsetTop = this.$element.offset().top;
                var offsetTop = $elementOffsetTop + this.state.triggerOffset.top.valuePX;
                var offsetBottom = $elementOffsetTop + this.getSectionHeight() + this.state.triggerOffset.bottom.valuePX;
                console.log(offsetTop);
                console.log(offsetBottom);
                this.state.sectionOffset.top = offsetTop;
                this.state.sectionOffset.bottom = offsetBottom;
            }
        }, {
            key: 'setProgressLength',
            value: function setProgressLength() {
                this.state.progress.length = this.state.sectionOffset.bottom - this.state.sectionOffset.top + this.state.windowSize.height;
            }
        }, {
            key: 'onScroll',
            value: function onScroll() {
                this.setViewport();
            }
        }, {
            key: 'onResize',
            value: function onResize() {
                this.setWindowSize();
                this.setSectionHeight(this.$element.outerHeight());
                this.setOffset();
                this.setProgressLength();
            }
        }, {
            key: 'isVisible',
            value: function isVisible() {
                return this.state.viewport.bottom > this.state.sectionOffset.top && this.state.viewport.top < this.state.sectionOffset.bottom;
            }
        }, {
            key: 'setProgress',
            value: function setProgress(progress) {
                this.state.progress.percent = progress;
            }
        }, {
            key: 'getProgress',
            value: function getProgress() {
                return ((this.state.viewport.bottom - this.state.sectionOffset.top) / this.state.progress.length * 100).toFixed(2);
            }
        }, {
            key: 'onResizeScroll',
            value: function onResizeScroll() {
                var isVisible = this.isVisible();

                if (isVisible) {
                    this.setProgress(this.getProgress());
                    this.$element.trigger('progress.scroller', this.state.progress.percent);
                }
                if (isVisible && !this.state.isVisible) {
                    this.onVisible();
                } else if (!isVisible && this.state.isVisible) {
                    this.onHidden();
                }
            }
        }, {
            key: 'onVisible',
            value: function onVisible() {
                this.state.isVisible = true;
                this.$element.trigger('visible.scroller', this.state.progress.percent);
            }
        }, {
            key: 'onHidden',
            value: function onHidden() {
                this.state.isVisible = false;
                this.$element.trigger('hidden.scroller', this.state.progress.percent);
            }
        }, {
            key: 'refresh',
            value: function refresh() {
                this.onResize();
                this.setProgress(this.getProgress());
                this.$element.trigger('refresh.scroller', this.state.progress.percent);
            }
        }]);

        return Scroller;
    }();

    $.fn.scroller = function () {
        var $this = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            length = $this.length,
            i = void 0,
            ret = void 0;
        for (i = 0; i < length; i++) {
            if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == 'object' || typeof opt == 'undefined') $this[i].scroller = new Scroller($this[i], opt);else ret = $this[i].scroller[opt].apply($this[i].scroller, args);
            if (typeof ret != 'undefined') return ret;
        }
        return $this;
    };
})(jQuery);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var getUnitsFromString = exports.getUnitsFromString = function getUnitsFromString(str, units) {
    for (var i = 0; i < units.length; i++) {
        var unit = units[i];
        var reg = new RegExp("\\d+" + unit);

        if (str.match(reg) !== null) return unit;
    }
};

var getTriggerOffsetPxValue = exports.getTriggerOffsetPxValue = function getTriggerOffsetPxValue(_ref) {
    var triggerOffsetValue = _ref.triggerOffsetValue,
        windowSize = _ref.windowSize,
        sectionHeight = _ref.sectionHeight,
        units = _ref.units;

    if (units === 'px') return triggerOffsetValue;else if (units === '%') return sectionHeight / 100 * triggerOffsetValue;else if (units === 'vh') return windowSize.height / 100 * triggerOffsetValue;else if (units === 'vw') return windowSize.width / 100 * triggerOffsetValue;
};

/***/ })
/******/ ]);
});