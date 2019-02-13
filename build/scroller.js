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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {
    var Scroller = function () {
        function Scroller(element, options) {
            _classCallCheck(this, Scroller);

            var self = this;

            //extend by function call
            self.settings = $.extend(true, {}, options);

            self.$element = $(element);

            //extend by data options
            self.data_options = self.$element.data('scroller');
            self.settings = $.extend(true, self.settings, self.data_options);

            this.state = {
                window: {
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
                sectionHeight: 0
            };

            self.init();
        }

        _createClass(Scroller, [{
            key: 'init',
            value: function init() {

                var self = this;

                self.updateViewport();
                self.subscribeScrollEvent();

                $(window).on('resize', function () {
                    self.updateWindowSize();
                });

                $(window).on('scroll', function () {
                    self.updateViewport();
                });
            }
        }, {
            key: 'updateWindowSize',
            value: function updateWindowSize() {
                this.state.window.width = window.innerWidth;
                this.state.window.height = window.innerHeight;
            }
        }, {
            key: 'updateViewport',
            value: function updateViewport() {
                this.state.viewport.top = $(window).scrollTop();
                this.state.viewport.bottom = this.state.viewport.top + this.state.window.height;
            }
        }, {
            key: 'subscribeScrollEvent',
            value: function subscribeScrollEvent() {

                var self = this;

                onResize();
                onResizeScroll();

                $(window).on('resize', function () {
                    onResize();
                });

                $(window).on('scroll resize', function () {
                    onResizeScroll();
                });

                function onResize() {
                    this.state.sectionHeight = self.$element.outerHeight();
                    this.state.sectionOffset.top = self.$element.offset().top;
                    this.state.sectionOffset.bottom = this.state.sectionOffset.top + this.state.sectionHeight;
                    this.state.progress.length = this.state.sectionHeight + self.wh;
                }

                function onResizeScroll() {
                    if (self.viewport_bottom > section_offset_top && self.viewport_top < section_offset_bottom) {

                        self.$element.addClass('active');
                        animation_progress_px = self.viewport_bottom - section_offset_top - animation_length / 2;
                        animation_progress_percent = animation_progress_px / (animation_length / 2);

                        console.log(animation_progress_percent);
                    } else {
                        self.$element.removeClass('active');
                    }
                }
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

/***/ })
/******/ ]);
});