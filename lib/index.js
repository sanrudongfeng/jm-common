var  db = require('./db')
    , mq = require('./mq')
    , Dao = require('./dao/base')
    , token = require('./util/token')
    , utils = require('./util/utils')
    , Random = require('./util/random')
    , jsonPath = require('./util/jsonPath')
    , lib = {};

lib.DB = db;
lib.MQ = mq;
lib.Dao = Dao;
lib.SequenceDao = require('./dao/sequence');
lib.token = token;
lib.utils = utils;
lib.Random = Random;
lib.jsonPath = jsonPath;

module.exports = lib;
