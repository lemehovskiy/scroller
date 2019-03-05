require("./sass/style.scss");
require ("jquery");
require('../build/scroller.js');

$(document).ready(function () {
    // $('.content-col').each(function(){
    //     let $progressElement = $(this).find('.progress');
    //
    //     $(this).on('visible.scroller progress.scroller', function(item, progress){
    //         $progressElement.text(progress);
    //     })
    // })
    //
    // $('.content-col').scroller();

    let $slider = $('.demo-section-3 .slider');
    
    $('.demo-section-3').on('visible.scroller progress.scroller', function(item, progress){
        console.log(progress);
    })

    $('.demo-section-3').on('visible.scroller', function(item, progress){
        $slider.addClass('fixed');
    })

    $('.demo-section-3').on('hidden.scroller', function(item, progress){
        $slider.removeClass('fixed');
    })

    $('.demo-section-3').scroller();


});

