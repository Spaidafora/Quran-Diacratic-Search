const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // gpt troubleshoot  path issue  
const { Pool } = require('pg');

console.log('Environment variables loaded - creating pool with config:', {
Database: process.env.DB_DATABASE,
User: process.env.DB_USER,
Host: process.env.DB_HOST,
Port: process.env.DB_PORT
});




const pool = new Pool({ 
    user: process.env.DB_USER || 'postgres',      // from .env  file 
    host: process.env.DB_HOST || 'localhost',       
    database: process.env.DB_DATABASE || 'QuranWords',
    password: process.env.DB_PASSWORD || 'admin', 
    port: process.env.DB_PORT || 5432,    
});

//test 
pool.query('SELECT NOW()', (err, res) => {
    if(err){
        console.error('Database connection error: ', err);
        console.log('Attempted connection with', {
            database: process.env.DB_DATABASE || 'QuranWords',
            user: process.env.DB_USER || 'postgres'
        });
    } else {
        console.log('Successfully connected to correct DB')
    }
});
module.exports = pool; 

// npm i --save dotenv to fix dotenv issue 