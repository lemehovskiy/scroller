require("./sass/style.scss");

require ("jquery");

require('../build/scroller.js');


$(document).ready(function () {
    $('.img-col').scroller();
});