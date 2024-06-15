import pandas as pd
import json
import os

def read_excel_to_json(excel_path):
    # Read the Excel file
    df = pd.read_excel(excel_path)
    
    # Convert DataFrame to JSON format
    data = df.to_dict(orient='records')
    
    return data

def save_data_to_json(data, json_path):
    with open(json_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)

def main():
    excel_path = '/home/avatar/opensource/ap-neet/data/RC8_MOPUP_UGALLOT_2023kannada.xlsx'
    output_folder = 'output_data'
    json_path = os.path.join(output_folder, 'allotment_data.json')

    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # Read Excel and convert to JSON
    allotment_data = read_excel_to_json(excel_path)

    # Save JSON to file
    save_data_to_json(allotment_data, json_path)

if __name__ == "__main__":
    main()
