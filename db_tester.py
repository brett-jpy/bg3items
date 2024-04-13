"""
This file's only purpose is to test DB results
"""
from pymongo import MongoClient
from bson.json_util import dumps

client = MongoClient("mongodb+srv://readOnly:pCdVewuGZCx85kkq@bg3-items.5g52rqm.mongodb.net/")
database = client["items"]
coll = database['items']


def distinct_vals():
    return coll.distinct("Type")


print(distinct_vals())
