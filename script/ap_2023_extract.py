import re
import pdfplumber
import json

# Define regex patterns for headings, rows, and page numbers
heading_pattern = re.compile(r'^[A-Z][a-zA-Z\s,]*$')  # Adjust this regex based on your heading format
row_pattern = re.compile(r'^\d+\s+\d+\s+\d+\s+\d+\s+.+\s+[MF]\s+\S+\s+\S+\s+.+\s+\S+\s+\S+')
page_number_pattern = re.compile(r'^Page \d+ of \d+$')

# Open the PDF file
pdf_path = '/home/avatar/opensource/ap-neet/data/MBBS CQ Phase1 Collegewise Allotments.pdf'
with pdfplumber.open(pdf_path) as pdf:
    text = ""
    for page in pdf.pages:
        text += page.extract_text() + "\n"

# Split the text into lines
lines = text.split('\n')

# Initialize variables to store structured data
data = {}
current_heading = None

# Define local area and phase options
local_areas = ["AU", "APNL", "SVU", "NL", "OU", "OUAPNL"]
phases = ["Phase 1", "Phase 2", "Phase 3"]

# Iterate through lines to identify headings, rows, and filter out page numbers
for line in lines:
    line = line.strip()
    if page_number_pattern.match(line):
        continue  # Ignore lines that match the page number pattern
    elif heading_pattern.match(line):
        current_heading = line.strip()
        data[current_heading] = []
    elif row_pattern.match(line):
        columns = line.split()
        
        # Ensure the number of columns matches the expected count
        s_no = columns[0]
        neet_rank = columns[1]
        neet_roll_no = columns[2]
        score = columns[3]

        # Find the gender index, as it can be used as a marker
        gender_index = None
        for i, col in enumerate(columns):
            if col in ["M", "F"]:
                gender_index = i
                break
        
        name = ' '.join(columns[4:gender_index])
        gender = columns[gender_index]
        category = columns[gender_index + 1]

        # Find the local area
        local_area_index = gender_index + 2
        local_area = None
        for area in local_areas:
            if columns[local_area_index] == area:
                local_area = area
                break

        # Extract allotment details and phase
        allotment_details = columns[local_area_index + 1]
        phase = columns[local_area_index + 2]

        # Create a row with the heading
        full_row = {
            'S.No': s_no,
            'NEET RANK': neet_rank,
            'NEET Roll No': neet_roll_no,
            'Score': score,
            'Name of the Candidate': name,
            'Gender': gender,
            'Category': category,
            'Local Area': local_area,
            'Allotment Details': allotment_details,
            'Phase': phase
        }
        data[current_heading].append(full_row)

# Save the data to a JSON file
json_path = '/home/avatar/opensource/ap-neet/data/MBBS_CQ_Phase1_Collegewise_Allotments.json'
with open(json_path, 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)

print(f"Data saved to {json_path}")



