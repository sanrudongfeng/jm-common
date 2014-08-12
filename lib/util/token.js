var crypto = require('crypto');

module.exports.createCipher = function (data, key) {
    var cipher = crypto.createCipher('aes-256-cbc', key);
    var encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

module.exports.createKey = function (data) {
    var d = new Date();
    var datas = data + Math.random() + d.getTime().toString();
    var sha256 = crypto.createHash('sha256');
    sha256.update(datas);
    return sha256.digest('hex');
};

module.exports.parse = function (data, key) {
    var decipher = crypto.createDecipher('aes-256-cbc', key);
    var dec;
    try {
        dec = decipher.update(data, 'hex', 'utf8');
        dec += decipher.final('utf8');
    } catch (err) {
        console.error('[token] fail to decrypt token. %j', data);
        return null;
    }

    return dec;
};

