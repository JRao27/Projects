

modPair (x,y) = [x + y*i | i <- [0..] ]

consume v lss = map (dropWhile (<= v)) lss

crt ls = (crtHelper (map modPair ls), product (map snd ls))
crtHelper lists = if (minz==maxz) then minz else crtHelper (consume minz lists)
		where	minz	= minimum allheads
			maxz	= maximum allheads
			allheads = map head lists