app.post('/register', (req, res) => {
    const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;
    
    // Hash the password
    const password_hash = bcrypt.hashSync(password, 10); // Hash the password with bcrypt

    // Insert user into the database
    const query = 'INSERT INTO patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [first_name, last_name, email, password_hash, phone, date_of_birth, gender, address], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).send('An error occurred while registering.');
        }

        res.redirect('/login'); // Redirect to login page after successful registration
    });
});
