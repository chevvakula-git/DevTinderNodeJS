const jwt = require('jsonwebtoken');
const User = require('../model/User');

const userAuth = async function (req, res, next) {
  var token = req.cookies.token;
  const {_id} = await jwt.verify(token,"Tinder@123$321");
  const user = await User.findOne({_id:_id});
  if(!user){
   res.status(401).send('Unauthorized access..');
  }else{
    req.user = user;
    next();
  }
}

module.exports = {userAuth};