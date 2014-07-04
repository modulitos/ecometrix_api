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
            "content": "Lifestyle habits",
            "info": "Are your showers longer than 10 minutes?rq1.info",
            "btns": ["yes", "no"],
            "motivation": "Recommended shower times are less than 8 mins. Shortening your shower by just a minute or two can save up to 150 gallons per month. Use a timer to set a limit to your shower, and stick to it!"
        }, {
            "type": "question",
            "content": "Housing",
            "info": "Do you live in a house or apartment?",
            "btns": ["yes", "no"],
            "motivation": "Apartments conserve much more energy through shared utilities and closer living quarters. Houses can often compensate by living with roommates and family. "
        }, {
            "type": "twitter",
            "content": "ttr1.content",
            "info": "ttr2.info",
            "btns": ["yes", "no"],
            "motivation": "ttrm1"
        }, {
            "type": "question",
            "content": "Social Living",
            "info": "Do you live with another person?",
            "btns": ["yes", "no"],
            "motivation": "Communal living bolsters sustainability and reduces our carbon footprint through sharing resources. Whether you are sharing food, heating, or trips to the grocery store, having roommates encourages a sustainable lifestyle. [roommate sharing adds]"
        }]
    };
    res.json(items);
});

router.get('/1', function(req, res) {
    var items = {
        "data": [{
            "type": "question",
            "content": "Lifestyle Habits",
            "info": "Have you taken a plane trip for vacation or holiday in the past 6 months?",
            "btns": ["yes", "no"],
            "motivation": "A plane is often the only way to travel, but planes also consume prodigious amounts of fuel. Consider making your next trip a local destination and arranging travel only when needed. [local tourist adds]"
        }, {
            "type": "question",
            "content": "Lifestyle Habits",
            "info": "Do you eat meat more than 3 days per week?",
            "btns": ["yes", "no"],
            "motivation": "The high demand for meat has created a very inefficient food industry, and lowering our consumption of meat is the most effective way to curb these impacts. Additionally, less meat will provide a better health benefit to most people because our bodies are not evolved to eat the amount of meat we crave. So, supplement your diet with vegetables! [vegetarian food ads]"
        }, {
            "type": "question",
            "content": "Housing",
            "info": "Does your house or apartment have double pane glass windows?",
            "btns": ["yes", "no"],
            "motivation": "If not, replace them today! Windows are literally holes in the wall that deregulate your indoor temperature, raising electricity consumption for heating and air conditioning. Double pane glass and vinyl frame windows improve your home's insulation! [eco-friendly window ads]"
        }, {
            "type": "question",
            "content": "water",
            "info": "Do you utilize greywater to maximize water-efficiency?",
            "btns": ["yes", "no"],
            "motivation": "Greywater is a unique way to recycle water from showers, sinks, and laundry to maximize water usage.  A desirable practice in drought sticken areas, water is recycled from grey sources via modified plumbing.  There is a potential to use this water for watering small gardens.  [eco-friendly window ads]"
        }]
    };
    res.json(items);
});

router.get('/2', function(req, res) {
    var items = {
        "data": [{
            "type": "question",
            "content": "waste",
            "info": "Do you use a wormbin to compost?",
            "btns": ["yes", "no"],
            "motivation": "Worm bins provide an efficient means of turning waste product into nutrient rich soil (worm castings) and liquid fertilizer (worm tea).  The most common worm used for this is the red wiggler.  Worm bins are common enough to be purchased from your local hardware store, online, or self made.  They’re desirable because the compost has less odor than a purely microbial compost bin."
        }, {
            "type": "question",
            "content": "waste",
            "info": "Do you use municipal compost?",
            "btns": ["yes", "no"],
            "motivation": "Composting is an important to way to return organic nutriment back to farming.  Most large cities provide composting services, while smaller areas may have a subscription service for composting."
        }, {
            "type": "question",
            "content": "waste",
            "info": "Do you use use a kitchen composter (ceramic-bin)?",
            "btns": ["yes", "no"],
            "motivation": "Composting is an important to way to return organic nutriment back to gardening.  Composting your organic leftovers can be as simple as placing organic waste into a ceramic bin and transferring to your garden once composted.  Kitchen composters have odor control filters to keep .  "
        }, {
            "type": "question",
            "content": "waste",
            "info": "Do you use a Bokashi composter (plastic-bin + additive)?",
            "btns": ["yes", "no"],
            "motivation": "Bokashi is a low-odor way to return organic nutrients back to your lawn and garden using a high carbon microbe rich additive to your composting kitchen wast.  Composting your organic leftovers can be as simple as placing organic waste into a plastic bin and transferring to your garden once composted. [eco-friendly window ads]"
        }, {
            "type": "question",
            "content": "waste",
            "info": "Do you use grinds from your local coffee shop to fertilize your garden or potted plants?",
            "btns": ["yes", "no"],
            "motivation": "Coffee grinds are a great way to add nutrients to your garden and increase soil acidity.  You can add your coffee grinds directly to topsoil or mix it in.  It is common for coffee shops to save or share grinds; ask your barista to set aside coffee grinds for you to add to your garden. [eco-friendly window ads]"
        }]
    };
    res.json(items);
});

module.exports = router;
