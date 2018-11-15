--myReverse

myReverse x		|length x == 0		= []
				|otherwise			= [last x]++myReverse (init x)


--isElement

isElement x y	|length(y) == 0		= False
				|x == head y		= True
				|otherwise			= isElement x (drop 1 y)

--duplicate

duplicate x		|length(x) == 0		= []
				|otherwise			= [head x]++[head x]++(duplicate (drop 1 x))

--removeDuplicate

removeDuplicate x	|length(x)==1				= [head x]++removeDuplicate (drop 1 x)
					|length(x)==0				= []
					|(head x)== (x !! 1)		= removeDuplicate (drop 1 x)
					|otherwise					= [head x]++(removeDuplicate (drop 1 x))

test x n = (drop (n `mod` length(x)) x)++ (take (n `mod` length(x)) x)
--rotate
rotate x n		|length(x) == 0	= ""
				|otherwise		= test x n 

--test x n = (drop (n `mod` length(x)) x)++ (take (n `mod` length(x)) x)
--rotate x n = (drop (n `mod` length(x)) x) ++ (take (n `mod` length(x)) x)

--test x = take 1 x

--flatten
flatten x	|length(x)==0	= []
			|otherwise		= (head x)++(flatten (drop 1 x))

--isPalindrome
isPalindrome x		|length(x) == 0					= True
					|(head x) == head (reverse x)	= isPalindrome (reverse(drop 1 (reverse (drop 1 x))))
					|otherwise						= False

--coPrime
coprime x y			|((x== 1) && (y == 0)) || ((x == 0) && (y == 1))	= True
					|(x == 0) || (y == 0)								= False
					|((x `mod` y) /= 0) && ((y `mod` x) /= 0)			= True
					|otherwise											= False



--aaaahhhh
seeDoctor:: String-> String -> Bool
seeDoctor x y = if ((x == "") && (y == "")) 
					then True
					else if (y == "")
							then False
							else if (((x=="") || (((all (=='a') (take ((length x)-1) x) && (last x == 'h'))))) && ((all (=='a') (take ((length y)-1) y) && (last y == 'h'))))
								then if (length x <= length y)
										then True
										else False
								else False





