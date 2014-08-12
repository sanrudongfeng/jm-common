var mongoose = require('mongoose');
var db = module.exports;

var connections = {};

var defaultUri = 'mongodb://localhost/local';
db.connect = function(uri, newConnection) {
    uri = uri || defaultUri;
    var o = connections[uri];
    if(o){
        o.reference++;
        return o;
    }
    if(newConnection){
        o = mongoose.createConnection(uri);
        if(o){
            connections[uri] = o;
            o.reference = 1;
        }
        return o;
    }
    mongoose.connect(uri, function(err) {
        if (err){
            console.log(err);
            return null;
        }else{
            o = mongoose.connection;
            connections[uri] = o;
            o.reference = 1;
            return o;
        }
    });
};

db.disConnect = function(uri) {
    uri = uri || defaultUri;
    var o = connections[uri];
    if(o && o.reference){
        o.reference--;
        if(o.reference==0){
            o.close();
            delete connections[uri];
        }
    }
};

db.disConnectAll = function() {
    mongoose.disconnect();
};
