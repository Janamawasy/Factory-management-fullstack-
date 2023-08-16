const Employees = require('../models/employeesModel');

// GET - Get All - Read
const getAllEmployees = () => {
  return Employees.find({});
};

// GET - Get By ID - Read
const getEmployeeById = (id) => {
  return Employees.findById({ _id: id });
};

// GET - Get By Department - Read
const getEmployeeByDepID = (DepId) => {
  // return Employees.findById({departmentID:DepId})
  return Employees.find({ departmentID: DepId });
};

// Post - Create a new Employee - Create
const addEmployee = async (obj) => {
  const per = new Employees(obj);
  await per.save();
  return 'Created!';
};

// PUT - Update a Employee - Update
const updateEmployee = async (id, obj) => {
  await Employees.findByIdAndUpdate(id, obj);
  return 'Updated!';
};

// DELETE - Delete a Employee - Delete
const deleteEmployee = async (id) => {
  await Employees.findByIdAndDelete(id);
  return 'Deleted!';
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeByDepID,
};