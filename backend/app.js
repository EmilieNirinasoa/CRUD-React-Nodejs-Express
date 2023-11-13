const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 3001;
const fs=require('fs').promises
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads',express.static("uploads"))

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
app.get('/items',(req, res) => {
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
//installation de nodemailer
 // Spécifiez le dossier de destination pour le téléchargement des fichiers
 // Remplacez cela par le module que vous utilisez pour la base de données

// app.post("/upload", upload.single('asset'), async (req, res) => {
//   try {
//     console.log("request file", req.file);
//     console.log("request body", req.body);
//     const fullName = req.body.fullname;
//     const fullNameS = req.body.fullnames;
//     console.log(fullName,fullNameS);

//     const renameFileFromTypeMime = async (file) => {
//       let ext = null;

//       switch (file.mimetype) {
//         case 'image/jpeg':
//           ext = '.jpg';
//           break;
//         case 'image/png':
//           ext = '.png';
//           break;
//         case 'application/pdf': // Correction : utiliser 'application/pdf' pour le type MIME des fichiers PDF
//           ext = '.pdf';
//           break;
//         default:
//           ext = "";
//           break;
//       }

//       const newFilename = `uploads/${req.file.filename}${ext}`;
//       await fs.rename(req.file.path, newFilename);

//       const name = req.file.filename;
//       console.log(newFilename);
//       // Utilisation d'une promesse pour gérer l'opération de base de données de manière asynchrone
//       return new Promise((resolve, reject) => {
//         db.query('INSERT INTO image(nom, path) VALUES (?,?)', [fullName, newFilename], (err, result) => {
//           if (err) {
//             console.error('Database query error:', err);
//             reject(err);
//           } else {
//             resolve(newFilename);
//           }
//         });
//       });

     
  
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error('Error sending email:', error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });
//     }

//     const asset = await renameFileFromTypeMime(req.file);

//     res.json({
//       fullName: req.body.fullname,
//       asset
//     });
//   } catch (error) {
//     console.error('Error during file upload:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });



app.post("/upload", upload.single('asset'), async (req, res) => {
  try {
    console.log("request file", req.file);
    console.log("request body", req.body);
    const fullName = req.body.fullname;
    const fullNameS = req.body.fullnames;
    console.log(fullName, fullNameS);

    const renameFileFromTypeMime = async (file) => {
      let ext = null;

      switch (file.mimetype) {
        case 'image/jpeg':
          ext = '.jpg';
          break;
        case 'image/png':
          ext = '.png';
          break;
        case 'application/pdf': // Correction : utiliser 'application/pdf' pour le type MIME des fichiers PDF
          ext = '.pdf';
          break;
        default:
          ext = "";
          break;
      }
      const newFilename = `uploads/${req.file.filename}${ext}`;
      await fs.rename(req.file.path, newFilename);

      // Utilisation d'une promesse pour gérer l'opération de base de données de manière asynchrone
      return new Promise((resolve, reject) => {
        db.query('INSERT INTO image(nom, path) VALUES (?,?)', [fullName, newFilename], (err, result) => {
          if (err) {
            console.error('Database query error:', err);
            reject(err);
          } else {
            const transporter = nodemailer.createTransport({
             service:"gmail",
              auth: {
                user: 'emilienirinasoa@gmail.com',
                pass: 'ixfo gwdv zqtq hzca',
              },
            });
      
            const mailOptions = {
              from: 'emilienirinasoa@gmail.com',
              to: 'fanomezanaemilienirinasoa@gmail.com',
              subject: 'New File Uploaded',
              text: `A new file has been uploaded.`,
            };
      
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Error sending email:', error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
            // Lorsque la base de données est mise à jour avec succès, résolvez la promesse
            resolve(newFilename);
          }
        });
      });
    }

    const asset = await renameFileFromTypeMime(req.file);

    // Envoyer l'email une fois que la promesse est résolue
   //npm install google-auth-library


    res.json({
      fullName: req.body.fullname,
      asset
    });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});



 
     




// Autres routes pour Create, Update, Delete...

