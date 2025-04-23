// Vulnerable Node.js + Express backend
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Insecure MySQL connection (No env variables, default credentials)
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

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    console.log('Executing query:', query); // Add this line for debugging
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('DB Error:', err); // Log the error details
        return res.status(500).send('Database error');
      }
      if (result.length > 0) {
        res.send('Login successful');
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
  
  
  

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
