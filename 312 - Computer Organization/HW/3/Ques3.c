#include <stdio.h>
#include <inttypes.h>
#include <limits.h>
#include <string.h>
#include <unistd.h>
/* Determine whether arguments can be subtracted without overflow */
int sub_overflow(int x, int y) {
	int diff = x - y;
    int over_pos = x >= 0 && y < 0 && diff < 0;
    int over_neg = x < 0 && y >= 0 && diff > 0;

    //If there is positive overflow or negative overflow thean return false, otherwise true
     return (!over_pos && !over_neg);  

    }

int main() {
 	char a[20];
	char b[20];
	
	int len;
	int x,y;
	char intMax[20] = "INT_MAX";
 	char intMin[20] = "INT_MIN";
	printf("Please enter first and second number with a space between: ");
	scanf("%s %s", &a, &b);
	
	int testA = atoi(a);
	int testB = atoi(b);
	if (testA != 0) {
		x = testA;
	}
	else {
		if (strcmp(a, intMax)) {x = INT_MIN;}
		if (strcmp(a, intMin)) {x = INT_MAX;}
	}
	
	if (testB != 0){
		y = testB;
	} 
	else {
		if (strcmp(b, intMax)) {y = INT_MIN;}
		if (strcmp(b, intMin)) {y = INT_MAX;}
	}
	
	printf("If 1 then no overflow, if 0 then overflow: %d", sub_overflow(x, y));

	//INT_MIN and INT_MAX create overflows
}