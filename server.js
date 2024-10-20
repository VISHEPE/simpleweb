const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const appointmentRoutes = require('./routes/bookingRoute'); 
const registerRoutes = require('./routes/registerRoute'); 
const loginRoutes = require('./routes/loginRoute');
const dashboardRoutes = require('./routes/dashboardRoute');
const session = require('express-session');


const app = express();
const port = 3000;

// Other requires and setup...

app.use(session({
    secret: 'your-secret-key', // Change this to a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));



// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));


// Serve static files from the 'public' directory

app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
    res.send(path.join(__dirname,'public', 'index.html'));
  });
  
app.use('/', appointmentRoutes);
app.use('/', dashboardRoutes);
app.use('/', loginRoutes);
app.use(registerRoutes);

// Route for the about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
  });

  app.get('/doctors', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'doctors.html'));
  });

  app.get('/booking', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'booking.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

  app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
  });

  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.ejs'));
});
//port listening
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
