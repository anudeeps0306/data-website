import pandas as pd
import json

file_path = "/home/avatar/opensource/ap-neet/college-table/public/ka-phase-1.js"

with open(file_path, 'r') as file:
    content = file.readlines()

json_content = content[1:-1]
json_str = ''.join(json_content)

data = json.loads(f'[{json_str}]')

df = pd.DataFrame(data)

unique_colleges = df['Name of the Medical College Allotted.'].unique()
unique_categories = df['Allotted Category'].unique()

print("Unique Colleges:", unique_colleges)
print("Unique Categories:", unique_categories)
