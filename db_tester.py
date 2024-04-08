"""
This file's only purpose is to test DB results
"""
from pymongo import MongoClient
from bson.json_util import dumps

client = MongoClient("192.168.1.5:27017")
database = client['BG3']
coll = database['items']


def distinct_vals():
    return coll.distinct("Type")


print(distinct_vals())
"""
['Amulet', 'Battleaxe', 'Boots', 'Cloak', 'Clothing', 'Club', 'Dagger', 'Flail', 'Glaive', 'Gloves', 'Greataxe', 'Greatclub', 'Greatsword', 'Halberd', 'Hand Crossbow', 'Handaxe', 'Heavy Armour', 'Heavy Crossbow', 'Heavy Helmet', 'Helmet', 'Light Armour', 'Light Hammer', 'Light Helmet', 'Longbow', 'Longsword', 'Mace', 'Maul', 'Medium Armour', 'Medium Boots', 'Medium Gloves', 'Medium Helmet', 'Morningstar', 'Pike', 'Quarterstaff', 'Rapier', 'Ring', 'Scimitar', 'Shield', 'Shortbow', 'Shortsword', 'Sickle', 'Spear', 'Staff', 'Trident', 'War Pick', 'Warhammer']
"""