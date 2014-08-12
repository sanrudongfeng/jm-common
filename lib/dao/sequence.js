var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Dao = require('./base');

var schema = new Schema({
    name : String,
    value : Number,
    maxvalue:Number
});

var Model = mongoose.model('Sequence', schema);

var sequences = {};

var dao = new Dao(Model);

module.exports = dao;

dao.getNext = function(name, cb) {
    var c = {name:name};
    Model.findOne(c,  function(err, obj) {
        var v = 0;
        if (err){
            cb(err);
            return;
        }else if(obj){
            v = obj.value;
            v ++;
            Model.update(c, {value:v}, function(err){
                if(err){
                    cb(err);
                    return;
                }

                cb(null, v);
            });
        }else{
            v ++;
            Model.create({name:name, value:v}, function(err){
                if(err){
                    cb(err);
                    return;
                }

                cb(null, v);
            });

        }
    });
};



