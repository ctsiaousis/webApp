
var mongoose = require('mongoose');  

var favSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'movie' },
});  

var favModel =  module.exports = mongoose.model('favourite',favSchema);  

module.exports.addFavourite = (favourite,cb)=>{  
    favourite.save((err,favData)=>{  
            if(err){  
                cb(err,null);  
            }else{  
                cb(null,favData);  
            }  
    });  
}  

module.exports.getFavourite = (cb)=>{  
    favModel.find((err,favData)=>{  
          if(err){  
              cb(err,null);  
          }else{
            // console.log(favSchema);
            cb(null,favData);  
          }  
    });  
}  

module.exports.removeFavourite = (id,cb)=>{  
    favModel.deleteOne({'_id':id},(err,favData)=>{  
            if(err){  
                cb(err,null);  
            }else{  
                cb(null,favData);  
            }  
    });  
}  
