#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
using namespace std;

vector<string> parseCSVLine(const string& line) {
    vector<string> result;
    stringstream ss(line);
    string word;
    bool inDoubleQuotes = false;
    bool inSingleQuotes = false;
    char c;

    while (ss.get(c)) {
        if (c == '"' && !inSingleQuotes) {
            inDoubleQuotes = !inDoubleQuotes;
        } else if (c == '\'' && !inDoubleQuotes) {
            inSingleQuotes = !inSingleQuotes;
        } else if (c == ',' && !inDoubleQuotes && !inSingleQuotes) {
            result.push_back(word);
            word.clear();
        } else {
            word += c;
        }
    }
    result.push_back(word);
    return result;
}

int main() {
    //Users, BusinessData, Appointments, BusinessMetrics, Reviews 
    string tableName = "Appointments";

    ifstream fin(tableName + ".csv");
    if (!fin.is_open()) {
        cerr << "Error opening file!" << endl;
        return 1;
    }

    ofstream outfile(tableName + ".sql");

    string line;
    bool isFirstLine = true;

    while (getline(fin, line)) {
        vector<string> row = parseCSVLine(line);

        if (row.size() >= 7 && tableName == "Users") {
            string cmd = "INSERT INTO " + tableName + " VALUES (" + row[0] + ", '" + row[1] + "', '" + row[2] + "', '" + row[3] + "', '" + row[4] + "', '" + row[5] + "', '" + row[6] + "');";
            
            if (isFirstLine) {
                cout << cmd << endl;
                isFirstLine = false;
            } else {
                outfile << cmd << endl;
            }

        } else if (row.size() >= 7 && tableName == "BusinessData") {
            string cmd = "INSERT INTO " + tableName + " VALUES (" + row[0] + ", " + row[1] + ", '" + row[2] + "', '" + row[3] + "', " + row[4] + ", " + row[5] + ", '" + row[6] + "');";
            
            if (isFirstLine) {
                cout << cmd << endl;
                isFirstLine = false;
            } else {
                outfile << cmd << endl;
            }

        } else if (row.size() >= 7 && tableName == "Appointments") {
            string price = row[5].substr(2); //take the $ off the front

            string cmd = "INSERT INTO " + tableName + " VALUES (" + row[0] + ", " + row[1] + ", " + row[2] + ", TO_TIMESTAMP('" + row[3] + "', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('" + row[4] + "', 'YYYY-MM-DD HH24:MI:SS'), " + price + ", TO_DATE('" + row[6] + "', 'YYYY-MM-DD'));";
            
            if (isFirstLine) {
                cout << cmd << endl;
                isFirstLine = false;
            } else {
                outfile << cmd << endl;
            }

        } else if (row.size() >= 4 && tableName == "BusinessMetrics") {
            string cmd = "INSERT INTO " + tableName + " VALUES (" + row[0] + ", " + row[1] + ", " + row[2] + ", " + row[3] + ");";
            
            if (isFirstLine) {
                cout << cmd << endl;
                isFirstLine = false;
            } else {
                outfile << cmd << endl;
            }

        } else if (row.size() >= 5 && tableName == "Reviews") {
            string cmd = "INSERT INTO " + tableName + " VALUES (" + row[0] + ", " + row[1] + ", " + row[2] + ", " + row[3] + ", '" + row[4] +"');";
            
            if (isFirstLine) {
                cout << cmd << endl;
                isFirstLine = false;
            } else {
                outfile << cmd << endl;
            }

        } else {
            cerr << "Row has insufficient columns or table name is incorrect." << endl;
        }
    }

    fin.close();
    outfile.close();

    cout << "Process Complete" << endl;

    return 0;
}
