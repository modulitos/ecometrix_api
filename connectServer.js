var path = require('path');
var connect = require('connect');
connect().use(connect.static(path.join(__dirname, 'public'))).listen(8082);
