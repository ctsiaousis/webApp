
var mongoose = require('mongoose');  

var cinemaSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: String
});  

var cinemaModel =  module.exports = mongoose.model('cinema',cinemaSchema);  

module.exports.addCinema = (cinema,cb)=>{  
    cinema.save((err,data)=>{  
            if(err){  
                cb(err,null);  
            }else{  
                cb(null,data);  
            }  
    });  
}  

module.exports.getCinema = (cb)=>{  
    cinemaModel.find((err,data)=>{  
          if(err){  
              cb(err,null);  
          }else{
            // console.log(favSchema);
            cb(null,data);  
          }  
    });  
}  

module.exports.removeCinema = (id,cb)=>{  
    cinemaModel.deleteOne({'_id':id},(err,data)=>{  
            if(err){  
                cb(err,null);  
            }else{  
                cb(null,data);  
            }  
    });  
}  
