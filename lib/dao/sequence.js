var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseDao = require('./base');

var schema = new Schema({
    name : String,
    value : Number,
    maxvalue:Number
});

var Dao = function(connection, opts) {
    connection = connection || mongoose;
    var model = connection.model('Sequence', schema);
    BaseDao.call(this, model);
};

util.inherits(Dao, BaseDao);

module.exports = Dao;

Dao.prototype.getNext = function(name, cb) {
    var model = this.model;
    var c = {name:name};
    model.findOne(c,  function(err, obj) {
        var v = 0;
        if (err){
            cb(err);
            return;
        }else if(obj){
            v = obj.value;
            v ++;
            model.update(c, {value:v}, function(err){
                if(err){
                    cb(err);
                    return;
                }

                cb(null, v);
            });
        }else{
            v ++;
            model.create({name:name, value:v}, function(err){
                if(err){
                    cb(err);
                    return;
                }

                cb(null, v);
            });

        }
    });
};



