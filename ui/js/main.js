/* main page */
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
var fadeTime = 800;
$(aboutUsImg).on("mouseenter", function(){
	//$('#aboutUsImgHover').stop().animate({opacity:1}, fadeTime);
    $('#aboutUsImg').stop().animate({opacity:0}, fadeTime);
});
$(aboutUsImg).on("mouseout", function(){
	$('#aboutUsImg').stop().animate({opacity:1}, fadeTime);
    //$('#aboutUsImgHover').stop().animate({opacity:0}, fadeTime);
});
$(aboutUsImgHover).on("mouseout", function(){
	console.log("out");
	$('#aboutUsImg').animate({opacity:1}, fadeTime);
    $('#aboutUsImgHover').animate({opacity:0}, fadeTime);
});
$(aboutUsContainer).height($(aboutUsImg).height());