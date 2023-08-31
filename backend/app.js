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


// Route pour l'insertion (Create)
app.post('/items', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO items (nom) VALUES (?)', [name], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json({ id: result.insertId, name });
    }
  });
});








app.get('/items/:id', (req, res) => {
  const itemId = req.params.id;

  db.query('SELECT * FROM items WHERE id = ?', [itemId], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      res.json(results[0]); // Renvoie la première ligne trouvée
    }
  });
});

app.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const { name } = req.body;
  
  db.query('UPDATE items SET nom = ? WHERE id = ?', [name, itemId], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('Internal Server Error');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Item not found');
    } else {
      res.json({ id: itemId, name });
    }
  });
});

app.put('/items2/:id', (req, res) => {
  const itemId = req.params.id;
  const { name } = req.body;
  
  db.query('DELETE items  WHERE id = ?', [ itemId], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('Internal Server Error');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Item not found');
    } else {
      res.json({ id: itemId, name });
    }
  });
});

app.delete('/api/data/:id', (req, res) => {
  const idToDelete = req.params.id;

  const deleteQuery = 'DELETE FROM items WHERE id = ?';

  db.query(deleteQuery, [idToDelete], (err, result) => {
    if (err) {
      console.error('Error deleting item from database:', err);
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'élément de la base de données' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Élément supprimé avec succès' });
      } else {
        res.status(404).json({ message: 'Élément non trouvé' });
      }
    }
  });
});

 







// Autres routes pour Create, Update, Delete...

