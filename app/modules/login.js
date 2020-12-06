var express = require('express');
var app = express();
var httpReq = require('request');
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const appID=process.env.PEP_PROXY_APP_ID;
const appSEC=process.env.PEP_PROXY_APP_SECRET;
const keyrockIP=process.env.KEYROCK_IP;

//for returning the body of request
function promiseRequestBody(options) {
    return new Promise((resolve, reject) => {
        httpReq(options, (error, response, body) => {
            if (error) reject(error);
            if (response.statusCode < 200 && response.statusCode > 299) {
                reject('Invalid status code <' + response.statusCode + '>');
            }
            resolve(body);
        });
    });
}
//for returning the header of request
function promiseRequestHeaders(options) {
    return new Promise((resolve, reject) => {
        httpReq(options, (error, response, _body) => {
            if (error) reject(error);
            if (response.statusCode < 200 && response.statusCode > 299) {
                reject('Invalid status code <' + response.statusCode + '>');
            }
            resolve(response.headers);
        });
    });
}

async function getOAuthToken(options, req, session) {
    try {
        const body = await promiseRequestBody(options)
        console.log('SHOULD WORK:');
        console.log(body);
        var jsonBody = JSON.parse(body);
        //take access token from req's body
        console.log(jsonBody.access_token);
        //add it to session
        session.OAUTH2 = jsonBody.access_token;
        populateUserID(req,session);
        // req.send(body);
    } catch (error) {
        console.error('ERROR:');
        console.error(error);
        //return with error code
        req.status(400).send({});
    }
}
async function getAPIToken(options, req, session) {
    try {
        const headers = await promiseRequestHeaders(options)
        console.log('SHOULD WORK:');
        console.log(headers);
        //take x-auth-token from header
        console.log(headers['x-subject-token']);
        //and add it to session
        session.XTOKEN = headers['x-subject-token'];
        // req.send(headers);
    } catch (error) {
        console.error('ERROR:');
        console.error(error);
        //return with error code
        req.status(400).send({});
    }
}
async function getUserID(options, req, session) {
    try {
        const body = await promiseRequestBody(options)
        console.log('SHOULD WORK:');
        var jsonBody = JSON.parse(body);
        //take info from req's body
        console.log('---------getUserID::jsonBody :');
        console.log(jsonBody);
        //add it to session
        session.userID = jsonBody.id;
        session.userName = jsonBody.username;
        console.log('---------getUserID::session :');
        console.log(session);
        req.send(session);
    } catch (error) {
        console.error('ERROR:');
        console.error(error);
        req.status(400).send({});
    }
}


function populateUserID(req,session){
    //get UserId
    var options = {
        uri: "http://"+keyrockIP+":3005/user?access_token="+session['OAUTH2'],
        method: 'GET',
        headers: {
            'Host': 'fiware-keyrock'
        }
    }
    getUserID(options, req, session);
}

// function populateUserInfo(session){
//     console.log("----SESSION BEFORE:");
//     console.log(session);
//     console.log(session.userID);

//     //get UserInfo
//     var options = {
//         uri: "http://"+keyrockIP+":3005/user/"+session.userID,
//         method: 'GET',
//         headers: {
//             'Host': 'fiware-keyrock',
//             'X-Auth-Token': session['XTOKEN'],
//         }
//     }
//     console.log("----------------------------");
//     populateSessionInfo(options ,session);
//     console.log("----SESSION AFTER:");
//     console.log(session);
// }

// ----------------------------------- for login -----------------------------------
function login(request, response, session){
    console.log(request.body);      // your JSON
    // Collect variables to relay the request to KeyRock
    var mail = request.body.email;
    var pass = request.body.password;

    // Get the X-token
    var headers = {
        'Host': 'fiware-keyrock',
        'Content-Type': 'application/json',
    };
    var options = {
        uri: "http://"+keyrockIP+":3005/v1/auth/tokens",
        method: 'POST',
        headers: headers,
        body: {
            'name': mail,
            'password': pass
        },
        json: true,
    };
    getAPIToken(options, response, session);

    //get the OAUTH2-token
    let base64data = Buffer.from(appID+":"+appSEC).toString('base64');
    var dataString = "grant_type=password&username="+mail+"&password="+pass;
    var headers = {
        'Authorization': 'Basic '+base64data,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': dataString.length
    };
    var options = {
        uri: "http://"+keyrockIP+":3005/oauth2/token",
        method: 'POST',
        headers: headers,
        body: dataString
    };
    response.set('Content-Type', 'application/json; charset=utf-8');
    getOAuthToken(options, response, session);

    console.log(session);
    console.log("-------------------------------- LOGIN/LOGIN -- END");
}


module.exports.login = login;
module.exports.populateUserID = populateUserID;
// module.exports.populateUserInfo = populateUserInfo;
// ---------------------------------------------------------------------------------