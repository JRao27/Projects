// Place JQuery here


$(document).ready(function(){
	$("#animate").click(function() 
	{	

		var div = $("div");
		var heightDiv = $(div).height()/2;
		var widthDiv = $(div).width()/2;
		div.css("background-color", "green"); 
		div.animate( {
			marginTop: "+=300px"
		}, "fast");
		div.animate({
			marginLeft: "+=300px",
			opacity: 0
		}, "slow");
		div.animate({
			opacity: .8,
			marginTop: "-=300px",
			marginLeft: "-=300px",
			height: heightDiv,
			width: widthDiv
		});
	});
})








// $("#div").click(function() {
// 	alert("what up homie");
// }); 


/*
$(document).ready(function(){
    $("div").click(function(){
        alert("The paragraph was clicked.");
    });
});
*/