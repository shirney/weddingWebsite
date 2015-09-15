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
	var resetAllClass = function() {
		$.each(themes, function(key) {
			$('body').removeClass(key);
			$('#'+key).removeClass('btn-checked');
		});
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
	var onChangeAboutUsImg = function(imgRootPath, theme) {
		var filename = "aboutUs{VERSION}.jpg";
		var path = imgRootPath+filename;
		path = path.replace("{VERSION}", "1");
		$('#aboutUsImg').attr("src", path);
		$('#aboutUsImg').one("load", function() {
			setAboutUsHeight();
		}).each(function() {
			if(this.complete) {
				$(this).load();
			}
		});
		path = imgRootPath+filename;
		path = path.replace("{VERSION}", "1-hover");
		$('#aboutUsImgHover').attr("src", path);
		addBtnRow(theme);
	};
	var onChangeWhenWhereImg = function(imgRootPath) {
		var filename = "transportation.jpg";
		var path = imgRootPath + filename;
		var id = 'whenwhereImg';
		$('#'+id).attr("src", path);
	};
	var onChangeTheme = function(theme) {
		var imgRootPath = "ui/images/{THEME}/".replace("{THEME}", theme);
		resetAllClass();
		$('body').addClass(theme);
		onChangeAboutUsImg(imgRootPath, theme);
		onChangeWhenWhereImg(imgRootPath, theme);
		$('#'+theme).addClass("btn-checked");
		
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
		$('#aboutUsTextWrapChiao').height($('#aboutUsImg').height());
		$('#aboutUsTextWrapLin').height($('#aboutUsImg').height());
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
	// $('#logout').on('click', function(){
	// 	FB.api('/me/permission','delete', function(response) {
	// 		console.log(response);
	// 	});
	// })
	$("[name='coming']").bootstrapSwitch({
		size: "small",
		onColor: "controller",
		offColor: "danger",
		onText: "立馬輸入行事曆",
		offText: "不要咧"

	});
	$('input[name="comming"]').on('switchChange.bootstrapSwitch', function(event, state) {
		var stat = ["adults", "vegetarians", "children"];
		if (state) {
			stat.forEach(function(item) {
				$('#'+item).show();
			});
		} else {
			stat.forEach(function(item) {
				$('#'+item).hide();
			});
		}
	});
	$('[name="adults"]').rating();
	$('[name="vegetarians"]').rating();
	$("[name='invitationType']").bootstrapSwitch({
		size: "small",
		onColor: "controller",
		offColor: "danger",
		onText: "拿個紀念",
		offText: "救地球"
	});
	$('input[name="invitationType"]').on('switchChange.bootstrapSwitch', function(event, state) {
		if (state) {
			$("#address-wrap").show();
			$("#email-address-wrap").hide();
		} else {
			$("#address-wrap").hide();
			$("#email-address-wrap").show();
		}
	});
/* form */
	$("#howmuch").on('focus', function(event, state) {
		$("#sorryMsg").modal('show');
	});
/* overall */
	setAboutUsHeight();
	$(window).on('resize', function() {
		setAboutUsHeight();
	});
});
(function($) {
    // This is the connector function.
    // It connects one item from the navigation carousel to one item from the
    // stage carousel.
    // The default behaviour is, to connect items with the same index from both
    // carousels. This might _not_ work with circular carousels!
    var connector = function(itemNavigation, carouselStage) {
        return carouselStage.jcarousel('items').eq(itemNavigation.index());
    };

    $(function() {
        // Setup the carousels. Adjust the options for both carousels here.
        var carouselStage      = $('.carousel-stage').jcarousel();
        var carouselNavigation = $('.carousel-navigation').jcarousel();

        // We loop through the items of the navigation carousel and set it up
        // as a control for an item from the stage carousel.
        carouselNavigation.jcarousel('items').each(function() {
            var item = $(this);

            // This is where we actually connect to items.
            var target = connector(item, carouselStage);

            item
                .on('jcarouselcontrol:active', function() {
                    carouselNavigation.jcarousel('scrollIntoView', this);
                    item.addClass('active');
                })
                .on('jcarouselcontrol:inactive', function() {
                    item.removeClass('active');
                })
                .jcarouselControl({
                    target: target,
                    carousel: carouselStage
                });
        });

        // Setup controls for the stage carousel
        $('.prev-stage')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.next-stage')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        // Setup controls for the navigation carousel
        $('.prev-navigation')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=3'
            });

        $('.next-navigation')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=3'
            });
    });
})(jQuery);