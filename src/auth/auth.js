const adminAuth = function (req, res, next) {
  var token = "xyz"
  if(token !== "xyz"){
  res.status(401).send('Unauthorized access');
  }else{
    console.log('Authorized access');
    next();
  }
}

const userAuth = function (req, res, next) {
  var token = "xyz"
  if(token !== "xyz"){
  res.status(401).send('Unauthorized access');
  }else{
    console.log('Authorized access');
    next();
  }
}

module.exports = {adminAuth, userAuth};