var mongoose = require('mongoose');
var db = module.exports;

db.connect = function(uri) {
    var dburi = uri;
    if(!uri) dburi = 'mongodb://localhost/local';
    mongoose.connect(dburi, function(err) {
        if (err) console.log(err);
        require('./dao/init');
    });
};

db.disConnect = function(uri) {
    mongoose.disconnect();
};
