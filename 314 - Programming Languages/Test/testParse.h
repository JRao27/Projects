import Parsing.hs

dot :: Parser Char
dot = char '.'
                       
colonParser :: Parser Char
colonParser = char ':'

forwardSlashParser :: Parser Char
forwardSlashParser = char '/'

httpsParser :: Parser String
httpsParser = string "https" 

httpParser :: Parser String
httpParser = string "http"

ftpParser :: Parser String
ftpParser = string "ftp"

comParser :: Parser String
comParser = string "com"

eduParser :: Parser String
eduParser = string "edu"

portParser :: Parser String
portParser = do x <- many1 digit
                return x
                
fileNameParser :: Parser String
fileNameParser = do x <- many1 alphanum
                    do y <- dot
                       do z <- fileNameParser
                          return (x ++ (y:[]) ++ z)                          
                        +++ return (x ++ (y:[]))                     
                     +++ return x
                     
pathParser :: Parser String
pathParser = do x <- many1 alphanum
                do y <- forwardSlashParser
                   do z <- pathParser
                      return (x ++ [y] ++ z)
                      +++ do b <- item
                             return [b]                   
                +++ return []
                
host :: Parser String
host = do x <- many1 letter
          return x
                       
protocol :: Parser String
protocol = do x <- httpsParser
              return x      
              +++ do y <- httpParser         
                     return y
                     +++ do z <- ftpParser  
                            return z
                            +++ return []

seperator :: Parser String
seperator = do x <- colonParser
               do y <- forwardSlashParser
                  do z <- forwardSlashParser
                     return ([x] ++ [y] ++ [z])
                     +++ return []   
                  +++ return []
               +++ return []
                  
domain :: Parser String
domain = do x <- comParser
            return x
            +++ do y <- eduParser
                   return y
                   +++ return []
                   
subdomain:: Parser String
subdomain = do x <- many1 alphanum
               do y <- dot
                  do z <- many1 alphanum
                     return (x ++ [y] ++ z)
                    +++ return x
                  +++ return x
                 
urlParser = do a <- protocol
               do b <- seperator
                  do c <- host 
                     do  k <- dot
                         do d <- subdomain
                            do  l <- dot
                                do e <-domain
                                   do f <-colonParser
                                      do g <- portParser
                                         do h <- forwardSlashParser
                                            do i <- pathParser
                                               do j <- fileNameParser
                                                  return   ("protocol:    " ++ a  
                                                         ++ "\nhost:        " ++ c 
                                                         ++ "\nsubdomain:   " ++ d
                                                         ++ "\ndomain:      " ++ e
                                                         ++ "\npath:        " ++ i
                                                         ++ "\nfileName:    " ++ j
                                                         ++ "\n")
                       
exec4  xs = putStr (fst( head(parse urlParser xs)))