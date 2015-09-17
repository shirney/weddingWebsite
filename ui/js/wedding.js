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
	$("#fb-desc").html(loginTitle);
	$("#howmuch").on('focus', function(event, state) {
		showMsgBox(howmuchNote);
	});
	//Submit
	var getParams = function() {
		var params = {
			name: jQuery.isEmptyObject($('#name').val()) ? "無名氏" : $('#name').val(),
			comming: $('input[name="coming"]').bootstrapSwitch('state') || false,
			invitationType: $("[name='invitationType']").bootstrapSwitch('state') || false,
			adult: jQuery.isEmptyObject($('[name="adults"]').val()) ? 1 : parseInt($('[name="adults"]').val()),
			vegetarians: jQuery.isEmptyObject($('[name="vegetarians"]').val()) ? 0 : parseInt($('[name="vegetarians"]').val()),
			children: jQuery.isEmptyObject($('[name="children"]').val()) ? 0 : parseInt($('[name="children"]').val()),
			address: jQuery.isEmptyObject($('#address').val()) ? "無家可歸" : $('#address').val(),
			emailAddress: jQuery.isEmptyObject($('#emailAddress').val()) ? "email都沒有怎麼辦" : $('#emailAddress').val(),
			comment: jQuery.isEmptyObject($('#comment').val()) ? "無話可說" : $('#comment').val()
		};
		return params;
	};
	var setParams = function(obj) {
		$('#name').val(obj.name);
		$('input[name="coming"]').bootstrapSwitch('state', obj.coming || false);
		$('input[name="invitationType"]').bootstrapSwitch('state', obj.invitationType || false);
		$('[name="adults"]').rating('rate', obj.adults || 0);
		$('[name="vegetarians"]').rating('rate', obj.vegetarians || 0);
		$('[name="children"]').rating('rate', obj.children || 0);
		$('#address').val(obj.address || "");
		$('#emailAddress').val(obj.emailAddress || "");
		$('#comment').val(obj.comment || "");
	};
	$("#submit").click(function() {
		$("#submit").addClass("pro").html("");
		$.ajax({
			type: "POST",
			url: "https://localhost:5757/guest",
			data: getParams(),
			dataType: "json",
			timeout: 10000,
			beforeSend: function(xhr) { 
				xhr.setRequestHeader(
					"Authorization", 
					"Basic " + btoa(window.userID + ":" + window.accessToken)
				);
				xhr.setRequestHeader(
					"Content-Type", 
					"application/json"
				);
			},
			success: function() {
				$('#submit').addClass("finish");
				$("#reset").fadeIn();
			},
			error: function() {
				showMsgBox(submitFailed);
				$("#submit").removeClass("pro").removeClass("finish").html("Submit");
			}
		});
	});

	//Reset
	$("#reset").click(function() {
		$("#submit").removeClass("pro").removeClass("finish").html("Submit");
		$("#reset").fadeOut();
	});
	$("#reset").hide();
/* gallery */
	$("#gallery-title").html(galleryTitle);
/* overall */
	setAboutUsHeight();
	var showMsgBox = function(message) {
		$("#sorryMsg-text").html(message);
		$("#sorryMsg").modal('show');
	}
	$(window).on('resize', function() {
		setAboutUsHeight();
	});

});