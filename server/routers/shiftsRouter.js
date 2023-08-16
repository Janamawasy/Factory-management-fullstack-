const express = require('express');
const ShiftsBLL = require('../BLL/shiftsBLL');

const router = express.Router();

// 'http://localhost:8000/shifts' is the Entry Point

// Get All shifts
router.route('/').get(async (req, res) => {
  try {
    const shifts = await ShiftsBLL.getAllShifts();
    res.json(shifts); // 200 - OK
  } catch (error) {
    console.error(error)
    res.json('There was an error!');
    // res(error.body)
  }
});

// Get user by ID
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const shifts = await ShiftsBLL.getShiftById(id);
  res.json(shifts);
});

// Add a new user
router.route('/').post(async (req, res) => {
  const obj = req.body;
  const result = await ShiftsBLL.addShift(obj);
  res.status(201).json(result);
});

// Update a user
router.route('/:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await ShiftsBLL.updateShift(id, obj);
    res.json(result);
  } catch (error) {
    res.status(500).json('There was an error!');
  }
});

// Delete a user
router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const result = await ShiftsBLL.deleteShift(id);
  res.json(result);
});

module.exports = router;