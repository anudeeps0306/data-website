from pymongo import MongoClient
import json

# Connect to MongoDB
client = MongoClient('mongodb+srv://anudeep0306:zCcoe2aL3bIjXDoE@college-data.q5rwhk0.mongodb.net/')
db = client['college_data']
collection = db['neet_results']

data = json.load(open('/home/avatar/opensource/ap-neet/output.json'))   

# Insert data into MongoDB
collection.insert_many(data)

print("Data inserted into MongoDB successfully!")