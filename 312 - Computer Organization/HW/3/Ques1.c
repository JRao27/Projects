#include <stdio.h>

//The size of *C is 1 byte so when it's dereferenced it will only contain the first byte of integer. The last byte is stored first so in a little endian machine you will return one.
// Otherwise you will reutrn zero. 
int main() 
{
   unsigned int i = 1;
   char *c = (char*)&i;
   if (*c)    
       printf("Little endian");
   else
       printf("Big endian");
   getchar();
   return 0;
}