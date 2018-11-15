import Parsing
import Prelude hiding ((>>=), return)


helper x y = length(takeWhile (==x) y)

myRLE x		|length(x)==0	= []
			|otherwise		= [(helper (head x) y), (head x)]++myRLE (drop (helper (head x) x) x)

{-}
(>>=) :: Parser a -> (a -> Parser b) -> Parser b
p >>= f = \inp -> case 	parse p inp of
 						[] -> []
 						[(v, out)] -> parse (f v) out-}