// db

let sql; 
const sqlite3 = require('sqlite3').verbose(); 

// connecting to DB

const db = new sqlite3.Database('./database.db', sqlite3.open_READWRITE, (err)=>{
    if (err) {
        console.error(err.message); 
    } else {
    console.log('Connected to Sqlite DB')
}

});

module.exports = db; 