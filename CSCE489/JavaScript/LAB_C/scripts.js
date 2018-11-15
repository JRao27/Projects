var laptopArray = [];
var emptyArray = [];
var userInput = 0.0;

$(function () {
	
	var laptopModels = ['Lenovo', 'Dell', 'HP', 'Samsung', 'Asus'];

	function Laptop(brand, modelName, modelNumber, OS, price, hardDrive, RAM, screen, weight) {
    	this.brand = brand;
    	this.modelName = modelName;
   	 	this.modelNumber = modelNumber;
    	this.OS = OS;
    	this.price = price;
    	this.hardDrive = hardDrive;
   	 	this.RAM = RAM;
    	this.screen = screen;
    	this.weight = weight;
	};	

	
	$.getJSON("https://api.myjson.com/bins/knvye", function(data) {
		console.log(data);

		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				var newLaptop = new Laptop(
					data[laptopModels[i]][j].Brand,
					data[laptopModels[i]][j]["Model Name"], 
					data[laptopModels[i]][j]["Model Number"],
					data[laptopModels[i]][j]["Operating System"],
					data[laptopModels[i]][j].Price,
					data[laptopModels[i]][j]["Hard Drive Size"],
					data[laptopModels[i]][j]["RAM size"],
					data[laptopModels[i]][j]["Screen Size"],
					data[laptopModels[i]][j].Weight
				)
				laptopArray.push(newLaptop);
			}

		}
		
		var emptyLaptop = new Laptop("N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A");
		emptyArray.push(emptyLaptop);
		

		for (var a = 1; a <= laptopArray.length; a++) {
			w3.displayObject("id" + a, laptopArray[a-1]);
		}
		//alert("LENGTH: " + laptopArray.length);
		//alert(laptopArray[23].modelName);
	});
});

function filterLenovo(item) {
	if (item.brand === 'Lenovo') {
		return true;
	}
	else {
		return false;
	}
	
}

function filterDell(item) {
	if (item.brand === 'Dell') {
		return true;
	}
	else {
		return false;
	}
	
}

function filterHP(item) {
	if (item.brand === 'HP') {
		return true;
	}
	else {
		return false;
	}
	
}

function filterSamsung(item) {
	if (item.brand === 'Samsung') {
		return true;
	}
	else {
		return false;
	}
	
}

function filterAsus(item) {
	if (item.brand === 'Asus') {
		return true;
	}
	else {
		return false;
	}
	
}

function filterWeight(item) {
	
	if (item.weight <=  userInput) {
		return true;
	}
	else {
		return false;
	}
}

function filterScreen(item) {
	if (item.screen >= userInput) {
		return true;
	}
	else {
		return false;
	}
}

function checkLenovo(checkboxElem) {
  if (checkboxElem.checked) {
  	
    var testVar = laptopArray.filter(filterLenovo);
   	var numItems = testVar.length;

   	for (var a = 1; a < 6; a++) {
			w3.displayObject("id" + a, testVar[a-1]);
	}

  }
  else {

  	for (var i = 1; i < 6; i++) {
			w3.displayObject("id" + i, emptyArray[0]);
			document.getElementById("img"+i).src="images/typewriter.jpeg";

	}
  } 
}

function checkDell(checkboxElem) {
  if (checkboxElem.checked) {
  	
    var testVar = laptopArray.filter(filterDell);
   	var numItems = testVar.length;
   	var testVarStart = 0;
   	for (var a = 6; a < 11; a++) {
			w3.displayObject("id" + a, testVar[testVarStart]);
			testVarStart++;
	}

  }
  else {
  	for (var i = 6; i < 11; i++) {
			w3.displayObject("id" + i, emptyArray[0]);
			document.getElementById("img"+i).src="images/typewriter.jpeg";	}
  } 
}

function checkHP(checkboxElem) {
  if (checkboxElem.checked) {
  	
    var testVar = laptopArray.filter(filterHP);
   	var numItems = testVar.length;
   	var testVarStart = 0;
   	for (var a = 11; a < 16; a++) {
			w3.displayObject("id" + a, testVar[testVarStart]);
			testVarStart++;
	}

  }
  else {
  	for (var i = 11; i < 16; i++) {
			w3.displayObject("id" + i, emptyArray[0]);
			document.getElementById("img"+i).src="images/typewriter.jpeg";
	}
  } 
}

function checkSamsung(checkboxElem) {
  if (checkboxElem.checked) {
  	
    var testVar = laptopArray.filter(filterSamsung);
   	var numItems = testVar.length;
   	var testVarStart = 0;
   	for (var a = 16; a < 21; a++) {
			w3.displayObject("id" + a, testVar[testVarStart]);
			testVarStart++;
	}

  }
  else {
  	for (var i = 16; i < 21; i++) {
			w3.displayObject("id" + i, emptyArray[0]);
			document.getElementById("img"+i).src="images/typewriter.jpeg";
	}
  } 
}

function checkAsus(checkboxElem) {
  if (checkboxElem.checked) {
  	
    var testVar = laptopArray.filter(filterAsus);
   	var numItems = testVar.length;
   	var testVarStart = 0;

   	for (var a = 21; a < 26; a++) {
   		
			w3.displayObject("id" + a, testVar[testVarStart]);
			testVarStart++;
	}

	
	
  }
  else {
  	for (var i = 21; i < 26; i++) {
  			
			w3.displayObject("id" + i, emptyArray[0]);
			document.getElementById("img"+i).src="images/typewriter.jpeg";
	}
  } 
}


function checkWeight(checkboxElem) {
	if (checkboxElem.checked) {
		userInput = document.getElementById("userWeight").value;
		
		var testVar = laptopArray.filter(filterWeight);
		
		for (var a = 1; a <= testVar.length; a++) {


			w3.displayObject("id" + a, testVar[a-1]);

			if (testVar[a-1].brand === 'Lenovo') {
				document.getElementById("img"+a).src = "images/lenovo.jpeg";
			}

			if (testVar[a-1].brand === 'Dell') {
				document.getElementById("img"+a).src = "images/dell.jpeg";
			}

			if (testVar[a-1].brand === 'HP') {
				document.getElementById("img"+a).src = "images/hp.jpeg";
			}

			if (testVar[a-1].brand === 'Samsung') {
				document.getElementById("img"+a).src = "images/samsung.jpeg";
			}

			if (testVar[a-1].brand === 'Asus') {
				document.getElementById("img"+a).src = "images/asus.jpeg";
			}
		}

		for (var i = testVar.length+1; i < 26; i++) {
			w3.displayObject("id" + i, emptyArray[0]);
			document.getElementById("img"+i).src="images/typewriter.jpeg";
		}
	}
}

function checkScreen(checkboxElem) {
	if (checkboxElem.checked) {
		userInput = document.getElementById("userScreen").value;
		
		var testVar = laptopArray.filter(filterScreen);
		
		for (var a = 1; a <= testVar.length; a++) {
			w3.displayObject("id" + a, testVar[a-1]);

			if (testVar[a-1].brand === 'Lenovo') {
				document.getElementById("img"+a).src = "images/lenovo.jpeg";
			}

			if (testVar[a-1].brand === 'Dell') {
				document.getElementById("img"+a).src = "images/dell.jpeg";
			}

			if (testVar[a-1].brand === 'HP') {
				document.getElementById("img"+a).src = "images/hp.jpeg";
			}

			if (testVar[a-1].brand === 'Samsung') {
				document.getElementById("img"+a).src = "images/samsung.jpeg";
			}

			if (testVar[a-1].brand === 'Asus') {
				document.getElementById("img"+a).src = "images/asus.jpeg";
			}
		}

		for (var i = testVar.length+1; i < 26; i++) {
			w3.displayObject("id" + i, emptyArray[0]);
			document.getElementById("img"+i).src="images/typewriter.jpeg";
		}
	}
}

function newWindow(pID) {
	var win = window.open("about:blank");
	var singleLaptop = document.getElementById(pID).innerHTML;
	win.document.write(singleLaptop);
}