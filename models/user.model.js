
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    FirstName : String,
    SecondName :String,
    email:String,
    password :String,
});

const User = mongoose.model('Usertable',UserSchema);// creating table 

module.exports = User;