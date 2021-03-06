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
                scrollElement: $(window),
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
            this.resizeTimeout = null;

            this.state = {
                isVisible: false,
                windowSize: {
                    width: this.settings.scrollElement.outerWidth(),
                    height: this.settings.scrollElement.outerHeight()
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

            this.setSectionHeight(this.getSectionHeight());
            this.setTriggerOffset()
            this.setViewport();
            this.onResize();
            this.onResizeScroll();
            this.onInit();

            this.settings.scrollElement.on('scroll', function () {
                self.onScroll();
                self.onResizeScroll();
            });

            $(window).on('resize', function () {
                clearTimeout(this.resizeTimeout);

                this.resizeTimeout = setTimeout(() => {
                    self.setTriggerOffset();
                    self.onResize();
                    self.onResizeScroll();
                }, 400)
            });
        }

        getSectionHeight(){
            let sectionHeight = 0;

            if (this.settings.$elementTo) {
                sectionHeight = this.settings.$elementTo.offset().top + this.settings.$elementTo.outerHeight() - this.$element.offset().top;
            }
            else {
                sectionHeight = this.$element.outerHeight();
            }

            return sectionHeight;
        }

        onInit(){
            let progress = this.getProgress();
            if (progress > 1) progress = 1;
            if (progress < 1) progress = 0;
            this.$element.trigger('init.scroller', progress);
        }

        setTriggerOffset() {
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
            this.state.windowSize.width = this.settings.scrollElement.outerWidth();
            this.state.windowSize.height = this.settings.scrollElement.outerHeight();
        }
        setViewport() {
            this.state.viewport.top = this.settings.scrollElement.scrollTop();
            this.state.viewport.bottom = this.state.viewport.top + this.state.windowSize.height;
        }
        setOffset(){
            const $elementOffsetTop = this.$element.offset().top;
            const offsetTop = $elementOffsetTop + this.state.triggerOffset.top.valuePX;
            const offsetBottom = $elementOffsetTop + this.getSectionHeight() + this.state.triggerOffset.bottom.valuePX;
            this.state.sectionOffset.top = offsetTop;
            this.state.sectionOffset.bottom = offsetBottom;
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
            return ((this.state.viewport.bottom - this.state.sectionOffset.top) / this.state.progress.length);
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

        refresh(){
            this.onResize();
            this.setProgress(this.getProgress());
            this.$element.trigger('refresh.scroller', this.state.progress.percent);
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