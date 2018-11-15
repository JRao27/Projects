#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* there will be 10 integers in one multi-precition int, 
 * i.e. 320 bit precision
 */

#define N	10

/* convert an unsigned integer to a multiple-precision integer in an array */

void int2array (unsigned int x, unsigned int A[]) {
	int	i;

	/* the first element of the array is x */

	A[0] = x;

	/* the rest of the elements are 0 */

	for (i=1; i<N; i++) A[i] = 0;
}

/* copy multiple precision integer B into A */

void copy_array (unsigned int A[], unsigned int B[]) {
	int	i;

	for (i=0; i<N; i++) A[i] = B[i];
}

/* print a multiple precision integer as hexadecimal */

void print (unsigned int A[]) {
	int	i,	/* loop counter for the array */
		j, 	/* loop counter within an int */
		printed = 0; /* so we don't print leading 0s */

	// for each integer in the array...

	for (i=N-1; i>=0; i--) {
		unsigned int x = A[i];

		// print the four hex digits in x

		for (j=28; j>=0; j-=4) {
			unsigned int y = (x >> j) & 15;
			if (printed || y) {
				printed = 1;
				printf ("%c", "0123456789abcdef"[y]);
			}
		}
	}

	/* if we made it this far without printing anything,
	 * then the number is 0
	 */

	if (!printed) printf ("0");
	printf ("\n");
}

/* compute the n'th Fibonacci number, result in R */

int fib (int n, unsigned int R[]) {
	int	i, 	/* loop counter */
		r;	/* return value from add */

	unsigned int FN0[N], FN1[N], T[N];

	/* F(0) = 0, F(1) = 1 */

	int2array (0, FN0);
	int2array (1, FN1);

	/* F(n) = F(n-1) + F(n-2) */

	for (i=2; i<=n; i++) {

		// T = FN0 + FN1, r is the carry out

		r = add (FN0, FN1, T);

		// if there is a carry out then return 1;
		// the array is not sufficiently large to represent
		// the n'th Fibonacci number

		if (r) return 1;

		// FN0 = FN1

		copy_array (FN0, FN1);

		// FN1 = T

		copy_array (FN1, T);
	}

	// result = FN1

	copy_array (R, FN1);

	// success; return 0

	return 0;
}

int main (int argc, char *argv[]) {
	int	i,		/* goes from 1 to n */
		r,		/* return value from add */
		n;		/* from command line */
	unsigned int A[N];	/* n'th Fibonacci number goes here */

	/* there must be just one argument on the command line */

	if (argc != 2) {
		fprintf (stderr, "Usage: %s <n>\n", argv[0]);
		exit (1);
	}

	/* get the argument and validate it */

	n = atoi (argv[1]);
	if (n < 1) {
		fprintf (stderr, "n should be >= 1\n");
		exit (1);
	}

	/* print F(1) through F(n) */

	for (i=1; i<=n; i++) {

		/* print i */

		printf ("%4d ", i);

		/* get the i'th Fibonacci number */

		r = fib (i, A);

		/* a non-zero return means an overflow */

		if (r) {
			fprintf (stderr, "overflow!\n");
			exit (1);
		}

		/* print it */

		print (A);
	}

	/* all done */
	exit (0);
}