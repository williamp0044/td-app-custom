var http = require('http');
<<<<<<< HEAD
var request = require('request');
var express = require('express');

var app = express();
const redirect_uri = 'http://127.0.0.1:8080';

/*
Callback endpoint the TDA app uses.
To understand more about how the API authenticates, see this link.
https://developer.tdameritrade.com/content/simple-auth-local-apps
*/
app.get('/auth', (req, res) => {
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


app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
});

// start server
var httpServer = http.createServer(app);
var port = process.env.PORT || 8080;
httpServer.listen(port, () => {
    console.log(`Listening at ${port}`);
});
=======
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('Hello World!');
}).listen(80);
>>>>>>> 29a82ce013fe3d8eb2f3072b85da1b04b6583879
