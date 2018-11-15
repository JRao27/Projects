//
//  main.cpp
//  IndividualProject
//
//

#include <iostream>
#include <vector>
#include <string>
#include <cstring>
#include <sstream>
#include <algorithm>
#include <iterator>
#include <numeric>

using namespace std;

int totalCourses = 0;
int totalSections = 0;

struct Book { //Has all relevant information about each textbook. Any different information than a previous struct with 
    //the same ISBN creates a whole new struct which is then pushed into the vector of structs responsible for them
    
    string departmentCode;
    int courseNumber = 0;
    string section = "";
    string ISBN = "No ISBN added";
    string title = "No title added";
    string author = "No author added";
    int edition = 1;
    string date = "No date of publication added";
    double cost = 0.00;
    char status;
    string version = "";
    
};

struct Course { //Has all relevant information about each course. The ISBN attached to this course and section number is
    //the connection with the Book struct and is what allows a user to find relevant book information from just the ISBN 
    //in a Course struct
    
    string departmentCode;
    int courseNumber = 0;
    string name;
    int section = 0;
    string ISBN;
    char status;    
};

vector<Book> books;
vector<Course> courses;

void printBooks (struct Book book) {
	
	cout << "Title: " << book.title << endl;
	cout << "Author: " << book.author << endl;
	cout << "ISBN: " << book.ISBN << endl;
	cout << "Edition: " << book.edition << endl;
	cout << "Date of Publication: " << book.date << endl;
	cout << "Price: " << "$" << book.cost << endl;
	cout << "Version: " << book.version << endl;
    cout << "Course Department: " << book.departmentCode << endl;
    cout << "Course Number: " << book.courseNumber << endl;
    cout << "Section Number: " << book.section << endl;
    cout << "Book is required or optional: " << book.status << endl << endl;
}

void printCourses (struct Course course) {
	
	cout << "Course Name: " << course.name << endl;
	cout << "Course Department: " << course.departmentCode << endl;
	cout << "Course Number: " << course.courseNumber << endl;
	cout << "Section Number: " << course.section << endl;
	cout << "ISBN of Course Book: " << course.ISBN << endl;
	cout << "Book is Required or Optional: " << course.status << endl << endl;
	
}

double minimumCost (int courseNumber, int sectionNumber, string ISBN) {
    
    double minCost = 1000000.00; //Set to such a large number to make replacing minCost with a smaller value easy through
    // a simple (x < minCost) {then replace} 

    for (int i = 0; i < books.size(); i++) {

        bool foundCourse = (books.at(i).courseNumber == courseNumber);
        bool foundSection = 0;
        int stringLength = books.at(i).section.length();
        string fullString = books.at(i).section;
        int a;

        //Finds section number that was entered as a paramter. Each Book struct has the section parameter as a string
        //that keeps on appending the sections of courses that use the book. This function breaks apart the string
        //again and stores each 3-digit section integer into it's own 'int' value.
        for (int i = 0; i < stringLength; i += 5) {
            int singleSection = stoi(fullString.substr(i, 3));
            if (singleSection == sectionNumber) {
                foundSection = 1;
                break;
            }
            if ((i+5) >= stringLength) {
                break;
            }
        }


        bool foundISBN = (books.at(i).ISBN == ISBN);
        bool required = 0;
        if (books.at(i).status == 'R') {
            required = 1;
        }

        //If book is required than adjust minimum cost
        if (foundCourse && foundSection && foundISBN && required) {

            if (books.at(i).cost < minCost) {
                minCost = books.at(i).cost;
            }
        }
    }
    if (minCost == 1000000.00) { //This means that the minimum cost did not change and the only way this can happen
        //is if the textbook is not required or there is no cost associated with the textbook
        cout << "Textbook is not required so cost is set to a large value" << endl;
    }
    cout << "COURSE NUMBER: " << courseNumber << endl;
    cout << "SECTION NUMBER: " << sectionNumber << endl;
    cout << "MIN COST: " << minCost << endl << endl;
    return minCost;
}

double maximumCost (int courseNumber, int sectionNumber, string ISBN) {

    double maxCost = 0.00;

    for (int i = 0; i < books.size(); i++) {

        bool foundCourse = (books.at(i).courseNumber == courseNumber);
        bool foundSection = 0;
        int stringLength = books.at(i).section.length();
        string fullString = books.at(i).section;


        for (int i = 0; i < stringLength; i += 5) {
            int singleSection = stoi(fullString.substr(i, 3));
            if (singleSection == sectionNumber) {
                foundSection = 1;
                break;
            }
            if ((i+5) >= stringLength) {
                break;
            }
        }


        bool foundISBN = (books.at(i).ISBN == ISBN);
        bool required = 0;
        
        if (foundCourse && foundSection && foundISBN) {
            if (books.at(i).cost > maxCost) {

                maxCost = books.at(i).cost;
            }
        }
    }

    cout << "COURSE NUMBER: " << courseNumber << endl;
    cout << "SECTION NUMBER: " << sectionNumber << endl;
    cout << "MAX COST: " << maxCost << endl << endl;
    return maxCost;
}

int main(int argc, const char * argv[]) {
    
    vector<string> inputVec;
    vector<double> minVec;
    vector<double> maxVec;
    int i = 0;

    string str;

    do{
        getline(cin,str);   
        inputVec.push_back(str);    
    } while (!cin.eof());


    for (int i = 0; i < inputVec.size(); i++) {
        //The following three lines take the input.txt file, insert each row separated by a line end into a vector 
        //and the 'commandLine' vec now has each individual command line in a separate index.
        istringstream buf(inputVec.at(i));
        istream_iterator<string> beg(buf), end;
        vector<string> commandLine(beg, end);

        //Needed a char to compare with C++ chars. The [0] basically took commandLine.at(0) which is the first letter 
        //and made it into a char
        char insertCommand = commandLine.at(0)[0];

        //The first command from a line. Used for commands with more than one letter
        string printCommand = commandLine.at(0);

        
        if (insertCommand == 'B') {
            cout << "NOW INSERTING BOOKS" << endl;


            string inputISBN = commandLine.at(1);
            string inputTitle = "";

            //Accounts for spaces in book titles
            for (int i = 2; i < commandLine.size(); i++) {
                inputTitle.append(commandLine.at(i) + " "); 
            }
            

            Book book;
    
            book.ISBN = inputISBN;
            book.title = inputTitle;
            books.push_back(book);
        }

        if (insertCommand == 'D') {
            cout << "NOW DEFINING BOOKS" << endl;

            string inputISBN = commandLine.at(1);
            char key = commandLine.at(2)[0];
            string inputValue = commandLine.at(3);

            for (int i = 0; i < books.size(); i++) {
            //if ISBN is found
                if (books.at(i).ISBN == inputISBN) {
                    cout << "Found ISBN: " << inputISBN << endl;
                    switch (key) {
                        case 'A':
                            inputValue = "";
                            //For loop begins at commandLine.at(3) which is the start of an author's name. The append()
                            //function is to create one string with the whole name of the author. 
                            for (int i = 3; i < commandLine.size(); i++) {
                                inputValue.append(commandLine.at(i) + " ");
                            }
                            books.at(i).author = inputValue;
                            break;

                        case 'E':
                            books.at(i).edition = stoi(inputValue);
                            break;

                        case 'D':
                            books.at(i).date = inputValue;
                            break;

                    }
                }
            }

            
        }

        if (insertCommand == 'M') {
            cout << "NOW MODIFYING COST AND VERSION OF BOOK" << endl;

            string inputISBN = commandLine.at(1);
            double inputCost = strtod(commandLine.at(2).c_str(), NULL);
            string inputVersion = commandLine.at(3);

            for (int i = 0; i < books.size(); i++) {

                if (books.at(i).ISBN == inputISBN) {

                    //If ISBN is found then store all relevant information about book in temporary variables
                    string tempISBN = books.at(i).ISBN;
                    string tempTitle = books.at(i).title;
                    string tempAuthor = books.at(i).author;
                    int tempEdition = books.at(i).edition;
                    string tempDate = books.at(i).date;
                    double tempCost = books.at(i).cost;
                    string tempVersion = books.at(i).version;

                    if (books.at(i).version == "") {
                        //If version does not exist than that means it has not been touched according to the input.txt file
                        //given to us over Piazza. So the temporary variables are not used and the relevant information 
                        //is simply changed within the struct
                        books.at(i).cost = inputCost;
                        books.at(i).version = inputVersion;
                    }
                    else if (books.at(i).version != inputVersion) {
                        //If one record of the book already exists than an entirely new Book struct is created to make 
                        //counting the different forms of all textbooks easy. The information is identical except for 
                        //cost, version, or both. 
                        Book bookVersion;
                        bookVersion.ISBN = tempISBN;
                        bookVersion.title = tempTitle;
                        bookVersion.author = tempAuthor;
                        bookVersion.edition = tempEdition;
                        bookVersion.date = tempDate;
                        bookVersion.cost = inputCost;
                        bookVersion.version = inputVersion;    
                        books.push_back(bookVersion);
                    }
                    else {
                        cout << "Version already entered.";
                    }
                }
            }
        }

        if (insertCommand == 'C') {
            cout << "NOW DEFINING COURSE" << endl;

            string inputDeptCode = commandLine.at(1);
            int inputCourseNum = stoi(commandLine.at(2));
            string inputCourseName = "";

            //Course name begins at commandLine.at(3) and the append accounts for any spaces in order to return one 
            //string with the full name
            for (int i = 3; i < commandLine.size(); i++) {
                inputCourseName.append(commandLine.at(i) + " ");
            }

            Course course;

            course.departmentCode = inputDeptCode;
            course.courseNumber = inputCourseNum;
            course.name = inputCourseName;

            courses.push_back(course);
            totalCourses++;
        }

        if (insertCommand == 'A') {
            cout << "NOW ASSIGNING A BOOK TO A CLASS" << endl;

            string inputISBN = commandLine.at(1);
            string inputDeptCode = commandLine.at(2);
            int inputCourseNum = stoi(commandLine.at(3));
            int inputCourseSec = stoi(commandLine.at(4));
            char inputStatus = commandLine.at(5)[0];

            string bookCourseSec = commandLine.at(4);

			
            for (int i = 0; i < courses.size(); i++) {
                if (courses.at(i).courseNumber == inputCourseNum) {
                    totalSections++; //Just to keep track of number of all sections across all departments
                    if (courses.at(i).section == 0) {
                        //If section = 0 then this means it has not been touched according to the test file on Piazza.
                        //Relevant information is updated within struct

                        courses.at(i).ISBN = inputISBN;
                        courses.at(i).section = inputCourseSec;
                        courses.at(i).status = inputStatus;

                        for (int i = 0; i < books.size(); i++) {
                            if (books.at(i).ISBN == inputISBN) {
                                //If ISBN found than relevant information is updated within struct
                                books.at(i).departmentCode = inputDeptCode;
                                books.at(i).courseNumber = inputCourseNum;
                                books.at(i).status = inputStatus;
                                books.at(i).section.append(bookCourseSec + "  ");

                            }
                        }
                        break;
                    }

                    else {
                        //Else if course already exists than new Course struct is created
                        Course course;
                        course.departmentCode = courses.at(i).departmentCode;
                        course.courseNumber = courses.at(i).courseNumber;
                        course.name = courses.at(i).name;
                        course.section = inputCourseSec;
                        course.ISBN = inputISBN;
                        course.status = inputStatus;
                        courses.push_back(course);

                        for (int i = 0; i < books.size(); i++) {
                            if (books.at(i).ISBN == inputISBN) {
                                books.at(i).departmentCode = inputDeptCode;
                                books.at(i).courseNumber = inputCourseNum;
                                books.at(i).status = inputStatus;
                                books.at(i).section.append(bookCourseSec + "  ");
                            }
                        }
                        break;
                    }
                }
            }
        }

        if (printCommand == "GC") {
            cout << "PRINT THE BOOKS REQUIRED AND OPTIONAL FOR ALL SECTIONS OF A GIVEN COURSE" << endl;
            string inputDeptCode = commandLine.at(1);
            int inputCourse = stoi(commandLine.at(2));
			string tempISBN = "";
			int tempSection = 0;
			char tempStatus;

            for (int i = 0; i < courses.size(); i++) {
                if (courses.at(i).courseNumber == inputCourse) {
                    tempISBN = courses.at(i).ISBN;
					tempSection = courses.at(i).section;
					tempStatus = courses.at(i).status;
					
					for (int i = 0; i < books.size(); i++) {
						if (books.at(i).ISBN == tempISBN) {
							cout << "Course Number: " << inputCourse << "  Section Number: " << tempSection << "  Required or Optional: " << tempStatus << endl;
							printBooks(books.at(i));
							break;
                        }
                    }
                }
            }
        }
		
		if (printCommand == "GS") {
            cout << "EXPLANATION PRINT THE BOOKS REQUIRED AND OPTIONAL FOR A GIVEN SECTION OF A COURSE" << endl;
			
			string inputDeptCode = commandLine.at(1);
			int inputCourse = stoi(commandLine.at(2));
			int inputSection = stoi(commandLine.at(3));
			string tempISBN = "";
			int tempSection = 0;
			char tempStatus;

			for (int i = 0; i < courses.size(); i++) {
				if (courses.at(i).courseNumber == inputCourse && courses.at(i).section == inputSection) {
					tempISBN = courses.at(i).ISBN;
					tempSection = courses.at(i).section;
					tempStatus = courses.at(i).status;
					
					for (int i = 0; i < books.size(); i++) {
						if (books.at(i).ISBN == tempISBN) {
							cout << "Course Number: " << inputCourse << "  Section Number: " << tempSection << "  Required or Optional: " << tempStatus << endl;
							printBooks(books.at(i));
							break;						
						}
					}
				}
			}
		}
		
		if (printCommand == "GB") {
            cout << "PRINT ALL INFORMATION KNOWN ABOUT A PARTICULAR BOOK" << endl;

			string inputISBN = commandLine.at(1);
			
			for (int i = 0; i < books.size(); i++) {
				if (books.at(i).ISBN == inputISBN) {
					printBooks(books.at(i));
				}
			}
		}
		
		if (printCommand == "PB") {
            cout << "PRINT A LIST OF ALL BOOKS THAT ARE DEFINED" << endl;

			for (int i = 0; i < books.size(); i++) {
				printBooks(books.at(i));	
			}
		}
		
		if (printCommand == "PC") {
            cout << "PRINT A LIST OF ALL COURSES THAT ARE DEFINED" << endl;

			for (int i = 0; i < courses.size(); i++) {
				printCourses(courses.at(i));
			}
		}
		
		if (printCommand == "PY") {
            cout << "PRINT ALL BOOKS WITH KNOWN PUBLICATION DATES IN THE GIVEN MONTH/YEAR OR LATER" << endl;
			string date = commandLine.at(1);
			int month = stoi(date.substr(0, 2));
			int year = stoi(date.substr(3, 4));
			
			for (int i = 0; i < books.size(); i++) {
				int tempMonth = stoi(books.at(i).date.substr(0,2));
				int tempYear = stoi(books.at(i).date.substr(3,4));
				bool laterYear = (tempYear > year);
				bool sameYear = (tempYear == year);
				bool correctMonth = (tempMonth >= month);
				
				if (laterYear || (sameYear && correctMonth)) {
					printBooks(books.at(i));
				}
			}
		}
		
		if (printCommand == "PD") {
            cout << "PRINT THE LIST OF ALL BOOKS USED IN A DEPARTMENT, GIVEN BY DEPARTMENT CODE. DO NOT LIST BY SECTION" << endl;

			string inputDeptCode = commandLine.at(1);
			for (int i = 0; i < books.size(); i++) {
                if (books.at(i).departmentCode == inputDeptCode) {
                    printBooks(books.at(i));
                }
            }
		}

        if (printCommand == "PM") {
            cout << "PRINT THE AVERAGE MAX AND MIN COSTS OF ALL BOOKS IN A DEPARTMENT" << endl;

            string inputDeptCode = commandLine.at(1);
            double inputMinSum = 0.00;
            double inputMaxSum = 0.00;

            for (int i = 0; i < courses.size(); i++) {
                if (courses.at(i).departmentCode == inputDeptCode) {
                    cout << "COURSE ISBN: " << courses.at(i).ISBN << endl;
                    double tempMinCost = minimumCost(courses.at(i).courseNumber, courses.at(i).section, courses.at(i).ISBN);
                    double tempMaxCost = maximumCost(courses.at(i).courseNumber, courses.at(i).section, courses.at(i).ISBN);
                    if (tempMinCost < 100000) { //Tells us that a minimum cost was found if cost has been changed from 100000
                        minVec.push_back(tempMinCost);
                    }
                    if (tempMaxCost != 0.00) { //Tells us that a maximum cost was found if cost has been changed from 0
                        maxVec.push_back(tempMaxCost);
                    }

            }
        }
            for (int i = 0; i < minVec.size(); i++) {
                 inputMinSum += minVec.at(i);
            }
            cout << endl;
            for (int i = 0; i < maxVec.size(); i++) {
                inputMaxSum += maxVec.at(i);

            }
                double avgMin = inputMinSum/minVec.size();
                cout << "Min average: " << avgMin << endl << endl;

                double avgMax = inputMaxSum/maxVec.size();
                cout << "Max average: " << avgMax << endl << endl;

        }
    }

return 0;
}










