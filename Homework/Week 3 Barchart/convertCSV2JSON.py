# -*- coding: utf-8 -*-
"""
Created on Mon Apr 23 12:41:08 2018

@author:    Ivo van der Zeyst
            6166474
"""
# Import the required libraries
import csv
import json

# read the csv and include the write function
def readCsv():
    csvFile = open('Flue data.csv', 'r')
    csvLines = []
    reader = csv.DictReader(csvFile)
    fileHeaders = reader.fieldnames
    for row in reader:
        csvLines.extend([{fileHeaders[i]:row[fileHeaders[i]] for i in range(len(fileHeaders))}])
    writeJson(csvLines)
    
# Writing the JSON file 
def writeJson(csvToWrite):
    jsonFile = open('Flue data.json', 'w')
    jsonFile.write(json.dumps(csvToWrite, indent=4, ensure_ascii=False))
    
if __name__ == "__main__":
    readCsv()