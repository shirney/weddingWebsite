$("#fb-btn").click(function() {
    FB.login(statusChangeCallback);
});
function statusChangeCallback(response) {
	if (response.status === 'connected') {
		var auth = response.authResponse;
		$(".mb_share").hide();
		$("#fb-desc").html(loginTitleSuccess);
		$("#form-wrap").height("auto");
		$("#button-wrap").show();
		window.accessToken = auth.accessToken;
		window.userID = auth.userID;
		/*$.ajax({
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
				var obj = jQuery.parseJSON(resp.responseText);
				if (jQuery.isEmptyObject(obj)) {
					getFBData();
				} else {
					setParams(obj);
				}
			},
			error: function() {
				showMsgBox(submitFailed);
			}
		});*/
		getFBData();
	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		showMsgBox(loginAppFailed);
	} else {
		showMsgBox(loginFBFailed);
	}
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
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
		statusChangeCallback(response);
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
	});
}
