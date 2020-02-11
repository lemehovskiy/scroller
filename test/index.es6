require("./sass/style.scss");
require("jquery");
require('../build/scroller.js');

$(document).ready(function () {

    function initProgressDemo() {
        $('.content-col').each(function () {
            let $progressElement = $(this).find('.progress');

            $(this).on('visible.scroller progress.scroller', function (item, progress) {
                $progressElement.text(progress);
            })
        })

        $('.content-col').scroller();
    }


    function initSlider() {
        let $sliderSection = $('.slider-section'),
            $slider = $('.slider-section .slider'),
            sliderWidth = $slider.outerWidth(),
            ww = $(window).outerWidth(),
            $sliderProgress = 0;

        $sliderSection.on('progress.scroller refresh.scroller init.scroller', function (item, progress) {
            $sliderProgress = progress;
            handleProgressChange(progress);
        })

        $sliderSection.on('visible.scroller', function (item, progress) {
            $slider.addClass('fixed');
        })

        $sliderSection.on('hidden.scroller', function (item, progress) {
            $slider.removeClass('fixed');
            if (progress < 50) {
                handleProgressChange(0);
            }
            else {
                handleProgressChange(100);
            }
        })

        $sliderSection.scroller({
            triggerOffset: {
                top: '100vh',
                bottom: '-100vh'
            }
        });

        $(window).on('resize', onResize);

        function onResize() {
            ww = $(window).outerWidth();
            handleProgressChange($sliderProgress);
        }

        function handleProgressChange(progress) {
            let roundedProgress = Math.round(progress);
            handlePositionByProgress(roundedProgress)
            TweenMax.to($slider, .5, {x: -(sliderWidth - ww) / 100 * roundedProgress})
        }

        function handlePositionByProgress(progress) {
            if (progress > 50) {
                $slider.addClass('on-bottom');
                $slider.removeClass('on-top');
            }
            else {
                $slider.addClass('on-top');
                $slider.removeClass('on-bottom');
            }
        }
    }

    function initElementToDemo(){

        $('.pack1').on('visible.scroller progress.scroller', function (item, progress) {
            console.log(progress);
        })

        $('.pack1').scroller({
            triggerOffset: {
                top: '50vh',
                bottom: '-100vh'
            },
            $elementTo: $('.pack4')
        });

    }

    initSlider();
    initProgressDemo();




    initElementToDemo();
});

