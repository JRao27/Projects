<?php
	$userString = $_POST["string"];

	$numSpaces = substr_count($userString, ' ');
	$numPunctuation = preg_match_all('/[[:punct:]]/', $userString);
	echo "Submitted string is: $userString";
	echo "<br>";
	echo "There are $numSpaces spaces in the string submitted by the user. ";
	echo "<br>";
	echo "There are $numPunctuation punctuation marks in the string submitted by the user. ";


	
?>
