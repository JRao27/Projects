//Joshua Rao - Section 501


#include <iostream>
#include <iomanip>
#include <string>
#include <sstream>
#include <bitset>
#include <stdlib.h>

using namespace std;

int main(int argc, const char * argv[]) {

string d = "d";
string h = "h";
string b = "b";

bool pos = true;
bool dec = true;
const char *test = argv[3];
string convertString(test);
int value = atoi(convertString.c_str()); //Gets a number from the from the string to be converted

if (value < 0) {pos = false;} //Sees if number to convert is negative. If so then program does not accept it

//Makes sure whole string is just numbers for converting from decimal
for (unsigned int i = 0; i < convertString.length(); i++) {
	char a = convertString[i];
	if (!(a > 47 && a < 58)) {
		dec = false;
	}
}
//convert from decimal
if (argv[1] == d && pos && dec) {
	if (argv[2] == h) {
		cout << "decimal " << value << " is " << "hexadecimal " << hex << value << endl;
	}
	
	if (argv[2] == b) {
		string binary = bitset<32>(value).to_string();
		cout << "decimal " << value << " is " << "binary " << binary << endl;
	}
}

//convert from binary
else if (argv[1] == b && pos == true) {
	if (argv[2] == d) {
		long binary = 0;
		long decimal = 0;
		long remainder = 1;
		long number = 1;
		long base = 1;
		binary = value;

		while (binary > 0) {
			remainder = binary % 10;
			decimal = decimal + remainder * base;
			base = base * 2;
			binary = binary/10;

		}
	
	cout << "binary " << value << " is decimal " << decimal << endl;
}

	if (argv[2] == h) { 
		string binary(convertString);
		bitset<8> set(binary);
		cout << "binary " << value << " is hexadecimal " << hex << set.to_ulong() << endl;

	}

}

//convert from hexadecimal
else if (argv[1] == h && pos == true) {
	if (argv[2] == d) {
		int hexDec;
		stringstream convertDec;
		convertDec << convertString;
		convertDec >> hex >> hexDec;
		cout << "hexadecimal " << convertString << " is decimal " << hexDec << endl;
}

	if (argv[2] == b) {
		stringstream bin;
		unsigned a;
		bin << hex << convertString;
		bin >> a;
		bitset<32> final(a);
		cout << "hexadecimal " << convertString << " is binary " << final.to_string() << endl;

}


}
else {
	cout << "Usage: ./hex [ h | d | b ] [ h | d | b]" << endl;

}
}