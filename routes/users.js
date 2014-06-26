var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res) {
    console.log("request to /users/userlist received, cookie:");
    console.log(req.session);
    var m=req.session.isLogged || 0;//isLogged is stored in session over here
    req.session.isLogged = m+1;
    console.log('req.session.isLogged:');
    console.log(req.session.isLogged);
    
    var db = req.db;
    db.collection('userlist').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var body = req.body;
    console.log("body is: ");
    console.log(body);
    db.collection('userlist').insert(body, function(err, result){
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

// /* GET posts listing. */
// router.get('/posts', function(req, res) {
//     var items = [{'hey':'you'},{'hey':'me'}] ;
//     res.json(items);
// });


module.exports = router;
