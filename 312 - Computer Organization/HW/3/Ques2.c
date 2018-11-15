#include <stdio.h>
 unsigned int hexInt(int x, int y)
{
	//0xff gets rid of all but the last byte (last 8 bits) and ~0xff gets all but the last byte (first 24 bits)
	unsigned int z = ((x & 0xff)|(y & ~0xff));
	return z;
}

int main() {

	int a, b;

	printf("Enter value for x and y with a space in between: ");
	scanf("%x %x", &a, &b);


	printf("%x", hexInt(a,b));

}













