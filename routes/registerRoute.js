const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Import the database connection
const bcrypt = require('bcrypt'); // Ensure bcrypt is imported

router.post('/register', (req, res) => {
    const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;

    // Hash the password
    const password_hash = bcrypt.hashSync(password, 10); // Hash the password with bcrypt

    // Check if email already exists
    const checkEmailQuery = 'SELECT * FROM patients WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).send('An error occurred while checking email.');
        }

        // If the email already exists, send a response
        if (results.length > 0) {
            return res.status(400).send('Email already in use. Please use a different email address.');
        }

        // If the email does not exist, insert the new user
        const query = 'INSERT INTO patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [first_name, last_name, email, password_hash, phone, date_of_birth, gender, address], (err, results) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).send('An error occurred while registering.');
            }

            res.redirect('/login'); // Redirect to login page after successful registration
        });
    });
});

module.exports = router;