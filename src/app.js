var express = require('express');

const {adminAuth,userAuth} = require('./auth/auth');
 const User = require('./model/User');
const { connect } = require('./database/Database');
const { model } = require('mongoose');

var app = express();


connect().then(()=>{
  console.log("Database connected");
    app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
  }).catch((err)=>{
    console.log("Database not connected",err);
});

app.use(express.json());
app.use('/admin', adminAuth);
app.use('/user', userAuth);

app.post('/signup', async function (req, res) {
   var user = new User({
    firstName: "Chandra1" ,
    lastName: "Ch",
    email: "chandra1@gmail.com",
    skills:"no skills",
    age: 32,
    gender: "xyz"
   });
    await user.save().then((data)=>{
      console.log("Signup success",data);
      res.send('Data Saved Successfully...');
    }).catch((err)=>{
      res.send('Error occured while signup...');
      console.log("Error in signup",err);
    });
   
})

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

app.get('/user/createUser', function (req, res) {
  res.send('This is create User...');m 
});

app.use(function (error,req, res, next) {
  if(error){
    res.status(500).send('Something broke!');
  }
})