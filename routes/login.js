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
	{"username": "luke",
	 "name": "luke", 
	 "last": "swart",
	 "password": "1234"
	},
	{"username": "mike",
	 "name": "mike", 
	 "last": "shomsky",
	 "password": "0000"
	}]};
    console.log("userinfo: " + req.query.username);
    console.log("userinfo: " + req.query.password);

    res.send({msg: "Hi " + req.query.username + "! All done with verification!"});
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

/* TEST for username listing. */
router.get('/userToken', function(req, res) {
    var items ='{"token": "md5hashtest"}';
    res.json(items);
});

/*
// * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    db.collection('userlist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
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
