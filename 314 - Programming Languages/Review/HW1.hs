import Data.Char

--Question 1
increaseTen x = x+10

--Question 2
circleArea r = r*r*pi

--Question 3
midList x = drop 1 (reverse (drop 1 (reverse x)))

--Question 4

countdownList x y	|y > x		= reverse ([x..y])
					|otherwise	= []

--Question 5
isRight x y z	|x<= 0						= False
				|y<= 0						= False
				|z<= 0						= False
				|z == (sqrt((x^2)+(y^2)))	= True
				|otherwise					= False


multComplex	x y = ((fst x)*(fst y) + ((snd x)*(snd y))*(-1), ((fst x)*(snd y)+(snd x)*(fst y)))	


countChar x y	|length(y)==0	= 0
				|x == (head y)	= 1+(countChar x (drop 1 y))
				|otherwise		= countChar x (drop 1 y)


getFirsts y	= [fst x|x<-y]

halfList x	|length(x)==0	= []
			|otherwise		= [head x]++(halfList (drop 2 x))

uppercaseList x		|length(x)==0		= []
					|isUpper(head x)	= [(True, False, False)]++uppercaseList (drop 1 x)
					|isLower(head x)	= [(False, True, False)]++uppercaseList (drop 1 x)
					|isDigit(head x)	= [(False, False, True)]++uppercaseList (drop 1 x)
					|otherwise			= [(False, False, False)]++uppercaseList (drop 1 x)


--Alternating Lists
altSeries :: Num a => [a] -> a
altSeries x		|length(x)==0	= 0
				|otherwise		= (head x)+(-1)*(altSeries (drop 1 x))





