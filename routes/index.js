var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    // res.render('index', { title: 'Luke\'s Express Test' });
    // res.render('index', {title: 'Luke\'s Express Test'}, function(err, html) {
    //     console.log(html);
    //     res.send('done');
    // });
    // res.sendFile(path.join(__dirname, '../public', 'app.html'));
    // res.sendfile('../public/app.html');
    // res.sendFile('app.html', { root: path.join(__dirname, '../public') });
    
    res.sendfile('public/app.html');
});

module.exports = router;
