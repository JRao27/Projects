
var recipeCount = 0;
var userString = "";
  $(document).ready(function(){
            var submitIcon = $('.searchbox-icon');
            var inputBox = $('.searchbox-input');
            var searchBox = $('.searchbox');
            var isOpen = false;
            submitIcon.click(function(){
                if(isOpen == false){
                    searchBox.addClass('searchbox-open');
                    inputBox.focus();
                    isOpen = true;
                } else {
                    searchBox.removeClass('searchbox-open');
                    inputBox.focusout();
                    isOpen = false;
                }
            });  
             submitIcon.mouseup(function(){
                    return false;
                });
            searchBox.mouseup(function(){
                    return false;
                });
            $(document).mouseup(function(){
                    if(isOpen == true){
                        $('.searchbox-icon').css('display','block');
                        submitIcon.click();
                    }
                });
        });
function buttonUp(){
    var inputVal = $('.searchbox-input').val();
    inputVal = $.trim(inputVal).length;
    if( inputVal !== 0){
        $('.searchbox-icon').css('display','none');
    } else {
        $('.searchbox-input').val('');
        $('.searchbox-icon').css('display','block');
    }
}


function userSearch() {
    userString  = document.getElementById("mySearch").value;
    
    var testString = String(userString);
    var finalResult = testString.split(" ");

    parseInput(finalResult);
    
    clearSite();
	apiCall();
    
}

/*http://localhost:8983/solr/xing/select?q=title:*/

function parseInput(input) {

    var inputLength = input.length;
    var i;
    var finalString = "";

    for (i = 0; i < inputLength-1; i++) {
        finalString = finalString.concat(input[i] + " AND ");
    }

    finalString = finalString.concat(input[inputLength-1]);

    userString = finalString;
}


function apiCall() { 
    /*var picURL = data.response.docs[recipeCount].picture_url; 
    var str = String(picURL);
    var res = str.split("/");
    */

    $.getJSON('http://localhost:8983/solr/xing/select?q=ingredients:(' + userString + ')', function(data){
            console.log(data);
            fillSite(data);    
    });
}

function clearSite() {
    openSnack();
    document.getElementById("foodPicDiv").style.background = "transparent";
    document.getElementById("foodPicDiv").style.border = "transparent";
    document.getElementById("foodInfoDiv").style.background = ' ';
    document.getElementById("recTitle").innerHTML = ' ';
    document.getElementById("recIngred").innerHTML = ' ';
    document.getElementById("recInstr").innerHTML = ' ';
    document.getElementById("recServings").innerHTML = ' ';
    document.getElementById("recCalories").innerHTML = ' ';
    document.getElementById("recFat").innerHTML = ' ';
    document.getElementById("recCarbs").innerHTML = ' ';
    document.getElementById("recProtein").innerHTML = ' ';
    document.getElementById("recSodium").innerHTML = ' ';
    document.getElementById("foodPicDiv").innerHTML = ' ';

    document.getElementById("titleHeader").innerHTML = ' ';
    document.getElementById("ingredientsHeader").innerHTML = ' ';
    document.getElementById("instructionsHeader").innerHTML = ' ';
    document.getElementById("servingsHeader").innerHTML = ' ';
    document.getElementById("caloriesHeader").innerHTML = ' ';
    document.getElementById("fatHeader").innerHTML = ' ';
    document.getElementById("carbsHeader").innerHTML = ' ';
    document.getElementById("proteinHeader").innerHTML = ' ';
    document.getElementById("sodiumHeader").innerHTML = ' ';
}

function fillSite(data) {
    console.log(data);  
    var picURL = data.response.docs[recipeCount].picture_url; 
    var str = String(picURL);
    var res = str.split("/");
    var recipeID = res[4];
    var picID = res[7];
    var title = data.response.docs[recipeCount].title;

    var ingredients = data.response.docs[recipeCount].ingredients[0];
    ingredients = ingredients.slice(1, ingredients.length-1);

    var instructions = data.response.docs[recipeCount].instructions[0];
    instructions = instructions.slice(1, instructions.length-1);
               
    var servings = data.response.docs[recipeCount].servings; 
                

    /*
    WEB URL: https://www.allrecipes.com/recipe/10827/
    PIC URL: https://images.media-allrecipes.com/userphotos/250x250/810547
    Actual URL Given: "https://allrecipes.com/recipe/10824/everything-cookies-ii/photos/830019/
    */

    //Make button appear
    document.getElementById("new_recipe").style.display = "block";
    document.getElementById("new_video").style.display = "block";
    document.getElementById("newVideoLink").href = "https://www.youtube.com/results?search_query=" + title + " recipe";



    //Make left-hand food picture appear
    if (typeof picURL == 'undefined') { //Takes into account if a recipe doesn't have a image
        document.getElementById("foodPicDiv").innerHTML = '<img src = "no_img.jpg" />';
    }
    else {
        document.getElementById("foodPicDiv").innerHTML = "<img src = https://images.media-allrecipes.com/userphotos/250x250/" + picID + ".jpg>";
    }



    if (typeof servings == 'undefined') { //Takes into account if a recipe doesn't have a image
        servings = "N/A"
    }

    document.getElementById("foodPicDiv").style.background = "black";
    document.getElementById("foodPicDiv").style.border = "8px solid black";
    document.getElementById("foodInfoDiv").style.background = "info_bg.jpg";

    //Make right-hand food information appear
    document.getElementById("recTitle").innerHTML =  "<a href = 'https://www.allrecipes.com/recipe/" + recipeID + "' target='_blank'>" + title + "</a>"+ "<br />" + "<br />";
    document.getElementById("recIngred").innerHTML = ingredients + "<br />" + "<br />";
    document.getElementById("recInstr").innerHTML = instructions + "<br />" + "<br />";
    document.getElementById("recServings").innerHTML = "  " + servings + "<br />" + "<br />";
    document.getElementById("recCalories").innerHTML = "  " + data.response.docs[recipeCount].calories + "<br />" + "<br />";
    document.getElementById("recFat").innerHTML = "  " + data.response.docs[recipeCount].fat + "<br />" + "<br />";
    document.getElementById("recCarbs").innerHTML = "  " + data.response.docs[recipeCount].carbs + "<br />" + "<br />";
    document.getElementById("recProtein").innerHTML = "  " + data.response.docs[recipeCount].protein + "<br />" + "<br />";
    document.getElementById("recSodium").innerHTML = "  " + data.response.docs[recipeCount].sodium + "<br />" + "<br />";
                
    document.getElementById("titleHeader").innerHTML = "<u>Recipe Name (Click to see full recipe)</u> " ;
    document.getElementById("ingredientsHeader").innerHTML = "<u>Ingredients</u>" ;
    document.getElementById("instructionsHeader").innerHTML = "<u>Instructions</u>" ;
    document.getElementById("servingsHeader").innerHTML = "Servings:  " ;
    document.getElementById("caloriesHeader").innerHTML = "Calories:  " ;
    document.getElementById("fatHeader").innerHTML = "Fat:  " ;
    document.getElementById("carbsHeader").innerHTML = "Carbs:  " ;
    document.getElementById("proteinHeader").innerHTML = "Protein:  " ;
    document.getElementById("sodiumHeader").innerHTML = "Sodium:  " ;
}

function openSnack() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
}

function randomRecipe() {

    recipeCount++;
    clearSite();
    apiCall();
}

function randomVideo() {


}









