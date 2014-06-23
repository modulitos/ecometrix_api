/**
 * Created by lucas on 6/19/14.
 */
var express = require('express');
var router = express.Router();

///* GET users listing. */
//router.get('/userlist', function(req, res) {
//    var db = req.db;
//    db.collection('userlist').find().toArray(function (err, items) {
//        res.json(items);
//    });
//});

// route middleware to validate :name
// router.param('username', function(req, res, next, username) {
// 	// do validation on name here
// 	// blah blah validation
// 	// log something so we know its working
// 	console.log('doing username validations on ' + username);

// 	// once validation is done save the new item in the req
// 	req.username = username;
// 	// go to the next thing
// 	next();	
// });

// // route with parameters (http://localhost:8080/hello/:name)
// route middleware to validate :name
// router.param('password', function(req, res, next, password) {
// 	// do validation on name here
// 	// blah blah validation
// 	// log something so we know its working
// 	console.log('doing password validations on ' + password);

// 	// once validation is done save the new item in the req
// 	req.password = password;
// 	// go to the next thing
// 	next();	
// });

// // route with parameters (http://localhost:8080/hello/:name)
// router.get('/hello/:name', function(req, res) {
// 	res.send('hello ' + req.name + '!');
// });


// * VERIFY users listing. */
// route with parameters (http://localhost:3002/verify/:username)
// router.get('/verify/:userinfo', function(req, res) {
router.get('/verify', function(req, res) {
    var db = req.db;
    console.log("verifying...");
    // get request info
    var username = req.query.username;
    console.log("request's username: " + username);
    var password = req.query.password; // md5 checksum
    console.log("request's password: " + password);

    // test verfication with db
    db.collection('userlist').find({
        username: username
    }).toArray(function(err, items) {
        console.log("retrieving items:");
        console.log(items);

        var msg = '';

        if (items.length == 0) {
            console.log("No items match the username.");
            msg = "invalid username";
        } else if (items[0].password == password) {
            // Log the matching record information
            console.log("first item:");
            console.log(items[0]);
            console.log("first item password:");
            console.log(items[0].password);

            console.log("Password matches");
            msg = '';
            console.log("message is: ");
            console.log(msg);
        } else {
            console.log("Password does not match");
            msg = "invalid password";
            console.log("message is: ");
            console.log(msg);
        }
        console.log("Sending message: " + msg);
        res.send({
            msg: msg
        });
        // res.json({msg: msg});
        // res.json(items);
    });
});

/*
// * POST to login/adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var body = req.body;
    console.log("new user request: ");
    console.log(body);
    var username = body.username;
    console.log("requested username: ");
    console.log(username);
    
    // value of 'msg' determines result of the insert.
    var msg = '';
    // Return error if the username is already in use.
    db.collection('userlist').find({
        username: username
    }).toArray(function(err, items) {
        console.log("retrieving items:");
        console.log(items);

        if (items.length == 0) {
            // Our message is good - no errors
            console.log("No items match the username, proceed!");
        } else {
            msg = "That username is taken! Please choose another username.";
        }
        console.log("message after user verification is: ");
        console.log(msg);
        // console.log("Sending message: " + msg);
        res.send({
            msg: msg
        });
        // res.json({msg: msg});
        // res.json(items);
    });

    db.collection('userlist').insert(body, function(err, result) {
        res.send(
            (err === null) ? {
                msg: msg
            } : {
                msg: err
            }
        );
    });
});

/* TEST for username listing. */
router.get('/userToken', function(req, res) {
    var items = '{"token": "md5hashtest"}';
    res.json(items);
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? {
            msg: ''
        } : {
            msg: 'error: ' + err
        });
    });
});

module.exports = router;
