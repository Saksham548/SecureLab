const express = require("express");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const cors = require("cors");
const app = express();
const rateLimit = require('express-rate-limit');

app.use(cors());
app.use(express.json());

// Insecure MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "saksham548",
  database: "vulnerable_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

// Vulnerable login route with SQL injection (intentionally insecure)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  console.log('Executing query:', query);

  db.query(query, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Database error');
    }
    if (result.length > 0) {

      res.json({ message: 'Login successful', userId: result[0].id });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

  

// Cross-Site Scripting (XSS) vulnerability
app.post('/comment', (req, res) => {
    const { comment } = req.body;
    const query = `INSERT INTO comments (text) VALUES (${mysql.escape(comment)})`; // this line fixes the syntax error
    console.log("Executing query:", query);
    db.query(query, (err) => {
      if (err) return res.status(500).send('DB Error: ' + err.sqlMessage);
      res.send('Comment saved');
    });
  });
  
  app.get('/latest-comment', (req, res) => {
    const query = `SELECT text FROM comments ORDER BY id DESC LIMIT 1`;
    db.query(query, (err, result) => {
      if (err || result.length === 0) {
        console.error('Comment fetch error:', err);
        return res.status(500).send({ text: 'No comment found' });
      }
      res.send(result[0]);
    });
  });
  
  app.get('/profile/:userId', (req, res) => {
    const { userId } = req.params;  // Get userId from URL
  
    // Ensure that the userId is valid
    console.log(`Fetching profile for userId: ${userId}`);
    
    const query = `SELECT * FROM users WHERE id = ${mysql.escape(userId)}`;
    
    db.query(query, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Database error');
      }
  
      if (result.length === 0) {
        console.log('User not found');
        return res.status(404).send('User not found');
      }
  
      console.log('User data:', result[0]);
      res.json(result[0]);  // Send back user data
    });
  });
  

// Route for user signup
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send({ message: 'Error hashing password' });
    }

    // Insert user into the database
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).send({ message: 'Error saving user to database' });
      }
      res.status(200).send({ message: 'User created successfully' });
    });
  });
});


// Secure route to post a sanitized comment
app.post('/secure-comment', (req, res) => {
  const { comment } = req.body;

  // Basic sanitization example to prevent XSS
  const sanitizedComment = comment.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const query = 'INSERT INTO secure_comments (text) VALUES (?)';
  db.query(query, [sanitizedComment], (err) => {
    if (err) {
      console.error('Error saving sanitized comment:', err);
      return res.status(500).send('Error saving sanitized comment');
    }
    res.send('Sanitized comment saved');
  });
});

// Route to fetch secure comments
app.get('/secure-comments', (req, res) => {
  db.query('SELECT * FROM secure_comments', (err, result) => {
    if (err) {
      console.error('Error fetching secure comments:', err);
      return res.status(500).send('Error fetching secure comments');
    }
    res.json(result);
  });
});



// Define the rate limiter for login
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429
});

app.post('/secure-login', loginLimiter, (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, result) => {
    if (err) return res.status(500).send('Database error');
    if (result.length > 0) {
      res.send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});


  

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
