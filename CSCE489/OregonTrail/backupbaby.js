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

/*store bools*/
var chooseStore = false;
var chooseParts = false;
var chooseOxen = false;
var chooseFood = false;
var chooseClothing = false;
var chooseAmmunition = false;


var nextMember = true;
var emptyName = false;


var userName = "";
var currentMonth = "";
var currentDay = "1";
var currentYear = 1848;

var nameCount = 0;
var sparePartsNum = 0;
var tempStoreBill = 0;

var team = {
	firstMember: "alan", 
	secondMember: "bianca",
	thirdMember: "charlie",
	fourthMember: "daniel",
	fifthMember: "elaine",
	pace: "steady",
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

function getDate() {

	var finalString = currentMonth + " " + currentDay + ", " + currentYear;

	return finalString;
 }
/*Start in between towns*/
function showStatus() {
	var dateString = getDate();
	document.getElementById("windowPara").innerHTML = "Date: " + trip.date + "<br>" + 
	"Weather: " + trip.weather + "<br>" + 
	"Health: " + trip.health + "<br>" + 
	"Food: " + trip.food + "<br>" + 
	"Next landmark: " + trip.nextLandmark + "<br>" + 
	"Miles traveled: " + trip.milesTraveled + "<br>" + 
	"Press space bar to continue";

	document.body.onkeyup = function(e){
    	if(e.keyCode == 32){//space bar
    		alert("start of this whole madness");
    	}
	}
}




/*End in between towns*/
function startMenu() {
	//alert("in startMenu");
	document.getElementById("nextButton").style.visibility = "hidden";
	document.getElementById("storeTotal").style.display = "none";
	document.getElementById("tempWindow").style.backgroundColor = "black";
	document.getElementById("windowPara").innerHTML = "You May: <br> 1. Travel the trail <br> 2. Learn about the trail <br> 3. See the Oregon Top Ten <br> 4. End";

}

/*Start current situation menu*/
function showSupplies() {
	hideBox();
	document.getElementById("windowPara").innerHTML = "oxen         " + backpack.oxen + "<br>" +
	"sets of clothing        " + backpack.clothing + "<br>" + 
	"bullets         " + backpack.ammunition + "<br>" +
	"wagon wheels      " + backpack.spareParts.wagonWheel + "<br>" +
	"wagon axles      " + backpack.spareParts.wagonAxle + "<br>" +
	"wagon tongues      " + backpack.spareParts.wagonTongue + "<br>" +
	"pounds of food          " + backpack.food + "<br>" +
	"money remaining           $" + backpack.money + "<br><br>" + 
	"press space bar to return to the previous menu";

	document.body.onkeyup = function(e){
    	if(e.keyCode == 32){
    		showSituation();
    	}
	}
	
}

function showSituation() {
	showBox();
	currentSituation = true;
	document.getElementById("tempWindow").style.opacity = "1.0";
	document.getElementById("windowPara").innerHTML = "You may: " + "<br>" + 
	"1. Continue on trail" + "<br>" + 
	"2. Check supplies" + "<br>" + 
	"3. Change pace" + "<br>" + 
	"4. Change food rations" + "<br>" + 
	"5. Stop to rest" + "<br>" + 
	"6. Attempt to trade" + "<br>" + 
	"7. Hunt for food";

	document.body.onkeyup = function(e){
    	if(e.keyCode == 49){
        	showStatus();
    	}
	}
}

function showPace() {
	showBox();
	changePace = true;
	document.getElementById("windowPara").innerHTML = "Change Pace" + "<br>" + 
	"(currently '" + team.pace + "'')" + "<br><br>" + 
	"1. steady pace" + "<br>" + 
	"2. strenuous pace" + "<br>" + 
	"3. grueling pace" + "<br>" + 
	"4. find out what these different paces mean";
}

function paceInfo() {
	hideBox();
	document.getElementById("windowPara").innerHTML = "steady: You travel about 8 hours a day, taking frequent rests. You take care not to get tired." + "<br>" + 
	"strenuous: You travel about 12 hours a day. You only stop to rest when necessary. Finish each day feeling tired" + "<br>" + 
	"grueling: You travel about 16 hours a day. Almost never stop to rest. Finish eacy day begin exhausted and your health suffers" + "<br>" +
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
	"3. bare bones - meals are very small; everyone stays hungry" + "<br>" + 
	"Please select #1, #2, or #3";
	document.body.onkeyup = function(e){
    	if(e.keyCode == 49){
    		team.rations = "filling";
        	showSituation();
    	}
    	if(e.keyCode == 50){
    		team.rations = "meager";
        	showSituation();
    	}
    	if(e.keyCode == 51){
    		team.rations = "bare bones";
        	showSituation();
    	}
	}

}

/*End current situation menu*/
function showButton() {
	document.getElementById("nextButton").style.visibility = "initial";
	document.getElementById("userInput").style.visibility = "hidden";
}

function showBox() {
	document.getElementById("nextButton").style.visibility = "hidden";
	document.getElementById("userInput").style.visibility = "visible";
	document.getElementById("userBox").focus();
}

function hideButton() {
	document.getElementById("nextButton").style.visibility = "hidden";
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

	
	document.getElementById("windowPara").innerHTML = "Prepare to cross the unrelenting Oregon Trail. Save your money and always take care of those close to you. If you don't survive (probably cause of cholera) just try again! Enter #'0' to return to the main menu.";

}
/*CHOOSE PERSON*/
function personMenu() {
	//alert("in personMenu");
	document.getElementById("windowPara").innerHTML = "Many kinds of people made the trip to Oregon. <br><br> You may: <br><br> 1. Be a banker from Boston <br> 2. Be a carpenter from Ohio <br> 3. Be a farmer from Illinois <br> 4. Find out the differences between these choices";

}

function personDesc() {
	//alert("in personDesc");
	document.getElementById("windowPara").innerHTML = "Traveling to Oregon isn't easy! But if you're a banker, you'll have more money for supplies and services than a carpenter or a farmer. <br><br> However, the harder you have to try, the more points you deserve! Therefore, the farmer earns the greatest number of points and the banker earns the least. Press #'0' to return to previous menu.";
}

/*END CHOOSE PERSON*/

/*Choose wagon leader name*/
function askName(index) {
	var names = ["first", "second", "third", "fourth", "fifth"];
	//while (nextMember) {
	//alert("in askName function");
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
		//alert("in showNames function");
	//document.getElementById("nextButton").style.visiblity = "initial"
	showButton();
	document.getElementById("windowPara").innerHTML = "Your team is: " + " <br> 1. " + team.firstMember  + " -- Team Leader <br> 2. " + team.secondMember  + " <br> 3. " + team.thirdMember  + " <br> 4. " + team.fourthMember  + " <br> 5. " + team.fifthMember;
	
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
	showBox();
	chooseMonth = true;
	chooseName = false;
	document.getElementById("windowPara").innerHTML = "It is 1848. Your jumping off place for Oregon is Independence, Missouri. You must decide which month to leave for Independence. <br><br> 1. March <br> 2. April <br> 3. May <br> 4. June <br> 5. July <br> 6. Ask for advice";
}

/*End choosing month*/

/*Start store at beginning of game*/
function beforeStoreScreen() {
	showButton();
	document.getElementById("nextButton").onclick = function () {storeMenu()};
	document.getElementById("windowPara").innerHTML = "Before leaving Independence, you should buy equipment and supplies. You have $800 in cash, but you don't have to spend it all now";
}

function storeAdvice() {
	document.getElementById("windowPara").innerHTML = "You attend a public meeting held for 'folks with the California - Oregon fever.' You're told: If you leave too early, there won't be any grass for your oxen to eat. If you leave too late, you may not get to Oregon before winter comes. If you leave at just the right time, there will be green grass and the weather will still be cool. (Enter #'0' to return to previous menu)";
}

function storeOxen() {
	document.getElementById("windowPara").innerHTML = "Matt's General Store " + "<br>" + 
	"Independence, Missour" + "<br><br>" + 

	"There are 2 oxen in a yoke; I recommend at least 3 yoke. $40 a yoke" + "<br>";

	document.getElementById("userBox").placeholder = "How many oxen do you want?....";

}

function addOxen(input) {

	backpack.oxen += Number(input);
	tempStoreBill += (store.oxen * input);
	if (tempStoreBill > backpack.money) {
		alert("You do not have enough money. Your previous purchase has not been added to your shopping total.");
		tempStoreBill -= (store.oxen * input);
		backpack.oxen -= Number(input);
	}
	document.getElementById("userBox").placeholder = "";
	document.getElementById("moneySpent").innerHTML = "$" + tempStoreBill;
}
function storeFood() {
	document.getElementById("windowPara").innerHTML = "Matt's General Store " + "<br>" + 
	"Independence, Missour" + "<br><br>" + 

	"I recommend at least 200 pounds of food for your team. $0.20 for a pound" + "<br>";

	document.getElementById("userBox").placeholder = "How many pounds do you want?...";
}

function addFood(input) {
	backpack.food += Number(input);
	tempStoreBill += Number((store.food * input).toFixed(2));
	if (tempStoreBill > backpack.money) {
		alert("You do not have enough money. Your previous purchase has not been added to your shopping total.");
		tempStoreBill -= (store.food * input);
		backpack.food -= Number(input);
	}
	document.getElementById("userBox").placeholder = "";
	document.getElementById("moneySpent").innerHTML = "$" + tempStoreBill;
}

function storeClothing() {
	document.getElementById("windowPara").innerHTML = "Matt's General Store " + "<br>" + 
	"Independence, Missour" + "<br><br>" + 

	"I recommend at least 2 sets of clothes per person. $10 for a set" + "<br>";

	document.getElementById("userBox").placeholder = "How many sets do you want?...";
}

function addClothing(input) {
	backpack.clothing += Number(input);
	tempStoreBill += (store.clothing * input);
	if (tempStoreBill > backpack.money) {
		alert("You do not have enough money. Your previous purchase has not been added to your shopping total.");
		tempStoreBill -= (store.clothing * input);
		backpack.clothing -= Number(input);
	}
	document.getElementById("userBox").placeholder = "";
	document.getElementById("moneySpent").innerHTML = "$" + tempStoreBill;
}
function storeAmmunition() {
	document.getElementById("windowPara").innerHTML = "Matt's General Store " + "<br>" + 
	"Independence, Missour" + "<br><br>" + 

	"Each box has 20 bullets. $2 a box" + "<br>";

	document.getElementById("userBox").placeholder = "How many boxes do you want?...";
}
function addAmmunition(input) {
	backpack.ammunition += Number(input);
	tempStoreBill += (store.ammunition * input);
	if (tempStoreBill > backpack.money) {
		alert("You do not have enough money. Your previous purchase has not been added to your shopping total.");
		tempStoreBill -= (store.ammunition * input);
		backpack.ammunition -= Number(input);
	}
	document.getElementById("userBox").placeholder = "";
	document.getElementById("moneySpent").innerHTML = "$" + tempStoreBill;
}
function storeSpareParts() {

	sparePartsNum++;
	document.getElementById("windowPara").innerHTML = "Matt's General Store <br> Independence, Missouri <br><br> Wagon Wheel: $" + store.spareParts.wagonWheel + "<br>" +
	"Wagon Axle: $" + store.spareParts.wagonAxle + "<br>" + 
	"Wagon Tongue: $" + store.spareParts.wagonTongue;
	
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

function storeMenu() {
	//alert("tempStoreBill: " + tempStoreBill);
	var sumParts = sumSpareParts();
	document.getElementById("storeTotal").style.display = "inline-block";
	chooseMonth = false;
	chooseStore = true;
	showBox();
	document.getElementById("windowPara").innerHTML = "Matt's General Store <br> Independence, Missouri <br> <br>" + currentMonth + "  " + currentDay + ", " + currentYear + "<br>" + 
	"1. Oxen          $" + backpack.oxen * store.oxen + "<br>" +
	"2. Food          $" + (backpack.food * store.food).toFixed(2) + "<br>" +
	"3. Clothing          $" + backpack.clothing * store.clothing + "<br>" +
	"4. Ammunition          $" + backpack.ammunition * store.ammunition + "<br>" +
	"5. Spare Parts          $" +  sumParts * store.spareParts.wagonWheel + "<br>" + 
	"Which item would you like to buy? (Enter #'0' to exit store)"

	;
}

/*End store at beginning of game*/
/*Start beginning of trail (after beginning store)*/
function startScreen() {
	//document.getElementById("nextButton").onclick = function () {storeMenu()};
	document.getElementById("nextButton").onclick = function () {showSituation()};
	document.getElementById("town_date").style.visibility = "initial";
	document.getElementById("town").innerHTML = "Independence";
	document.getElementById("date").innerHTML = currentMonth + " " + currentDay + ", " + currentYear;
	document.getElementById("windowPara").innerHTML = "Welcome to the Oregon Trail <br>" + 
	"Good luck!";
	document.getElementById("tempWindow").style.opacity = "0.5";
	showButton();
	//document.getElementById("tempWindow").style.backgroundColor = "transparent";
	document.getElementById("tempWindow").style.backgroundImage = "images/starting_screen.jpg";
}







/*End beginning of trail (after beginning store)*/
function getSubmit() {
	var userInput = document.getElementById("userBox").value;
	document.getElementById("userBox").value = '';
	//alert("userInput: " + userInput + " gameStart: " + gameStart + " choosePerson: " + choosePerson + " chooseName: " + chooseName);
	

	/*Start current situation menu*/
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
			switch(sparePartsNum) {
				case 1:
					backpack.spareParts.wagonWheel += Number(userInput);
					tempStoreBill += (store.spareParts.wagonWheel * userInput);
					if (tempStoreBill > backpack.money) {
						alert("You do not have enough money. Your previous purchase has not been added to your shopping total.");
						tempStoreBill -= (store.spareParts.wagonWheel * userInput);
						backpack.spareParts.wagonWheel -= Number(userInput);
					}
					document.getElementById("moneySpent").innerHTML = "$" + tempStoreBill;
					storeSpareParts();
					break;
				case 2:
					backpack.spareParts.wagonAxle += Number(userInput);
					tempStoreBill += (store.spareParts.wagonAxle * userInput);
					if (tempStoreBill > backpack.money) {
						alert("You do not have enough money. Your previous purchase has not been added to your shopping total.");
						tempStoreBill -= (store.spareParts.wagonAxle * userInput);
						backpack.spareParts.wagonAxle -= Number(userInput);
					}
					document.getElementById("moneySpent").innerHTML = "$" + tempStoreBill;
					storeSpareParts();
					break;
				case 3:
					backpack.spareParts.wagonTongue += Number(userInput);
					tempStoreBill += (store.spareParts.wagonTongue * userInput);
					if (tempStoreBill > backpack.money) {
						alert("You do not have enough money. Your previous purchase has not been added to your shopping total.");
						tempStoreBill -= (store.spareParts.wagonTongue * userInput);
						backpack.spareParts.wagonTongue -= Number(userInput);
					}
					document.getElementById("moneySpent").innerHTML = "$" + tempStoreBill;
					chooseParts = false;
					document.getElementById("userBox").placeholder = "";
					storeMenu();
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
		
	}
/*End start menu to ask banker, carpenter, farmer*/




	

	
	/*Choose banker, carpenter, farmer*/
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
				/*Tells player what each person can earn*/
				personDesc();
				break;
		}
	}
	/*End of choose banker, carpenter, farmer*/


}