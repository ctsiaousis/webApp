const express = require('express');
const app = express();
const session = require('express-session');
app.use(express.static(__dirname + '/public'));
app.use(session({ 
    secret: 'mySecretCombination', 
    cookie: { maxAge: 60000 }
}))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const appid = process.env.APPID || 1111;
const pepID=process.env.PEP_PROXY_APP_ID;
const pepSEC=process.env.PEP_PROXY_APP_SECRET;
const keyrockIP=process.env.KEYROCK_IP;
const wilmaIP=process.env.WILMA_IP;

const login = require("./modules/login.js");

// ---------------------- API HANDLERS ----------------------

app.post('/api/login', function(req, res) {
    // sess = req.session;
    req.session.email = req.body.email;
    login.login(req,res,req.session);
    console.log('API/LOGIN -- END')
});

app.get('/api/session',function(req,res){
    if(req.session && req.session["OAUTH2"]){
        res.status(200).send(req.session);
    }
    else{
        res.send('noUser');
    }
});

// ---------------------- PAGE HANDLERS ----------------------
app.get('/welcome', function(req, res) {
    console.log(req.session);
    if(req.session["OAUTH2"] != null){
        res.sendFile('./public/welcome.html', {root: __dirname })
    }else{
        res.redirect("/");
    }
});
app.get('/owner', function(req, res) {
    console.log(req.session);
    if(req.session["OAUTH2"] != null){
        res.sendFile('./public/owner.html', {root: __dirname })
    }else{
        res.redirect("/");
    }
});
app.get('/favourites', function(req, res) {
    console.log(req.session);
    if(req.session["OAUTH2"] != null){
        res.sendFile('./public/favourites.html', {root: __dirname })
    }else{
        res.redirect("/");
    }
});
app.get('/movies', function(req, res) {
    console.log(req.session);
    if(req.session["OAUTH2"] != null){
        res.sendFile('./public/movies.html', {root: __dirname })
    }else{
        res.redirect("/");
    }
});

app.get('/logout', function(req,res){
    req.session.destroy(function(err) {
        // cannot access session here
        console.log(err);
    });
    res.redirect("/");
});
  

app.get('/', function(req, res) {
    res.sendFile('./public/index.html', {root: __dirname })
});

app.get("/test", (req, res, _next) => {
    res.send(req.session);
    }
);

app.listen(appid, ()=>console.log(`${appid} is listening on ${appid}`))
