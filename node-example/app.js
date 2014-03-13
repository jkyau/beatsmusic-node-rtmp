var express = require('express');
var app = express();
var engines = require('consolidate');

app.configure(function(req, res) {
    app.use(express.static(__dirname + '/public'));
    app.set('views', __dirname + '/views');
    app.engine('html', engines.handlebars);
    app.set('view engine', 'html');
});

var BM_API_BASE = "http://localhost:8080";
var AUTH_CODE_ENDPOINT = "/api/o/oauth2/auth";

var SETTINGS = {
    redirect_uri: 'http%3A%2F%2Flocal.daisy.net%3A3000%2Fcb',
    client_id: 'xsu4yep4kukrhgfeezcekekq', 
    scope: 'uUmMp',
    state: 'xyz',
    as: '66393244732227584'
};

app.get('/', function(req, res){
    var auth_flow_url_params = 'scope=' + SETTINGS.scope + 
                    '&state=' + SETTINGS.state + 
                    '&response_type=code' +
                    '&redirect_uri=' + SETTINGS.redirect_uri + 
                    '&client_id=' + SETTINGS.client_id + 
                    '&as=' + SETTINGS.as;
    var implicit_url_params = 'scope=' + SETTINGS.scope + 
                    '&state=' + SETTINGS.state + 
                    '&response_type=token' + 
                    '&redirect_uri=' + SETTINGS.redirect_uri + 
                    '&client_id=' + SETTINGS.client_id + 
                    '&as=' + SETTINGS.as;

    var auth_flow_dialog_url = BM_API_BASE + AUTH_CODE_ENDPOINT + '?' + auth_flow_url_params;
    var implicit_auth_dialog_url = BM_API_BASE + AUTH_CODE_ENDPOINT + '?' + implicit_url_params;

    var context = {
        auth_flow_dialog_url: auth_flow_dialog_url,
        implicit_auth_dialog_url: implicit_auth_dialog_url
    };
    res.render('index.html', context);
});


app.get('/cb', function(req, res){
    var authorization_code = req.query.code;
    console.log(authorization_code);
    res.send('request for access token now with sdk');
    // make a request for an access token now
});

app.listen(3000);
console.log('Listening on port 3000');
