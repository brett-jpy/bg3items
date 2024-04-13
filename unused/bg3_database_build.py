import csv
import os
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

# Global Definitions
client = MongoClient("192.168.1.5:27017")
database = client['BG3']
coll = database['items']

root = r"C:\Users\Brett\Sync\projects\bg3-item-app\unused\csvs"

# Image Scraper from Wiki
def item_image(item, site):
    response = requests.get(site)
    soup = BeautifulSoup(response.text, 'html.parser')

    try:
        img = soup.find("img", alt="{} image".format(item))
        return "https://bg3.wiki{}".format(img["src"])
    except:
        return None

for f in os.listdir(root):

    act = f.split(" - ")[1]

    with open(os.path.join(root, f), 'r', encoding="utf8") as csvfile:
        data = {}
        reader = csv.DictReader(csvfile)

        # Skip the header row if it exists (assuming the first row contains column names)
        next(reader, None)
        
        tmp = []

        for row in reader:
            row["act"] = act.split(".")[0].capitalize() 
            row["wiki_link"] = "https://bg3.wiki/wiki/{}".format(row['Name'].replace(" ", "_"))   

            row["img_link"] = item_image(row['Name'], row['wiki_link'])
        
            tmp.append(row)

        data["items"] = tmp

        for d in data['items']:
            coll.insert_one(d)
        csvfile.close()



    