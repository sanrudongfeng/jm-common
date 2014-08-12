var redis = require('redis');

var DEFAULT_PREFIX = 'APP:MESSAGE';

var MQ = function(app, opts) {
    opts = opts || {};
    this.app = app;
    this.opts = opts;
    this.prefix = opts.prefix || DEFAULT_PREFIX;
    this.host = opts.host || '127.0.0.1';
    this.port = opts.port || 6379;
    this.clientSub = null;
    this.clientPub = null;
};

module.exports = MQ;

MQ.prototype.start = function(cb) {
    this.clientSub = redis.createClient(this.port, this.host, this.opts);
    if (this.opts.auth_pass) {
        this.clientSub.auth(this.opts.auth_pass);
    }
    this.clientSub.once('ready', cb);

    this.clientPub = redis.createClient(this.port, this.host, this.opts);
    if (this.opts.auth_pass) {
        this.clientPub.auth(this.opts.auth_pass);
    }
};

MQ.prototype.stop = function(force, cb) {
    if(this.clientSub) {
        this.clientSub.end();
        this.clientSub = null;
    }
    if(this.clientPub) {
        this.clientPub.end();
        this.clientPub = null;
    }
    //utils.invokeCallback(cb);
};

MQ.prototype.subscribe = function(channel, cb) {
    var client = this.clientSub;
    client.subscribe(channel);
    client.on("message", function (channel, message) {
        console.log("redis channel " + channel + ": " + message);
        cb(channel, message);
    });
}

MQ.prototype.publish = function(channel, message) {
    this.clientPub.publish(channel, message);
}

MQ.prototype.set = function(key, val, cb) {
    this.clientPub.set(key, val, cb);
}

MQ.prototype.get = function(key, cb) {
    this.clientPub.get(key, cb);
}

MQ.prototype.del = function(key, cb) {
    this.clientPub.del(key, cb);
}

MQ.prototype.exists = function(key, cb) {
    this.clientPub.exists(key, cb);
}

MQ.prototype.hset = function(hkey, key, val, cb) {
    this.clientPub.hset(hkey, key, val, cb);
}

MQ.prototype.hget = function(hkey, key, cb) {
    this.clientPub.hget(hkey, key, cb);
}

MQ.prototype.hdel = function(hkey, key, cb) {
    this.clientPub.hdel(hkey, key, cb);
}

MQ.prototype.hkeys = function(hkey, cb) {
    this.clientPub.hkeys(khey, cb);
}

MQ.prototype.hgetall = function(hkey, cb) {
    this.clientPub.hgetall(khey, cb);
}

MQ.prototype.expire = function(key, time){
    this.clientPub.expire(key, time);
}
