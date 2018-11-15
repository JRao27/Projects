<?php
//Step1
$connect = mysqli_connect('database.cs.tamu.edu','josh1996','96Aggiesjosh18', 'josh1996');

//mysql_select_db('testdb'); 

$userInput = $_GET["deadName"];
$pieces = explode(" ", $userInput);
$name = $pieces[0];
$mile = $pieces[1];
	$sql = "insert into MileMarkers (Name, Miles) values ('$name', $mile)";
 
	$record = mysqli_query($connect, $sql);


$oneElem = "SELECT * FROM MileMarkers ORDER BY Miles DESC";
$testRecord = mysqli_query($connect, $oneElem);
?>

<html>
 <head>
 </head>
 <body> 
 <h1>Mile Markers</h1>
 
 <table style = "width:100%" border = "1" cellpadding = "1" cellspacing = "1">
 <tr>
 
 <th>Name</th>
 <th>Miles</th>


 <tr>
 
 <?php

	while($next_question = mysqli_fetch_array($testRecord)) {
		
		echo "<tr>";

		echo "<td>".$next_question['Name']."</td>";
		
		echo "<td>".$next_question['Miles']."</td>";
		
		echo "</tr>";
		
		
		
	}
 
 
 
 
 ?>
</body>
</html>