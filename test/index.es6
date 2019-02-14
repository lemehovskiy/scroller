require("./sass/style.scss");
require ("jquery");
require('../build/scroller.js');

$(document).ready(function () {
    $('.content-col').each(function(){
        let $progressElement = $(this).find('.progress');

        $(this).on('visible.scroller progress.scroller', function(item, progress){
            $progressElement.text(progress);
        })
    })

    $('.content-col').scroller();
});