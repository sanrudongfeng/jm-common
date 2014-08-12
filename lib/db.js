var mongoose = require('mongoose');
var db = module.exports;

var connections = {};

var defaultUri = 'mongodb://localhost/local';
db.connect = function(uri, newConnection) {
    uri = uri || defaultUri;
    if(newConnection){
        var c = mongoose.createConnection(uri);
        connections[uri] = c;
        return c;
    }
    mongoose.connect(uri, function(err) {
        connections[uri] = mongoose.connection;
        if (err) console.log(err);
    });
};

db.disConnect = function(uri) {
    uri = uri || defaultUri;
    var c = connections[uri];
    if(c){
        c.close();
        delete connections[uri];
    }
};

db.disConnectAll = function() {
    mongoose.disconnect();
};
