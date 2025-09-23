var mogoose = require('mongoose');

var userSchema = new mogoose.Schema({
    firstName: {type:String,required:true},
    lastName: {type:String,required:true},
    email: {type:String,unique:true,required:true},
    age: {type:Number},
    password: {type:String,required:true},
    gender: {type:String,
        validate:(value)=>{
            if(["male","female","other"].indexOf(value) === -1){
                throw new Error("Invalid gender type...");
            }
        }
    }
});
 
module.exports = mogoose.model('User', userSchema);


