const express = require('express');
const jwt = require('jsonwebtoken');

const UsersData = require('../BLL/usersBLL')

const router = express.Router();

// Entry Point: 'http://localhost:8000/auth

router.route('/').post(async (req, res) => {
  console.log('req.body',req.body)
  //req.body is the username and email that written in the Login page inputs as request
  const { username, email } = req.body;

  // if 'username' and 'password' are exist in users WS
  // userExists returns all the data in usersWS about the user
  const users = await UsersData.getUsersData();
  console.log('users',users)
  const userExists = users.find((user)=>user.username === username && user.email===email)
  console.log('userExists',userExists)

  if (userExists) {
    const userId = userExists.userId // find user's ID
    const ACCESS_SECRET_TOKEN = 'someKey';

    const accessToken = jwt.sign(
      { id: userId ,
      name: userExists.name,
      username: userExists.username,
      email: userExists.email},
      ACCESS_SECRET_TOKEN
      // { expiresIn: 7200 } // expires after 7200s (2 hours)
    );
    res.json({ accessToken });
  }else{
    res.status(401).json('Wrong username or email!');; // Unauthorized

  }

});

module.exports = router;