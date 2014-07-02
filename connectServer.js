/*
 * 'connectServer.js' is used for serving static web pages, usually in
 * an ad-hoc situation.
 */
var path = require('path');
var connect = require('connect');
connect().use(connect.static(path.join(__dirname, 'public'))).listen(8082);
