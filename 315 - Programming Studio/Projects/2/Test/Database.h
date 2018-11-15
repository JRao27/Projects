//
//  Database.hpp
//  DatabaseLib
//
//  Created by Joshua Rao on 9/11/2017.
//  Copyright © 2017 Joshua Rao. All rights reserved.
//

#ifndef Database_hpp
#define Database_hpp

//Database.h

#include <string>
#include <unordered_map>
#include "Table.h"
using namespace std;

class Database
{
public:
    string databaseName;
    unordered_map<string, Table> tableList;
    
    Database(); 												//default constructor
    Database(string name);  									//constructor initialize with name
    void addTable(Table newTable, string name); 				//adds a table to the database
    void createTable(string name);  							//create a new table in the database
    void removeTable(string name);								//removes a table from the database
    void name(string newName);  								//assigns a name to the database, overwrites if already named
    void listTable();  											//lists the names of all tables
    Table getTable(string targetTable); 						//returns a table from the database
    unordered_map<string, Table> getAllTables();				//returns a map containing all tables in the database
    Table query(string select, string from, string where);		//return a table based on the parameters input
    void size();    											//prints the amount of tables in the database
    void info();												//prints information about the table
    void duplicateTable(string tableName);						//makes a deep copy of the specified table
};


#endif /* Database_hpp */
