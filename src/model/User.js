var mogoose = require('mongoose');

var userSchema = new mogoose.Schema({
    firstName: {type:String},
    lastName: {type:String},
    email: {type:String},
    age: {type:Number},
    gender: {type:String,
        validate:(value)=>{
            if(["male","female","other"].indexOf(value) === -1){
                throw new Error("Invalid gender type...");
            }
        }
    }
});
 
module.exports = mogoose.model('User', userSchema);


