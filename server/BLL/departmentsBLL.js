const Departments = require('../models/departmentsModel');

// GET - Get All - Read
const getAllDepartments = () => {
  return Departments.find({});
};

// GET - Get By ID - Read
const getDepartmentById = (id) => {
  return Departments.findById({ _id: id });
};

// Post - Create a new Department - Create
const addDepartment = async (obj) => {
  const per = new Departments(obj);
  await per.save();
  return 'Created!';
};

// PUT - Update a Department - Update
const updateDepartment = async (id, obj) => {
  await Departments.findByIdAndUpdate(id, obj);
  return 'Updated!';
};

// DELETE - Delete a Department - Delete
const deleteDepartment = async (id) => {
  await Departments.findByIdAndDelete(id);
  return 'Deleted!';
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};