// loginRoute.js
const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Import the database connection
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM patients WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error querying user:', err);
            return res.status(500).send('An error occurred during login.');
        }

        if (results.length > 0) {
            const user = results[0];
            if (bcrypt.compareSync(password, user.password_hash)) {
                // Successful login, store user info in session
                req.session.user = {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                };
                res.redirect('/dashboard'); // Redirect to dashboard after login
            } else {
                res.status(401).send('Incorrect password.');
            }
        } else {
            res.status(404).send('User not found.');
        }
    });
});


module.exports = router; // Export the router

