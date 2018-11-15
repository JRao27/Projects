// Place JQuery Here
/*
$(document).ready(function(){
	console.log("Hellooooo");
	/*alert('hello');
	$("#append").click(function() 
	{	
		
	});
})
*/
$(document).ready(function(){
	var inputText = $("#content").val();

    $("#append").click(function(){
    	var inputText = $("#content").val();
        $("#text").append(inputText);
    });

    $("#replace").click(function(){
    	var inputText = $("#content").val();
        $("#text").empty();
        $("#text").append(inputText);

    });

    $("#font").click(function(){
    	$("#text").css("font-family", "Roboto Condensed");
    });
});