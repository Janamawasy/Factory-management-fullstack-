const express = require('express');
const DepartmentsBLL = require('../BLL/departmentsBLL');

const router = express.Router();

// 'http://localhost:8000/departments' is the Entry Point

// Get All departments
router.route('/').get(async (req, res) => {
  try {
    const departments = await DepartmentsBLL.getAllDepartments();
    res.json(departments); // 200 - OK
  } catch (error) {
    console.error(error)
    res.json('There was an error!');
    // res(error.body)
  }
});

// Get department by ID
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const departments = await DepartmentsBLL.getDepartmentById(id);
  res.json(departments);
});

// Add a new department
router.route('/').post(async (req, res) => {
  const obj = req.body;
  const result = await DepartmentsBLL.addDepartment(obj);
  res.status(201).json(result);
});

// Update a department
router.route('/:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await DepartmentsBLL.updateDepartment(id, obj);
    res.json(result);
  } catch (error) {
    res.status(500).json('There was an error!');
  }
});

// Delete a department
router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const result = await DepartmentsBLL.deleteDepartment(id);
  res.json(result);
});

module.exports = router;