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
            self.settings = $.extend(true, {
               
                test_property: false
                
            }, options);

            self.$element = $(element);

            //extend by data options
            self.data_options = self.$element.data('scroller');
            self.settings = $.extend(true, self.settings, self.data_options);

            self.init();
            
        }

        init(){
            let self = this;
        }
    }


    $.fn.scroller = function() {
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