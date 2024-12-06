// read our merged json, create new simplified arabic section, import all to DB 


const fs = require('node:fs');
const pool = require('../../config/database');

// read json 
function readJSONF() {
    fs.readFile('../datasets/merged-words.json', 'utf8', (err, fileData) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        
        const jsonData = JSON.parse(fileData); 
        console.log("Successfully read JSON file");
        
        // Once we have the JSON data, import it
        importToDB(jsonData);
    });
}

// edit-create simple arabic section
function removeArabicDiacritics(text) {
    return text
        .replace(/[\u064B-\u065F\u06D6-\u06DE\u06DF-\u06E4\u06E6-\u06ED\u0615-\u061A\u0640\u0670]/g, '')
        .replace(/\u0671/g, '\u0627')
        .replace(/\u0622/g, '\u0627')
        .replace(/\s+/g, ' ')
        .trim();
}

// import to db 
function importToDB(jsonData) {
    Object.entries(jsonData).forEach(([number, word]) => {
        const query = `
            INSERT INTO quran_words 
            (word_number, arabic_text, arabic_text_simple, english_text)
            VALUES ($1, $2, $3, $4)
        `;
        
        const values = [
            parseInt(number),
            word.arabic,
            removeArabicDiacritics(word.arabic),
            word.english
        ];

        pool.query(query, values, (err) => {
            if (err) {
                console.error(`Error importing word ${number}:`, err);
                return;
            }
            console.log(`Imported word ${number}`);
        });
    });
}

readJSONF();