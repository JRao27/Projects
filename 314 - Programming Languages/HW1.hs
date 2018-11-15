--Test - Haskell
--Question 1
import Data.Char
double :: Num a => a -> a 
double x = x + 10

--Question 2 (Area of circle)
circleArea x = (pi)*x*x

--Question 3
myList = [1,2,3,4,5]
revList = reverse (drop 1 (reverse (drop 1 myList)))

--Question 4
countDownList x y 	|x==y		= [y]
					|otherwise	= [y]++countDownList (x) (y-1)

--Question 5

isRight x y z	=	if (x == 0 || y == 0 || z == 0) then False 
					else if ((x^2)+(y^2)==(z^2)) then True 
					else if ((x^2)+(z^2)==(y^2))	then True
					else if ((z^2)+(y^2)==(x^2))	then True
					else	False


--Question 6

multComplex x y = ((fst x)*(fst y) + ((snd x)*(snd y))*(-1), ((fst x)*(snd y)+(snd x)*(fst y)))


--Question 7
countChar x y 	|length y == 0	= 0
				|head y == x	= 1+countChar x (drop 1 y)
				|otherwise		= countChar x (drop 1 y)


--Question 8
getFirsts :: [(a,b)] -> [a]
getFirsts y = [fst x | x <- y] 


--Question 9

halfLists [] = []
halfLists x	|length(drop 1 x) == 0	= [head x]
			|otherwise	= [head x]++halfLists(drop 2 x)


--Question 10
--upperCaseList::String->Bool->Bool->Bool

uppercaseList [] = []
uppercaseList x	|isUpper(head x)	= [(True, False, False)]++uppercaseList (drop 1 x)
				|isLower(head x)	= [(False, True, False)]++uppercaseList (drop 1 x)
				|isNumber(head x)	= [(False, False, True)]++uppercaseList (drop 1 x)
				|otherwise			= [(False, False, False)]++uppercaseList (drop 1 x)

--Alternating Series

altSeries [] = 0
altSeries x	|length(drop 1 x) == 0  = head x
			|otherwise				= head x+(-1)*altSeries (drop 1 x)					










