

--Question 1(B)
helper x y	|x == 0				= ""
			|otherwise			= y++(helper (x-1) y)

myRLD [] 	= ""
myRLD x		|length(x)==0	= ""
			|otherwise		= helper (fst(head x)) [(snd(head x))] ++ (myRLD (drop 1 x))
			
--Question 1(C)
work x		|length(x)==0		= ""
			|(head x) == 'e'	= [head (drop 1 x)]++(work (drop 2 x))
			|otherwise			= work (drop 1 x)
