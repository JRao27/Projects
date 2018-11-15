#include <stdio.h>
#include <stdlib.h>
#include "opcodes.h"

#define MAX_INSTRUCTIONS	2000
#define MEMORY_SIZE		10000

struct instruction program[MAX_INSTRUCTIONS];
int memory[MEMORY_SIZE];
int pc, n;

// declare the function that does the simulation

int simulate (void);

int main (int argc, char *argv[]) {
	FILE	*f;	// a file containing the simulated program

	// make sure there is just one argument: the filename of the
	// program binary

	if (argc != 2) {
		fprintf (stderr, "Usage: %s <filename>\n", argv[0]);
		exit (1);
	}

	// open the file

	f = fopen (argv[1], "r");

	// if there is an error, give an error message and exit

	if (!f) {
		perror (argv[1]);
		exit (1);
	}

	// read the program file into the program[] array; n gets the number
	// of instructions in the program

	n = fread (program, sizeof (struct instruction), MAX_INSTRUCTIONS, f);
	fclose (f);

	// give a little message about the program

	fprintf (stderr, "loaded %d instructions from \"%s\"\n", n, argv[1]);

	// start of the program counter at 0

	pc = 0;

	// loop until simulate() returns 1

	while (!simulate());

	// all done
	exit (0);
}