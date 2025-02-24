// Create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
let db;

// Connect to the database
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) {
    console.error('Could not connect to the database');
    return;
  }
  db = client.db('commentDB');
});

// Serve static files
app.use(express.static('public'));

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());

// Get comments
app.get('/comments', (req, res) => {
  db.collection('comments').find().toArray((err, result) => {
    if (err) {
      console.error('Error getting comments');
      res.sendStatus(500);
      return;
    }
    res.send(result);
  });
});

// Add a comment
app.post('/comments', (req, res) => {
  const name = req.body.name;
  const comment = req.body.comment;
  db.collection('comments').insertOne({ name: name, comment: comment }, (err, result) => {
    if (err) {
      console.error('Error inserting comment');
      res.sendStatus(500);
      return;
    }
    res.sendStatus(201);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started');
});