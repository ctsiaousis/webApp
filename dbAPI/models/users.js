
var mongoose = require('mongoose');  

var userSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    userID: String,
    userName: String,
    email: String,
    role: String
});  

var userModel =  module.exports = mongoose.model('user',userSchema);  

module.exports.addUser = (user,cb)=>{  
    user.save((err,data)=>{  
            if(err){  
                cb(err,null);  
            }else{  
                cb(null,data);  
            }  
    });  
}  

module.exports.getUser = (cb)=>{  
    userModel.find((err,data)=>{  
          if(err){  
              cb(err,null);  
          }else{
            // console.log(favSchema);
            cb(null,data);  
          }  
    });  
}  

module.exports.removeUser = (id,cb)=>{  
    userModel.deleteOne({'_id':id},(err,data)=>{  
            if(err){  
                cb(err,null);  
            }else{  
                cb(null,data);  
            }  
    });  
}  
