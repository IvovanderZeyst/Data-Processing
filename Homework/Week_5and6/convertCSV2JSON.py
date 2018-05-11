# -*- coding: utf-8 -*-
"""
Created on Mon Apr 23 12:41:08 2018

@author:    Ivo van der Zeyst
            6166474
"""
# Import the required libraries
import csv
import json
import os

# read the csv and include the write function
def readCsv():
    os.chdir(r"C:\Users\Ivo\OneDrive\Studie\Data Processing\DP 00.00 Data Processing Repository\Homework\Week_5and6") #set working directory here
    csvFile = open('Quality of Life Index for Country 2012.csv', 'r') #set file to read from
    csvLines = []
    reader = csv.DictReader(csvFile)
    fileHeaders = reader.fieldnames
    for row in reader:
        csvLines.extend([{fileHeaders[i]:row[fileHeaders[i]] for i in range(len(fileHeaders))}])
    writeJson(csvLines)
    
# Writing the JSON file 
def writeJson(csvToWrite):
    jsonFile = open('Quality of Life Index for Country 2012.json', 'w') #set json to write to
    jsonFile.write(json.dumps(csvToWrite, indent=4, ensure_ascii=False))
    
if __name__ == "__main__":
    readCsv()