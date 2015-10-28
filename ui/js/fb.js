$("#fb-btn").click(function() {
    FB.login(statusChangeCallback);
});
var hideForm = function() {
	$("#form-wrap").height(0);
	$("#button-wrap").hide();
	$(".mb_share").show();
	$("#fb-desc").removeClass("dinner");
	$("#fb-desc").addClass("please-login");
	$("#logoutMsg").modal('hide');
}
var showForm = function() {
	$("#form-wrap").height("auto");
	$("#button-wrap").show();
};
function statusChangeCallback(response, isFirstTime, callback, isSubmit) {
	if (response.status === 'connected') {
		if (true === isSubmit) {
			callback();
			return;
		}
		var auth = response.authResponse;
		$(".mb_share").hide();
		$("#fb-desc").addClass("dinner");
		$("#fb-desc").removeClass("please-login");
		window.accessToken = auth.accessToken;
		window.userID = auth.userID;
		$.ajax({
			type: "GET",
			url: "guest",
			//data: JSON.stringify(getParams()),
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
			success: function(resp) {
				if (jQuery.isEmptyObject(resp)) {
					getFBData();
					return;
				}
				if (jQuery.isEmptyObject(resp)) {
					getFBData();
				} else {
					setParams(resp);
					showForm();
				}
			},
			error: function() {
				console.log(arguments);
			}
		});
		//getFBData();
	} else if (response.status === 'not_authorized' && !isFirstTime) {
		// The person is logged into Facebook, but not your app.
		//showMsgBox(loginAppFailed);
		FB.login(statusChangeCallback);
		$("#submit").removeClass("pro").removeClass("finish").html("Submit");
	} else if (!isFirstTime){
		FB.login(statusChangeCallback);
		$("#submit").removeClass("pro").removeClass("finish").html("Submit");
		//showMsgBox(loginFBFailed);
	}
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response, false, window.onSendReq, true);
	}, true);
}

window.fbAsyncInit = function() {
	FB.init({
		appId: '1670379553175656',
		cookie: true, // enable cookies to allow the server to access 
		// the session
		xfbml: true, // parse social plugins on this page
		version: 'v2.4' // use version 2.2
	});

	// Now that we've initialized the JavaScript SDK, we call 
	// FB.getLoginStatus().  This function gets the state of the
	// person visiting this page and can return one of three states to
	// the callback you provide.  They can be:
	//
	// 1. Logged into your app ('connected')
	// 2. Logged into Facebook, but not your app ('not_authorized')
	// 3. Not logged into Facebook and can't tell if they are logged into
	//    your app or not.
	//
	// These three cases are handled in the callback function.

	FB.getLoginStatus(function(response) {
		statusChangeCallback(response, true);
	});

};

// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s);
	js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function getFBData() {
	FB.api('/me?locale=zh_TW', function(response) {
		$('#name').val(response.name);
		showForm();
	});
}
