--Question 1

data Tree a b = Branch b (Tree a b) (Tree a b) | Leaf a

instance (Show a, Show b) => Show (Tree a b) where
	show y = spaces "" y
		where 
			spaces beginLn (Leaf x) = beginLn ++ show x ++ "\n"
			spaces beginLn (Branch x l r) = beginLn ++ (show x) ++ "\n"
			  ++ spaces (beginLn ++ "\t") l ++ spaces (beginLn ++ "\t") r
	
	
mytree = Branch "A" (Branch "B" (Leaf (1::Int)) (Leaf (2::Int))) (Leaf (3::Int))

tree1 = Branch "A" 
           (Branch "B" 
              (Leaf (1::Int)) 
              (Leaf (2::Int))) 
           (Leaf (3::Int))

--Question 2

preorder  :: (a -> c) -> (b -> c) -> Tree a b -> [c]
preorder p q (Leaf x) = [p x]
preorder p q (Branch x l r) = [q x] ++ (preorder p q l ++ preorder p q r)


postorder :: (a -> c) -> (b -> c) -> Tree a b -> [c]
postorder p q (Leaf x) = [p x]
postorder p q (Branch x l r) = postorder p q l ++ postorder p q r ++ [q x]

inorder   :: (a -> c) -> (b -> c) -> Tree a b -> [c]
inorder p q (Leaf x) = [p x]
inorder p q (Branch x l r) = inorder p q l ++ [q x] ++ inorder p q r

--Question 3

measureWater x y z		|((x + y) == x) && (x == z)	= True
						|((x + y) == y) && (y == z)	= True
						|((x + y) == x) && (x /= z)	= False
						|((x + y) == x) && (y /= z)	= False
						|x `mod` y == 0				= False
						|y `mod` x == 0				= False
						|z < (x + y) 				= True
				