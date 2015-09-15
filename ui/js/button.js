$("#reset").hide();

//Submit
$("#submit").click(function() {
    $("#submit").addClass("pro").html("");
    $.post("https://localhost:9000/guest",$("#wedding-form").serialize()).done(function() {
        $('#submit').addClass("finish");
        $("#reset").fadeIn();
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
