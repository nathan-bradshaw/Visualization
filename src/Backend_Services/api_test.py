import requests
import json
import re

def pull_json():
    # Omeka Collection Details
    url = 'http://georgeeliotarchive.org/api'
    collection_id = '66'

    # Construct Request URL
    url = f'{url}/items?collection={collection_id}'

    # Make request
    response = requests.get(url)


    if response.status_code == 200:
        items = response.json() #collection items
        
        #Create new dictionary with desired format and items
        data = []
        for item in items:
            json_item = {}
            for element in item['element_texts']:
                json_item[element['element']['name']] = element['text'] 
            data.append(json_item)

            
        # Save the data to a JSON file
        with open('data.json', 'w') as file:
            json.dump(data, file, indent=4)
            
        print("Succeeded")
    else:
        print(f'Failed. Status code: {response.status_code}')
        
def test_relation():
    file = open('data.json')
    data = json.load(file)
    for i in data:
        if 'Relation' in i:
            if i['Title'] != i['Relation']:
                print(i['Relation'] + "\n" + i['Title'])

def test_subject():
    file = open('data.json')
    data = json.load(file)
    subjects = []
    for i in data:
        if 'Subject' in i and i['Subject'] not in subjects:
            subjects.append(i['Subject'])
    print(subjects)

def test_all(): #need to not include description
    file = open('data.json')
    data = json.load(file)
    dump = []
    for i in data:
        if 'Title' not in i or 'Subject' not in i or 'Description' not in i or 'Source' not in i:
            dump.append(i)
    print(dump)

# assign images
def assign_image(works):
    for title, work in works.items():
        if title == "Middlemarch":
            work['image'] = "middlemarch"
        elif title == "Adam Bede":
            work['image'] = "adambede"
        elif title == "Brother Jacob":
            work['image'] = "brotherjacob"
        elif title == "Daniel Deronda":
            work['image'] = "danielderonda"
        elif title == "Felix Holt, the Radical":
            work['image'] = "felixholt"
        elif title == "Impressions of Theophrastus Such":
            work['image'] = "impressions"
        elif title == "Janet's Repentance":
            work['image'] = "janetsrepentance"
        elif title == "Mr. Gilfil's Love Story, Scenes of Clerical Life":
            work['image'] = "mrgilfil"
        elif title == "Romola":
            work['image'] = "romola"
        elif title == "Silas Marner":
            work['image'] = "silasmarner"
        elif title == "The Lifted Veil":
            work['image'] = "liftedveil"
        elif title == "The Mill on the Floss":
            work['image'] = "themill"
        elif title == "The Sad Fortunes of the Reverend Amos Barton":
            work['image'] = "amosbarton"
        elif title == "The Spanish Gypsy":
            work['image'] = "spanishgypsy"
        elif title == "Agatha":
            work['image'] = "agatha"
        else:
            work['image'] = "eliot"




    
#we want an array of work items that contain two arrays of place items or character items that are a name and a description each
def organize_by_work():
    file = open('data.json')
    data = json.load(file)
    #compile list of works ***MIGHT WANT TO DELETE THIS SECTION FOR A FIXED LIST OF WORK TITLES INSTEAD
    works = ["Adam Bede","Brother Jacob", "Daniel Deronda","Felix Holt, the Radical", "Impressions of Theophrastus Such","Janet's Repentance", "Middlemarch", "Mr. Gilfil's Love Story, Scenes of Clerical Life","Romola", "Silas Marner", "The Lifted Veil", "The Mill on the Floss", "The Sad Fortunes of the Reverend Amos Barton", "The Spanish Gypsy"]
    dump = []
    final = {}
    #Need to check Mr. Gilfil's Love Story and all other ones 
    ''' for i in data: #iterate through each item in the data
        if 'Source' in i:
            source = i['Source']
            source = re.sub('<[^<]+?>', '', source) #remove <em> from some titles
            source = source.strip()
            if source.startswith("Multiple"):
                source = re.search('\(([^)]+)', source).group(1) 
                if "Felix Holt, the Radical" in source: #special case for titles that have a comma in them, need to update list or think of algorithm to do this automatically
                    source = source.replace("Felix Holt, the Radical","FHTR")
                sources = source.split(",")
                for s in sources:
                    s = s.strip()
                    if s == "FHTR":
                        s = "Felix Holt, the Radical"
                    if s not in works:
                        works.append(s)
            else:
                if source not in works:
                    works.append(source)
    '''
    #iterate again through each item, for each of its works, add it to the master json under it's correct place
    #organize by work, and then by either place or character or item
    for w in works:
        work = {
            "characters": [],
            "places": [],
            "misc": [],
            "image": []
        }
        final[w] = work
    for i in data:
        if 'Source' in i and 'Subject' in i and 'Title' in i:
            if 'Description' not in i:
                i['Description'] = "Description not found"
            for w in works:
                if w in i['Source']:
                    if i['Subject'] in ['Character Name','Pet Name','Real Name','Historical Name']: #characters
                        item = {
                            'name': i['Title'],
                            'desc': i['Description']
                        }
                        final[w]['characters'].append(item)
                    elif i['Subject'] in ['Place','Fictional Place','Real Place']: #places
                        item = {
                            'name': i['Title'],
                            'desc': i['Description']
                        } 
                        final[w]['places'].append(item)
                    else: #misc
                        item = {
                            'name': i['Title'],
                            'desc': i['Description']
                        }
                        final[w]['misc'].append(item)
            assign_image(final)
        else:
            dump.append(i)
    link_descriptions(final)
    #COULD CHANGE SCENES OF CLERICAL LIFE TITLES HERE 
    final['"Janet\'s Repentance" [<i>Scenes of Clerical Life</i>]'] = final.pop("Janet's Repentance")
    final['"The Sad Fortunes of the Reverend Amos Barton" [<i>Scenes of Clerical Life</i>]'] = final.pop("The Sad Fortunes of the Reverend Amos Barton")
    final['"Mr. Gilfil\'s Love Story" [<i>Scenes of Clerical Life</i>]'] = final.pop("Mr. Gilfil's Love Story, Scenes of Clerical Life")
    with open('final.json', 'w') as file:
        json.dump(final, file, indent=4)    

def link_descriptions(data):
    with open('work_desc.json', encoding='utf-8') as file:
        descs = json.load(file)
    for w in descs:
        data[w]['desc'] = descs[w]
    
pull_json() 
#test_relation()
#test_subject()
#test_all()
organize_by_work()
