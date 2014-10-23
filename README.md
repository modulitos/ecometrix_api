ecometrix_site-api
==================

This Ecometrix RESTful-API provides the login, session, and content management for the Ecometrix website application. The current application is in the form of a survey that provides sustainability questions and a scoring system.

The project page for the Ecometrix site is here:
[https://github.com/LukeSwart/ecometrix_site](https://github.com/LukeSwart/ecometrix_site)

The project page for the Ecometrix mobile app is here:
[https://github.com/LukeSwart/ecometrix_app](https://github.com/LukeSwart/ecometrix_app)

To get started with a local installation, download and install node.js [here](http://nodejs.org/download/) along with MongoDB [here](http://docs.mongodb.org/manual/installation/)

Next, install the Node dependencies (`npm install`), start the MongoDB server (`mongod --dbpath /path/to/data/mongodb --fork --logpath /path/to/data/log/mongodb/ecometrix_site-api.log`), and run with `npm start` to start the Ecometrix server.

Here is the sequence diagram of our user login and session management:

![ecometrix login-sessions sequence diagram](https://github.com/LukeSwart/ecometrix_site/blob/master/images/ecometrix_sessions-login_sequence.png)

