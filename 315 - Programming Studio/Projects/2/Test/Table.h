//
//  Table.hpp
//  DatabaseLib
//
//  Created by Joshua Rao on 9/11/2017.
//  Copyright © 2017 Joshua Rao. All rights reserved.
//

#ifndef Table_hpp
#define Table_hpp

#include <string>
#include <vector>
#include <cstdarg>
#include <iostream>
#include "Record.h"

class Table
{
private:
    std::vector<Record> listOfRecords;
public:
    //stuff goes here
    
    // functions defs go here
    // default constructor
    Table();
    // constructor for a given list of attributes
    Table(std::string attribute, ...); // look up Variadic functions
    
    void addAttribute(std::string attribute); // adds and extra column to end of table
    void deleteAttribute(std::string attribute); // deletes column from table
    void insert(Record recordName); // adds record to table
    void getAttributes(); // prints out of the attributes of table
    int getSize(); //returns number of record
    Record getNextRecord(); //iterator that returns next record
    void setKeyAttribute(std::string Attribute); // sets given attribute as key for table
    Table crossJoin(Table table1, Table table2);
    Table naturalJoin(Table table1, Table table2);
    int count(std::string attribute); // return the number of entries that are non-null
    std::string min(std::string attribute); // returns the min in an attribute column
    std::string max(std::string attribute); // returns the mmax in an attribute column
};


#endif /* Table_hpp */
