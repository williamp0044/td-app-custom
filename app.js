var express = require('express');
var app = express();
var path = require('path');
var request = require('request');


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


const redirect_uri = 'http://localhost:8080/auth';

app.get('/auth', function (req, res) => {
    var authRequest = {
        url: 'https://api.tdameritrade.com/v1/oauth2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'grant_type': 'authorization_code',
            'access_type': 'offline',
            'code': req.query.code, // get the code from url
            'client_id': process.env.CLIENT_ID + "@AMER.OAUTHAP", // this client id comes from config vars
            'redirect_uri': redirect_uri
        }
    };

    // make the post request
    request(authRequest, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // parse the tokens
            var authReply = JSON.parse(body);
            // to check it's correct, display it
            res.send(authReply);
        }
    });
});




app.listen(process.env.PORT || 4000, function () {
    console.log('Node app is working!');
});
