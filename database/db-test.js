const pool = require('./database');

//console.log('Environment Variables:', process.env);

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to the database:', res.rows[0]);
    } 
    pool.end(); 
});





// lsof -nP -iTCP:5432 | grep LISTEN


// psql -U postgres -d QuranWords


//roles

//psql -U postgres -c "\du"
