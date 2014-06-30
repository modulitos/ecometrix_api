var mongoose = require('mongoose').Mongoose;

// mongoose.model('Document', {
//   properties: ['title', 'data', 'tags'],

//   indexes: [
//     'title'
//   ]
// });

var crypto = require('crypto');

mongoose.model('User', {

    indexes: [
        [{ email: 1 }, { unique: true }]
    ],

    methods: {
        encryptPassword: function(password) {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        }
    },

    setters: {
        password: function(password) {
            this._password = password;
            this.salt = this.makeSalt();
            this.hashed_password = this.encryptPassword(password);
        }
    },

    methods: {
        authenticate: function(plainText) {
            return this.encryptPassword(plainText) === this.hashed_password;
        },

        makeSalt: function() {
            return Math.round((new Date().valueOf() * Math.random())) + '';
        }
    },

    save: function(okFn, failedFn) {
        if (this.isValid()) {
            this.__super__(okFn);
        } else {
            failedFn();
        }
    }


});

exports.Document = function(db) {
    return db.model('Document');
};
