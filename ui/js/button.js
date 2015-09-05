$("#reset").hide();

//Submit
$("#submit").click(function() {
  $("#submit").addClass("pro").html("");
  //Replace with your server function
  setTimeout(function() { 
    $('#submit').addClass("finish");
    $("#reset").fadeIn();
  }, 2000);
});

//Reset
$("#reset").click(function() {
  $("#submit").removeClass("pro").removeClass("finish").html("Submit");
  $("#reset").fadeOut();
});