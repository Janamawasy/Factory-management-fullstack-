const Shifts = require('../models/shiftsModel');

// GET - Get All - Read
const getAllShifts = () => {
  return Shifts.find({});
};

// GET - Get By ID - Read
const getShiftById = (id) => {
  return Shifts.findById({ _id: id });
};

// Post - Create a new Shift - Create
const addShift = async (obj) => {
  const per = new Shifts(obj);
  await per.save();
  return 'Created!';
};

// PUT - Update a Shift - Update
const updateShift = async (id, obj) => {
  await Shifts.findByIdAndUpdate(id, obj);
  return 'Updated!';
};

// DELETE - Delete a Shift - Delete
const deleteShift = async (id) => {
  await Shifts.findByIdAndDelete(id);
  return 'Deleted!';
};

module.exports = {
  getAllShifts,
  getShiftById,
  addShift,
  updateShift,
  deleteShift,
};