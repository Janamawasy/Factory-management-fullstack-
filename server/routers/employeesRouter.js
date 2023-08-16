const express = require('express');
const EmployeesBLL = require('../BLL/employeesBLL');

const router = express.Router();

// 'http://localhost:8000/employees' is the Entry Point

// Get All employees
router.route('/').get(async (req, res) => {
  try {
    const employees = await EmployeesBLL.getAllEmployees();
    res.json(employees); // 200 - OK
  } catch (error) {
    console.error(error)
    res.json('There was an error!');
    // res(error.body)
  }
});

// Get employee by ID
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const employees = await EmployeesBLL.getEmployeeById(id);
  res.json(employees);
});

// Get employees by DepID
router.route('/Dep/:DepId').get(async (req, res) => {
  const { DepId } = req.params;
  console.log('DepId',DepId)
  const employees = await EmployeesBLL.getEmployeeByDepID(DepId);
  res.json(employees);
});

// Add a new employee
router.route('/').post(async (req, res) => {
  const obj = req.body;
  const result = await EmployeesBLL.addEmployee(obj);
  res.status(201).json(result);
});

// Update a employee
router.route('/:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await EmployeesBLL.updateEmployee(id, obj);
    res.json(result);
  } catch (error) {
    res.status(500).json('There was an error!');
  }
});

// Delete a employee
router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const result = await EmployeesBLL.deleteEmployee(id);
  res.json(result);
});

module.exports = router;