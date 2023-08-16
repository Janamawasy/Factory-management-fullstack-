const UsersDB = require('../models/usersModel');

// GET - Get All - Read
const getAllUsersDB = () => {
  return UsersDB.find({});
};

// GET - Get By ID - Read
const getUsersDBById = (id) => {
  return UsersDB.findById({ _id: id });
};

// Post - Create a new UsersDB - Create
const addUsersDB = async (obj) => {
  const per = new UsersDB(obj);
  await per.save();
  return 'Created!';
};

// PUT - Update a UsersDB - Update
const updateUsersDB = async (id, obj) => {
  await UsersDB.findByIdAndUpdate(id, obj);
  return 'Updated!';
};

// PUT - Update a UsersDB current action number => -1 - Update
const updateUsersDBPlusOne = async (id, obj) => {
    obj.CurrentActions = obj.CurrentActions + 1
    await UsersDB.findByIdAndUpdate(id, obj);
    return 'CurrentActions plus one Updated!';
  };

// DELETE - Delete a UsersDB - Delete
const deleteUsersDB = async (id) => {
  await UsersDB.findByIdAndDelete(id);
  return 'Deleted!';
};

module.exports = {
  getAllUsersDB,
  getUsersDBById,
  addUsersDB,
  updateUsersDB,
  deleteUsersDB,
  updateUsersDBPlusOne
};