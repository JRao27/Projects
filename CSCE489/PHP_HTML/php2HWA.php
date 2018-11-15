<?php
//Step1
$connect = mysqli_connect('localhost','root','', 'testdb');

//mysql_select_db('testdb'); 
$sql = "SELECT * FROM question";
 
$record = mysqli_query($connect, $sql);
?>

<html>
 <head>
 </head>
 <body> 
 <h1>Displaying Data from the DB exercise: PHP_HTML Homework A #3</h1>
 
 <table style = "width:100%" border = "1" cellpadding = "1" cellspacing = "1">
 <tr>
 
 
 <th>ID</th>
 <th style = "width:30%">Question</th>
 <th>Type</th>
 <th>Answer</th>
 <th>Very Important</th>
 <th>Important</th>
 <th>Moderately Important</th>
 <th>Of Little Importance</th>
 <th>Unimportant</th>
 <tr>
 
 <?php
	while($next_question = mysqli_fetch_array($record)) {
		
		echo "<tr>";
		
		echo "<td>".$next_question['ID']."</td>";
		
		echo "<td>".$next_question['Question']."</td>";
		
		echo "<td>".$next_question['Type']."</td>";
		
		echo "<td>".$next_question['Answer']."</td>";
		
		echo "<td>".$next_question['Very Important']."</td>";
		
		echo "<td>".$next_question['Important']."</td>";
		
		echo "<td>".$next_question['Moderately Important']."</td>";
		
		echo "<td>".$next_question['Of Little Importance']."</td>";
		
		echo "<td>".$next_question['Unimportant']."</td>";
		
		echo "</tr>";
		
		
		
	}
 
 
 
 
 ?>
</body>
</html>