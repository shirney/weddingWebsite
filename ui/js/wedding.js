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
		aboutUsNum: 2
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
	var onChangeImg = function(num, dom) {
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
		$.each($(dom).siblings(), function(index, value) {
			$(value).removeClass("img-btn-active");
		});
		$(dom).addClass("img-btn-active");
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
		$('#aboutUsImgContainer').height($('#aboutUsImg').height()+25);
		$('#aboutUsTextWrapChiao').height($('#aboutUsImg').height()+25);
		$('#aboutUsTextWrapLin').height($('#aboutUsImg').height()+25);
	};
	var addSelectDot = function(num) {
		var domString = '<li class="img-btn" index="{INDEX}"><a></a></li>'.replace("{INDEX}", num);
		var dom = $.parseHTML(domString);
		if (1 === num) {
			$(dom).addClass("img-btn-active");
		}
		$(dom).on('click', function(){
			onChangeImg(num, dom);
		});
		$('#btnRow').append(dom);
	};
	var addBtnRow = function(theme) {
		var aboutUsImgNum = themes[theme].aboutUsNum;
		$('#btnRow').empty();
		if ("NTU" != theme) {
			return;
		}
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
	$("#aboutUsTextWrapLin").on("mouseenter", function(){
		$('#aboutUsImg').stop().animate({opacity:0}, fadeTime);
	});
	$(".aboutUsTextWrapChiao").on("mouseout", function(){
		$('#aboutUsImg').stop().animate({opacity:1}, fadeTime);
	});
/* when and where */
	
/* rsvp */
	// $('#logout').on('click', function(){
	// 	FB.api('/me/permission','delete', function(response) {
	// 		console.log(response);
	// 	});
	// })
	$("[name='isComing']").bootstrapSwitch({
		size: "small",
		onColor: "controller",
		offColor: "danger",
		onText: "好窩",
		offText: "不要咧"

	});
	$('input[name="isComing"]').on('switchChange.bootstrapSwitch', function(event, state) {
		var stat = ["man-steak", "man-vegan", "man-child"];
		if (state) {
			stat.forEach(function(item) {
				$('#'+item).show();
			});
			$("#howmuch").attr("placeholder", window.howmuchPlaceHolderYes);
			$("#emailAddress").attr("placeholder", window.emailPlaceHolderYes);
		} else {
			stat.forEach(function(item) {
				$('#'+item).hide();
			});
			$("#howmuch").attr("placeholder", window.howmuchPlaceHolderNo);
			$("#emailAddress").attr("placeholder", window.emailPlaceHolderNo);
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
	//$("#fb-desc").html(loginTitle);
	$("#howmuch").on('focus', function(event, state) {
		if ($("#isComing").bootstrapSwitch('state')) {
			showMsgBox(howmuchNoteYes);
		} else {
			showMsgBox(howmuchNoteNo);
		}
	});
	$('[name="adults"]').on('change', function() {
		$("#man-steak-text").html(steakText.format($(this).val()));
	});
	$('[name="vegetarians"]').on('change', function() {
		$("#man-vegan-text").html(veganText.format($(this).val()));
	});
	$('[name="children"]').on('change', function() {
		$("#man-children-text").html(childrenText.format($(this).val()));
	});
	$('#wedding-form').validate({ // initialize the plugin
        rules: {
            emailAddress: {
                required: true,
                email: true
            }
        }
    });
	//Submit

	window.getParams = function() {
		var invitationType;
		if ($("[name='invitationType']").bootstrapSwitch('state') || false) {
			invitationType = "mail";
		} else {
			if (jQuery.isEmptyObject($('#emailAddress').val())) {
				invitationType = "none";
			} else {
				invitationType = "email";
			}
		}
		var params = {
			name: jQuery.isEmptyObject($('#name').val()) ? "" : $('#name').val(),
			isComing: $('input[name="isComing"]').bootstrapSwitch('state') || false,
			invitationType: invitationType,
			adults: jQuery.isEmptyObject($('[name="adults"]').val()) ? 1 : parseInt($('[name="adults"]').val()),
			vegetarians: jQuery.isEmptyObject($('[name="vegetarians"]').val()) ? 0 : parseInt($('[name="vegetarians"]').val()),
			children: jQuery.isEmptyObject($('[name="children"]').val()) ? 0 : parseInt($('[name="children"]').val()),
			address: jQuery.isEmptyObject($('#address').val()) ? "" : $('#address').val(),
			emailAddress: jQuery.isEmptyObject($('#emailAddress').val()) ? "" : $('#emailAddress').val(),
			comment: jQuery.isEmptyObject($('#comment').val()) ? "" : $('#comment').val()
		};
		return params;
	};
	window.setParams = function(obj) {
		$('#name').val(obj.name);
		$('input[name="isComing"]').bootstrapSwitch('state', obj.isComing || false);
		if ("none" === obj.invitationType) {
			$('input[name="invitationType"]').bootstrapSwitch('state', false);
			$('#emailAddress').val("");
		} else if ("mail" === obj.invitationType) {
			$('input[name="invitationType"]').bootstrapSwitch('state', true);
			$('#address').val(obj.address || "");
		} else if ("email" === obj.invitationType) {
			$('input[name="invitationType"]').bootstrapSwitch('state', false);
			$('#emailAddress').val(obj.emailAddress || "");
		}
		$('[name="adults"]').rating('rate', obj.adults || 0);
		$('[name="vegetarians"]').rating('rate', obj.vegetarians || 0);
		$('[name="children"]').rating('rate', obj.children || 0);
		$('#comment').val(obj.comment || "");
	};
	window.onSendReq = function() {
		$.ajax({
			type: "POST",
			url: "guest",
			data: JSON.stringify(getParams()),
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
				if ($('input[name="isComing"]').bootstrapSwitch('state')) {
					showSuccessMsgBox(successMsg);
				} else {
					showSuccessMsgBox(thanksMsg);
				}
			},
			error: function() {
				showMsgBox(submitFailed);
				$("#submit").removeClass("pro").removeClass("finish").html("Submit");
			}
		});
	};
	$("#submit").click(function() {
		$("#submit").addClass("pro").html("");
		checkLoginState();
	});
	$("#logout").click(function() {
		$("#logoutMsg").modal('show');
	})
	$("#logoutFB").click(function() {
		FB.logout(hideForm);
	})
	$("#clear-man").click(function(event) {
		event.stopPropagation();
		event.preventDefault();
		$('[name="adults"]').rating('rate', 0);
		$("#man-steak-text").html(steakText.format(0));
	})
	$("#clear-child").click(function(event) {
		event.stopPropagation();
		event.preventDefault();
		$('[name="children"]').rating('rate', 0);
		$("#man-children-text").html(childrenText.format(0));
	})
	$("#clear-vegan").click(function(event) {
		event.stopPropagation();
		event.preventDefault();
		$('[name="vegetarians"]').rating('rate', 0);
		$("#man-vegan-text").html(veganText.format(0));
	})
/* gallery */
	//$("#gallery-title span").html(galleryTitle);
/* overall */
	setAboutUsHeight();
	window.showMsgBox = function(message) {
		$("#sorryMsg-text").html(message);
		$("#sorryMsg").modal('show');
	}
	window.showSuccessMsgBox = function(message) {
		$("#successMsg-text").html(message);
		$('#successMsg').on('hidden.bs.modal', function (e) {
  			$("#submit").removeClass("pro").removeClass("finish").html("Update");
		})
		$("#successMsg").modal('show');
	}
	$(window).on('resize', function() {
		setAboutUsHeight();
	});
	(function() {
		$("img.lazy").lazyload({
			event: "lazyloadman"
		});
	})();
	$(window).bind("load", function() {
    var timeout = setTimeout(function() {
        $("img.lazy").trigger("lazyloadman")
    }, 200);
});
});