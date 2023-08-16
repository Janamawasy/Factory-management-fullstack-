const express = require('express');
const UsersBLL = require('../BLL/usersBLL');

const router = express.Router();

// 'http://localhost:8000/users' is the Entry Point

// Get All users
router.route('/').get(async (req, res) => {
  try {
    const users = await UsersBLL.getUsersData();
    res.json(users); // 200 - OK
  } catch (error) {
    console.error(error)
    res.json('There was an error!');
  }
});


module.exports = router;

// // Get user by ID
// router.route('/:id').get(async (req, res) => {
//   const { id } = req.params;
//   const users = await UsersBLL.getUserById(id);
//   res.json(users);
// });

// // Add a new user
// router.route('/').post(async (req, res) => {
//   const obj = req.body;
//   const result = await UsersBLL.addUser(obj);
//   res.status(201).json(result);
// });

// // Update a user
// router.route('/:id').put(async (req, res) => {
//   try {
//     const { id } = req.params;
//     const obj = req.body;
//     const result = await UsersBLL.updateUser(id, obj);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json('There was an error!');
//   }
// });

// // Delete a user
// router.route('/:id').delete(async (req, res) => {
//   const { id } = req.params;
//   const result = await UsersBLL.deleteUser(id);
//   res.json(result);
// });

