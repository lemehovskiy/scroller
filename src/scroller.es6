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

        init() {

            let self = this;

            self.updateViewport();
            self.subscribeScrollEvent();

            $(window).on('resize', function () {
                self.updateWindowSize();
            });

            $(window).on('scroll', function () {
                self.updateViewport();
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

        subscribeScrollEvent() {

            let self = this;

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
                    animation_progress_px = self.viewport_bottom - section_offset_top - (animation_length / 2);
                    animation_progress_percent = animation_progress_px / (animation_length / 2);

                    console.log(animation_progress_percent);

                }

                else {
                    self.$element.removeClass('active');
                }
            }
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