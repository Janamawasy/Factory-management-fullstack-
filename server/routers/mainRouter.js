
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Entry Point: 'http://localhost:8000/main

router.route('/').get((req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(401).json('No Token Provided!');
  }

  const ACCESS_SECRET_TOKEN = 'someKey';

  jwt.verify(token, ACCESS_SECRET_TOKEN, (err, data) => {
    if (err) {
      res.status(500).json('Failed to authenticate token');
    }
    console.log(data);
    // Get data from DB and send to the user
    res.json(data);
  });
});

module.exports = router;