const express = require('express');
const mysql = require('mysql2/promise'); // Use promise-based version
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let db;

// Initialize database connection
const initializeDb = async () => {
    try {
        db = await mysql.createConnection({
            host: 'localhost',
            user: 'root', // Replace with your username
            password: '', // Replace with your password
            database: 'recipe_app',
        });
        console.log('Connected to the database.');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit the application if DB connection fails
    }
};

// Call to initialize database connection
initializeDb();

// Save a favorite recipe
app.post('/favorites', async (req, res) => {
    const { recipe_id, recipe_name, user_id } = req.body; // Include recipe_name

    if (!recipe_id || !recipe_name || !user_id) {
        return res.status(400).json({ error: 'Recipe ID, name, and user ID are required.' });
    }

    console.log("Received request to save favorite:", { recipe_id, recipe_name, user_id });

    try {
        // Check if recipe already exists in the recipes table
        const [recipe] = await db.query('SELECT * FROM recipes WHERE id = ?', [recipe_id]);

        if (recipe.length === 0) {
            // Insert the recipe if it doesn't exist (using correct column name `recipe_name`)
            await db.query('INSERT INTO recipes (id, recipe_name) VALUES (?, ?)', [recipe_id, recipe_name]);
            console.log(`Recipe ${recipe_name} added to recipes table.`);
        }

        // Insert into favorites
        await db.query('INSERT INTO favorites (recipe_id, user_id) VALUES (?, ?)', [recipe_id, user_id]);
        res.status(201).json({ message: 'Favorite saved successfully!' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Recipe is already in favorites.' });
        } else {
            console.error('Error saving favorite recipe:', error);
            res.status(500).json({ error: 'Failed to save favorite recipe.' });
        }
    }
});
app.post('/search', async (req, res) => {
    const { keyword } = req.body;

    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required.' });
    }

    try {
        await db.query('INSERT INTO searches (keyword) VALUES (?)', [keyword]);
        res.status(201).json({ message: 'Search term saved successfully!' });
    } catch (error) {
        console.error('Error saving search term:', error);
        res.status(500).json({ error: 'Failed to save search term.' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
