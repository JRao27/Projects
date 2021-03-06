
--Question 1
type Set a = [a]

mkSet::Eq a=>[a]-> Set a
--------------
--ex [] = [0]
--isElement 0 [] = False
isElement x y	|length y == 0	= []
				|head y == x	= isElement x (drop 1 y)
				|otherwise		= [head y]++(isElement x (drop 1 y))
				
isElement2 x y	|length y == 0	= False
				|head y == x	= True
				|otherwise		= isElement2 x (drop 1 y)
				
mkSet x			|length x == 0				= []
				|otherwise					= [head x]++(mkSet (isElement (head x) (drop 1 x)))				
			

--Question 2 Subset


subset::Eq a=> Set a -> Set a -> Bool

subset x y		|length (x)== 0								= True
				|(isElement2 (head x) (y)) == True			= subset (drop 1 x) (y)
				|otherwise									= False


--Question 3 SetEqual
setEqual::Eq a=> Set a -> Set a -> Bool

setEqual x y	|(subset x y == True) && (subset y x == True)		= True
				|otherwise											= False

--Question 4
setProd :: (Eq t, Eq t1) => Set t -> Set t1 -> Set (t, t1)

setProd' x y	|length(y) == 0				= []
				|otherwise					= [((head x), (head y))]++(setProd' x (drop 1 y))




setProd x y 	|((length(x)==0) || (length(y)) == 0)	= []
				|otherwise								= (setProd' x y)++(setProd (drop 1 x) y)



--Question 5

setPart (x:[])	= [[[ x ]]] 
setPart (x:xs) 	= outside x sp ++ inside x sp
				where sp = setPart xs

outside el set = [ [el]:i | i <- set ]
inside el set = [ take y x ++ [el:x!!y] ++ drop (y+1) x | x <- set, y <- [0..(length x)-1]]


--Question 6

test x = [1..x]
bellNum x = length(setPart (test x))























