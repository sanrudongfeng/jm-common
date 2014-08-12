var lib = require('./');
var MQ = lib.MQ;
var db = lib.db;
var SequenceDao = lib.SequenceDao;

function testDB(){
    //db1
    var dbUri = 'mongodb://localhost/test';
    var c = db.connect(dbUri, true);
    var sd = new SequenceDao(c);
    sd.getNext('uid', function(err, v){
        console.info(v);
        db.disConnect(dbUri);
    });

    //db2 default DB
    db.connect();
    sd = new SequenceDao();
    sd.getNext('uid', function(err, v){
        console.info(v);
        db.disConnect();
    });
};

function test(){
    testDB();
};

test();


