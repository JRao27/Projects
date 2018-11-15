
module Main where

import Prelude hiding (lookup)

import Test.HUnit
import System.Exit

-- AST definition for W
data WValue = VInt Int 
            | VBool Bool 
              deriving (Eq, Show)

data WExp = Val WValue

          | Var String

          | Plus WExp WExp
          | Minus WExp WExp
          | Multiplies WExp WExp
          | Divides WExp WExp

          | Equals WExp WExp
          | NotEqual WExp WExp
          | Less WExp WExp
          | Greater WExp WExp
          | LessOrEqual WExp WExp
          | GreaterOrEqual WExp WExp

          | And WExp WExp
          | Or WExp WExp
          | Not WExp

data WStmt = Empty
           | VarDecl String WExp
           | Assign String WExp
           | If WExp WStmt WStmt
           | While WExp WStmt
           | Block [WStmt]

type Memory = [(String, WValue)]
marker = ("|", undefined)
isMarker (x, _) = x == "|"

-- eval function
eval :: WExp -> Memory -> WValue
---------------------------------1
eval (Val (VInt i)) m = (VInt i)
eval (Val (VBool b)) m = (VBool b)

eval (Var a) m = fromJust (lookup a m)

eval (Plus a b) m = plus (eval a m) (eval b m)
eval (Minus a b) m = minus(eval a m) (eval b m)
eval (Multiplies a b) m = multiplies (eval a m) (eval b m)
eval (Divides a b) m = divides (eval a m) (eval b m)

eval (Equals a b) m = equals (eval a m)(eval b m)
eval (NotEqual a b) m = notequal (eval a m)(eval b m)
eval (Less a b) m = less (eval a m)(eval b m)
eval (Greater a b) m = greater (eval a m)(eval b m)
eval (LessOrEqual a b) m = lessorequal (eval a m)(eval b m)
eval (GreaterOrEqual a b) m = greaterorequal (eval a m)(eval b m)

eval (And a b) m = andB (eval a m)(eval b m)
eval (Or a b) m = orB (eval a m)(eval b m)
eval (Not a) m = notB (eval a m)

-----------------------------------2
plus (VInt c)(VInt d) = VInt $ c + d
plus _ _ = error "Type Error in Addition"

minus (VInt c)(VInt d) = VInt $ c - d
minus _ _ = error "Type error in subtraction"        --minus (Val(VInt e))(Val(VInt f)) = Val(VInt $ e - f)

multiplies (VInt c)(VInt d) = VInt $ c * d
multiplies _ _ = error "Type error in multiplication"

divides (VInt c)(VInt d) = VInt $ c `div` d
divides _ _ = error "Type error in division"

------------------------------------------3
equals (VInt c)(VInt d) = VBool $ c == d
equals (VBool e)(VBool f) = VBool $ e == f
equals _ _ = error "Type error in equals"

notequal (VInt c)(VInt d) = VBool $ c /= d
notequal (VBool e)(VBool f) = VBool $ e /= f
notequal _ _ = error "Type error in Not Equals"

less (VInt c)(VInt d) = VBool $ c < d
less (VBool e)(VBool f) = VBool $ e < f
less _ _ = error "Type error in Less"

greater (VInt c)(VInt d) = VBool $ c > d
greater (VBool e)(VBool f) = VBool $ e > f
greater _ _ = error "Type error in Greater"

lessorequal (VInt c)(VInt d) = VBool $ c <= d
lessorequal (VBool e)(VBool f) = VBool $ e <= f
lessorequal _ _ = error "Type error in LessOrEqual"

greaterorequal (VInt c)(VInt d) = VBool $ c >= d
greaterorequal (VBool e)(VBool f) = VBool $ e >= f
greaterorequal _ _ = error "Type error in GreaterOrEqual"

------------------------------------------------4
andB (VBool x)(VBool y) = VBool $ x && y
andB _ _ = error "Type error in And"

orB (VBool xs)(VBool ys) = VBool $ xs || ys
orB _ _ = error "Type error in Or"

notB (VBool xs)= VBool $ not xs
notB _ = error "Type error in Not"

-- exec function
exec :: WStmt -> Memory -> Memory
--exec = undefined
exec (Empty) m = m

exec (VarDecl s v) m | notexist s m = (s, (eval v m)):m
                     | otherwise = error "The variable already exists in the scope"
                               where
                                     notexist s [] = True
                                     notexist s (m:ms)|(isMarker m) = True
												      |(s == fst m) = False
                                                      |otherwise = notexist s ms

exec (Assign s v) m =  map fs m 
	where fs = replace s e 
	      e = eval v m

exec (If c s1 s2) m = if e then exec s1 m else exec s2 m
                      where 
					      VBool e = eval c m
						  
exec (While c s1) m = if e then exec (While c s1) (exec s1 m) else m
                      where
					      VBool e = eval c m

exec (Block e) m =  check $ (foldl (flip exec) newMem e)
	where newMem = (marker:m)

-- example programs
factorial = 
  Block
  [
    VarDecl "acc" (Val (VInt 1)),
    While (Greater (Var "x") (Val (VInt 1)))
    (
      Block
      [
        Assign "acc" (Multiplies (Var "acc") (Var "x")),
        Assign "x" (Minus (Var "x") (Val (VInt 1)))         
      ]
    ),
    Assign "result" (Var "acc")
  ]

p1 = Block
     [
       VarDecl "x" (Val (VInt 0)),
       VarDecl "b" (Greater (Var "x") (Val (VInt 0))),
       If (Or (Var "b") (Not (GreaterOrEqual (Var "x") (Val (VInt 0)))))
         ( Block [ Assign "x" (Val (VInt 1)) ] )
         ( Block [ Assign "x" (Val (VInt 2)) ] )
     ]

--fibonacci
fibonacci = Block
     [
       VarDecl "num1" (Val (VInt 0)),
       VarDecl "num2" (Val (VInt 1)),
	   VarDecl "num_next" (Val (VInt 0)),
	   VarDecl "i" (Val(VInt 2)),
	   VarDecl "final" (Val (VInt 0)),
	   
       If(Equals (Var "y")(Val(VInt 0)))
	     (Block [Assign "num_next" (Val(VInt 0))])
		 (Block [Assign "num_next" (Var "num2")])
		, 
       If (Equals (Var "y")(Val(VInt 1)))
	     (Block [Assign "num_next" (Val(VInt 1))])
		 (Block [Assign "num_next" (Var "num2")])
		 ,
	   While(LessOrEqual (Var "i")(Var "y"))
	      (
		    Block
			[
			 Assign "num_next" (Plus(Var "num1")(Var "num2")),
			 Assign "num1" (Var "num2"),
			 Assign "num2" (Var "num_next"),
			 Assign "i" (Plus(Var "i")(Val(VInt 1)))
			]
			),
			Assign "final" (Var "num_next")
     ]
      	 
--Test statments
----------------------------------------
test2 = Plus(Val(VInt 35)) (Val(VInt 40))

test3 = Minus(Val(VInt 65)) (Val(VInt 40))

test4 = Multiplies(Val(VInt 10))(Val(VInt 5))	

test5 = Divides(Val(VInt 50)) (Val(VInt 10))
------------------------------------------
test6 = Equals(Val(VInt 5)) (Val(VInt 5))

test7 = NotEqual(Val(VInt 5))(Val(VInt 5))

test8 = Less(Val(VInt 35)) (Val(VInt 40))

test9 = Greater(Val(VInt 85)) (Val(VInt 20))

test10 = LessOrEqual(Val(VInt 15)) (Val(VInt 15))

test11 = GreaterOrEqual(Val(VInt 20)) (Val(VInt 8))
-----------------------------------------------
gates = Block
				 [
					Assign "equals" (Equals(Var "x") (Var "y")),
					Assign "noteq" (NotEqual (Var "x") (Var "y")),
					Assign "and" (And (Var "x") (Var "y")),
					Assign "or" (Or (Var "x") (Var "y")),
					Assign "not" (Not (Var "x") )
				 ]
--------------------------------------------------------------

-- some useful helper functions
lookup s [] = Nothing
lookup s ((k,v):xs) | s == k = Just v
                    | otherwise = lookup s xs

asInt (VInt v) = v
asInt x = error $ "Expected a number, got " ++ show x

asBool (VBool v) = v
asBool x = error $ "Expected a boolean, got " ++ show x

fromJust (Just v) = v
fromJust Nothing = error "Expected a value in Maybe, but got Nothing"

--fibonacci haskell function
fibonacc:: Int -> Int
fibonacc x = asInt (fromJust (lookup "final" (exec fibonacci [("final", undefined),("y", VInt(x))])))

--to replace in assign
replace :: String -> WValue -> (String, WValue) -> (String, WValue)
replace str val (s,v) = if s == str then (s,val) else (s,v)

--to remove the marker
check :: Memory -> Memory
check (m:ms) = if isMarker m then ms else check ms  

--clearing the memory
finish :: Memory -> Memory
finish [] = []
finish (x:xs) | isMarker (x) = xs
	          | otherwise = finish xs
			  
-----
gates1 = (exec gates [("equals",undefined ),("noteq",undefined), ("and",undefined), ("or",undefined), ("not",undefined),("x", VBool True ),("y", VBool False)])

-- unit tests
myTestList =

  TestList [
    test $ assertEqual "p1 test" [] (exec p1 []),

    let res = lookup "result" (exec factorial [("result", undefined), ("x", VInt 10)])
    in test $ assertBool "factorial of 10" (3628800 == asInt (fromJust res)),
	
	test $ assertEqual "test2 test" 75 (asInt(eval test2 [])),
	test $ assertEqual "test3 test" 25 (asInt(eval test3 [])),
    test $ assertEqual "test4 test" 50 (asInt(eval test4 [])), 
    test $ assertEqual "test5 test" 5 (asInt(eval test5 [])),
    test $ assertBool  "test6 test" (True == asBool (eval test6 [])),
    test $ assertBool  "test7 test" (False == asBool (eval test7 [])),
    test $ assertBool  "test8 test" (True == asBool(eval test8 [])),
    test $ assertBool  "test9 test" (True == asBool(eval test9 [])),
    test $ assertBool  "test10 test" (True == asBool(eval test10 [])),
    test $ assertBool  "test11 test" (True == asBool(eval test11 [])),
	
	let rest = lookup "final" (exec fibonacci [("final", undefined),("y", VInt 6)])
	in test $ assertBool "6th term in fibonnaci is:" (8 == asInt(fromJust rest))
    ]    

-- main: run the unit tests  
main = do c <- runTestTT myTestList
          putStrLn $ show c
          let errs = errors c
              fails = failures c
          if (errs + fails /= 0) then exitFailure else return ()