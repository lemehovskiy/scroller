require("./sass/style.scss");
require("jquery");
require("./jquery.mousewheel.js")
require('../build/scroller.js');


$(window).on('load', function () {
  $('body').mousewheel(function (event, delta) {
    $('.horizontal-scroll__wrapper')[0].scrollTop -= (delta)
  });
});


const initHorizontalScroll = () => {
  const $root = $('.horizontal-scroll');
  const $scrollWrapper = $('.horizontal-scroll__wrapper');
  const $itemsWrapper = $('.horizontal-scroll__items-wrapper');
  const $items = $itemsWrapper.find('.horizontal-scroll__item');

  $('.horizontal-scroll__wrapper').scrollTop(1000);

  let resizeTimeout = null;

  const state = {
    itemsWrapperWidth: 0,
    wrapperWidth: 0,
  }

  const init = () => {
    onResize();

    $root.on('progress.scroller refresh.scroller init.scroller', function (item, progress) {
      handleProgressChange(progress);
    })

    $root.on('hidden.scroller', function (item, progress) {
      if (progress < 0.5) {
        handleProgressChange(0);
      } else {
        handleProgressChange(1);
      }
    })

    $root.scroller({
      scrollElement: $scrollWrapper,
      triggerOffset: {
        top: '100vh',
        bottom: '-100vh'
      }
    });

    $(window).on('resize', function (){
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        onResize();
      }, 400)
    })
  }

  const onResize = () => {
    state.wrapperWidth = $scrollWrapper.outerWidth();
    const totalWidth = getTotalWidth();
    setItemsWrapperWidth(totalWidth);
    setScrollHeight(totalWidth);
  }

  const handleProgressChange = (progress) => {
    TweenMax.to($itemsWrapper, 1, { x: -(state.itemsWrapperWidth - state.wrapperWidth) * progress })
  }

  const setScrollHeight = (height) => {
    $root.height(height)
  }

  const setItemsWrapperWidth = (width) => {
    state.itemsWrapperWidth = width;
    $itemsWrapper.width(width)
  }

  const getTotalWidth = () => {
    let width = 0;

    $items.each(function () {
      width += $(this).outerWidth();
    })

    return width;
  }

  init();
}

$(window).on('load', function () {
  initHorizontalScroll();
})


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

    $sliderSection.on('progress.scroller refresh.scroller init.scroller',
      function (item, progress) {
        $sliderProgress = progress;
        handleProgressChange(progress);
      })

    $sliderSection.on('visible.scroller', function (item, progress) {
      $slider.addClass('fixed');
    })

    $sliderSection.on('hidden.scroller', function (item, progress) {
      $slider.removeClass('fixed');
      if (progress < 0.5) {
        handleProgressChange(0);
      } else {
        handleProgressChange(1);
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
      TweenMax.to($slider, .5, { x: -(sliderWidth - ww) * progress })
    }

    function handlePositionByProgress(progress) {
      if (progress > 0.5) {
        $slider.addClass('on-bottom');
        $slider.removeClass('on-top');
      } else {
        $slider.addClass('on-top');
        $slider.removeClass('on-bottom');
      }
    }
  }

  function initElementToDemo() {

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

