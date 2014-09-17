var express = require('express');
var router = express.Router();

/*
 * 'login.js' handles interaction with the 'userlist' and 'sessions' collections.
 * It verifies users automatically through sessions or manually through the 
 * login page.
 */

// LMS: If needed, we can create a route with parameters (ie: /login/resumeSession/:username)

// Resume the user's session based on the existence of a session.
// Sessions are implemented with MongoStore.
router.get('/resumeSession', function(req, res) {
    console.log("request to /login/resumeSession received, session:");
    console.log(req.session);

    // check if the request has a session that is logged in.
    // It will only have a username if it has gone through the log in process.
    var msg = '';
    var username = '';
    if (!req.session.username) {
        // Redirect to login page
        console.log("No active session detected, redirecting to login page.");
        msg = "Redirecting to login page.";
    } else {
        // Proceed to app
        console.log("username is valid, redirecting to main app.");
        username = req.session.username;
    }
    console.log("sending result.");

    // Want to ensure that old accounts will still function with our cumulative points.
//    if (!req.session.cumulativePoints ||
//        !isFinite(String(req.session.cumulativePoints))) {
//        req.session.cumulativePoints = 0;
//        console.log("CumulativePoints has been initialized to: " + req.session.cumulativePoints);
//    }
    req.session.cumulativePoints = 0; // For now, just reset the points

    res.send({msg:msg, username:username});
});

// * VERIFY users listing. */
// Check username and password to allow user access to the app.
router.get('/verify', function(req, res) {
    console.log("request to /login/verify received, session:");
    console.log(req.session);
    var db = req.db;
    console.log("verifying...");

    // get request info
    var username = req.query.username;
    console.log("request's username: " + username);
    var password = req.query.password; // md5 checksum
    console.log("request's password: " + password);

    // test username/password verfication with db
    db.collection('userlist').find({
        username: username
    }).toArray(function(err, items) {
        console.log("retrieving items:");
        console.log(items);

        var msg = '';
        
        // The request's username is not in our 'userlist' collection.
        if (items.length == 0) {
            console.log("No items match the username.");
            msg = "invalid username";
        }
        // We have a username match and a (hashed) password match.
        else if (items[0].password == password) 
        {
            // Update the session token with username and session token:
            console.log("Updating session token.");
            console.log("Session username: %s, session token: %s", username, req.query.token);
            req.session.username = username;
            req.session.token = req.query.token;

            // Session testing: Store the number of times that the user has logged in.
            console.log("request to /users/userlist received, cookie:");
            console.log(req.session);
            var m = req.session.isLogged || 0;
            req.session.isLogged = m+1;
            console.log('req.session.isLogged:');
            console.log(req.session.isLogged);

            // Log the matching record information
            console.log("first item:");
            console.log(items[0]);
            console.log("first item password:");
            console.log(items[0].password);

            console.log("Password matches");
            msg = '';
            console.log("message is: ");
            console.log(msg);
        }
        // Username is recognized, but password does not match
        else 
        {
            console.log("Password does not match");
            msg = "invalid password";
            console.log("message is: ");
            console.log(msg);
        }
        console.log("Sending message: " + msg);
        res.send({
            msg: msg
        });
    });
});

/*
 * POST to login/adduser.
 * Create a new user with the given information. Create a new session as well.
 */
router.post('/adduser', function(req, res) {
    console.log("request to /login/adduser received, req.session:");
    console.log(req.session);
    console.log("Adding user: updating old token %s to new token %s", req.session.token, req.body.token);
    req.session.token = req.body.token;

    var db = req.db;
    var body = req.body;
    console.log("new user request: ");
    console.log(body);
    var username = body.username;

    // value of 'msg' determines result of the insert.
    var msg = '';

    // Return error if the username is already in use.
    db.collection('userlist').find({
        username: username
    }).toArray(function(err, items) {
        console.log("retrieving userlist items (if any):");
        console.log(items);
        
        // The username is not already taken (ie: it is not already in the 'userlist' collection)
        if (items.length == 0) {
            // Our request is good - no username conflicts. Proceed!
            console.log("No items match the username, proceed!");
            
            // Add the session to our sessions collection.
            // Initialize the session with relevant fields.
            console.log("Updating session token.");
            console.log("Session username: %s, session token: %s", username, req.query.token);
            req.session.username = username;
            req.session.token = req.query.token;
            req.session.isLogged = 0;
            req.session.cumulativePoints = 0;
            // TODO: enable token persistance across
            // multiple devices.
            req.session.loginToken = req.token;

        } 
        else  // Username is taken
        {
            msg = "That username is taken! Please choose another username.";
        }
        console.log("message after user verification is: ");
        console.log(msg);
        res.send({
            msg: msg
        });
    });

    // Insert the request's data into the 'userlist' collection.
    db.collection('userlist').insert(body, function(err, result) {
        console.log("inserting into userlist...");
        res.send(
            (err === null) ? {
                msg: msg
            } : {
                msg: err
            }
        );
    });
});

/* 
 * TODO:
 * DELETE to /login/deleteuser.
 * This is not being used. Users do not yet have the ability to delete profiles.
 */
router.delete('/deleteuser/:id', function(req, res) {
    console.log("request to /login/deleteuser received, session:");
    console.log(req.session);

    // TODO: Should be use the db to remove the session record here?
    // check whether this works..
    req.session.destroy(function(err) {
        console.log("destroying session.");
        // cannot access session here
    });

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
