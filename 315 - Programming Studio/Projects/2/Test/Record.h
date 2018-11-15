//
//  Record.hpp
//  DatabaseLib
//
//  Created by Joshua Rao on 9/11/2017.
//  Copyright © 2017 Joshua Rao. All rights reserved.
//

#ifndef Record_hpp
#define Record_hpp

#include <string>


//Database.h

class Record
{
    
    int recordSize = 0;
    
public:
    struct input {
        
        //filled with all column names for a specific table set to null string
        std::string dog = "";
        std::string cat = "";
    };
    
    input record;
    Record();
    Record(int inputSize);
    int getSize();
    std::string operator[] (int index);
    void set (int index, std::string input);
    //stuff goes here
    
    //functions defs go here
};


#endif /* Record_hpp */
