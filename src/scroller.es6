/*
 Version: 1.0.0
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/scroller
 */

'use strict';

import {getUnitsFromString, getTriggerOffsetPxValue} from './helpers.es6';

(function ($) {
    class Scroller {
        constructor(element, options) {
            let self = this;

            //extend by function call
            this.settings = $.extend(true, {
                triggerOffset: {
                    top: 0,
                    bottom: 0
                }
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

        init() {
            let self = this;

            this.setSectionHeight(this.$element.outerHeight());
            this.initTriggerOffset()
            this.setViewport();
            this.onResize();
            this.onResizeScroll();
            this.onInit();

            $(window).on('scroll', function () {
                self.onScroll();
            });

            $(window).on('resize', function () {
                self.onResize();
            });
            $(window).on('scroll resize', function () {
                self.onResizeScroll();
            });
        }

        onInit(){
            let progress = this.getProgress();

            if (progress > 100) progress = 100;
            if (progress < 100) progress = 0;

            this.$element.trigger('init.scroller', progress);
        }

        initTriggerOffset() {
            const triggerOffsetInputValue = this.settings.triggerOffset;
            const {windowSize, sectionHeight,triggerOffset} = this.state;
            const {availableUnits} = this;

            this.setTriggerOffsetUnits({
                top: typeof triggerOffsetInputValue.top === 'string' ? getUnitsFromString(triggerOffsetInputValue.top, availableUnits) : 'px',
                bottom: typeof triggerOffsetInputValue.bottom === 'string' ? getUnitsFromString(triggerOffsetInputValue.bottom, availableUnits) : 'px'
            });

            this.setTriggerOffsetValue({
                top: triggerOffsetInputValue.top,
                bottom: triggerOffsetInputValue.bottom
            });
            this.setTriggerOffsetValuePX({
                top: getTriggerOffsetPxValue({
                    triggerOffsetValue: this.state.triggerOffset.top.value,
                    windowSize: windowSize,
                    sectionHeight: sectionHeight,
                    units: triggerOffset.top.units
                }),
                bottom: getTriggerOffsetPxValue({
                    triggerOffsetValue: this.state.triggerOffset.bottom.value,
                    windowSize: windowSize,
                    sectionHeight: sectionHeight,
                    units: triggerOffset.bottom.units
                })
            });
        }
        
        setTriggerOffsetUnits(units) {
           this.state.triggerOffset.top.units = units.top;
            this.state.triggerOffset.bottom.units = units.bottom;
        }
        setTriggerOffsetValue(value) {
            this.state.triggerOffset.top.value = parseFloat(value.top);
            this.state.triggerOffset.bottom.value = parseFloat(value.bottom);
        }
        setTriggerOffsetValuePX(value) {
            this.state.triggerOffset.top.valuePX = value.top;
            this.state.triggerOffset.bottom.valuePX = value.bottom;
        }
        setSectionHeight(value){
            this.state.sectionHeight = value;
        }
        setWindowSize() {
            this.state.windowSize.width = window.innerWidth;
            this.state.windowSize.height = window.innerHeight;
        }
        setViewport() {
            this.state.viewport.top = $(window).scrollTop();
            this.state.viewport.bottom = this.state.viewport.top + this.state.windowSize.height;
        }
        setOffset(){
            const $elementOffsetTop = this.$element.offset().top;
            this.state.sectionOffset.top = $elementOffsetTop + this.state.triggerOffset.top.valuePX;
            this.state.sectionOffset.bottom = $elementOffsetTop + this.state.sectionHeight + this.state.triggerOffset.bottom.valuePX;
        }
        setProgressLength(){
            this.state.progress.length = this.state.sectionOffset.bottom - this.state.sectionOffset.top + this.state.windowSize.height
        }

        onScroll() {
            this.setViewport();
        }

        onResize() {
            this.setWindowSize();
            this.setSectionHeight(this.$element.outerHeight());
            this.setOffset();
            this.setProgressLength();
        }

        isVisible(){
            return this.state.viewport.bottom > this.state.sectionOffset.top && this.state.viewport.top < this.state.sectionOffset.bottom;
        }

        setProgress(progress){
            this.state.progress.percent = progress;
        }

        getProgress(){
            return ((this.state.viewport.bottom - this.state.sectionOffset.top) / this.state.progress.length * 100).toFixed(2);
        }

        onResizeScroll() {
            const isVisible = this.isVisible();

            if (isVisible) {
                this.setProgress(this.getProgress());
                this.$element.trigger('progress.scroller', this.state.progress.percent);
            }
            if (isVisible && !this.state.isVisible) {
                this.onVisible();
            }
            else if (!isVisible && this.state.isVisible) {
                this.onHidden();
            }
        }

        onVisible() {
            this.state.isVisible = true;
            this.$element.trigger('visible.scroller', this.state.progress.percent);
        }

        onHidden() {
            this.state.isVisible = false;
            this.$element.trigger('hidden.scroller', this.state.progress.percent);
        }
    }

    $.fn.scroller = function () {
        let $this = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            length = $this.length,
            i,
            ret;
        for (i = 0; i < length; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                $this[i].scroller = new Scroller($this[i], opt);
            else
                ret = $this[i].scroller[opt].apply($this[i].scroller, args);
            if (typeof ret != 'undefined') return ret;
        }
        return $this;
    };
})(jQuery);