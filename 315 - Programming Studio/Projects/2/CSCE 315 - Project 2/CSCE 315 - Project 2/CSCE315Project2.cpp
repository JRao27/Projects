// CSCE315Project2.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "json.hpp"
#include "ServerAPI.h"
#include <iostream>
#include <string>
#include <fstream>

using json = nlohmann::json;


using namespace std;

Table getPhotos() 
{
	Table photoTable;
	vector<string> photoAttr = { "photo_id", "business_id", "caption", "label" };
	ifstream iss;
	string photoLine;
	iss.open("photos.json");
	cout << "HI" << endl;
	while (getline(iss, photoLine)) {
		Record firstRecord(photoAttr.size());
		json j = json::parse(photoLine);

		firstRecord[0] = j["photo_id"].get<std::string>();
		firstRecord[1] = j["business_id"].get<std::string>();
		firstRecord[2] = j["caption"].get<std::string>();
		firstRecord[3] = j["label"].get<std::string>();

		photoTable.insertRecord(firstRecord);
	}
	cout << "TABLE SIZE: " << photoTable.getNumRecords() << endl;
	iss.close();
	return photoTable;
}


Table getBusinesses()
{
	Table businessTable;
	vector<string> businessAttr = { "business_id", "name", "neighborhood", "address", "city", "state", "postal_code", "latitude", "longitude",
									"stars", "review_count", "is_open", "price_range", "garage", "street", "validated", "lot", "valet", "BikeParking",
									"WheelchairAccessible",	"monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"};
	ifstream iss;
	string businessLine;
	iss.open("business.json");
	cout << "Hi" << endl;
	while (getline(iss, businessLine)) {
		Record firstRecord(businessAttr.size());
		json j = json::parse(businessLine);
		firstRecord[0] = j.at("business_id").get<std::string>();
		firstRecord[1] = j.at("name").get<std::string>();
		firstRecord[2] = j.at("neighborhood").get<std::string>();
		firstRecord[3] = j.at("address").get<std::string>();
		//cout << "Empty: " << j.at("city").get<string>();
		firstRecord[4] = j.at("city").get<string>();
		//cout << "Empty: " << j.at("state").get<string>();
		firstRecord[5] = j.at("state").get<std::string>();
		firstRecord[6] = j.at("postal_code").get<std::string>();
		firstRecord[7] = to_string(j.at("latitude").get<double>());
		firstRecord[8] = to_string(j.at("longitude").get<double>());
		firstRecord[9] = to_string(j.at("stars").get<double>());
		firstRecord[10] = to_string(j.at("review_count").get<double>());
		firstRecord[11] = to_string(j.at("is_open").get<double>());
		//firstRecord[12] = to_string(j.at("attributes").at("RestaurantsPriceRange2").get<double>());
		firstRecord[20] = j.at("hours").at("Monday").get<std::string>();
		firstRecord[21] = j.at("hours").at("Tuesday").get<std::string>();
		firstRecord[22] = j.at("hours").at("Wednesday").get<std::string>();
		firstRecord[23] = j.at("hours").at("Thursday").get<std::string>();
		firstRecord[24] = j.at("hours").at("Friday").get<std::string>();
		firstRecord[25] = j.at("hours").at("Saturday").get<std::string>();
		firstRecord[26] = j.at("hours").at("Sunday").get<std::string>();

		businessTable.insertRecord(firstRecord);
	}
	cout << "\n\n\n\n\n\n\n\n\n\n\n\n\n" << businessTable.getNumRecords() << endl;
	iss.close();
	return businessTable;
}

int main()
{
	//getPhotos();
	getBusinesses();
	system("pause");
    return 0;
}

