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
    var users = {"data": [
	{"username": "lucas",
	 "name": "luke", 
	 "last": "swart",
	 "password": "81dc9bdb52d04dc20036dbd8313ed055"//1234
	},
	{"username": "mtshomsky",
	 "name": "mike", 
	 "last": "shomsky",
	 "password": "4a7d1ed414474e4033ac29ccb8653d9b"//0000
	}]};
    var username = req.query.username;
    console.log("userinfo: " + username);
    var password = req.query.password; // md5 checksum
    console.log("userinfo: " + password);

//    var db = req.db;
//    db.collection('userlist').find().toArray(function (err, items) {
//        res.json(items);
//    });
    var msg = "hi " + username + "! Welcome to Ecometrix";
    if (username == "lucas" && password == "81dc9bdb52d04dc20036dbd8313ed055") {
        console.log("lucas verified!");
        msg = '';
    }
    else if (password == "4a7d1ed414474e4033ac29ccb8653d9b" && username == "mtshomsky") {
        console.log("mike verified!");
        msg = '';
    }
    else {
        msg = 'username/password not verified.';
        console.log("password not verified!");
    }

    res.send({msg: msg});
    // res.send(
    //     (err === null) ? { msg: 'Done with verfications' } : { msg: err }
    // );

    // console.log("verifying router username: " + req.body.username); // Undefined
    // console.log("verifying router password: " + req.body.password);
    // if username
    //   find user from their username
    //   if found, return user token
    //   else, softfail // flexible definition
    // if token // separate route to verify token? use canned token?
    //   check if valid
    //     return token
    //   else return invalidation
    
});

/*
// * POST to login/adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var body = req.body;
    console.log("adding new user: ");
    console.log(body);
    db.collection('userlist').insert(body, function(err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
//  * POST to adduser
//  */
// router.post('/adduser', function(req, res) {
//     var db = req.db;
//     db.collection('userlist').insert(req.body, function(err, result){
//         res.send(
//             (err === null) ? { msg: '' } : { msg: err }
//         );
//     });
// })
;


/* TEST for username listing. */
router.get('/userToken', function(req, res) {
    var items ='{"token": "md5hashtest"}';
    res.json(items);
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;/**
 * Created by lucas on 6/19/14.
 */
