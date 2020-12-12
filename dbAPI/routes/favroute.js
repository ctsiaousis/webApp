var express    = require('express');  
var favModel  = require('../models/favourites');  

var router = express.Router();  

router.get('/home',(req,res)=>{  
 res.render('demo');  
});  


router.post('/addfav',(req,res)=>{
    // favModel.collection.drop();
    // favModel.collection.remove();
          var taskk = new favModel({
                userID:req.body.userID,
                title:req.body.title,
                cinemaName:req.body.cinemaName,
                category:req.body.tacategorysk
          });
          var fav = new favModel({});
          console.log(req.body.userID);
          fav.userID = req.body.userID;

          console.log(req.body.title);
          fav.title  = req.body.title;

          console.log(req.body.cinemaName);
          fav.cinemaName = req.body.cinemaName;

          console.log(req.body.category);
          fav  = req.body.category;
          favModel.addFavourite (fav,(err,favData)=>{  
              if(err){  
                  res.json({msg:'error'});  
              }else{  
                  res.json({msg:'success'});  
              }  
          });  
});  

router.get('/getfav',(req,res)=>{  
    favModel.getFavourite ((err,favData)=>{  
          if(err){  
              res.json({msg:'error'});  
          }else{  
              res.json({msg:'success',data:favData});  
          }  
  });  
});  

router.delete('/removefav',(req,res)=>{  
    favModel.removeFavourite (req.body.id,(err,favData)=>{  
            if(err){  
                res.json({msg:'error'});  
            }else{  
                res.json({msg:'success'});  
            }  
      });  
});  

module.exports = router;  