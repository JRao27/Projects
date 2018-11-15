/* simulate.c */

#include <stdio.h>
#include <stdlib.h>
#include "opcodes.h"

/* declarations for external variables defined in sim.c */

extern struct instruction 
	program[];		// the array of program instructions

extern int
	memory[];		// simulated memory

extern int
	pc,			// program counter; index of next instruction
				// in the program array
	n;			// number of instructions in the program

/*
 * This function simulates one instruction execution.  It accepts no
 * parameters.  It returns 1 if the simulation should end, i.e. if the HALT
 * instruction has been encountered or if execution has gone out of bounds
 * of the program code that was loaded.
 */
int vals[17] = {0};
int simulate (void) {

	// get a pointer to the next instruction

	struct instruction *fetch = &program[pc++];

	// get each field of the struct, hoping the compiler will put the
	// fields into registers for faster access

	int data = fetch->data;
	int addr1 = fetch->addr1;
	int addr2 = fetch->addr2;
	int type = fetch->type;

	// get a pointer to the memory array, again hoping this pointer goes
	// into a register for faster access

	int *mem = &memory[0];
	
	// execute the instruction based on its type

	if (type == OP_COND_JUMP) {
		vals[0]++;
		if (mem[addr1] == data) pc = addr2;

		// check for out of bounds access

		if (pc > n) {
			fprintf (stderr, "cond_jumping out of bounds to %d\n", pc);
			return 1;
		}
	}
	else if (type == OP_MOVE) {
		vals[1]++;
		mem[addr1] = mem[addr2];
	}
	else if (type == OP_ADD_CONST) {
		vals[2]++;
		mem[addr1] += data;
	}
	else if (type == OP_MOD) {
		vals[3]++;
		mem[addr1] %= mem[addr2];
	}
	else if (type == OP_COMPARE) {
		vals[4]++;
		if (mem[addr1] < mem[addr2]) mem[addr1] = -1;
		else if (mem[addr1] > mem[addr2]) mem[addr1] = 1;
		else mem[addr1] = 0;
	}
	else if (type == OP_MOVEID) {
		vals[5]++;
		mem[mem[addr1]] = mem[addr2];
	}
	else if (type == OP_MOVEDI) {
		vals[6]++;
		mem[addr1] = mem[mem[addr2]];
	}
	else if (type == OP_JUMP) {
		vals[7]++;
		pc = addr1;

		// check for out of bounds access of program

		if (pc > n) {
			fprintf (stderr, "jumping out of bounds to %d\n", pc);
			return 1;
		}
	}
	else if (type == OP_STORE_CONST) {
		vals[8]++;
		mem[addr1] = data;
	}
	else if (type == OP_STOREPC) {
		vals[9]++;
		mem[addr1] = pc;
	}
	else if (type == OP_LOADPC) {
		vals[10]++;
		pc = mem[addr1];

		// check for out of bounds access

		if (pc > n) {
			fprintf (stderr, "loading pc out of bounds to %d\n", pc);
			return 1;
		}
	}
	else if (type == OP_OUTPUT) {
		vals[11]++;
		putchar (mem[addr1]);
		fflush (stdout);
	}
	else if (type == OP_DIV) {
		vals[12]++;
		mem[addr1] /= mem[addr2];
	}
	else if (type == OP_HALT) {
		vals[13]++;
		return 1;
	}
	else if (type == OP_NOP) {
		vals[14]++;
	}
	else if (type == OP_ADD) {
		vals[15]++;
		mem[addr1] += mem[addr2];
	}
	else if (type == OP_MUL) {
		vals[16]++;
		mem[addr1] *= mem[addr2];
	}
	else {
		fprintf (stderr, "unknown opcode: %d\n", fetch->type);
		return 1;

	}

	if (pc > n) {
		fprintf (stderr, "sequentially fetching out of bounds to %d\n", pc);
		return 1;
	}

	return 0;
	printf("HEY");
}