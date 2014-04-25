
/**
 * Module dependencies.
 */

var http = require('http');
var express = require('express');
var nunjucks = require('nunjucks');
var path = require('path');
var routes = require('./routes');

var app = express();

var mongoose = require('mongoose');
var configdb = require('./config/database');
mongoose.connect(configdb.url);

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.cookieParser('KITTENS'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.session({ secret: 'MORE KITTENS' }));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);

require('./routes')(app, server);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
