import re
import pdfplumber
import json
import os

# Define the patterns for headings, rows, and page numbers
heading_pattern = re.compile(r'^[A-Z][a-zA-Z\s,()\-]*$')
row_pattern = re.compile(r'^\d+\s+\d+\s+\d+\s+\d+\s+.+\s+[MF]\s+\S+\s+\S+\s+.+\s+\S+\s+\S+')
page_number_pattern = re.compile(r'^Page \d+ of \d+$')

# Define the path to the PDF and the output JSON file
pdf_path = '/home/avatar/opensource/ap-neet/data/MBBS MQ Phase 2 Collegewise Allotments.pdf'
summary_json_path = '/home/avatar/opensource/ap-neet/data/MBBS_CQ_Phase1_Summary-3.json'

# Read the text from the PDF
with pdfplumber.open(pdf_path) as pdf:
    text = ""
    for page in pdf.pages:
        text += page.extract_text() + "\n"

lines = text.split('\n')

# Initialize data structures
data = {}
current_heading = None

# Define lists of local areas, categories, and phases
local_areas = {"AU","SVU", "APNL", "NL", "OU", "OUAPNL"}
category_list = ["OC", "SC", "ST", "BC-A", "BC-B", "BC-C", "BC-D", "BC-E"]
phases = ["Phase1", "Phase2"]

# Parse the lines of text
for line in lines:
    line = line.strip()
    if page_number_pattern.match(line):
        continue  # Ignore lines that match the page number pattern
    elif heading_pattern.match(line):
        current_heading = line.strip()
        data[current_heading] = []
    elif row_pattern.match(line):
        columns = line.split()

        s_no, neet_rank, neet_roll_no, score = columns[:4]

        gender_index = None
        for i, col in enumerate(columns):
            if col in {"M", "F"}:
                if i < len(columns) - 1 and columns[i + 1] in category_list:
                    gender_index = i
                    break
                elif i > 0 and columns[i - 1] in category_list:
                    gender_index = i - 1
                    break

        name = ' '.join(columns[4:gender_index])

        if gender_index is not None:
            gender = columns[gender_index]
            category = columns[gender_index + 1] if gender_index + 1 < len(columns) else None
        else:
            gender = None
            category = None

        local_area_index = gender_index + 2 if gender_index is not None else 4
        local_area = None
        allotment_details = columns[local_area_index:-2]
        for area in local_areas:
            if area in allotment_details:
                local_area = area
                allotment_details.remove(area)
                break

        allotment_details = ''.join(allotment_details)
        phase = ' '.join(columns[-2:])

        full_row = {
            'S.No': s_no,
            'NEET RANK': neet_rank,
            'NEET Roll No': neet_roll_no,
            'Score': score,
            'Name of the Candidate': name,
            'Gender': gender,
            'Category': category,
            'Local_Area': local_area,
            'Allotment_Details': allotment_details,
            'Phase': phase
        }
        data[current_heading].append(full_row)

# Sort the candidates within each college by category
for college, candidates in data.items():
    data[college] = sorted(candidates, key=lambda x: category_list.index(x['Category']))

# Initialize the summary data structure
summary = {}

# Create the summary
for college, candidates in data.items():
    for candidate in candidates:
        category = candidate['Category']
        local_area = candidate['Local_Area']
        allotment_details = candidate['Allotment_Details']
        score = int(candidate['Score'])
        phase = candidate['Phase']
        
        triplet_key = (college, category, local_area, allotment_details)
        
        if triplet_key not in summary:
            if(phase == 'Phase1'):
                phase = 'Phase 1'
            else:
                phase = 'Phase 2'
            summary[triplet_key] = {
                'College': college,
                'Category': category,
                'Local_Area': local_area,
                'Allotment_Details': allotment_details,
                'Max_Score': score,
                'Min_Score': score,
                'Phase': phase,
            }
        else:
            summary[triplet_key]['Max_Score'] = max(summary[triplet_key]['Max_Score'], score)
            summary[triplet_key]['Min_Score'] = min(summary[triplet_key]['Min_Score'], score)

summary_list = list(summary.values())

# Read the existing JSON data if the file exists
if os.path.exists(summary_json_path):
    with open(summary_json_path, 'r', encoding='utf-8') as json_file:
        existing_data = json.load(json_file)
else:
    existing_data = []

# Append the new summary data to the existing data
existing_data.extend(summary_list)

# Write the combined data back to the JSON file
with open(summary_json_path, 'w', encoding='utf-8') as json_file:
    json.dump(existing_data, json_file, ensure_ascii=False, indent=4)

print(f"Summary data saved to {summary_json_path}")
