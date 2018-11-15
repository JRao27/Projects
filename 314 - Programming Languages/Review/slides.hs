import Data.Char
import Prelude hiding ((>>=), return)
factors::Int->[Int]
factors n = [x|x<-[1..n], (n `mod` x) == 0]


perfects::Int->[Int]
perfects n = [x|x<-[1..n], (sum(factors x) - x) == x]

test x = sum(factors x) - 1 - x


palindrome xs = reverse xs == xs

fls = [take 12]

tripler f x = f( f ( f x ))

isOdd 0 = False
isOdd 1 = True
isOdd n = isEven (n-1)
isEven 0 = True
isEven 1 = False
isEven m = isOdd (m-1)

compound x y = [x*(1+(1/y))^(z)|z<-[0..]]


sorted (x:xs) = [x|x<= (head (xs)),x<-xs]
weightAvg x y	|length(x)==0	= 0
				|otherwise		= ((head x)*(head y))+(weightAvg (drop 1 x) (drop 1 y))

finalAvg x y = (weightAvg x y)/sum(y)

symbolDot x		|(head x) == '.'	= [((head x), x)]
				|otherwise			= []

return1 v = \inp -> [(v,inp)]
failure1 = \inp -> []

item1 = \inp -> case inp of
				[] -> []
 				(x:xs) -> [(x,xs)] 

parse1 p inp = p inp 

p +++ q = \inp -> case p inp of
					[] -> parse1 q inp
 					[(v,out)] -> [(v,out)]

p >>= f = \inp -> case parse1 p inp of
 						[] -> []
 						[(v, out)] -> parse1 (f v) out


{-myParser x 	|length(x)<1																						= []
			|(isUpper (head x)) && ((isLower(head (drop 1 x)))) && ((toUpper (head (drop 1 x))) == (head x))	= [([head x]++[head(drop 1 x)], (drop 2 x))]
			|otherwise																							= []
-}
sat pr = \inp	-> case inp of
		[]	->	[]
		(x:xs)	-> if (pr x) then [(x,xs)] else []

char' c = \inp-> case inp of
		[]	->	[]
		(x:xs)	-> if (x == c) then [(x,xs)] else []

many p = many1 p +++ return1 [] 
many1 p = 	p >>= \x ->
		many p >>= \xs ->
		return1 (x:xs)
digit = sat isDigit  
myParser	= 	sat (isUpper) >>= \a ->
				char' (toLower a) >>= \b ->
				return1 [a,b]
				
myLister:: [[x]] -> [x]
myLister ls = [x | xs <- ls, (length xs `mod` 2 == 0), x <- xs]
functionr :: (Enum t, Num t) => t -> [a] -> [[a]]
functionr x ls = [ls++ls | _ <- [1..x]]
helper x y = length(takeWhile (==x) y)


myRLE x	|length(x)==0	= []
		|otherwise		= [((helper (head x) x), head x)]++(myRLE (drop (helper (head x) x) x))




cat v = \inp ->[(v, inp)]

dog p inp = p inp