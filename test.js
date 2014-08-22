var lib = require('./');
var MQ = lib.MQ;
var DB = lib.DB;
var SequenceDao = lib.SequenceDao;

(function testDB(){
    //db1
    var dbUri = 'mongodb://localhost/test';
    var c = DB.connect(dbUri, true);
    var c1= DB.connect(dbUri, true);
    var c2= DB.connect(dbUri, true);
    DB.disConnect(dbUri);
    DB.disConnect(dbUri);
    var sd = new SequenceDao(c);
    sd.getNext('uid', function(err, v){
        console.info(v);
        DB.disConnect(dbUri);
    });

    //db2 default DB
    DB.connect();
    sd = new SequenceDao();
    sd.getNext('uid', function(err, v){
        console.info(v);
        DB.disConnect();
    });
})();

//testMQ
(function testMQ(){
    var mq = new MQ();
    mq.set('account', 'test', function(err){
        if(err){
            console.info(err);
            return;
        }
        mq.get('account', function(err, v){
            console.info(v);
        });
    });

})();
