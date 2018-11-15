--CHINESE REMAINDER THEOREM
import Data.Char
--Question 1

---Question (k-composite)
kcomposite::Int->[Int]
kcomposite z = [y|y<-[1..], (length([x|x<-[1..y], y `mod` x == 0]) == (z+2))]





test x = take 1 (filter (>=length(x)) (kcomposite 2))

calc x = (test x)!!0 - length(x) 



twocomps y = take 2 ((drop 1 ([x|x<-[1..y], (y `mod` x) == 0])))


rows x = (twocomps x)!!0
cols x = (twocomps x)!!1



compString n x			|x == ""		= x
						|otherwise		= head x : compString n (drop n x)
					
		
anagram x y				|length x == y - cols y		= ""
						|otherwise		= take y (compString (cols (y)) x)++(anagram (drop 1 x) y)
	
complete x				|(calc x) > 0		= x++(replicate (calc x) 'X')
						|otherwise			= x

anagramEncode x = anagram (complete x) (length(complete x))


test' x = (compString 3 x)++(compString 3 (drop 1 x))++(compString 3 (drop 2 x))

anagramDecode' x y		|length x == y - rows y		= ""
						|otherwise					= (compString (rows (y)) x)++(anagramDecode' (drop 1 x) y)


origString x 			|last x =='X'		= origString (init x)
						|otherwise			= x


anagramDecode x = origString (anagramDecode' x (length(complete x))) 







