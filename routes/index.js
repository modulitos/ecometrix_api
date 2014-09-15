var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile('app.html', { root: path.join(__dirname, '../public') });
});

// /* Debug and manage db records */
// router.get('/index', function(req, res) {
//     res.render('index', { title: 'Luke\'s Express Test' });
// });
module.exports = router;
