$(function() {
/* navigator */
	$('a.page-scroll').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top - 50
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});
	var themes = {
		"NTU": {
		aboutUsNum: 3
	},	"Garden": {
		aboutUsNum: 1
	},	"Beach": {
		aboutUsNum: 1
	}};
	var defaultTheme = "NTU";
	var removeBodyClass = function() {
		$('body').removeClass('NTU');
		$('body').removeClass('Garden');
		$('body').removeClass('Beach');
	};
	var onChangeImg = function(num) {
		var path = $('#aboutUsImg').attr('src');
		path = path.replace(/aboutUs(\d).jpg/, "aboutUs"+num+".jpg");
		$('#aboutUsImg').attr("src", path);
		$('#aboutUsImg').one("load", function() {
			setAboutUsHeight();
		}).each(function() {
			if(this.complete) {
				$(this).load();
			}
		});
		path = $('#aboutUsImgHover').attr('src');
		path = path.replace(/aboutUs(\d)-hover.jpg/, "aboutUs"+num+"-hover.jpg");
		$('#aboutUsImgHover').attr("src", path);
	};
	var onChangeTheme = function(theme) {
		var imgRootPath = "ui/images/{THEME}/aboutUs{VERSION}.jpg";
		removeBodyClass();
		$('body').addClass(theme);
		var path = imgRootPath.replace("{THEME}", theme);
		path = path.replace("{VERSION}", "1");
		$('#aboutUsImg').attr("src", path);
		$('#aboutUsImg').one("load", function() {
			setAboutUsHeight();
		}).each(function() {
			if(this.complete) {
				$(this).load();
			}
		});
		path = imgRootPath.replace("{THEME}", theme);
		path = path.replace("{VERSION}", "1-hover");
		$('#aboutUsImgHover').attr("src", path);
		addBtnRow(theme);
	};
	
	$.each(themes, function(key) {
		$('#'+key).on('click', function(){
			onChangeTheme(key);
		});
	});
/* home */
/* about us */
	$('#introChiao').html(introChiao);
	$('#introLin').html(introLin);
	var setAboutUsHeight = function(){
		$('#aboutUsImgContainer').height($('#aboutUsImg').height());
		$('#aboutUsTextContainer').height($('#aboutUsImg').height());
	};
	var addSelectDot = function(num) {
		var domString = '<li class="img-btn" index="{INDEX}"><a></a></li>'.replace("{INDEX}", num);
		var dom = $.parseHTML(domString);
		$(dom).on('click', function(){
			onChangeImg(num);
		});
		$('#btnRow').append(dom);
	};
	var addBtnRow = function(theme) {
		var aboutUsImgNum = themes[theme].aboutUsNum;
		$('#btnRow').empty();
		for (var i = 1; i <= aboutUsImgNum; i++) {
			addSelectDot(i);
		}
	};
	addBtnRow(defaultTheme);
	
	var fadeTime = 200;
	$('#aboutUsImg').on("mouseenter", function(){
		$('#aboutUsImg').stop().animate({opacity:0}, fadeTime);
	});
	$('#aboutUsImg').on("mouseout", function(){
		$('#aboutUsImg').stop().animate({opacity:1}, fadeTime);
	});
/* when and where */
/* rsvp */
	
	
/* overall */
	setAboutUsHeight();
	$(window).on('resize', function() {
		setAboutUsHeight();
	});
});