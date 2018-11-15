while read line;
do
	myvar="${line%%.*}"
	testLength="${#myvar}"

	
	if [ "$testLength" -lt 5 ]; then
		echo "$myvar"
	fi
	
#	if [$testLength -gt 5] 
	#then
	#
	#	fi
	

done < dir.txt


#"${line%%.*}"