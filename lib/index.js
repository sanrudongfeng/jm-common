var  db = require('./db')
    , mq = require('./mq')
    , Dao = require('./dao/base')
    , sequenceDao = require('./dao/sequence')
    , token = require('./util/token')
    , utils = require('./util/utils')
    , Random = require('./util/random')
    , jsonPath = require('./util/jsonPath')
    , lib = {};

lib.db = db;
lib.MQ = mq;
lib.Dao = Dao;
lib.sequenceDao = sequenceDao;
lib.token = token;
lib.utils = utils;
lib.Random = Random;
lib.jsonPath = jsonPath;

module.exports = lib;
