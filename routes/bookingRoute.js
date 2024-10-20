const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Import the database connection
const path = require('path'); // Add this line

// Route for the book appointment page


// Route to handle the booking form submission
router.post('/book-session', (req, res) => {
    const { userName, email, doctor, date, time, notes } = req.body;

    // Insert data into the database
    const query = 'INSERT INTO bookings (userName, email, doctor, date, time, notes) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [userName, email, doctor, date, time, notes], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('An error occurred while booking your session.');
        }

        // Send a success response to the user
        res.redirect('/booking-success');
    });
});

router.get('/booking-success', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'booking-success.html'));
});
module.exports = router; // Export the router
