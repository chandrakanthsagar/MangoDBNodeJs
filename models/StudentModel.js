const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    adhar: String,
    name: String,
    fatherName: String,
    phoneNumber: String,
    emcetRank: String,
    address: String,
  });
const Student = mongoose.model('Studenttable', studentSchema);

module.exports = Student;
