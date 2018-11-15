/* make_cirasdasdcuit.c
 * This file contains code to make an OR gate out of transistors.
 * Your assignment is to replace it with code that makes a full adder 
 * out of transistors.
 */
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

#include "transistors.h"

// input_a, input_b, and output are wires

// make a NOR gate with input wires for a and b and an output wire for a NOR b
// the NOR has the same structure as the one in the lecture notes

void make_nor (circuit *c, int input_a_wire, int input_b_wire, int output_wire) {

	// get a one node

	int one = new_node (c, ONE);

	// get a zero node

	int zero = new_node (c, ZERO);

	// get two P and N transistors

	int p1 = new_node (c, P);
	int p2 = new_node (c, P);
	int n1 = new_node (c, N);
	int n2 = new_node (c, N);

	// wire 0: links zero to the sources of N1 and N2

	int wire0 = new_wire (c);
	attach_node_to_wire (c, zero, wire0, OUTPUT);
	attach_node_to_wire (c, n1, wire0, INPUT); 
	attach_node_to_wire (c, n2, wire0, INPUT);

	// link input a to the gates of P1 and N2

	attach_node_to_wire (c, p1, input_a_wire, CONTROL);
	attach_node_to_wire (c, n2, input_a_wire, CONTROL);

	// link input b to the gates of P2 and N1

	attach_node_to_wire (c, p2, input_b_wire, CONTROL);
	attach_node_to_wire (c, n1, input_b_wire, CONTROL);

	// links drains of P2, N2, and N1 to output

	attach_node_to_wire (c, p2, output_wire, OUTPUT);
	attach_node_to_wire (c, n1, output_wire, OUTPUT);
	attach_node_to_wire (c, n2, output_wire, OUTPUT);

	// wire 4: links output of one to input of P1

	int wire4 = new_wire (c);
	attach_node_to_wire (c, one, wire4, OUTPUT);
	attach_node_to_wire (c, p1, wire4, INPUT);

	// wire 5: link output of P1 to input of P2

	int wire5 = new_wire (c);
	attach_node_to_wire (c, p1, wire5, OUTPUT);
	attach_node_to_wire (c, p2, wire5, INPUT);
}

// make an inverter that puts the NOT of the signal from the input wire
// onto the output wire

void make_inverter (circuit *c, int input_wire, int output_wire) {
	int	p, n, one, zero, wire0, wire1;

	// get P and N transistors

	p = new_node (c, P);
	n = new_node (c, N);

	// get a one and a zero

	one = new_node (c, ONE);
	zero = new_node (c, ZERO);

	// make a couple of wires

	wire0 = new_wire (c);
	wire1 = new_wire (c);

	// connect input wire to gates of p and n

	attach_node_to_wire (c, p, input_wire, CONTROL);
	attach_node_to_wire (c, n, input_wire, CONTROL);

	// attach zero to source of N

	attach_node_to_wire (c, zero, wire0, OUTPUT);
	attach_node_to_wire (c, n, wire0, INPUT);

	// attach one to source of P

	attach_node_to_wire (c, one, wire1, OUTPUT);
	attach_node_to_wire (c, p, wire1, INPUT);

	// attach drain of P and N to output

	attach_node_to_wire (c, p, output_wire, OUTPUT);
	attach_node_to_wire (c, n, output_wire, OUTPUT);
}

void make_and (circuit *c, int input_a_wire, int input_b_wire, int output_wire) {
	// get a one node

	int one = new_node (c, ONE);

	// get a zero node

	int drain_wire = new_wire(c);
	int zero = new_node (c, ZERO);

	// get two P and N transistors

	int p1 = new_node (c, P);
	int p2 = new_node (c, P);
	int n1 = new_node (c, N);
	int n2 = new_node (c, N);

	// wire 0: links zero to the sources of N1 and N2

	int wire0 = new_wire (c);
	attach_node_to_wire (c, one, wire0, OUTPUT);
	attach_node_to_wire (c, p1, wire0, INPUT); 
	attach_node_to_wire (c, p2, wire0, INPUT);

	// link input a to the gates of P1 and N2

	attach_node_to_wire (c, p1, input_a_wire, CONTROL);
	attach_node_to_wire (c, n2, input_a_wire, CONTROL);

	// link input b to the gates of P2 and N1

	attach_node_to_wire (c, p2, input_b_wire, CONTROL);
	attach_node_to_wire (c, n1, input_b_wire, CONTROL);

	// links drains of P1, P2, and N1 to output

	attach_node_to_wire (c, p1, drain_wire, OUTPUT);
	attach_node_to_wire (c, p2, drain_wire, OUTPUT);
	attach_node_to_wire (c, n2, drain_wire, OUTPUT);

	// wire 4: links output of zero to input of N1

	int wire4 = new_wire (c);
	attach_node_to_wire (c, zero, wire4, OUTPUT);
	attach_node_to_wire (c, n1, wire4, INPUT);

	// wire 5: link output of N1 to input of N2

	int wire5 = new_wire (c);
	attach_node_to_wire (c, n1, wire5, OUTPUT);
	attach_node_to_wire (c, n2, wire5, INPUT);

	make_inverter(c, drain_wire, output_wire);
}

void make_nand (circuit *c, int input_wire_a, int input_wire_b, int output_wire) {
	
	//wires

	int outWire = new_wire (c);
	//Gets output from and gate
	make_and(c, input_wire_a, input_wire_b, outWire);

	//Now inverts output and gets truth table for nand gate
	make_inverter(c, outWire, output_wire);
}

void make_xor (circuit *c, int input_wire_a, int input_wire_b, int output_wire) {

	int wire0 = new_wire(c);
	int wire1 = new_wire(c);
	int wire2 = new_wire(c);

	//Gets truth table from xor gate made just from nand gates
	make_nand(c, input_wire_a, input_wire_b, wire0);
	make_nand(c, input_wire_a, wire0, wire1);
	make_nand(c, input_wire_b, wire0, wire2);
	make_nand(c, wire1, wire2, output_wire);

}
// make an OR gate that takes input wires a and b and puts a OR b on the output wire
// we'll do this the easy way: wire up the NOR of a and b to an inverter

void make_or (circuit *c, int input_wire_a, int input_wire_b, int output_wire) {

	int connect_wire = new_wire (c);

	make_nor(c, input_wire_a, input_wire_b, connect_wire);

	make_inverter(c, connect_wire, output_wire);
}

void make_adder (circuit *c, int input_wire_a, int input_wire_b, int input_wire_c, int output_wire, int output_parity) {

	int wire0 = new_wire(c);
	int wire1 = new_wire(c);
	int wire2 = new_wire(c);

	//Makes full adder from xor, and, & or gates. 
	make_xor(c, input_wire_a, input_wire_b, wire0);
	make_and(c, input_wire_a, input_wire_b, wire1);
	make_xor(c, wire0, input_wire_c, output_wire);
	make_and(c, input_wire_c, wire0, wire2);
	make_or(c, wire1, wire2, output_parity);
	
}

// this makes the whole circuit with inputs and output

void make_circuit (circuit *c) {
	// two input nodes for the circuit

	int input_a = new_node (c, INPUT_NODE);
	int input_b = new_node (c, INPUT_NODE);
	int input_c = new_node (c, INPUT_NODE);
	// two wires to connect to the inputs

	int input_wire_a = new_wire (c);
	int input_wire_b = new_wire (c);
	int input_wire_c = new_wire (c);

	attach_node_to_wire (c, input_a, input_wire_a, OUTPUT);
	attach_node_to_wire (c, input_b, input_wire_b, OUTPUT);
	attach_node_to_wire (c, input_c, input_wire_c, OUTPUT);
	
	// one output node for the circuit

	int output = new_node (c, OUTPUT_NODE);
	int parity = new_node (c, OUTPUT_NODE);
	// one wire for the output

	int output_majority = new_wire (c);
	int output_parity = new_wire (c);

	attach_node_to_wire (c, output, output_majority, INPUT);
	attach_node_to_wire (c, parity, output_parity, INPUT);

	//Commented out functions were just used to test the individual gates


	//make_and (c, input_wire_a, input_wire_b, output_majority);

	//make_xor(c, input_wire_a, input_wire_b, output_wire);

	//make_xnor (c, input_wire_a, input_wire_b, output_wire);

	make_adder(c, input_wire_a, input_wire_b, input_wire_c, output_majority, output_parity);
	
}