<?php
//Step1
$connect = mysqli_connect('database.cs.tamu.edu','josh1996','96Aggiesjosh18', 'josh1996');

//mysql_select_db('testdb'); 
//$sql = "insert into OregonTrailScoreBoard (Name, Score) values ('ryan', 45)";
 
//$record = mysqli_query($connect, $sql);
//$testSQL = "SELECT * FROM OregonTrailScoreBoard";
//$record = mysqli_query($connect, $testSQL);

$oneElem = "SELECT * FROM OregonTrailScoreBoard ORDER BY Score DESC";
$testRecord = mysqli_query($connect, $oneElem);
?>

<html>
 <head>
 	<link rel="stylesheet" href="scoreStyle.css">
 </head>
 <body id = "finalBody" background = "images/scoreboardBackground.jpg"> 
 <h1 id = "mainHeader" align = "left">Final Oregon Trail Scores</h1>
 
 <table id = "finalTable" style = "width:100%; color: white" border = "1" cellpadding = "1" cellspacing = "1" bgcolor = "black">
 <tr>
 
 <th>Name</th>
 <th>Score</th>


 <tr>
 
 <?php




	while($next_question = mysqli_fetch_array($testRecord)) {
		
		echo "<tr>";

		echo "<td align = 'center'>".$next_question['Name']."</td>";
		
		echo "<td align = 'center'>".$next_question['Score']."</td>";
		
		echo "</tr>";
		
		
		
	}
 
 	
 
 
 ?>


 <script>
    document.body.onkeyup = function(e){
		if(e.keyCode == 32){//Return to main menu from top scores
    		window.location = 'http://projects.cse.tamu.edu/josh1996/OregonTrail/index.html'
    	}
	}
</script>
</body>
</html>