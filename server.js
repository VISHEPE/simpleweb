const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const appointmentRoutes = require('./routes/bookingRoute'); 

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));


// Serve static files from the 'public' directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
    res.send(path.join(__dirname,'public', 'index.html'));
  });
  
app.use('/', appointmentRoutes);

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
//port listening
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
