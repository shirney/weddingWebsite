/* main page */
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 50
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
    $(aboutUsContainer).height($(aboutUsImg).height());
    var removeBodyClass = function() {
    	$('body').removeClass('NTU');
    	$('body').removeClass('Garden');
    	$('body').removeClass('Beach');
    }
    $(NTU).on('click', function(){
    	removeBodyClass();
    	$('body').addClass('NTU')
    });
    $(Garden).on('click', function(){
    	removeBodyClass();
    	$('body').addClass('Garden')
    });
    $(Beach).on('click', function(){
    	removeBodyClass();
    	$('body').addClass('Beach')
    });
});
var fadeTime = 800;
$(aboutUsImg).on("mouseenter", function(){
    $('#aboutUsImg').stop().animate({opacity:0}, fadeTime);
});
$(aboutUsImg).on("mouseout", function(){
	$('#aboutUsImg').stop().animate({opacity:1}, fadeTime);
});
