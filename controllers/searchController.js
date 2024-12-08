const pool = require('../config/database'); 

function searchWords(req, res) {
    const searchWord = req.query.word; // gets search term from the query string
    const page = parseInt(req.query.page, 10) || 1; // default to page 1 if not provided 
    const limit = 100; // max results per page 
    const offset = (page - 1) * limit; // calculates where to start fetching results i.e page 2 starts at 100 or limiit 

    console.log('Search term received:', searchWord);

    // server side validation 
    if (!searchWord || searchWord == '') {
        console.log("Server: no valid word found");
        return res.status(400).json({
            success: false,
            message: 'Word not found'
        });
    }

    // ILIKE for case-insensitive & LIMIT pagination 
    let searchQuery = `
        SELECT 
            word_number,
            arabic_text,
            arabic_text_simple,
            english_text,
            COUNT(*) OVER() as total_count -- Total results (needed for pagination)
        FROM quran_words
        WHERE
            arabic_text LIKE $1
            OR arabic_text_simple ILIKE $1
            OR english_text ILIKE $1
        ORDER BY word_number
        LIMIT $2 OFFSET $3
    `;

    // SQL wildcard %% match any part i.e cat - ratification 
    const searchValue = `%${searchWord}%`;

    // runs SQL query
    pool.query(searchQuery, [searchValue, limit, offset], (error, results) => {
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        // Get total results from query 
        const totalResults = results.rows[0]?.total_count || 0;
        const totalPages = Math.ceil(totalResults / limit); // Calculate total pages

        // Responds with the data in json format 
        res.json({
            success: true,
            results: results.rows, // Array of results
            pagination: {
                totalResults,
                totalPages, 
                currentPage: page,
                limit
            }
        });
    });
}

module.exports = {
    searchWords
};