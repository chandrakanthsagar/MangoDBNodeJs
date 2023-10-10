
const bodyParser = require('body-parser');
const express = require('express');//
const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');
const dburl = 'mongodb://127.0.0.1:27017/nani'//database name 
const Studentcontroller = require('./controllers/Studentcontroller');
const usercontroller = require('./controllers/usercontroller');

mangoose.connect(dburl,{ useNewUrlParser: true, useUnifiedTopology: true })// connection established ;
const db = mongoose.connection;
db.on('error', (err) => {// connections established between the mangodb and server node js 
    console.error('MongoDB connection error:', err);
  });
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
// connections established 


const app = express();
app.set('view engine','ejs');// allowing view in application 
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.render('index.ejs');
});
app.get('/start',(req,res)=>{
  res.render('views.ejs');
})
app.get('/update',(req,res)=>{
  res.render('update.ejs');
})
app.get('/register',(req,res)=>{
  res.render('signup.ejs');
})
app.get('/signin',(req,res)=>{
  res.render('login.ejs')
})
app.delete('/student/:id',Studentcontroller.deletestudent);
app.put('/student/:id',Studentcontroller.UpdateStudent);
app.get('/student',Studentcontroller.getAllStudents);
app.get('/add',Studentcontroller.addStudentForm);
app.post('/add',Studentcontroller.addStudent);
app.put('/update', Studentcontroller.UpdateStudent);

app.post('/users/register',usercontroller.registerUser);
app.post('/users/signin',usercontroller.signInUser);

app.listen(8000,()=>{
    console.log("server is running");
})