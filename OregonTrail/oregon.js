var gameStart = false;
var choosePerson = false;
var chooseBanker = false;
var chooseCarpenter = false;
var chooseFarmer = false;
var chooseName = false;
var chooseMonth = false;

/*current situation bools */
var currentSituation = false;
var changePace = false;
var milesLeft = 0; 
var betweenTowns = false;
var days = 0; 

/*store bools*/
var chooseStore = false;
var chooseParts = false;
var chooseOxen = false;
var chooseFood = false;
var chooseClothing = false;
var chooseAmmunition = false;
var onSituationMenu = false;
var correctInput = true;

var nextMember = true;
var emptyName = false;

/*Animation variables*/
var oxenMove = 5;
var treeMove = 0; 
var riverMove = 0; 
var next = 0; 


/*Crossing river variables*/
var atRiver = false;
var onFerry = false;
var riverDepth = 0.0;
var riverLength = 0.0;
var ferryPrice = 0.0;
var ferryDays = 0.0; 

/*Disease bools*/
var stopIncr = false;


/*Death variables*/
var deathMile = 0; 
var one = two = three = four = five = false;
var timeVar = true;
var numberDead = 0; 
var numberSick = 0; 
var foundMarker = false;


/*End game variables*/
var finalScoreNum = 0;

var userName = "";
var currentMonth = "";
var currentDay = 1;
var currentYear = 1848;
var monthIndex = 0; 

var nameCount = 0;
var sparePartsNum = 0;
var tempStoreBill = 0;

var team = {
	firstMember: "", 
	secondMember: "",
	thirdMember: "",
	fourthMember: "",
	fifthMember: "",
	pace: "steady",
	milesPerDay: 0, 
	rationsPerDay: 0,
	rations: "meager"
};

var diseaseTeam = {
	firstMember: "", 
	secondMember: "",
	thirdMember: "",
	fourthMember: "",
	fifthMember: ""
};

var store = {
	oxen: 40.00,
	food: 0.20, 
	clothing: 10.00,
	ammunition: 2.00,
	spareParts: {
		wagonWheel: 10.00,
		wagonAxle: 10.00,
		wagonTongue: 10.00
	}
};

var you = {
	job: ""
};
var backpack = {
	money: 0.00,
	oxen: 0.00, 
	food: 0.00,
	clothing: 0.00,
	ammunition: 0.00,
	spareParts: {
		wagonWheel: 0.00,
		wagonAxle: 0.00,
		wagonTongue: 0.00
	}
};

var trip = {
	date: "",
	weather: "cool",
	health: "good",
	food: 0,
	nextLandmark: 0,
	milesTraveled: 0
};


var weather = ['sunny', 'cool', 'windy', 'rainy', 'freezing'];
var diseases = ['dysentery', 'typhoid fever', 'cholera', 'diphtheria', 'measles'];
var health = ['good', 'OK', 'fair', 'poor', 'bad', 'critical', 'dead'];
var healthIndex = 0; 
var daysNoFood = 0; 
var daysWithFood = 0; 
var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
var landmarks = [{ 
"name": "independence",
"distance": 0,
"type": "start"
},
{ 
"name": "Kansas River Crossing",
"distance": 102,
"condition": "safe",
"type": "river"
},
{
"name": "Big Blue River Crossing",
"distance": 83,
"condition": "deep",
"type": "river"	
},
{
"name": "Fort Kearney",
"distance": 119,
"type": "fort"
},
{
"name": "Chimney Rock",
"distance": 250,
"type": "nature"
},
{
"name": "Fort Laramie",
"distance": 86,
"type": "fort"
},
{
"name": "Independence Rock",
"distance": 190,
"type": "nature"
},
{
"name": "Green River",
"distance": 57,
"type": "river"	
},
{
"name": "Soda Springs",
"distance": 144,
"type": "fort"	
},
{
"name": "Fort Hall",
"distance": 57,
"type": "fort"	
},
{
"name": "Snake River Crossing",
"distance": 182,
"type": "river"	
},
{
"name": "Fort Boise",
"distance": 114,
"type": "fort"	
},
{
"name": "Blue Mountains",
"distance": 160,
"type": "nature"	
},
{
"name": "Fort Walla Walla",
"distance": 55,
"type": "fort"	
},
{
"name": "The Dalles",
"distance": 120,
"type": "ford"	
},
{
"name": "Barlow Toll Road",
"distance": 100,
"type": "finalRoad"	
},
{
"name": "Columbia River",
"distance": 0,
"type": "finalRiver"	
}

];
var landmarkIndex = 0; 

/*Start Miscellaneous/Frequently Used Functions*/
function randomNumber(endNum) {
	if (isNaN(endNum)) {
		alert("That isn't a number");
	}
	else {
		var randNum = Math.floor((Math.random() * endNum) + 1);
	}
	var testNum = randNum - 1;
	console.log("random number: " + testNum)
	return (randNum-1); 
}

function normalDots(fxn) {
	var pleaseWork = 0;
	var dotsVar = window.setInterval( function() {
	    var wait = document.getElementById("dotsP");
	    if (pleaseWork === 3) {
	    	fxn();
	    	console.log("normalDots");
	    	clearInterval(dotsVar);
	    }
	    else {
	    	if (wait.innerHTML.length > 12) {
	    		pleaseWork++;
	        	wait.innerHTML = "";
	    	}
	   		else{
	        	wait.innerHTML += ".";
	    	}
	    }
	    
	}, 100);
}

function hideDate() {
	document.getElementById("date").innerHTML = '';

}
function getDate() {
	if (currentDay > 30) {
		currentDay = 1; 
		monthIndex++;
	}

	var finalString = months[monthIndex] + " " + currentDay + ", " + currentYear;

	return finalString;
 }

function getWeather() {
 	var randWeather = randomNumber(weather.length); 
 	var finalWeather = weather[randWeather];

 	return finalWeather;
}

function getDaysToNext() {
	var totalMiles = landmarks[landmarkIndex].distance; 
	var days = Math.ceil(totalMiles/team.milesPerDay); 
	return days;
}


/*End Miscellaneous/Frequently Used Functions*/

/*Start crossing river*/

function displayRiverInfo() {
	document.getElementById("windowPara").innerHTML = "Ford -- Pull your wagon across a shallow part of the river with oxen" + "<br>" + 
	"Caulk -- Seal wagon so no water can get in" + "<br>" + 
	"Ferry -- Put wagon on boat. Owner will take your wagon across the river" + "<br><br>" + 
	"Press 'space bar' to return to previous menu";

	document.body.onkeyup = function(e){
    	if(e.keyCode == 32){//Go back to river menu
			askRiver();
    	}
	}
}

function crossWagon(sink, lostFood, lostClothing, lostWheels, lostAxles, lostTongues) {
	console.log("crossWagon: " + lostTongues);
	if (sink) {
		alert("You can not cross the river. Wait until conditions improve. You lost " + lostAxles + " axles and " + lostTongues + " tongues");
		backpack.spareParts.wagonAxle -= lostAxles; 
		backpack.spareParts.wagonTongue -= lostTongues; 
		//noCross = true;
		crossWait(lostAxles, lostTongues);
		//console.log("please: " + position)
	}
	else {
		if (trip.weather === 'windy') {
			backpack.food -= lostFood;
			backpack.clothing -= lostClothing;
			alert("Crossing was successful. You lost " + lostAxles + " axles and " + lostFood + " pounds of food.");
		}
		else if (trip.weather === 'rainy') {
			backpack.spareParts.wagonWheel -= lostWheels;
			alert("Crossing was successful. You lost " + lostWheels + " wheels.");
		}
		else {
			alert("You crossed successfully and did not lose anything");
		}

		landmarkIndex++;
		document.getElementById("river").style.zIndex = "-10";
		days = getDaysToNext() + 1; 
		showStatus();
	}
	
}

function callCross(sink, lostFood, lostClothing, lostWheels, lostAxles, lostTongues) {
	console.log("callCross - lostTongues: " + lostTongues);
	if (isNaN(lostTongues)) {
		lostTongues = 0; 
	}
	if (isNaN(lostFood)) {
	}
	if (isNaN(lostClothing)) {
	}
	if (isNaN(lostWheels)) {
	}
	if (isNaN(lostAxles)) {
	}
	document.getElementById("wagonRiver").style.clipPath = "inset(0% 0% 0% 0%)";
	document.getElementById("windowPara").innerHTML = '';
	document.getElementById("tempWindow").style.backgroundColor="";
	document.getElementById("tempWindow").style.backgroundImage = "url('images/crossingRiver.png')";
	
	var position = 5;
	function crossing() {
		//document.getElementById("testRiver").innerHTML = "mommy";

		setTimeout(function() {	
			var finalString = position + "%";
			document.getElementById("wagonRiver").style.right = finalString;
			position += 5;
			if (sink) {
				if (position === 55) {
					document.getElementById("wagonRiver").style.clipPath = "inset(0% 0% 50% 0%)";
					
				}
				if (position === 60) {
					crossWagon(sink, lostFood, lostClothing, lostWheels, lostAxles, lostTongues);

				}
			}
			else {
				if (position === 60) {
					crossWagon(sink, lostFood, lostClothing, lostWheels, lostAxles, lostTongues)

				}
			}
		}, i * 1000);
	}

	for (var i = 0; i < 11; i++) {
		crossing();
	}
}

function crossNormal() {//Normal river crossing
	alert("You are now crossing the river");
	console.log("beginning of crossNormal")
	var badWeather = false;
	var lostFood = randomNumber(backpack.food);
	var lostClothing = randomNumber(backpack.clothing);
	var lostWheels = randomNumber(backpack.spareParts.wagonWheel);
	var lostAxles = randomNumber(backpack.spareParts.wagonAxle);
	var lostTongues = randomNumber(backpack.spareParts.wagonTongue);
	console.log("lostTongues: " + lostTongues);
	var noCross = false;

	if (trip.weather === 'windy') {
		var sink = false;
		callCross(sink, lostFood, lostClothing, lostWheels, lostAxles, lostTongues);

	}
	else if (trip.weather === 'rainy') {
		var sink = false;
		callCross(sink, lostFood, lostClothing, lostWheels, lostAxles, lostTongues);

	}
	else if (trip.weather === 'freezing') {
		console.log("in here");
		var sink = true;
		callCross(sink, lostFood, lostClothing, lostWheels, lostAxles, lostTongues);
	}
	else {
		callCross(lostFood, lostClothing, lostWheels, lostAxles, lostTongues);
	}
}

function crossCaulk() {//Used to cross river with a higher chance of successfully crossing then just crossing normally
	alert("You are now crossing the river after caulking your wagon");
	var badWeather = false;
	var lostFood = randomNumber(backpack.food);
	var lostClothing = randomNumber(backpack.clothing);
	var lostWheels = randomNumber(backpack.spareParts.wagonWheel);
	var lostAxles = randomNumber(backpack.spareParts.wagonAxle);
	var lostTongues = randomNumber(backpack.spareParts.wagonTongue);
	var noCross = false;

	if (trip.weather === 'windy') {
		var sink = false;
		callCross(sink, lostFood, lostClothing, lostWheels, lostAxles, lostTongues);

	}
	else if (trip.weather === 'rainy') {
		var sink = false;
		callCross(sink, lostFood, lostClothing, lostWheels, lostAxles, lostTongues);

	}
	else if (trip.weather === 'freezing') {
		var sink = true;
		callCross(sink, lostFood, lostClothing, lostWheels, lostAxles, lostTongues);
	}
	else {
		callCross(lostFood, lostClothing, lostWheels, lostAxles, lostTongues);
	}
}

function crossFerry() {
	disable();
	onFerry = true;
	document.getElementById("windowPara").innerHTML = "The ferry operator says that he will charge you $" + ferryPrice + " and that you will have to wait " + ferryDays + " day(s). Are you willing to do this?";
	showBox();
}

function emptyFunction() {

}

function ferryWait(index) {
	document.getElementById("wagonRiver").src = "images/ferry.png";//"url('images/crossingRiver.png')";
	disable();
	hideBox();
	document.getElementById("windowPara").innerHTML = "You need to wait " + ferryDays + " day(s) before the ferry can leave";
	for (var i = 0; i < index; i++) {
		riverIncrement();
	}
	document.getElementById("date").innerHTML = getDate();
	document.getElementById("river").style.zIndex = "-10";
	days = getDaysToNext() + 1; 
	console.log("ferryWait");
	onFerry = false;
	normalDots(crossNormal);
	
	
}

function riverIncrement() {
	trip.weather = getWeather();
	//alert("riverIncrement");
	currentDay++;
	if (currentDay > 30) {
		currentDay = 1; 
		monthIndex++;
		if (monthIndex > 11) {
			currentYear++;
			monthIndex = 0; 
		}
	}
	backpack.food -= team.rationsPerDay;
	if (backpack.food < 0) {
		backpack.food = 0; 
		daysNoFood++;
		if (daysNoFood % 5 === 0) {
			if (healthIndex < 6) {
				healthIndex++;
				trip.health = health[healthIndex];
			}
			else {
		
			}
		}
	}
	else {
		daysWithFood++;
		if (daysWithFood % 5 === 0) {
			if (healthIndex > 0) {
				healthIndex--;
				trip.health = health[healthIndex];
			}
		}
	}
}
function crossWait(lostAxles, lostTongues) {
	document.getElementById("tempWindow").style.backgroundColor="black";
	document.getElementById("tempWindow").style.backgroundImage = "";
	document.getElementById("wagonRiver").style.clipPath = "inset(100% 100% 100% 100%)";
	disable();
	document.getElementById("windowPara").innerHTML = "You waited one day for conditions to improve.";
	normalDots(emptyFunction);
	riverIncrement();
	document.getElementById("date").innerHTML = getDate();
	var tempSet = setTimeout(
		function() {
			askRiver();
		}, 6000);

}

function lookAround(type) {
	document.getElementById("landmarkImage").style.opacity = "1.0";
	var name = landmarks[landmarkIndex].name;
	document.getElementById("windowPara").innerHTML = name + "<br>" + 
	"Press 'space bar' to return to menu";

	document.getElementById("landmarkImage").src = "images/landmarks/" + name + ".jpeg";

	document.body.onkeyup = function(e){
		if (type === 'river') {
	    	if(e.keyCode == 32){//Return to river menu
	    		document.getElementById("landmarkImage").style.opacity = "0";
	    		askRiver(); 	
	    	}
	    }
	    else {
	    	if (e.keyCode == 32) {
	    		document.getElementById("landmarkImage").style.opacity = "0";
	    		showSituation();
	    	}
	    }
    }

}

function askRiver() {
	document.getElementById("tempWindow").style.backgroundColor="black";
	document.getElementById("tempWindow").style.backgroundImage = "";
	document.getElementById("wagonRiver").style.clipPath = "inset(100% 100% 100% 100%)";
	disable();
	hideBox();

	document.getElementById("windowPara").innerHTML = "You need to cross the " + landmarks[landmarkIndex].name + ". <br>" + 
	"The river is " + riverDepth + " feet deep and " + riverLength + " feet across." + "<br>" + 
	"Weather: " + trip.weather + "<br>" + 
	"0. Look around" + "<br>" +
	"1. Attempt to ford the river " + "<br>" + 
	"2. Caulk the wagon and float it across" + "<br>" + 
	"3. Take a ferry across" + "<br>" + 
	"4. Wait to see if conditions improve" + "<br>" + 
	"5. Get more information";

	document.body.onkeyup = function(e){
		if (e.keyCode == 48) {//0. Look around
			lookAround("river");
		}
    	else if(e.keyCode == 49){//1. Cross the River
    		document.getElementById("wagonRiver").src = "images/wagon_oxen_2.png";
    		crossNormal();
        	
    	}
    	else if(e.keyCode == 50){//	2. Caulk the wagon and float it across
    		document.getElementById("wagonRiver").src = "images/wagon_oxen_2.png";
        	crossCaulk();
    	}
    	else if(e.keyCode == 51){//3. Take a ferry across
        	crossFerry();
    	}
    	else if(e.keyCode == 52){//4. Wait to see if conditions improve
        	crossWait();
    	}
    	else if(e.keyCode == 53){//5. Get more information
        	displayRiverInfo();
    	}
    	else if (e.keyCode == 70){//F. Go to final score
			if (!timeVar) {
	    		finalScore();
			}
		}
	}
 }
/*START END GAME WITH FINAL TOLL ROAD AND COLUMBIA RIVER*/

 function finalDecision() {
 	disable();
 	document.getElementById("windowPara").innerHTML = "You have almost beaten the game! You have two options (Press 1 or 2) -- " + "<br>" + 
 	"1) You can cross the toll road and be assured a victory as long as you can pay the $100 toll fee" + "<br>" +
 	"2) You can attempt to cross the dangerous Columbia River and risk drowning.";

 	document.body.onkeyup = function(e){
    	if(e.keyCode == 49){//1. Pay the Toll
    		crossFinalRoad();
        	
    	}
    	else if(e.keyCode == 50){//	2. Cross the Columbia River
    		document.getElementById("wagonRiver").src = "images/wagon_oxen_2.png";
        	crossFinalRiver();
    	}
    	else {
    		alert("You have to select 1 or 2");
    	}
	}
 }

 function showWinnerScore() {
 	disable();
 	document.getElementById("windowPara").innerHTML = "CONGRATULATIONS YOU HAVE WON AND DID NOT DIE OF DYSENTERY!!!! (Press 'space bar' to see final score)";
 	document.body.onkeyup = function(e){
    	if(e.keyCode == 32){//See final score
    		backpack.food = 150;
    		normalDots(finalScore);
    	}
	}
 }



function crossFinalRoad() {
	disable();
	if (backpack.money < 100) {
		alert("You do not have enough money. Press 'space bar' to return to the previous menu and select another option");
		document.getElementById("windowPara").innerHTML  = ":(";
	}
	else {
		backpack.money -= 100;
		showWinnerScore();
	}
}

function roadAnimation() {
	disable();
}


function crossFinalRiver() {
	disable();
	normalDots(emptyFunction);
	if (backpack.money < 100) {
		alert("You do not have enough money. Press 'space bar' to return to the previous menu and select another option");
		document.getElementById("windowPara").innerHTML  = ":(";
	}
	else {
		showWinnerScore();
	}

	document.body.onkeyup = function(e){
    	if(e.keyCode == 32){//Return to finalDecision();
    		finalDecision();        	
    	}
	}
}

function insertWinner() {
	var name = team.firstMember;
	var tempString = window.open("insertFinal.php?deadName=" + name + " " + finalScore);
}
/*END END GAME WITH FINAL TOLL ROAD AND COLUMBIA RIVER*/



/*Start in between towns*/
function showStatus() {
	disable();
	document.getElementById("tempWindow").style.backgroundColor="black";
	document.getElementById("tempWindow").style.backgroundImage = "";
	document.getElementById("wagonRiver").style.clipPath = "inset(100% 100% 100% 100%)";
	trip.nextLandmark = landmarks[landmarkIndex].name;
	var name = trip.nextLandmark;
	next = landmarks[landmarkIndex].distance;
	var type = landmarks[landmarkIndex].type;
	document.getElementById("town_date").style.visibility = 'visible';

	if (next <= 0) {
		atRiver = true;
		next = 0; 
		if (type === 'river') {
			betweenTowns = true;
			document.getElementById("town").innerHTML = name;
			document.getElementById("date").innerHTML = getDate();
			alert("You have approached the " + name);
			riverDepth = randomNumber(10);
			riverDepth += 2; 
			riverLength = randomNumber(450);
			riverLength += 20; 
			ferryPrice = randomNumber(15);
			ferryPrice += 5; 
			ferryDays = randomNumber(5);
			ferryDays++; 
			askRiver();
		}
		else if (type === 'fort') {
			betweenTowns = false;
			document.getElementById("town").innerHTML = name;
			document.getElementById("date").innerHTML = getDate();
			alert("You have approached " + name);
			showSituation();
			
		}
		else if (type === 'nature') {
			betweenTowns = true;
			document.getElementById("town").innerHTML = name;
			document.getElementById("date").innerHTML = getDate();
			alert("You have approached " + name);
			showSituation();

		}
		else if (type === 'ford') {
			betweenTowns = false;
			finalDecision();
		}
	}
	else {
		trip.date = getDate();
		trip.food = backpack.food;
		document.getElementById("windowPara").innerHTML = "Date: " + trip.date + "<br>" + 
		"Weather: " + trip.weather + "<br>" + 
		"Health: " + trip.health + "<br>" + 
		"Food: " + trip.food + " pounds" + "<br>" + 
		"Next landmark: " + trip.nextLandmark + " is " + next + " miles away" + "<br>" + 
		"Miles traveled: " + trip.milesTraveled + "<br>" + 
		"Press space bar to continue";

		document.body.onkeyup = function(e){
	    	if(e.keyCode == 32){//space bar to move past menu
	    		hideDate();
	    		incrementData();
	    	}
	    	else if (e.keyCode == 70){//F. Go to final screen
	    		if (!timeVar) {
	    			finalScore();
	    		}
	    	}
		}
	}
}


/*Start current situation menu*/
function showSupplies() {
	hideBox();
	document.getElementById("windowPara").innerHTML = "oxen         " + backpack.oxen + "<br>" +
	"sets of clothing        " + backpack.clothing + "<br>" + 
	"bullets         " + backpack.ammunition * 20 + "<br>" +
	"wagon wheels      " + backpack.spareParts.wagonWheel + "<br>" +
	"wagon axles      " + backpack.spareParts.wagonAxle + "<br>" +
	"wagon tongues      " + backpack.spareParts.wagonTongue + "<br>" +
	"pounds of food          " + backpack.food + "<br>" +
	"money remaining           $" + Number((backpack.money).toFixed(2)) + "<br><br>" + 
	"press space bar to return to the previous menu";

	document.body.onkeyup = function(e){
    	if(e.keyCode == 32){
    		showSituation();
    	}
	}
	
}
/*End current situation menu*/


/*Start hunting functions*/


function endHunt() {

	var weight = randomNumber(30); 
	document.getElementById("windowPara").innerHTML = team.firstMember + " got " + weight + " pounds of fish. (Press 'space bar' to return to the previous menu)";

	backpack.food += weight; 
	document.body.onkeyup = function(e){
		if(e.keyCode == 32){//Return to situation menu
        	showSituation();
    	}
	}
}

function huntDots() {
	var pleaseWork = 0;
	var dotsVar = window.setInterval( function() {
	    var wait = document.getElementById("dotsP");
	    if (pleaseWork === 3) {
	    	clearInterval(dotsVar);
	    	endHunt();
	    }
	    else {
	    	if ( wait.innerHTML.length > 19 ) {
	    		pleaseWork++;
	        	wait.innerHTML = "";
	    	}
	   		else{
	        	wait.innerHTML += ".";
	    	}
	    }
	    
	}, 100);
}

function hunt() {
	document.getElementById("windowPara").innerHTML = team.firstMember + " is now hunting";
	backpack.ammunition -= 2; 
	if (backpack.ammunition < 0) {
		backpack.ammunition = 0; 
	}
	huntDots();
}

/*End hunting functions*/

function randomConvo() {

	document.getElementById("windowPara").innerHTML = "A town resident tells you: " + "<br>" +
	"'Some folks seem to think that two oxen are enough to get them to Oregon! Two oxen can barely move " + 
	"a fully loaded wagon, and if one of them gets sick or dies, you won't get going " + 
	"anywhere. I wouldn't go overland with less than six.'" + "<br>" + 
	"Press 'space bar' to return to the previous menu";

	document.body.onkeyup = function(e){
		if(e.keyCode == 32){//Return to situation menu
        	showSituation();
    	}
	}

}


/*Start death and sick functions */
function sendName(name, mile) {
	var tempWindow = window.open("connectMile.php?deadName=" + name + " " + mile);
	window.focus();
	setTimeout(function() { tempWindow.close();}, 50);
	
}

function assignDeath() {
	disable();
	
	var deathAssigned = false;
	while (!deathAssigned) {
		var randomDeath = randomNumber(5);
		switch(randomDeath) {
			case 0:
				
				//alert("we in here: " + diseaseTeam.firstMember);
				if (diseaseTeam.firstMember !== "" && diseaseTeam.firstMember !== "dead") {
					diseaseTeam.firstMember = "dead"; 
					alert(team.firstMember + " is dead.");
					sendName(team.firstMember, deathMile);
					deathAssigned = true;
					one = true;
					numberDead++;
					numberSick--;
				}
				break;
			case 1: 
				//alert("we in here: " + diseaseTeam.secondMember);
				if (diseaseTeam.secondMember !== "" && diseaseTeam.secondMember !== "dead") {
					diseaseTeam.secondMember = "dead";
					alert(team.secondMember + " is dead.");
					sendName(team.secondMember, deathMile);
					deathAssigned = true;
					two = true;
					numberDead++;
					numberSick--;
				}
				break;
			case 2:
				//alert("we in here: " + diseaseTeam.thirdMember);
				if (diseaseTeam.thirdMember !== "" && diseaseTeam.thirdMember !== "dead") {
					diseaseTeam.thirdMember = "dead";
					alert(team.thirdMember + " is dead.");	
					sendName(team.thirdMember, deathMile);
					deathAssigned = true;
					three = true; 
					numberDead++;
					numberSick--;
				}
				break;
			case 3:
				//alert("we in here: " + diseaseTeam.fourthMember);
				if (diseaseTeam.fourthMember !== "" && diseaseTeam.fourthMember !== "dead") {
					diseaseTeam.fourthMember = "dead";
					alert(team.fourthMember + " is dead.");
					sendName(team.fourthMember, deathMile);
					deathAssigned = true;
					four = true;
					numberDead++;
					numberSick--;
				}
				break;
			case 4: 
				//alert("we in here: " + diseaseTeam.fifthMember);
				if (diseaseTeam.fifthMember !== "" && diseaseTeam.fifthMember !== "dead") {
					diseaseTeam.fifthMember = "dead";
					alert(team.fifthMember + " is dead.");
					sendName(team.fifthMember, deathMile);
					deathAssigned = true;
					five = true;
					numberDead++;
					numberSick--;
				}
				break;
		}
		if (one && two && three && four && five) {
			alert("Press F to move to final score screen");
			deathAssigned = true;
			everyoneDead();
		}
	}
}

function finalScore() {
	numberSick = 0; 
	timeVar = false;
	document.getElementById("animationWindow").innerHTML = '';
	document.getElementById("windowPara").innerHTML = '';
	var numberAlive = 5 - numberDead;
	var numberAliveScore = numberAlive * 400;
	var numWagon = 0;
	if (numberAlive !== 0) {
		numWagon++;
	}
	if (backpack.oxen < 1) {
		backpack.oxen = 0; 
	}
	var numWagonScore = numWagon * 50;
	var oxenScore = backpack.oxen * 4;
	var partsScore = sumSpareParts() * 2;
	var clothingScore = backpack.clothing * 2;
	var numBullets = backpack.ammunition * 20; 
	var bulletScore = Math.floor((backpack.ammunition * 20)/50);
	var foodScore = Math.floor(backpack.food/25);
	var moneyScore = Math.floor(backpack.money/5);

	finalScoreNum = numberAliveScore + numWagonScore + oxenScore + partsScore + clothingScore + bulletScore + foodScore + moneyScore;
		document.getElementById("windowPara").innerHTML = 'SCORE BOARD' + "<br><br>" + 
	numberAlive + " people in fair health..." + numberAliveScore + "<br>" + 
	numWagon + " wagon..." + numWagonScore + "<br>" + 
	backpack.oxen + " oxen..." +  oxenScore + "<br>" + 
	sumSpareParts() + " spare wagon parts..." + partsScore + "<br>" + 
	backpack.clothing + " sets of clothing..." + clothingScore + "<br>" + 
	numBullets + " bullets..." + bulletScore + "<br>" + 
	backpack.food + " pounds of food..." + foodScore + "<br>" + 
	"$" + backpack.money + " cash...." + moneyScore + "<br>" + 
	"Score: " + finalScoreNum;
	
	
}
function everyoneDead() {
	numberSick = 0; 
	timeVar = false;
}

function askRest(disease, member) {
    if (confirm("Would you like to rest for 3 days to allow " + member + " to recover? (Press 'cancel' to not rest and keep moving)")) {
    	alert(member + " has recovered and 3 days have past");
        riverIncrement();
        riverIncrement();
        riverIncrement();
        disease = "";
    } else {

    }
}

function assignDisease(disease) {
	disable();
	var randomNum = randomNumber(5);
	stopIncr = true;
	var firstDisease = diseaseTeam.firstMember;
	var secondDisease = diseaseTeam.secondMember;
	var thirdDisease = diseaseTeam.thirdMember;
	var fourthDisease = diseaseTeam.fourthMember;
	var fifthDisease = diseaseTeam.fifthMember;

	switch(randomNum) {
		case 0:
			if (firstDisease !== 'dead' && firstDisease === "") {
				alert(team.firstMember + " is infected with " + disease);
				diseaseTeam.firstMember = disease;
				askRest(firstDisease, team.firstMember); 
				numberSick++;

			}
			break;
		case 1:
			if (secondDisease !== 'dead' && secondDisease === "") {
				alert(team.secondMember + " is infected with " + disease);
				diseaseTeam.secondMember = disease;
				askRest(secondDisease, team.secondMember); 
				numberSick++;
			}
			break;
		case 2:
			if (thirdDisease !== 'dead' && thirdDisease === "") {
				alert(team.thirdMember + " is infected with " + disease);
				diseaseTeam.thirdMember = disease;
				askRest(thirdDisease, team.thirdMember); 
				numberSick++;
			}
			break;
		case 3:
			if (fourthDisease !== 'dead' && fourthDisease === "") {
				alert(team.fourthMember + " is infected with " + disease);
				diseaseTeam.fourthMember = disease;
				askRest(fourthDisease, team.fourthMember); 
				numberSick++;
			}
			break;
		case 4:
			if (fifthDisease !== 'dead' && fifthDisease === "") {
				alert(team.fifthMember + " is infected with " + disease);
				diseaseTeam.fifthMember = disease;
				askRest(fifthDisease, team.fifthMember); 
				numberSick++;
			}
			break;
	}
	stopIncr = false;
}

function died() {
	disable();
	document.body.onkeyup = function(e){
		if(e.keyCode == 32){//space bar. Travel the trail
    		startMenu();	
    	}
	}
}
/*End death and disease functions*/
/*Start random stuff happening on trail and animations*/
function randomStuff() {

	var randomNum = randomNumber(30);
	
	switch(randomNum) {
		case 1://Get fruit
			var randomPounds = randomNumber(30);
			randomPounds += 5;
			alert("You got " + randomPounds + " pounds of fruit");
			backpack.food += randomPounds; 
			break;
		case 2://oxen wander off
			alert("One of your oxen wandered off. You lost two days");
			currentDay++; 
			break;
		case 3://stuck in a ditch
			var randomWheel = randomNumber(backpack.spareParts.wagonWheel);
			var randomAxle = randomNumber(backpack.spareParts.wagonAxle);
			var tempWheels = backpack.spareParts.wagonWheel;
			var tempAxles = backpack.spareParts.wagonAxle;
			alert("You got stuck in a ditch. It took you one day to get out");
			currentDay++;
			if (tempWheels !== 0 && tempAxles !== 0) {
				backpack.spareParts.wagonWheel -= randomWheel;
				backpack.spareParts.wagonAxle -= randomAxle;
				alert("You lost " + randomWheel + " wagon wheel(s) and " + randomAxle + " axle(s)");
			}

			break;
		case 4://oxen dies
			alert("One of your oxen has died");
			backpack.oxen -= 1; 
			if (backpack.oxen < 1) {
				alert("Press 'F' to see final score");
				finalScore();
			}
			break;
		case 5://bad weather
			var randomAmmunition = randomNumber(backpack.ammunition);
			var randomClothing = randomNumber(backpack.clothing);
			
			backpack.ammunition -= randomAmmunition;
			backpack.clothing -= randomClothing;

			alert("The bad weather has caused you to lose " + randomAmmunition + " boxes of ammunition and " + randomClothing + " sets of clothes.");
			break;
	}
}

function moveOxen() {
	if (oxenMove === 5) {
		oxenMove = 10; 
	}
	else {
		oxenMove = 5; 
	}

	var finalString = oxenMove + "%";

	return finalString;
}

function moveTree() {
	if (treeMove < 90) {
		treeMove += 10;
	}
	else {
		treeMove = 0; 
	}

	var finalString = treeMove + "%";

	return finalString;
}

function moveRiver(tempType) {
	disable();
	if (tempType === 'river') {
		document.getElementById("river").src = "images/river.png";
	}
	else if (tempType === 'fort') {
		document.getElementById("river").src = "images/fort.png";
	}
	else if (tempType === 'nature') {
		document.getElementById("river").src = "images/nature.png";
	}
	else if (tempType === 'finalRoad') {
		document.getElementById("river").src = "images/river.png";
	}
	else if (tempType === 'finalRiver') {
		document.getElementById("river").src = "images/river.png";
	}
	console.log("riverMove: " + next);
	if (riverMove <= 50) {
		riverMove += 10;
	}
	else {
		riverMove = 10; 
	}
	
	var finalString = riverMove + "%";

	return finalString;
}

/*End random stuff happening and animations*/

/*Start check for past graves*/
function checkDeath() {
	foundMarker = false;
	var testMom = localStorage.getItem("storageName");
	if (foundMarker) {
		alert("Someone died here"); 
		
		showMarker();
	}
}

function showMarker() {//Show grave
	document.getElementById("gravestone").style.zIndex = "9";
}

function hideMarker() {//Hide grave
	document.getElementById("gravestone").style.zIndex = "-11";
}

/*End check for past graves*/


/*Start incrementing functions*/
function incrementData() {
		disable();
		document.getElementById("windowPara").innerHTML = '';
		var tempType = landmarks[landmarkIndex].type;

		function doScaledTimeout() {
			setTimeout(function() {
				if (!timeVar) {
					return;
				}
				
				document.getElementById("oxen").style.bottom = moveOxen();
				document.getElementById("tree").style.left = moveTree();
				
				console.log("next: " + next);
				if (next <= 60) {
					showMarker();
					document.getElementById("river").style.left = moveRiver(tempType);	
					document.getElementById("river").style.zIndex = "10";
				}
				else {
					document.getElementById("river").style.zIndex = "-10";
					hideMarker();
				}
		   		currentDay++;
		   		if (currentDay > 30) {
		   			currentDay = 1; 
		   			monthIndex++;
		   			if (monthIndex > 11) {
		   				currentYear++;
		   				monthIndex = 0; 
		   			}
		   		}
		   		backpack.food -= team.rationsPerDay;

		   		var randomNumDisease = randomNumber(50);
		   		if (randomNumDisease > 40) {//randomNumDisease > 40
		   			var tempNum = randomNumber(diseases.length);
		   			var randomDisease = diseases[tempNum];
		   			assignDisease(randomDisease);
		   		}
		   		if (backpack.food < 0) {//backpack.food < 0
		   			backpack.food = 0; 
		   			daysNoFood++;
		   			if (daysNoFood % 5 === 0) {
		   				if (healthIndex < 5) {
		   					healthIndex++;
		   					trip.health = health[healthIndex];
		   				}
		   				else {	
		   					deathMile = trip.milesTraveled;
		   					if (numberSick !== 0) {
		   						assignDeath(); 
		   					}
		   				}
		   			}
		   		}
		   		else {
		   			daysWithFood++;
		   			if (daysWithFood % 5 === 0) {
		   				if (healthIndex > 0) {
		   					healthIndex--;
		   					trip.health = health[healthIndex];
		   				}
		   			}
		   		}
		   		randomStuff();
		   		checkDeath();
		   		trip.milesTraveled += team.milesPerDay;
		   		landmarks[landmarkIndex].distance -= team.milesPerDay;
		   		trip.weather = getWeather();
		   		showStatus();
		  	}, i * 250);
		}

		if (!timeVar) {
			return;
		}
		for (var i = 1; i < days; i++) {
			doScaledTimeout();
		}
	
}

function rest() {
	document.getElementById("windowPara").innerHTML = "You rested for one day.";
	currentDay++;
	document.getElementById("date").innerHTML = getDate();
	normalDots(emptyFunction);
	setTimeout(
		function() {
			showSituation();
	}, 5000);
}

function changeWindowSize() {
	document.getElementById("userWindow").style.height = "400px";
	document.getElementById("userWindow").style.fontSize = "10px";
	document.getElementById("animationWindow").style.visibility = "visible";
}

/*End incrementing functions*/

/*Start different menus*/
function showSituation() {
	currentSituation = true;
	onSituationMenu = false;
	
	var townText8 = document.createTextNode("8. Talk to people");
	var breakText = document.createElement("br");
	var townText9 = document.createTextNode("9. Buy supplies");
	var townText10 = document.createTextNode("A. Look around");
	breakText.appendChild(townText9);
	document.getElementById("tempWindow").style.opacity = "1.0";
	document.getElementById("windowPara").innerHTML = "You may: " + "<br>" + 
	"0. Look around" + "<br>" +
	"1. Continue on trail" + "<br>" + 
	"2. Check supplies" + "<br>" + 
	"3. Change pace" + "<br>" + 
	"4. Change food rations" + "<br>" + 
	"5. Stop to rest" + "<br>" + 
	"6. Attempt to trade" + "<br>" + 
	"7. Hunt for food" + "<br>";
	if (!betweenTowns) {
		document.getElementById("windowPara").appendChild(townText8);
		document.getElementById("windowPara").appendChild(breakText);
		document.getElementById("windowPara").appendChild(townText9);
	}
	

	document.body.onkeyup = function(e){
		if(e.keyCode == 32){//Return to situation menu
        	showSituation();
    	}
    	else if (e.keyCode == 48){//0. Look around
    		lookAround("fort");
    	}
    	else if(e.keyCode == 49){//1. Continue on Trail
    		changeWindowSize();
    		landmarkIndex++;
    		days = getDaysToNext() + 1;
    		hideDate();
        	showStatus();
    	}
    	else if(e.keyCode == 50){//2. Check Supplies
        	showSupplies();
    	}
    	else if(e.keyCode == 51){//3. Change Pace
        	showPace();
    	}
    	else if(e.keyCode == 52){//4. Change Food Rations
        	showRations();
    	}
    	else if(e.keyCode == 53){//5. Stop to Rest
        	rest();
    	}
    	else if(e.keyCode == 54){//6. Attempt to Trade
        	showSupplies();
    	}
    	else if(e.keyCode == 55){//7. Hunt for Food
    		hunt();
    	}
    	else if (e.keyCode == 56){//8. Talk to People
    		randomConvo();
		}
		else if (e.keyCode == 57){//9. Buy Supplies
			onSituationMenu = true;
			storeMenu(); 
		}
		else if (e.keyCode == 70){//F. Go to final score
			if (!timeVar) {
	    		finalScore();
			}
		}
	}
}


function showPace() {
	disable();
	changePace = true;
	document.getElementById("windowPara").innerHTML = "Change Pace" + "<br>" + 
	"(currently '" + team.pace + "'')" + "<br><br>" + 
	"1. steady pace" + "<br>" + 
	"2. strenuous pace" + "<br>" + 
	"3. grueling pace" + "<br>" + 
	"4. find out what these different paces mean";

	document.body.onkeyup = function(e){
		if(e.keyCode == 32){//Return to situation menu
        	showSituation();
    	}

    	else if(e.keyCode == 49){//1. Steady
    		team.pace = "steady";
    		team.milesPerDay = 10; 
        	showSituation();
    	}
    	else if(e.keyCode == 50){//2. Strenuous
    		team.pace = "strenuous";
    		team.milesPerDay = 15; 
        	showSituation();
    	}
    	else if(e.keyCode == 51){//3. Grueling
    		team.pace = "grueling";
    		team.milesPerDay = 20;
        	showSituation();
    	}
    	else if(e.keyCode == 52){//4. Pace Info
        	paceInfo();
    	}
	}
}

function paceInfo() {
	hideBox();
	document.getElementById("windowPara").innerHTML = "steady: You travel about 8 hours a day, taking frequent rests. You take care not to get tired." + "<br>" + 
	"strenuous: You travel about 12 hours a day. You only stop to rest when necessary. Finish each day feeling tired" + "<br>" + 
	"grueling: You travel about 16 hours a day. Almost never stop to rest. Finish each day exhausted and your health suffers" + "<br>" +
	"Press space bar to return to previous screen";
	document.body.onkeyup = function(e){
    	if(e.keyCode == 32){
        	showPace();
    	}
	}
}

function showRations() {
	hideBox();
	document.getElementById("windowPara").innerHTML = "Change food rations" + "<br>" + 
	"currently: " + team.rations + "<br>" + 
	"1. filling - meals are large and generous" + "<br>" + 
	"2. meager - meals are small, but adequate" + "<br>" + 
	"3. bare bones - meals are very small; everyone stays hungry" + "<br><br>" + 
	"Please select #1, #2, or #3";
	document.body.onkeyup = function(e){
    	if(e.keyCode == 49){
    		team.rations = "filling";
    		team.rationsPerDay = 15; 
        	showSituation();
    	}
    	if(e.keyCode == 50){
    		team.rations = "meager";
    		team.rationsPerDay = 10; 
        	showSituation();
    	}
    	if(e.keyCode == 51){
    		team.rations = "bare bones";
    		team.rationsPerDay = 5; 
        	showSituation();
    	}
	}

}

/*End current situation menu*/


function showBox() {
	document.getElementById("userInput").style.visibility = "visible";
	document.getElementById("userBox").value = '';
	document.getElementById("userBox").focus();
}


function hideBox() {	
	document.getElementById("userInput").style.visibility = 'hidden';
}

function sumSpareParts() {
	var totalSum = 0.00;

	totalSum = Number(backpack.spareParts.wagonWheel) + Number(backpack.spareParts.wagonAxle) + Number(backpack.spareParts.wagonTongue);

	return totalSum;
}

function learnPara() {

	
	document.getElementById("windowPara").innerHTML = "Prepare to cross the unrelenting Oregon Trail. Save your money and always take care of those close to you. If you don't survive (probably cause of cholera) just try again! Press 'space bar' to return to the main menu.";

}
/*CHOOSE PERSON*/
function personMenu() {
	disable();
	document.getElementById("windowPara").innerHTML = "Many kinds of people made the trip to Oregon. <br><br> You may: <br><br> 1. Be a banker from Boston <br> 2. Be a carpenter from Ohio <br> 3. Be a farmer from Illinois <br> 4. Find out the differences between these choices";
	document.body.onkeyup = function(e){
		if(e.keyCode == 32){//Person Menu
        	personMenu();
    	}
		if(e.keyCode == 49){//1. Be a banker
			chooseName = true;
			backpack.money = 800.00;
			you.job = "banker";
        	askName(nameCount);
    	}
    	if(e.keyCode == 50){//2. Be a carpenter
    		chooseName = true;
    		backpack.money = 600.00;
    		you.job = "carpenter";
        	askName(nameCount);
    	}
    	if(e.keyCode == 51){//3. Be a farmer
    		chooseName = true;
    		backpack.money = 400.00;
    		you.job = "farmer";
        	askName(nameCount);
    	}
    	if(e.keyCode == 52){//Find out difference between choices
        	personDesc();
    	}
	}


}

function personDesc() {
	document.getElementById("windowPara").innerHTML = "Traveling to Oregon isn't easy! But if you're a banker, you'll have more money for supplies and services than a carpenter or a farmer. <br><br> However, the harder you have to try, the more points you deserve! Therefore, the farmer earns the greatest number of points and the banker earns the least. Press 'space bar' to return to previous menu.";
}

/*END CHOOSE PERSON*/

/*Choose wagon leader name*/
function askName(index) {
	var names = ["first", "second", "third", "fourth", "fifth"];
	disable();
	showBox();
	if (index === 0) {

		document.getElementById("windowPara").innerHTML = "What is the first name of the wagon leader?";
	}
	else {
		document.getElementById("windowPara").innerHTML = "What is the first name of the " + names[index] + " member?";
	}
}

function showNames() {
		
	document.getElementById("windowPara").innerHTML = "Your team is: " + " <br> 1. " + team.firstMember  + " -- Team Leader <br> 2. " + team.secondMember  + " <br> 3. " + team.thirdMember  + " <br> 4. " + team.fourthMember  + " <br> 5. " + team.fifthMember + "<br>" +
	"Press 'space bar' to move on";
	hideBox();
	document.body.onkeyup = function(e){
		if(e.keyCode == 32){//Show month
        	monthMenu();
    	}
	}
}

function emptyNames() {
	emptyName = true;
	alert("Please enter anything for a name");
	askName(nameCount);
}

/*end choose wagon leader name*/
/*start choosing month*/


function monthMenu() {
	document.getElementById("windowPara").innerHTML = "It is 1848. Your jumping off place for Oregon is Independence, Missouri. You must decide which month to leave for Independence. <br><br> 1. March <br> 2. April <br> 3. May <br> 4. June <br> 5. July <br> 6. Ask for advice";

	document.body.onkeyup = function(e){
		if(e.keyCode == 32){//Month Menu
        	monthMenu();
    	}
		else if(e.keyCode == 49){//1. March
        	currentMonth = "March";
        	monthIndex = 2;
        	beforeStoreScreen();
    	}
    	else if(e.keyCode == 50){//2. April
        	currentMonth = "April"; 
        	monthIndex = 3;
			beforeStoreScreen(); 
    	}
    	else if(e.keyCode == 51){//3. May
        	currentMonth = "May"; 
        	monthIndex = 4;
			beforeStoreScreen();
    	}
    	else if(e.keyCode == 52){//4. June
        	currentMonth = "June"; 
        	monthIndex = 5;
			beforeStoreScreen();
    	}
    	else if(e.keyCode == 53){//5. July
        	currentMonth = "July";
        	monthIndex = 6;
			beforeStoreScreen();
    	}
    	else if(e.keyCode == 54){//6. Month Info
        	monthAdvice();
    	}
    	else{
    		alert('Please select an number from 1 - 6');
    	}
	}
}

/*End choosing month*/

/*Start store at beginning of game*/
function beforeStoreScreen() {
	document.getElementById("windowPara").innerHTML = "Before leaving Independence, you should buy equipment and supplies. You have $" + backpack.money + " in cash, but you don't have to spend it all now. Press 'space bar' to move on. ";
	team.milesPerDay = 10; 
	team.rationsPerDay = 5;
	document.body.onkeyup = function(e){
		if(e.keyCode == 32){//Show store
        	storeMenu();
    	}
	}
}

function monthAdvice() {
	document.getElementById("windowPara").innerHTML = "You attend a public meeting held for 'folks with the California - Oregon fever.' You're told: If you leave too early, there won't be any grass for your oxen to eat. If you leave too late, you may not get to Oregon before winter comes. If you leave at just the right time, there will be green grass and the weather will still be cool. Press 'space bar' to return to the previous menu";
}

function disable() {
 	document.body.onkeyup = function(e) {
    		e.preventDefault();		
 	}
}

function storeOxen() {
	showBox();
	disable();
	document.getElementById("windowPara").innerHTML = "Matt's General Store " + "<br>" + 
	"Independence, Missour" + "<br><br>" + 

	"There are 2 oxen in a yoke; I recommend at least 3 yoke. $40 a yoke" + "<br>";

	document.getElementById("userBox").placeholder = "How many oxen do you want?....";

}

function addOxen(input) {
	if (isNaN(input)) {
		alert("Your input is invalid");
	}
	else {
		backpack.oxen += Number(input);
		tempStoreBill += (store.oxen * input);
		if (tempStoreBill > backpack.money) {
			alert("You do not have enough money. Your previous purchase has not been added to your shopping total.");
			tempStoreBill -= (store.oxen * input);
			backpack.oxen -= Number(input);
		}
		document.getElementById("userBox").placeholder = "";
	}
}
function storeFood() {
	showBox();
	disable();
	document.getElementById("windowPara").innerHTML = "Matt's General Store " + "<br>" + 
	"Independence, Missour" + "<br><br>" + 

	"I recommend at least 200 pounds of food for your team. $0.20 for a pound" + "<br>";

	document.getElementById("userBox").placeholder = "How many pounds do you want?...";
}

function addFood(input) {
	if (isNaN(input)) {
		alert("Your input is invalid");
	}
	else {
		backpack.food += Number(input);
		tempStoreBill += Number((store.food * input).toFixed(2));
		if (tempStoreBill > backpack.money) {
			alert("You do not have enough money. Your previous purchase has not been added to your shopping total.");
			tempStoreBill -= (store.food * input);
			backpack.food -= Number(input);
		}
		document.getElementById("userBox").placeholder = "";
	}
}

function storeClothing() {
	showBox();
	disable();
	document.getElementById("windowPara").innerHTML = "Matt's General Store " + "<br>" + 
	"Independence, Missour" + "<br><br>" + 

	"I recommend at least 2 sets of clothes per person. $10 for a set" + "<br>";

	document.getElementById("userBox").placeholder = "How many sets do you want?...";
}

function addClothing(input) {
	if (isNaN(input)) {
		alert("Your input is invalid");
	}
	else {
		backpack.clothing += Number(input);
		tempStoreBill += (store.clothing * input);
		if (tempStoreBill > backpack.money) {
			alert("You do not have enough money. Your previous purchase has not been added to your shopping total.");
			tempStoreBill -= (store.clothing * input);
			backpack.clothing -= Number(input);
		}
		document.getElementById("userBox").placeholder = "";
	}
}
function storeAmmunition() {
	showBox();
	disable();
	document.getElementById("windowPara").innerHTML = "Matt's General Store " + "<br>" + 
	"Independence, Missour" + "<br><br>" + 

	"Each box has 20 bullets. $2 a box" + "<br>";

	document.getElementById("userBox").placeholder = "How many boxes do you want?...";
}
function addAmmunition(input) {
	if (isNaN(input)) {
		alert("Your input is invalid");
	}
	else {
		backpack.ammunition += Number(input);
		tempStoreBill += (store.ammunition * input);
		if (tempStoreBill > backpack.money) {
			alert("You do not have enough money. Your previous purchase has not been added to your shopping total.");
			tempStoreBill -= (store.ammunition * input);
			backpack.ammunition -= Number(input);
		}
		document.getElementById("userBox").placeholder = "";
	}
}
function storeSpareParts() {
	showBox();
	disable();

	document.getElementById("windowPara").innerHTML = "Matt's General Store <br> Independence, Missouri <br><br> Wagon Wheel: $" + store.spareParts.wagonWheel + "<br>" +
	"Wagon Axle: $" + store.spareParts.wagonAxle + "<br>" + 
	"Wagon Tongue: $" + store.spareParts.wagonTongue;
	if (correctInput) {
		sparePartsNum++;
	}
	switch (sparePartsNum) {
		case 1:
			document.getElementById("userBox").placeholder = "How many wagon wheels?...";
			break;
		case 2:
			document.getElementById("userBox").placeholder = "How many wagon axles?...";
			break;
		case 3:
			document.getElementById("userBox").placeholder = "How many wagon tongues?...";
			break;
	}
	
}

function showWallet() {
	document.getElementById("walletTotal").style.visibility = "visible";
	document.getElementById("moneySaved").innerHTML = "$ " + Number(backpack.money.toFixed(2));
}

function storeMenu() {
	document.getElementById("windowPara").style.fontSize = "25px";
	document.getElementById("moneySpent").innerHTML = "$" + Number(tempStoreBill.toFixed(2));
	showWallet();
	chooseName = false;
	hideBox();
	var sumParts = sumSpareParts();
	document.getElementById("storeTotal").style.display = "inline-block";
	chooseMonth = false;
	chooseParts = chooseOxen = chooseFood = chooseClothing = chooseAmmunition = false;
	chooseStore = true;
	disable();
	document.getElementById("windowPara").innerHTML = "Matt's General Store <br> Independence, Missouri <br> <br>" + currentMonth + "  " + currentDay + ", " + currentYear + "<br>" + 
	"1. Oxen...You have " + backpack.oxen + " oxen <br>" +
	"2. Food...You have " + backpack.food + " pounds of food <br>" +
	"3. Clothing...You have " + backpack.clothing + " set of clothes <br>" +
	"4. Ammunition...You have " + backpack.ammunition + " boxes of ammunition <br>" +
	"5. Spare Parts...You have " + sumSpareParts() + " spare parts <br>" + 
	"Which item would you like to buy? (Enter #'0' to exit store)";

	document.body.onkeyup = function(e){
		if(e.keyCode == 32){//Month Menu
        	storeMenu();
    	}
    	else if(e.keyCode == 48){//0. Exit store

        	backpack.money -= tempStoreBill; 
			tempStoreBill = 0; 
			alert("You have $" + Number(backpack.money.toFixed(2)) + " remaining.");
			document.getElementById("storeTotal").style.display = "none";
			document.getElementById("walletTotal").style.visibility = "hidden";
			chooseStore = false;
			
			if (onSituationMenu) {
				showSituation();
			}
			else {
				startScreen();
			}
			
    	}
		else if(e.keyCode == 49){//1. Oxen
			chooseOxen = true;
        	storeOxen();
    	}
    	else if(e.keyCode == 50){//2. Food
    		chooseFood = true;
        	storeFood();
    	}
    	else if(e.keyCode == 51){//3. Clothing
    		chooseClothing = true;
        	storeClothing();
    	}
    	else if(e.keyCode == 52){//4. Ammunition
    		chooseAmmunition = true;
        	storeAmmunition();
    	}
    	else if(e.keyCode == 53){//5. Spare Parts
    		chooseParts = true;
    		sparePartsNum = 0;
        	storeSpareParts();
    	}
	}


}

/*End store at beginning of game*/
/*Start beginning of trail (after beginning store)*/
function startScreen() {
	document.body.onkeyup = function(e){
		if(e.keyCode == 32){//Show store
        	showSituation();
    	}
	}
	document.getElementById("town_date").style.visibility = "visible";
	document.getElementById("town").innerHTML = "Independence";
	document.getElementById("date").innerHTML = getDate();//currentMonth + " " + currentDay + ", " + currentYear;
	document.getElementById("windowPara").innerHTML = "Welcome to the Oregon Trail <br>" + 
	"Good luck!" + "<br><br>" + 
	"Press 'space bar' to move on";
	document.getElementById("tempWindow").style.opacity = "0.5";
	
	document.getElementById("tempWindow").style.backgroundImage = "images/starting_screen.jpg";
}





/*End in between towns*/
function startMenu() {
	document.getElementById("dysenteryPic").style.opacity = "0";
	document.getElementById("wagonRiver").src = "images/wagon_oxen_2.png";
	hideBox();
	document.getElementById("wagonRiver").style.clipPath = "inset(100% 100% 100% 100%)";
	document.getElementById("storeTotal").style.display = "none";
	document.getElementById("tempWindow").style.backgroundColor = "black";
	document.getElementById("windowPara").innerHTML = "You May: <br> 1. Travel the trail <br> 2. Learn about the trail <br> 3. See the Oregon Top Ten <br> 4. End";

	document.body.onkeyup = function(e){
		if(e.keyCode == 32){//space bar. Travel the trail
    		startMenu();	
    	}
    	if(e.keyCode == 49){//1. Travel the trail
    		personMenu();	
    	}
    	if(e.keyCode == 50){//2. Learn about the trail
    		learnPara();
    	}
    	if(e.keyCode == 51){//3. See Oregon Top Ten
    		window.open("http://projects.cse.tamu.edu/josh1996/OregonTrail/connectFinal.php", "_self");
    	}
    	if(e.keyCode == 52){//4. end
    		
    	}
	}
}


/*End beginning of trail (after beginning store)*/
function getSubmit() {
	var userInput = document.getElementById("userBox").value;
	document.getElementById("userBox").value = '';
	if (!timeVar) {
	    finalScore();
	}
	if (onFerry) {
		var enoughMoney = true;
		if (userInput === 'yes') {
			backpack.money -= ferryPrice; 
			if (backpack.money < 0) {
				enoughMoney = false;
				backpack.money += ferryPrice; 
				alert("You do not have enough money. You have to find another way to cross. Press 'space bar' to return to previous menu.");
				document.body.onkeyup = function(e){
			    	if(e.keyCode == 32){//return to river menu
			    		askRiver();
			        	
			    	}
				}
			}
			if (enoughMoney) { 
				console.log("ferryWait(ferryDays)");
				console.log('days: ' + ferryDays);
				ferryWait(ferryDays);
			}
			

		}
		else if (userInput === 'no') {
			askRiver();
		}
		else {
			alert("Your input was invalid. Please enter 'yes' or 'no'");
			askRiver();
		}
	}

	/*Start buying things at store*/
	
	if (chooseStore) {
		if (chooseParts) {
			//sparePartsNum++;
			switch(sparePartsNum) {
				case 1:
					if (isNaN(userInput)) {
						correctInput = false;
						alert("Input is invalid");
					}
					else {
						correctInput = true;
						backpack.spareParts.wagonWheel += Number(userInput);
						tempStoreBill += (store.spareParts.wagonWheel * userInput);
						if (tempStoreBill > backpack.money) {
							alert("You do not have enough money. Your previous purchase has not been added to your shopping total.");
							tempStoreBill -= (store.spareParts.wagonWheel * userInput);
							backpack.spareParts.wagonWheel -= Number(userInput);
						}
						document.getElementById("moneySpent").innerHTML = "$" + Number(tempStoreBill.toFixed(2));
						storeSpareParts();
					}
					break;
				case 2:
					if (isNaN(userInput)) {
						correctInput = false;
						alert("Input is invalid");
					}
					else {
						correctInput = true;
						backpack.spareParts.wagonAxle += Number(userInput);
						tempStoreBill += (store.spareParts.wagonAxle * userInput);
						if (tempStoreBill > backpack.money) {
							alert("You do not have enough money. Your previous purchase has not been added to your shopping total.");
							tempStoreBill -= (store.spareParts.wagonAxle * userInput);
							backpack.spareParts.wagonAxle -= Number(userInput);
						}
						document.getElementById("moneySpent").innerHTML = "$" + Number(tempStoreBill.toFixed(2));
						storeSpareParts();
					}
					break;
				case 3:
					if (isNaN(userInput)) {
						correctInput = false;
						alert("Input is invalid");
					}
					else {	
						correctInput = true;
						backpack.spareParts.wagonTongue += Number(userInput);
						tempStoreBill += (store.spareParts.wagonTongue * userInput);
						if (tempStoreBill > backpack.money) {
							alert("You do not have enough money. Your previous purchase has not been added to your shopping total.");
							tempStoreBill -= (store.spareParts.wagonTongue * userInput);
							backpack.spareParts.wagonTongue -= Number(userInput);
						}
						document.getElementById("moneySpent").innerHTML = "$" + Number(tempStoreBill.toFixed(2));
						chooseParts = false;
						document.getElementById("userBox").placeholder = "";
						storeMenu();
					}
					break;
			}
		}
		else if (chooseOxen) {
			addOxen(userInput);
			chooseOxen = false;
			storeMenu();
		}
		else if (chooseFood) {
			addFood(userInput);
			chooseFood = false;
			storeMenu();
		}
		else if (chooseClothing) {
			addClothing(userInput);
			chooseClothing = false;
			storeMenu();
		}
		else if (chooseAmmunition) {
			addAmmunition(userInput);
			chooseAmmunition = false;
			storeMenu();
		}
		else {
			switch (userInput) {
				case '0':
					backpack.money -= tempStoreBill; 
					tempStoreBill = 0; 
					alert("You have $" + Number(backpack.money.toFixed(2)) + " remaining.");
					document.getElementById("storeTotal").style.display = "none";
					chooseStore = false;
					startScreen();
					break;
				case '1':
					chooseOxen = true;
					storeOxen();
					break;	
				case '2':
					chooseFood = true;
					storeFood();
					break;	
				case '3':
					chooseClothing = true;
					storeClothing();
					break;
				case '4':
					chooseAmmunition = true;
					storeAmmunition();
					break;
				case '5':
					chooseParts = true;
					sparePartsNum = 0;
					storeSpareParts();
					break;
		}

		}
	}


	/*Get names*/
	if (chooseName) {
	//	alert(" in chooseName switch");
		switch(nameCount) {
			case 0:
				team.firstMember = userInput;
				if (team.firstMember === "") {
					emptyNames();
				}
				break;
			case 1:
				team.secondMember = userInput;
				if (team.secondMember === "") {
					emptyNames();
				}
				break;
			case 2:
				team.thirdMember = userInput;
				if (team.thirdMember === "") {
					emptyNames();
				}
				break;
			case 3:
				team.fourthMember = userInput;
				if (team.fourthMember === "") {
					emptyNames();
				}
				break;
			case 4:
				team.fifthMember = userInput;
				if (team.fifthMember === "") {
					emptyNames();
				}
				break;
		}
		if (!emptyName) {
			nameCount++;
			if (nameCount < 5) {
			
				askName(nameCount);
			}
			else {
				showNames();
			}
		}
		emptyName = false;
		
	}
}