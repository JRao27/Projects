<?php
	$stack = [];

	for ($x = 0; $x < 10; $x++) {
		$randNum = rand(0, 1000);
		array_push($stack, $randNum);
	}
	

	$minVal = min($stack);
	$maxVal = max($stack);
	$average = array_sum($stack)/count($stack);

	print_r($stack);
	echo "<br>";
	echo "Minimum value in array is $minVal.";
	echo "<br>";
	echo "Maximum value in array is $maxVal.";
	sort($stack);
	echo "<br>";
	echo "Array sorted from low to high: ";
	print_r($stack);
	rsort($stack);
	echo "<br>";
	echo "Array sorted from high to low: ";
	print_r($stack);
	echo "<br>";
	echo "Average of array is : $average";

?>