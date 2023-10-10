const Student = require('../models/StudentModel');


module.exports = {
  getAllStudents: async (req, res) => {
    try {
      const students = await Student.find();
      res.render('view', { students });// sending the students as argument 
    } catch (err) {
      console.error(err);
    }
  },
  deletestudent:async(req,res) => {

    try{
        await Student.findByIdAndDelete(req.params.id)
        res.sendStatus(200);
    }catch(err){
        res.status(500).send(err.message)
    }
  },
  // UpdateStudent:async(req,res) =>{
  //   try{
  //       await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });

  //         console.log("pppppppppp");
  //         res.redirect(303,'/add');
  //   } 
  //   catch(err){
  //       res.status(500).send(err.message);
  //   }
  // },

UpdateStudent : async (req, res) => {
  const { id } = req.params; // Assuming 'id' in this context refers to the Aadhar Number
  const { UpdateColumn, UpdateValue } = req.body;

  try {
    // Find the student by Aadhar Number and update the specified field using async/await
    const updatedStudent = await Student.findOneAndUpdate(
      { AdharNumber: id },
      { $set: { [UpdateColumn]: UpdateValue } },
      { new: true }
    );

    if (!updatedStudent) {
      res.status(404).send('Student not found');
    } else {
      res.status(200).json(updatedStudent);
    }
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).send('Error updating student');
  }


},

  

  addStudentForm: (req, res) => {
    res.render('insert');
  },

  addStudent: async (req, res) => {
    try {
        
      console.log("dddddddddddd");
      console.log(req.body);
      await Student.create(req.body);

      res.redirect('/add');
    } catch (err) {
      console.error(err);
    }
  },
};
