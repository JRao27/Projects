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
	money: 800.00,
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

var foodWeight = {
	zero: 0,
	first: 5,
	second: 10, 
	third: 15, 
	fourth: 20, 
	fifth: 25, 
	sixth: 30
};

var weather = ['sunny', 'cool', 'windy', 'rainy', 'freezing'];
var health = ['good', 'OK', 'fair', 'poor', 'bad', 'critical', 'dead'];
var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
var landmarks = [{ 
"name": "Kansas River Crossing",
"distance": 102,
"type": "river"
},
{
"name": "Big Blue River Crossing",
"distance": 119,
"type": "river"	
},
{
"name": "Fort Kearney",
"distance": 250,
"type": "fort"
},
{
"name": "Chimney Rock",
"distance": 86,
"type": "nature"
},
{
"name": "Fort Laramie",
"distance": 190,
"type": "river"
},
{
"name": "Independence Rock",
"distance": 102,
"type": "river"
}];
var landmarkIndex = 0; 

function randomNumber(endNum) {
	if (isNaN(endNum)) {
		alert("That isn't a number");
	}
	else {
		var randNum = Math.floor((Math.random() * endNum) + 1);
	}
	return (randNum-1); 
}

function getDate() {

	var finalString = months[monthIndex] + " " + currentDay + ", " + currentYear;

	return finalString;
 }

 function getWeather() {
 	var randWeather = randomNumber(weather.length); 
 	var finalWeather = weather[randWeather];

 	return finalWeather;
 }

/*			*/










/*				*/
/*Start in between towns*/
function showStatus() {

	trip.nextLandmark = landmarks[landmarkIndex].name;
	var name = trip.nextLandmark;
	var next = landmarks[landmarkIndex].distance;
	var type = landmarks[landmarkIndex].type;

	if (next < 0) {
		next = 0; 
		if (type === 'river') {
			alert("You need to cross the " + name);
		}
		else if (type === 'fort') {

		}
		else if (type === 'nature') {
			
		}
	}

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
    	if(e.keyCode == 32){//space bar
    		travelingAnimation();
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
/*Start traveling*/
function travelingAnimation() {
	document.getElementById("windowPara").innerHTML = '';
	var oxenPic = document.createElement("img");
	oxenPic.src = "images/oxen.jpg";
	document.getElementById("windowPara").appendChild(oxenPic);
	incrementData();
}



/*End traveling*/


/*Start hunting functions*/

function endHunt() {

	var randomNum = randomNumber(7); 
	var index = 0;
	var weight = 0; 
	switch (randomNum) {
		case 0: 
			weight = foodWeight.zero;
		case 1: 
			weight = foodWeight.first;
			break;
		case 2:
			weight = foodWeight.second;
			break;
		case 3:
			weight = foodWeight.third;
			break;	
		case 4:
			weight = foodWeight.fourth;
			break;
		case 5:
			weight = foodWeight.fifth;	
			break;
		case 6:
			weight = foodWeight.sixth;
			break;
	}
	document.getElementById("windowPara").innerHTML = team.firstMember + " got " + weight + " pounds of fish. (Press 'space bar' to return to the previous menu)";

	backpack.food += weight; 
	document.body.onkeyup = function(e){
		if(e.keyCode == 32){//Return to situation menu
        	showSituation();
    	}
	}
}

function dots() {
	backpack.ammunition -= 2; 
	if (backpack.ammunition < 0) {
		backpack.ammunition = 0; 
	}
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
	dots();
	//disable();
	//document.getElementById("windowPara").innerHTMl = "You are now hunting..."
}

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

function incrementData() {

	function doScaledTimeout() {
		setTimeout(function() {
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
	   		}
	   		trip.milesTraveled += team.milesPerDay;
	   		landmarks[landmarkIndex].distance -= team.milesPerDay;
	   		trip.weather = getWeather();
	   		showStatus();
	  	}, i * 250);
	}

	for (var i = 0; i < 400; i++) {
		doScaledTimeout();
	}
		
}

/*End hunting functions*/
function showSituation() {
	currentSituation = true;
	onSituationMenu = false;
	document.getElementById("tempWindow").style.opacity = "1.0";
	document.getElementById("windowPara").innerHTML = "You may: " + "<br>" + 
	"1. Continue on trail" + "<br>" + 
	"2. Check supplies" + "<br>" + 
	"3. Change pace" + "<br>" + 
	"4. Change food rations" + "<br>" + 
	"5. Stop to rest" + "<br>" + 
	"6. Attempt to trade" + "<br>" + 
	"7. Hunt for food" + "<br>" + 
	"8. Talk to people" + "<br>" + 
	"9. Buy supplies";

	document.body.onkeyup = function(e){
		if(e.keyCode == 32){//Return to situation menu
        	showSituation();
    	}
    	else if(e.keyCode == 49){//1. Continue on Trail
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
	document.getElementById("userInput").style.visibility = "hidden";
}

function sumSpareParts() {
	var totalSum = 0.00;

	totalSum = Number(backpack.spareParts.wagonWheel) + Number(backpack.spareParts.wagonAxle) + Number(backpack.spareParts.wagonTongue);

	return totalSum;
}

function learnPara() {
	//alert("in learnPara");

	
	document.getElementById("windowPara").innerHTML = "Prepare to cross the unrelenting Oregon Trail. Save your money and always take care of those close to you. If you don't survive (probably cause of cholera) just try again! Press 'space bar' to return to the main menu.";

}
/*CHOOSE PERSON*/
function personMenu() {
	//alert("in personMenu");
	document.getElementById("windowPara").innerHTML = "Many kinds of people made the trip to Oregon. <br><br> You may: <br><br> 1. Be a banker from Boston <br> 2. Be a carpenter from Ohio <br> 3. Be a farmer from Illinois <br> 4. Find out the differences between these choices";
	document.body.onkeyup = function(e){
		if(e.keyCode == 32){//Person Menu
        	personMenu();
    	}
		if(e.keyCode == 49){//1. Be a banker
			chooseName = true;
			you.job = "banker";
        	askName(nameCount);
    	}
    	if(e.keyCode == 50){//2. Be a carpenter
    		chooseName = true;
    		you.job = "carpenter";
        	askName(nameCount);
    	}
    	if(e.keyCode == 51){//3. Be a farmer
    		chooseName = true;
    		you.job = "farmer";
        	askName(nameCount);
    	}
    	if(e.keyCode == 52){//Find out difference between choices
        	personDesc();
    	}
	}


}

function personDesc() {
	//alert("in personDesc");
	document.getElementById("windowPara").innerHTML = "Traveling to Oregon isn't easy! But if you're a banker, you'll have more money for supplies and services than a carpenter or a farmer. <br><br> However, the harder you have to try, the more points you deserve! Therefore, the farmer earns the greatest number of points and the banker earns the least. Press 'space bar' to return to previous menu.";
}

/*END CHOOSE PERSON*/

/*Choose wagon leader name*/
function askName(index) {
	var names = ["first", "second", "third", "fourth", "fifth"];
	//while (nextMember) {
	//alert("in askName function");
	showBox();
	if (index === 0) {

		document.getElementById("windowPara").innerHTML = "What is the first name of the wagon leader?";
	}
	else {
		document.getElementById("windowPara").innerHTML = "What is the first name of the " + names[index] + " member?";

	//	count++;
	//}
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
	
		//"Your team is: <br> 1. " + tree.firstMember + "<br> 2. " + tree.secondMember + "<br> 3. " + tree.thirdMember + "<br> 4. " + tree.fourthMember + "<br> 5. " + tree.fifthMember
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
	document.getElementById("windowPara").innerHTML = "Before leaving Independence, you should buy equipment and supplies. You have $800 in cash, but you don't have to spend it all now. Press 'space bar' to move on. ";
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
/*
	document.body.onkeyup = function(e){
		if(e.keyCode == 52){//Show store
        	addOxen("4");
        	storeMenu();
    	}
	}
	*/

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
	"1. Oxen          $" + backpack.oxen * store.oxen + "<br>" +
	"2. Food          $" + (backpack.food * store.food).toFixed(2) + "<br>" +
	"3. Clothing          $" + backpack.clothing * store.clothing + "<br>" +
	"4. Ammunition          $" + backpack.ammunition * store.ammunition + "<br>" +
	"5. Spare Parts          $" +  sumParts * store.spareParts.wagonWheel + "<br>" + 
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
	document.getElementById("town_date").style.visibility = "initial";
	document.getElementById("town").innerHTML = "Independence";
	document.getElementById("date").innerHTML = currentMonth + " " + currentDay + ", " + currentYear;
	document.getElementById("windowPara").innerHTML = "Welcome to the Oregon Trail <br>" + 
	"Good luck!" + "<br><br>" + 
	"Press 'space bar' to move on";
	document.getElementById("tempWindow").style.opacity = "0.5";
	
	//document.getElementById("tempWindow").style.backgroundColor = "transparent";
	document.getElementById("tempWindow").style.backgroundImage = "images/starting_screen.jpg";
}





/*End in between towns*/
function startMenu() {
	//alert("in startMenu");
	hideBox();
	document.getElementById("storeTotal").style.display = "none";
	document.getElementById("tempWindow").style.backgroundColor = "black";
	document.getElementById("windowPara").innerHTML = "You May: <br> 1. Travel the trail <br> 2. Learn about the trail <br> 3. See the Oregon Top Ten <br> 4. End";
/*
	document.body.onkeyup = function(e){
    	if(e.keyCode == 32){//space bar. Travel the trail
    		startMenu();	
    	}
	}
*/
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
    		
    	}
    	if(e.keyCode == 52){//4. end
    		
    	}
	}
}


/*End beginning of trail (after beginning store)*/
function getSubmit() {
	var userInput = document.getElementById("userBox").value;
	document.getElementById("userBox").value = '';
	//alert("userInput: " + userInput + " gameStart: " + gameStart + " choosePerson: " + choosePerson + " chooseName: " + chooseName);
	

	/*Start current situation menu*/
	/*
	if (currentSituation) {
		alert("inside currentSituation");
		if (changePace) {
			switch(userInput) {
				case '1': 
					team.pace = "steady";
					changePace = false;
					showSituation();
					break;
				case '2':
					team.pace = "strenuous";
					changePace = false;
					showSituation();
					break;
				case '3':
					team.pace = "grueling";
					changePace = false;
					showSituation();
					break;
				case '4':
					paceInfo();
					break;
			}
		}
		else {
			switch(userInput) {
			case '0'://return to situation menu
				showSituation();
				break;
			case '1'://continue on trail

				currentSituation = false;
				break;
			case '2'://check supplies
				showSupplies();
				break;
			case '3'://change pace
				showPace();
				break;
			case '4'://change food rations
				showRations();
				break;
			case '5'://stop to rest

				break;
			case '6'://attempt to trade

				break;
			case '7'://hunt for food

				break;
		}
		}
		
	}





	/*End current situation menu*/

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






	/*End buying things at store*/
	/*Start collect month starting */
	/*
	if (chooseMonth) {
		if (['0', '1', '2', '3','4', '5', '6'].indexOf(userInput) >= 0) {
			switch(userInput) {
				case '0':
					monthMenu();
					break;
				case '1':
					currentMonth = "March";
					beforeStoreScreen(); 
					break;
				case '2':
					currentMonth = "April"; 
					beforeStoreScreen(); 
					break;
				case '3': 
					currentMonth = "May"; 
					beforeStoreScreen(); 
					break;
				case '4':
					currentMonth = "June"; 
					beforeStoreScreen(); 
					break; 
				case '5':
					currentMonth = "July";
					beforeStoreScreen();  
					break;
				case '6': 
					storeAdvice();
					break;
			}
		}
		else {
			alert('Please select an number from 1 - 5');
			monthMenu();
		}

	}


	/*End collect month starting*/
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
/*End get names*/
	/*Start menu to ask banker, carpenter, farmer*/
	/*
	if (!gameStart) {
		//alert("in gameStart switch");
		switch(userInput) {
			case '0': 
				startMenu();
				break;
			case '1':
				gameStart = true;
				choosePerson = true;
				userInput = '';
				personMenu();	
				break;
			case '2':
				learnPara();
				break;
		}
		
	}*/
/*End start menu to ask banker, carpenter, farmer*/




	

	
	/*Choose banker, carpenter, farmer*/
	/*
	if (choosePerson) {
		//alert("In choosePerson switch");
		switch (userInput) {
			case '0': 
				personMenu();
				break;
			case '1':
			case '2':
			case '3':
				chooseName = true;
				choosePerson = false;
				askName(nameCount);
				//askName(nameCount);
				break;
			case '4':
				/*Tells player what each person can earn*//*
				personDesc();
				break;
		}
	}*/
	/*End of choose banker, carpenter, farmer*/


}