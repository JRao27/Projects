#include <stdio.h>
#include <limits.h>
#include <time.h>
#include <stdlib.h>

int main() {

	//srand(time(NULL));

/* Create some arbitrary values */
int x = random();
int y = random();
/* Convert to unsigned */
unsigned ux = (unsigned) x;
unsigned uy = (unsigned) y;

int z = ux+uy;

if ((x < y) == (-x > -y)) {
	printf("True");
}
else {
	printf("False");
}
}