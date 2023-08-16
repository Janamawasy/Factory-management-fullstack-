const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    year: Number,
    departmentID:String
  },
  { versionKey: false }
);

const employee = mongoose.model('employee', employeeSchema);


module.exports = employee;