app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find the user in the database
    const query = 'SELECT * FROM patients WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send('An error occurred while logging in.');
        }

        if (results.length === 0) {
            return res.status(401).send('Invalid email or password.');
        }

        const user = results[0];

        // Compare the hashed password
        if (bcrypt.compareSync(password, user.password_hash)) {
            res.send(`Welcome, ${user.first_name}!`); // Successful login
        } else {
            res.status(401).send('Invalid email or password.');
        }
    });
})