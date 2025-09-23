var express = require('express');

const {adminAuth,userAuth} = require('./auth/auth');
 const User = require('./model/User');
const { connect } = require('./database/Database');
const { model } = require('mongoose');
const becrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
var app = express();


connect().then(()=>{
  console.log("Database connected");
    app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
  }).catch((err)=>{
    console.log("Database not connected",err);
});
app.use(cookieParser());
app.use(express.json());
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use('/user', userAuth);

app.post('/signup', async function (req, res) {
   
   const hashPassword = await becrypt.hash(req.body.password,10);
   const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPassword,
    age: 32,
    gender: req.body.gender
   });
    await user.save().then((data)=>{
      console.log("Signup success",data);
      res.send(`Hellow ${data.firstName}.. You have Successfully sign up...`);
    }).catch((err)=>{
      res.send('Error occured while signup...');
      console.log("Error in signup",err);
    });
   
})

app.post('/login', async function(req, res) {
 try{
  const {email,password }= req.body;
  const userData = await User.findOne({email:email});
  if(!userData){
    res.status(401).send('Invalid email or password');
  }

  const comparePassword = await becrypt.compare(password,userData.password);
  if(comparePassword){
  const token = await jwt.sign({_id:userData._id},"Tinder@123$321");
  res.cookie('token',token);
  res.status(200).send(userData);
  }else{
    throw new Error('Invalid email or password');
  }
 }catch(err){
  res.status(500).send('Login is failed due to some error, '+err);
 }
});

app.get('/user/profile',userAuth, async function (req, res) {
  try{
  const user = req.user;
  console.log("User id from cookie",user);
  if(user){
    console.log("User id from cookie",user);
    res.send(user);
  }else{
    throw new Error('No user found...');
  }
  
  }catch(err){
    res.status(401).send('Unauthorized access, '+err);
  }
  

})

app.post('/sendConnectionRequest', userAuth, async function (req, res){
 try{
  const user = req.user;
  console.log("set connection request successfully");
  res.send(user.firstName + " sent connection request successfully");
 }catch(err){
  res.status(500).send('Error in sending connection request, '+err);
 }
  

});

app.patch('/user/updateProfile',async function (req, res) {
  const id = req.body.id;
  try{
   await User.findByIdAndUpdate(id, {firstName:"New Name1",gender:"abcd"},{runValidators:true});
   res.send('Profile is updated successfully');
  }catch(err){
    console.log("Error in updating profile",err);
    res.status(500).json({message:"Error in updating profile"});
    return;
  }

  
});

app.get('/admin/userData', async function (req, res) {

  //console.log(JSON.stringify(req.body));
 await User.find().then((data)=>{
    console.log("User data",data);
    res.status(200).json(data);
  }).catch((err)=>{
    console.log("Error in fetching user data",err);
    res.status(500).json({message:"Error in fetching user data"});
  });

  console.log("Hi Ra");
  //res.send('This is user Data...');
});


app.use(function (error,req, res, next) {
  if(error){
    res.status(500).send('Something broke!');
  }
})