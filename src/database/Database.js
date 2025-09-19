const mongoose = require('mongoose');

  const connect = async ()=>{
   await  mongoose.connect('mongodb+srv://namastedev:Bod5LqUkWMmUqLzO@namastedev.7dafhap.mongodb.net/devTinder');
  }

module.exports = {connect};