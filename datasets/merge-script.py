import json

def merge_json_files(file_path_1, file_path_2, output_file):
    # Load 
    with open(file_path_1, 'r', encoding='utf-8') as arabic:
        arabic_json = json.load(arabic)
    
   
    with open(file_path_2, 'r', encoding='utf-8') as english:
        english_json = json.load(english)
    
    # Merge 
    merged_json = {
        key: {
            "arabic": arabic_json[key],
            "english": english_json[key]
        }
        for key in arabic_json
    }
    
    # Write merged to output 
    with open(output_file, 'w', encoding='utf-8') as output:
        json.dump(merged_json, output, ensure_ascii=False, indent=4)



arabic_words = "D:/quran-diacratic-search/datasets/arabic-word.json"
english_words = "D:/quran-diacratic-search/datasets/english-word.json"
merged_output = "D:/quran-diacratic-search/datasets/merged-words.json"


merge_json_files(arabic_words, english_words, merged_output)

print(f"Merged data written to '{merged_output}'")
