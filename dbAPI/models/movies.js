
var mongoose = require('mongoose');  

var movieSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    cinemaName: String,
    category: String,
    start:{ type: Date, default: Date.now },
    end:{ type: Date, default: Date.now }
});  

var movieModel =  module.exports = mongoose.model('movie',movieSchema);  

module.exports.addMovie = (movie,cb)=>{  
    movie.save((err,data)=>{  
            if(err){  
                cb(err,null);  
            }else{  
                cb(null,data);  
            }  
    });  
}  

module.exports.getMovie = (cb)=>{  
    movieModel.find((err,data)=>{  
          if(err){  
              cb(err,null);  
          }else{
            // console.log(favSchema);
            cb(null,data);  
          }  
    });  
}  

module.exports.removeMovie = (id,cb)=>{  
    movieModel.deleteOne({'_id':id},(err,data)=>{  
            if(err){  
                cb(err,null);  
            }else{  
                cb(null,data);  
            }  
    });  
}  
