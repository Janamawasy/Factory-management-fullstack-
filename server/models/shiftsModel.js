const mongoose = require('mongoose');


const shiftSchema = new mongoose.Schema(
  {
    date: Date,
    startH: Number,
    endH: Number,
    EmpInShift: [
      {
        type: String,
      },
    ],   
  },
  { versionKey: false }
);

const shift = mongoose.model('shift', shiftSchema);


module.exports = shift;