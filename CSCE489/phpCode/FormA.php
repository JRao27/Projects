<?php

$stack = [];

for ($x = 1; $x < 11; $x++) {
	$userVal = $_POST["num$x"];//comes from <... name = "num2"
	array_push($stack, $userVal);
}

print_r($stack);
//Find average
$average = array_sum($stack)/count($stack);

//Find minimum value submitted
$minVal = min($stack);

//Find maximum value submitted
$maxVal = max($stack);

//Sort array from low to high
sort($stack);
$stack = array_values($stack);

$median = ($stack[4] + $stack[5])/2;

echo "<br>";

echo "The average of the numbers submitted is $average";

echo "<br>";

echo "The minimum value of the numbers submitted is $minVal";

echo "<br>";

echo "The maximum value of the numbers submitted is $maxVal";

echo "<br>";

echo "The median value of the numbers submitted is $median";



?>