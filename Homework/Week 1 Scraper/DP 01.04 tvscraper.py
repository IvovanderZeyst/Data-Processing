#!/usr/bin/env python
# Name: Ivo van der Zeyst
# Student number: 6166474
"""
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
"""

import csv
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

# Declaring global lists to store information that will be written to the CSV
Title, Rating, Genre, Actors, Runtime = ([] for i in range(5))
 
def extract_tvseries(dom):
    
    # Extract Title from HTML elements, cleanse and assign the data to the assigned list
    title = [line.get_text() for line in dom.find_all('h3', 'lister-item-header')]
    titleDef = [element.split('\n') for element in title]
    for line in titleDef:
        Title.append(line[2])
    
    # Extract Rating from HTML elements, cleanse and assign the data to the assigned list
    rating = [line.get_text() for line in dom.find_all('div', 'ratings-bar')]
    ratingDef = [element.split('\n') for element in rating]
    ratingDef2 = [row[3] for row in ratingDef]
    for line in ratingDef2:
        Rating.append(line) 
    
    # Extract Genre from HTML elements, cleanse and assign the data to the assigned list
    genre = [line.get_text() for line in dom.find_all('span', 'genre')]
    genreDef = [element.replace(' ', '') for element in genre]
    genreDef2 = [element.split('\n') for element in genreDef]
    for line in genreDef2:
        Genre.append(line[1])
    
    # Extract actors from HTML elements, cleanse, merge and assign the data to the assigned list 
    actors = [element.get_text() for element in dom.select("p > a")]
    actors0 = actors[15:216]
    actors0.remove('See full summary')
    actors1 = []
    actors2 = []
    actors3 = []
    actors4 = []
    for i in range(0, len(actors0)):
        if i % 4 == 0:
            actors1.append(actors0[i])
        elif i % 4 == 1:
            actors2.append(actors0[i])
        elif i % 4 == 2:
            actors3.append(actors0[i])
        elif i % 4 == 3:
            actors4.append(actors0[i])
    for i in range(0, len(Title)):
        Actors.append(actors1[i] + ', ' + actors2[i] + ', ' + actors3[i] + ', ' + actors4[i])
    
    # Extract Runtime from HTML elements, cleanse and assign the data to the assigned list
    runTime = [line.get_text() for line in dom.find_all('span', 'runtime')]        
    for element in runTime:
        Runtime.append(element[0:2])


def save_csv(outfile, tvseries):
    """
    Output a CSV file containing highest rated TV-series.
    """
    # Merge and write the lists to CSV per line
    writer = csv.writer(outfile)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])
    for i in range(len(Title)):
        writer.writerow([Title[i], Rating[i], Genre[i], Actors[i], Runtime[i]])


def simple_get(url):
    """
    Attempts to get the content at `url` by making an HTTP GET request.
    If the content-type of response is some kind of HTML/XML, return the
    text content, otherwise return None
    """
    try:
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                return resp.content
            else:
                return None
    except RequestException as e:
        print('The following error occurred during HTTP GET request to {0} : {1}'.format(url, str(e)))
        return None


def is_good_response(resp):
    """
    Returns true if the response seems to be HTML, false otherwise
    """
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200
            and content_type is not None
            and content_type.find('html') > -1)


if __name__ == "__main__":

    # get HTML content at target URL
    html = simple_get(TARGET_URL)

    # save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # parse the HTML file into a DOM representation
    dom = BeautifulSoup(html, 'html.parser')

    # extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'w', newline='') as output_file:
        save_csv(output_file, tvseries)