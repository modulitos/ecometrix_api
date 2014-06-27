var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Database Setup with MongoSkin
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/nodetest2", 
{native_parser:true, auto_reconnect: true});


// Session Management - store-based sessions using MongoStore
var mongoUrl = "mongodb://localhost:27017/nodetest2";
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);

//Mongoose Model and db setup - (JUST IN CASE)
  // Mongoose setup, if needed
  // var mongoose = require('mongoose').Mongoose;
  // var db = mongoose.connect('mongodb://localhost/:27017/nodetest2');
  // Document = require('./models.js').Document(db);
  // app.configure('development', function() {
  //   app.set('db-uri', 'mongodb://localhost/nodepad-development');
  // });

  // var db = mongoose.connect(app.set('db-uri'));

  // function mongoStoreConnectionArgs() {
  //   return { dbname: db.db.databaseName,
  //            host: db.db.serverConfig.host,
  //            port: db.db.serverConfig.port,
  //            username: db.uri.username,
  //            password: db.uri.password };
  // }

  // app.use(express.session({
  //   store: mongoStore(mongoStoreConnectionArgs())
  // }));
// End Mongoose stuff.

// Assign routes to or urls.
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

// Set up session store.
app.use(expressSession({
    secret: 's3cretc0de',
    // clear_interval: 3600
    store: new MongoStore({
        url: mongoUrl
        // cookie: { maxAge: 24 * 60 * 60 * 1000 },
    }, function () {
        console.log("db session connection open");
    })
}));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// Join our routing urls with our app.
app.use('/', routes);
app.use('/users', users);
app.use('/posts', posts);
app.use('/login', login);

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
