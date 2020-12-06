db = db.getSiblingDB("data");
db.cinema.drop();

db.cinema.save( {
    title : "Ellinis" , 
    owner : "bob" ,
    tags : [ "fun" , "good" , "clean" ] ,
    comments : [ 
        { author :"joe" , text : "this is cool" } , 
        { author :"sam" , text : "this is bad" } 
    ],
    other : { foo : 5 }
});
db.cinema.save( {
    title : "Odeon" , 
    owner : "boliak" ,
    tags : [ "fun" , "good" , "clean", "awesome" ] ,
    comments : [ 
        { author :"nik" , text : "this is cool" } , 
        { author :"pik" , text : "this is bad" } 
    ],
    other : { foo : 5 }
});
db.cinema.save( {
    title : "MyPlace" , 
    owner : "bob" ,
    tags : [ "fun" , "good" , "dirty" ] ,
    comments : [ 
        { author :"mar" , text : "this is cool" } , 
        { author :"nar" , text : "this is bad" } 
    ],
    other : { foo : 5 }
});