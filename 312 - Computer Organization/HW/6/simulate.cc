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

	switch (type) {
	case OP_NOP: 
		// nop
		break;
	case OP_STORE_CONST:
		// store_const
		mem[addr1] = data;
		break;
	case OP_MOVE:
		// move
		mem[addr1] = mem[addr2];
		break;
	case OP_MOVEID:
		// moveid
		mem[mem[addr1]] = mem[addr2];
		break;
	case OP_MOVEDI:
		// movedi
		mem[addr1] = mem[mem[addr2]];
		break;
	case OP_ADD_CONST:
		// add_const
		mem[addr1] += data;
		break;
	case OP_ADD:
		// add
		mem[addr1] += mem[addr2];
		break;
	case OP_MUL:
		// mul
		mem[addr1] *= mem[addr2];
		break;
	case OP_DIV:
		// div
		mem[addr1] /= mem[addr2];
		break;
	case OP_MOD:
		// mod
		mem[addr1] %= mem[addr2];
		break;
	case OP_OUTPUT:
		// output
		putchar (mem[addr1]);
		fflush (stdout);
		break;
	case OP_COMPARE:
		// compare
		if (mem[addr1] < mem[addr2]) mem[addr1] = -1;
		else if (mem[addr1] > mem[addr2]) mem[addr1] = 1;
		else mem[addr1] = 0;
		break;
	case OP_JUMP:
		// jump
		pc = addr1;

		// check for out of bounds access of program

		if (pc > n) {
			fprintf (stderr, "jumping out of bounds to %d\n", pc);
			return 1;
		}
		break;
	case OP_COND_JUMP:
		// cond_jump
		if (mem[addr1] == data) pc = addr2;

		// check for out of bounds access

		if (pc > n) {
			fprintf (stderr, "cond_jumping out of bounds to %d\n", pc);
			return 1;
		}
		break;
	case OP_STOREPC:
		// storepc
		mem[addr1] = pc;
		break;
	case OP_LOADPC:
		// loadpc
		pc = mem[addr1];

		// check for out of bounds access

		if (pc > n) {
			fprintf (stderr, "loading pc out of bounds to %d\n", pc);
			return 1;
		}
		break;
	case OP_HALT:
		// halt
		return 1;
	default:
		fprintf (stderr, "unknown opcode: %d\n", fetch->type);
		return 1;
	}

	// check for out of bounds access resulting from incrementing pc

	if (pc > n) {
		fprintf (stderr, "sequentially fetching out of bounds to %d\n", pc);
		return 1;
	}
	return 0;
}