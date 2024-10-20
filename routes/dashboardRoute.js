const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Import the database connection

// Route for dashboard
router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }

    const userId = req.session.user.id;

    // Query to get user bookings
    const bookingQuery = 'SELECT * FROM patients WHERE id = ?'; // Adjust to match your database schema
    db.query(bookingQuery, [userId], (err, bookings) => {
        if (err) {
            console.error('Error fetching patient:', err);
            return res.status(500).send('An error occurred while fetching bookings.');
        }

        res.render('dashboard', { user: req.session.user, bookings }); // Render dashboard with user data and bookings
    });
});

module.exports = router; // Export the router
