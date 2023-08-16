const mongoose = require('mongoose');


const depSchema = new mongoose.Schema(
  {
    name: String,
    manager: String,
    
  },
  { versionKey: false }
);

const department = mongoose.model('department', depSchema);


module.exports = department;