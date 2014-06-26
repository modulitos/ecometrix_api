var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Database Setup
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/nodetest2", 
{native_parser:true, auto_reconnect: true});

// Session Management - store-based sessions using MongoStore
var mongoUrl = "mongodb://localhost:27017/nodetest2";
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);

var routes = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// storage
// app.use(express.session); // we are using expressSession below (with MongoStore)
// app.use(cookieParser); // causes a hang
// app.use(express.session);
// app.use(express.json());
// app.use(express.bodyParser());
// app.use(express.static(path.join(__dirname, 'public/app')));

app.use(expressSession({
    secret: 's3cretc0de',
    // clear_interval: 3600
    store: new MongoStore({
        url: mongoUrl
        // cookie: { maxAge: 24 * 60 * 60 * 1000 },
    }, function () {
        console.log("db connection open");
    })
}));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});


app.use('/', routes);
app.use('/users', users);
app.use('/posts', posts);
app.use('/login', login);

//
// app.configure(function () {
  // app.use(express.static(__dirname + '/static'));
  // app.use(express.bodyParser());
  // app.use(app.router);
// });
//

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
    res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
