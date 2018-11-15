--Question 1

myReverse [] = []
myReverse x		|length(x)==0	= []
				|otherwise		= (drop(length(x)-1) x)++myReverse (take(length(x)-1) x)
				

--Question 2
isElement x y	|length y == 0	= False
				|head y == x	= True
				|otherwise		= isElement x (drop 1 y)
				
--Question 3
duplicate [] = []
duplicate x		|length(x)==0	= []
				|otherwise		= [head x]++[head x]++duplicate(drop 1 x)
				
--Question 4
removeDuplicate [] = []
removeDuplicate	x	|length(x)==1				= [head x]
					|head x == head(drop 1 x)	= removeDuplicate(drop 1 x)	
					|otherwise					= [head x]++removeDuplicate(drop 1 x) 
	

--Question 5
rotate x y			|length(x)==0				= x
					|otherwise					=(drop (y`mod`length(x)) x)++(take (y`mod`length(x)) x) 
					

--Question 6
flatten [] = []
flatten x			|length(x)==0			= []
					|otherwise				= (head x)++(flatten(drop 1 x))
					
--Question 7
isPalindrome x	|length(x)==0			= True	
				|x == reverse(x)		= True	
				|otherwise				= False
				
--Question 8
coprime x y =	if (y==1 || x==1 && y==0)	then True	else if (y==0 && x/=1) then False	
				else coprime y (x `mod` y)


--AAAAh
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


--WATERGATE
waterGate x = floor(sqrt(x))



--GOLDBACH'S

primeTest :: Integer -> Bool
primeTest 1 = False
primeTest t =  and [ (gcd t i) == 1 | i <- [2..t-1]]

twiceSquares :: Integer -> [Integer]
twiceSquares n = takeWhile (<n) [ 2 *x^2 | x <- [1..n]]

oddList = map (\x -> 2*x + 1) [0..]

allOddComp = [o | o <- drop 1 oddList, not (primeTest o)]

satsConds n = or [primeTest k | k <- map (\x->(n-x))(twiceSquares n)]

goldbachNum = head [ x | x <- allOddComp, not (satsConds x) ]