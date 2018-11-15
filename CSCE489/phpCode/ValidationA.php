<?php


$stack = [];

for ($x = 1; $x < 11; $x++) {
	$userVal = $_POST["num$x"];
	
	if (is_numeric($userVal)) {

	}
	else {
		exit("$userVal is not an appropriate numeric input. Please enter only numbers");
	}
	array_push($stack, $userVal);
}

print_r($stack);







?>