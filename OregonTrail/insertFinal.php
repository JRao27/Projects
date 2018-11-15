<?php
//Step1
$connect = mysqli_connect('database.cs.tamu.edu','josh1996','96Aggiesjosh18', 'josh1996');

//mysql_select_db('testdb'); 

$userInput = $_GET["deadName"];
$pieces = explode(" ", $userInput);
$name = $pieces[0];
$score = $pieces[1];
$sql = "insert into OregonTrailScoreBoard (Name, Score) values ('$name', $score)";
 
$record = mysqli_query($connect, $sql);

?>