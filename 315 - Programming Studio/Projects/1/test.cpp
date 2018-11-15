

#include <iostream>
#include <vector>
#include <string>

using namespace std;


class Record
{
	
    int recordSize = 0;


    public:
    struct input {

		//filled with appropriate string values with each string value 
		//representing one column in record. 
		string dog = "";
		string cat = "";
	};

	input record;

    Record() {cout << "Record constructor called" << endl;}
    Record(int inputSize) {
    	cout << "Record constructor with size parameter called" << endl;
    	recordSize = inputSize;
    	//Example of what a record
    	//initialize however many strings specified in the inputSize parameter

    }
    int getSize() {
    	cout << "getSize() called " << endl;
  		return recordSize;
    }
    string operator[] (int index) {
    	cout << "[] function called" << endl;
    	cout << "INDEX: " << index << endl;
    	switch (index) {
    		case 0:
    		return record.dog;
    		break;

    		case 1:
    		return record.cat;
    		break;
    	}

    }

    void set (int index, string input) {
    	cout << "Set function called" << endl;
    	cout << "INDEX: " << index << endl;
    	cout << "INPUT: " << input << endl;
    	switch (index) {
    		case 0:
    		record.dog = input;
    		break;

    		case 1:
    		record.cat = input;
    		break;

    	}
    }
        //stuff goes here     
        //functions defs go here
};


int main() {

Record r (3);

r.record.dog = "charlie";
r.record.cat = "bob";

cout << "First value: " << r.record.dog << endl;
cout << "Second value: " << r.record.cat << endl;
cout << "Second value through index: " << r[1] << endl;
cout << "Return first value: " << r[0] << endl;
r.set(1, "sam");
cout << "Change second value: " << r[1] << endl;
Record s (4);

s.record.dog = "red";
s.record.cat = "blue";

cout << "First value: " << s.record.dog << endl;
cout << "Second value: " << s.record.cat << endl;

}