CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE NOT NULL, -- Google ID
    display_name VARCHAR(255),             -- Display Name
    profile_picture TEXT,                  -- Profile Picture URL
    provider VARCHAR(50),                  -- Which provider (Google, Apple, GitHub)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- When did they sign up


ALTER TABLE users ADD COLUMN email VARCHAR(255); -- add email 





CREATE TABLE quran_words (  
    id SERIAL PRIMARY KEY,
    word_number INTEGER UNIQUE NOT NULL,  -- the "1", "2", etc. from json 
    arabic_text TEXT NOT NULL,            -- original Arabic with diacritics
    arabic_text_simple TEXT NOT NULL,     -- Arabic without diacritics for flexible search (also extra markings)
    english_text TEXT NOT NULL            -- the word by word English translation (limited)
);