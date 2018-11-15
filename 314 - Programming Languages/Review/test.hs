import Parsing
import Data.Char


odds :: Int -> [Int]
odds n = map (\x -> x*2 + 1) [0..n-1]


--pairs :: [a] -> [(a,a)]
pairs xs = zip xs (tail xs)

--Ceasar cipher

please x 		|null x	= []
				|otherwise	= reverse (drop 1 (reverse x))


compound y z =  take 6([y]++[y*(1+(z/100))^(x)|x<-[1..] ])


--Question 2
data RPS = Rock | Paper | Scissors
						deriving (Eq)

rps::RPS->RPS->Integer

rps Rock Rock = 0
rps Paper Paper = 0
rps Scissors Scissors = 0
rps Rock Paper = 2
rps Rock Scissors = 1
rps Paper Rock = 1
rps Paper Scissors = 2
rps Scissors Rock = 2
rps Scissors Paper = 1

rps'::RPS->RPS->Integer
rps' p1 p2	| p1 == p2	= 0
			| (p1 ==Rock) && (p2==Scissors)		= 1 
			|otherwise				= 2



--Question 4: Parsing
-- f::Int->Int->String
--f a b = if (a > b) then show a else show
--2 PARSER QUESTIONS
--	1. WRITE PARSER FOR INPUT
--	2. WHAT DOES THIS PARSER DO 
{-
myParser	= 	sat (isUpper) >>= \c ->
				char (toLower c) >>= \d ->
				many item >>= \s ->
				return ([c,d]++s)
-}


--Question 6
--6.1
String -> Bool
[a]->Bool
Palindrome::(Eq a)=>[a]->Bool

--6.2
[take 12]::[a]->[a]
fls::[[a]->[a]]

--6.3
f(f(fx)) --> tripler :: ((a->a)->a)->a

