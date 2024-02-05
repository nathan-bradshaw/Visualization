import pandas as pd
import json

def extract_json(csv_file_path, json_file_path):
    df = pd.read_csv(csv_file_path)
    print(df.columns)  # print column names
    df = df.fillna("  ")
    df["desc"] = df["Description"].replace("", "Desc not available")
    df["Title"] = df["Title"].str.strip() # strip white spaces
    df["Subject"] = df["Subject"].str.strip() # strip white spaces
    df["Relation"] = df["Relation"].str.strip() # strip white spaces
    df["Source"] = df["Source"].str.strip() # strip white spaces

    result = []
    for index, row in df.iterrows():
        if row["Title"] == row["Subject"]:
            work_dict = {"Title": row["Title"], "desc": row["desc"], "Data": {"Subject": row["Subject"]}}
            result.append(work_dict)
        elif row["Title"] == row["Relation"]:
            work_dict = {"Title": row["Title"], "desc": row["desc"], "Data": {"Relation": row["Relation"]}}
            result.append(work_dict)
        elif row["Title"] == row["Source"]:
            work_dict = {"Title": row["Title"], "desc": row["desc"], "Data": {"Source": row["Source"]}}
            result.append(work_dict)

    with open(json_file_path, "w") as f:
        json.dump(result, f)

extract_json('D:\GeorgeEliotProject\Encyclopedia_Scenes_Characters\src\Backend_Services\Ency.csv', 'D:\GeorgeEliotProject\Encyclopedia_Scenes_Characters\src\Backend_Services\Encyclo.json')
