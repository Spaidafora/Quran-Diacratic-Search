


const User = {
    // Find a user by Google ID
    findByGoogleId: async (googleId) => {
        const query = 'SELECT * FROM users WHERE google_id = $1';
        const values = [googleId];
        const result = await pool.query(query, values);
        return result.rows[0]; // Return the user object if found
    },

    // Create a new user
    create: async (googleId, displayName, profilePicture, provider, email) => {
        const query = `
            INSERT INTO users (google_id, display_name, profile_picture, provider, email)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [googleId, displayName, profilePicture, provider, email];
        const result = await pool.query(query, values);
        return result.rows[0]; // Return the newly created user
    },
};

module.exports = User;
