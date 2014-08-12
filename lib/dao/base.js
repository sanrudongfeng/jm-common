var Dao = function(Model) {
    this.model = Model;
};

module.exports = Dao;

Dao.prototype.create = function (doc, cb){
    this.model.create(doc, function(err, obj){
        if(cb){
            cb(err, obj);
        }
       // console.log('create ; %s', obj.toString());
    });
};

Dao.prototype.findOne = function (opts, cb) {
    this.model.findOne(opts, cb);
};

Dao.prototype.findById = function (id, cb) {
    this.model.findOne({_id:id}, cb);
};

Dao.prototype.count = function (query, cb) {
    this.model.count(query, cb);
};

Dao.prototype.getByQuery = function (query,fileds,opt,cb) {
    this.model.find(query, fileds, opt, cb);
};

Dao.prototype.find = function (opts, cb) {
    this.model.find(opts, cb);
};

Dao.prototype.findAll = function (cb) {
    this.find({}, cb);
};

Dao.prototype.remove = function (query, cb){
    this.model.remove(query, cb);
};

Dao.prototype.update = function( conditions, update ,options, cb) {
    this.model.update(conditions, update, options, function(err, obj){
        if(cb){
            cb(err, obj);
        }
        if(err){
            console.log('error on update ; conditions:%s %s error: %s', JSON.stringify(conditions), JSON.stringify(update),err.toString());
        }else{
            console.log('update ; conditions:%s %s', JSON.stringify(conditions), JSON.stringify(update));
        }
    });
};

