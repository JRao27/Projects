<html>
<body>

<?php
	$hours = $_POST["hours"];
	$salary = 0;
	if ($hours < 40) {
		$GLOBALS['salary'] = $hours * 8; 
		echo "Salary is $salary dollars";

	}
	else {
		$over40 = $hours - 40;
		$extraMoney = $over40 * 12;
		$GLOBALS['salary'] = 320 + $extraMoney;
		echo "Salary is $salary dollars";
	}
?>

</body>
</html>