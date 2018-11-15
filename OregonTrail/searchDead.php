<?php

$connect = mysqli_connect('database.cs.tamu.edu','josh1996','96Aggiesjosh18', 'josh1996');

$userInput = $_GET["deadMile"];
$up = $userInput + 5;
//echo "<script type='text/javascript'>alert('$userInput');</script>";
//$down = $userInput - 5;
$sql = "SELECT Miles FROM MileMarkers WHERE Miles = $userInput OR Miles = $up";

$record = mysqli_query($connect, $sql);
$numRecords = mysqli_num_rows($record);

	if ($numRecords != 0) {
		$foundOne = true;

	}
	else {
		$foundOne = false;

	}


?>

<script type="text/javascript">
	//var inputBool = "<?php //echo $foundOne ?>"; 
	var inputBool = "dog";
	localStorage.setItem("storageName",inputBool);
	//alert("bool: " + bool);
</script>