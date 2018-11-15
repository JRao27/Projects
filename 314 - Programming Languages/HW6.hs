import Data.Char
import Control.Applicative
--Question 1



data Tern = F|U|T


eval::E -> E





data E = IntLit Int
       | BoolLit Bool
       | Plus E E
       | Minus E E
       | Multiplies E E
       | Exponentiate E E
       | Equals E E
         deriving (Eq, Show)
		 
eval (IntLit a) = IntLit a
eval (BoolLit a) = BoolLit a		 
eval (Plus e1 e2) = plus' (eval e1) (eval e2)
eval (Minus e1 e2) = minus' (eval e1) (eval e2)
eval (Multiplies e1 e2) = mult' (eval e1) (eval e2)		 
eval (Exponentiate e1 e2) = expo' (eval e1) (eval e2) 
eval (Equals e1 e2) = equal'(eval e1) (eval e2)
		 
plus' (IntLit a) (IntLit b) = IntLit(a+b)
plus' _ _	= error "Non-exhaustive patterns in function insideInt"

minus' (IntLit a) (IntLit b) = IntLit (a-b)
minus' _ _ = error "Non-exhaustive patterns in function insideInt"

mult' (IntLit a) (IntLit b) = IntLit (a*b)
mult' _ _ = error "Non-exhaustive patterns in function insideInt"

expo' (IntLit a) (IntLit b) = IntLit (a^b)
expo' _ _ = error "Non-exhaustive patterns in function insideInt"

equal' (IntLit a) (IntLit b) = BoolLit (a==b)
equal' (BoolLit a) (BoolLit b)	= BoolLit (a==b)	


--Question 2			

log2Sim::E->E
test x = digitToInt x


--takeN :: Integer -> [a] -> [a]
--takeN n l = take (fromIntegral n) l

log2Sim (IntLit a) = IntLit a		
log2Sim (Plus e1 e2) = plus' (eval e1) (eval e2)
log2Sim (Minus e1 e2) = minus' (eval e1) (eval e2)
log2Sim (Multiplies e1 e2) = mult' (eval e1) (eval e2)		 
log2Sim (Exponentiate e1 e2) = expo' (eval e1) (eval e2) 

