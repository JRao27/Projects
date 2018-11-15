
data Tree a b = Branch b (Tree a b) (Tree a b) | Leaf a

instance (Show a, Show b) => Show (Tree a b) where
	show y = spaces "" y
		where 
			spaces beginLn (Leaf x) = beginLn ++ show x ++ "\n"
			spaces beginLn (Branch x l r) = beginLn ++ (show x) ++ "\n"
			  ++ spaces (beginLn ++ "\t") l ++ spaces (beginLn ++ "\t") r
	
	
tree1 = Branch "A" 
           (Branch "B" 
              (Leaf (1::Int)) 
              (Leaf (2::Int))) 
           (Leaf (3::Int))

tree4 = Leaf (1::Int)

mytree = Branch "A" (Branch "B" (Leaf (1::Int)) (Leaf (2::Int))) (Leaf (3::Int))

preorder  :: (a -> c) -> (b -> c) -> Tree a b -> [c]
preorder p q (Leaf x) = [p x]
preorder p q (Branch x l r) = [q x] ++ (preorder p q l ++ preorder p q r)

postorder :: (a->c)->(b->c)-> Tree a b -> [c]
postorder p q (Leaf x) = [p x]
postorder p q (Branch x l r) = (postorder p q l)++(postorder p q r)++[q x]

inorder :: (a -> c) -> (b -> c) -> Tree a b ->[c]
inorder p q (Leaf x) = [p x]
inorder p q (Branch x l r) = (inorder p q l)++[q x]++(inorder p q r)