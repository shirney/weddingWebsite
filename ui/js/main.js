/* main page */
$(function() {
	var introChiao = "
	我是黃國僑，台北人，會是這場婚禮的新郎，另一位是我女朋友，<br>
	她不是我姐不是我妹，更不是我媽（不要懷疑，這一定是我聽過最失禮認錯人），<br>
	喜歡運動，喜歡的程度大概是體脂15%，<br>
	喜歡寫code，所以有了這個網站，<br>
	喜歡黃琇琳，於是我們要結婚了，<br>
	喜歡簡單的生活，興趣就這些些而已，<br>
	我是黃國僑，歡迎大家來參加我們的婚禮。
	";
	var introLin = "
	我叫黃琇琳，高雄人，是這場婚禮的新娘，另一位是我男朋友。 <br>
	請千萬不要把他誤認為我爸 (即使你知道為什麼會誤認，也不要講出來) <br>
	喜歡運動，雖然最近膝蓋不好，但期許自己能再次活蹦亂跳。 <br>
	喜歡寫程式，除了把工作貢獻給程式，也即將把人生交給寫程式的人。 <br>
	喜歡黃國僑，要跟他牽手過一輩子了。 <br>
	喜歡對社會有所貢獻，但還在尋找屬於自己的偉大航道。<br>
	我是黃琇琳，歡迎大家來參加我們的婚禮。
	";
	$('#introChiao').html(introChiao);
	$('#introLin').html(introLin);
	$('a.page-scroll').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top - 50
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});
	var setAboutUsHeight = function(){
		$(aboutUsImgContainer).height($(aboutUsImg).height());
		$(aboutUsTextContainer).height($(aboutUsImg).height());
	};
	setAboutUsHeight();
	$(window).on('resize', function(event) {
		setAboutUsHeight();
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
			if(this.complete) $(this).load();
		});
		path = $('#aboutUsImgHover').attr('src');
		path = path.replace(/aboutUs(\d)-hover.jpg/, "aboutUs"+num+"-hover.jpg");
		$('#aboutUsImgHover').attr("src", path);
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
			if(this.complete) $(this).load();
		});
		path = imgRootPath.replace("{THEME}", theme);
		path = path.replace("{VERSION}", "1-hover");
		$('#aboutUsImgHover').attr("src", path);
		addBtnRow(theme);
	};
	
	$.each(themes, function(key, value) {
		$('#'+key).on('click', function(){
			onChangeTheme(key);
		});
	});
});
var fadeTime = 200;
$(aboutUsImg).on("mouseenter", function(){
	$('#aboutUsImg').stop().animate({opacity:0}, fadeTime);
});
$(aboutUsImg).on("mouseout", function(){
	$('#aboutUsImg').stop().animate({opacity:1}, fadeTime);
});
