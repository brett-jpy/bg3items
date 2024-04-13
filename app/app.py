from flask import Flask, render_template, url_for, redirect, request, jsonify
import os
from pymongo import MongoClient
from bson.json_util import dumps

app = Flask(__name__)

client = MongoClient("mongodb+srv://readOnly:pCdVewuGZCx85kkq@bg3-items.5g52rqm.mongodb.net/")
database = client["items"]
coll = database['items']

terms = {"jewelry": ['Amulet', 'Ring'], "weapons": ['Battleaxe', 'Club', 'Dagger', 'Flail', 'Glaive', 'Greataxe', 'Greatclub', 'Greatsword', 'Halberd', 'Hand Crossbow', 'Handaxe',  'Heavy Crossbow', 'Light Hammer', 'Longbow', 'Longsword', 'Mace', 'Maul', 'Morningstar', 'Pike', 'Quarterstaff', 'Rapier', 'Scimitar', 'Shield', 'Shortbow', 'Shortsword', 'Sickle', 'Spear', 'Staff', 'Trident', 'War Pick', 'Warhammer'], "armour": ['Boots', 'Cloak', 'Clothing', 'Gloves', 'Heavy Armour', 'Heavy Helmet', 'Helmet', 'Light Armour', 'Light Helmet', 'Medium Armour', 'Medium Boots', 'Medium Gloves', 'Medium Helmet']}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/acts")
def acts():
    return render_template("acts.html")

@app.route("/rarity")
def rarity():
    return render_template("rarity.html")

############# 
# DATA ROUTES & FUNCTIONS
#############
def text_index(term):
    data = coll.find({"$text": {"$search": term}})
    return dumps(data)

@app.route("/items", methods=["GET", "POST"])
def search():
    act = request.args.get("act")
    rarity = request.args.get("rarity")
    item_type = request.args.get("type")

    item_type = terms[item_type.lower()]

    query = {"act": act, "Rarity": rarity, "Type": {"$in": item_type }}

    pull = coll.find(query) # item_type is used because type is Python definded term
    return jsonify(dumps(pull))

@app.route("/query", methods=["GET", "POST"])
def query():
    data = request.args.get("term")
    return jsonify(text_index(data))

if __name__=="__main__":
    app.run(debug=True)