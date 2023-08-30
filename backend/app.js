const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'essai',
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});

// Exemple de route pour la lecture (Read)
app.get('/items', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// Autres routes pour Create, Update, Delete...
