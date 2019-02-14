/*
 Version: 1.0.0
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/scroller
 */

'use strict';

(function ($) {
    class Scroller {
        constructor(element, options) {

            let self = this;

            //extend by function call
            this.settings = $.extend(true, {}, options);
            this.$element = $(element);

            //extend by data options
            this.data_options = self.$element.data('scroller');
            this.settings = $.extend(true, self.settings, self.data_options);

            this.state = {
                isVisible: false,
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

            this.init();
        }

        init() {
            let self = this;

            this.updateViewport();
            self.onResize();
            self.onResizeScroll();

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

        updateWindowSize() {
            this.state.window.width = window.innerWidth;
            this.state.window.height = window.innerHeight;
        }

        updateViewport() {
            this.state.viewport.top = $(window).scrollTop();
            this.state.viewport.bottom = this.state.viewport.top + this.state.window.height;
        }
        onScroll() {
            this.updateViewport();
        }

        onResize() {
            this.updateWindowSize();
            this.state.sectionHeight = this.$element.outerHeight();
            this.state.sectionOffset.top = this.$element.offset().top;
            this.state.sectionOffset.bottom = this.state.sectionOffset.top + this.state.sectionHeight;
            this.state.progress.length = this.state.sectionHeight + this.state.window.height;
        }

        onResizeScroll() {
            const isVisible = this.state.viewport.bottom > this.state.sectionOffset.top && this.state.viewport.top < this.state.sectionOffset.bottom;

            if (isVisible) {
                this.state.progress.px = this.state.viewport.bottom - this.state.sectionOffset.top;
                this.state.progress.percent = (this.state.progress.px / this.state.progress.length * 100).toFixed(2);
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
            this.$element.addClass('active');
        }

        onHidden() {
            this.state.isVisible = false;
            this.$element.trigger('hidden.scroller', this.state.progress.percent);
            this.$element.removeClass('active');
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