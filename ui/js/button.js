$("#reset").hide();

//Submit
$("#submit").click(function() {
    $("#submit").addClass("pro").html("");
    $.ajax({
        type: "POST",
        url: "https://localhost:9000/guest",
        data: $("#wedding-form").serialize(),
        dataType: "json",
        beforeSend: function(xhr) { 
            xhr.setRequestHeader(
                "Authorization", 
                "Basic " + btoa($("#userID").val() + ":" + $("#accessToken").val())
            );
        },
        success: function() {
            $('#submit').addClass("finish");
            $("#reset").fadeIn();
        }
    });
});

//Reset
$("#reset").click(function() {
    $("#submit").removeClass("pro").removeClass("finish").html("Submit");
    $("#reset").fadeOut();
});

$("#fb-btn").click(function() {
    FB.login(statusChangeCallback);
});
