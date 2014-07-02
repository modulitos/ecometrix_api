var express = require('express');
var router = express.Router();

/*
 * 'posts.js' is responsible for providing content to the client.
 * At the moment, it is all question content.
 */

/* GET posts listing. */
router.get('/', function(req, res) {
    var items = {
        "data": [{
            "type": "question",
            "content": "rq1.content",
            "info": "rq1.info",
            "btns": ["yes", "no"],
            "motivation": "m1"
        }, {
            "type": "question",
            "content": "rq2.content",
            "info": "rq2.info",
            "btns": ["yes", "no"],

            "motivation": "m2"
        }, {
            "type": "twitter",
            "content": "ttr1.content",
            "info": "ttr2.info",
            "btns": ["yes", "no"],
            "motivation": "ttrm1"
        }, {
            "type": "question",
            "content": "rq3.content",
            "info": "rq3.info",
            "btns": ["yes", "no"],
            "motivation": "m3"
        }]
    };
    res.json(items);
});

router.get('/1', function(req, res) {
    var items = {
        "data": [{
            "type": "question",
            "content": "How long do you spend in the shower?",
            "info": "Did you know that the average shower time is 4 minutes?",
            "btns": ["yes", "no"],
            "motivation": "Reduce your shower time now!"
        }, {
            "type": "question",
            "content": "How many roommates do you live with?",
            "info": "You should have an average of 1 roommate per 700 sq. ft. of your home. If you do not know your home size, find out now! http://www.zillow.com/homes/",
            "btns": ["yes", "no"],
            "motivation": "Share living quarters with others to increase your sustainablity!"
        }, {
            "type": "twitter",
            "content": "I just took a 5 minute shower!",
            "info": "At this rate, I save 2 hours every month!",
            "btns": ["yes", "no"],
            "motivation": "Seattle Public Utilities just gave you a $10 credit on your next bill!"
        }, {
            "type": "question",
            "content": "rq3.content",
            "info": "rq3.info",
            "btns": ["yes", "no"],
            "motivation": "m3"
        }]
    };
    res.json(items);
});

router.get('/2', function(req, res) {
    var items = {
        "data": [{
            "type": "question",
            "content": "Index2 eco questions!",
            "info": "Index2 eco info!",
            "btns": ["yes", "no"],
            "motivation": "Index2 eco motivation!"
        }, {
            "type": "question",
            "content": "More index2 content...",
            "info": "More index2 info...",
            "btns": ["yes", "no"],
            "motivation": "more index2 motivations..."
        }, {
            "type": "twitter",
            "content": "Index2 twitter content!",
            "info": "Index2 twitter info!",
            "btns": ["yes", "no"],
            "motivation": "Index2 twitter motivation"
        }, {
            "type": "question",
            "content": "i2.c3",
            "info": "i2.i3",
            "btns": ["yes", "no"],
            "motivation": "i2.m3"
        }]
    };
    res.json(items);
});

module.exports = router;
