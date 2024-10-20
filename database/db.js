const mysql = require('mysql2');

// Create a MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',    // Your MySQL username
    password: '12345678', // Your MySQL password
    database: 'node_crud'   // Your database name
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = db;
