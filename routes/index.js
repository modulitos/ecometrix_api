var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

/* Debug and manage db records */
router.get('/s3cretSp0t', function(req, res) {
     res.render('index', { title: 'Ecometrix DB manipulation zone' });
});

// Route middleware that will happen on every request.
// This middleware logs message to console everytime a request is made.
router.use(function(req, res, next) {

    // log each request to the console
    console.log('logging from router.use... ---');
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});

/* GET a new value for positive answers. */
router.get('/score', function(req, res) {

    var msg = req.session.cumulativePoints;
    console.log(req.session);
    console.log('Session is: ' + req.session);
    res.send({
        msg: msg
    });
});

/* PUT a new value for positive answers. */
router.put('/score', function(req, res) {
    var newPoints = parseInt(req.body.newPoints);
    console.log('Incrementing by new points: ' + newPoints);
    console.log(newPoints);
//    req.session.cumulativePoints += newPoints;
    req.session.cumulativePoints = parseInt(req.session.cumulativePoints) + newPoints;
    console.log(req.session);
    var msg = req.session.cumulativePoints;
    res.send({
        msg: msg
    });
});
module.exports = router;
