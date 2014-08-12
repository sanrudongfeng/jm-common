var iRandomMax = 200000000000;    //最大随机整数范围 0 <= randomValue <= iRandomMax;

var Random = function(opts) {
    opts = opts || {};
    this.g_seed = 0;
    this.randomMax =  opts.randomMax || iRandomMax;
};

module.exports = Random;

Random.prototype.setSeed = function(seed)
{
    this.g_seed = seed;
}

Random.prototype.getSeed = function()
{
    return this.g_seed;
}

Random.prototype.random = function(){
    this.g_seed = ( this.g_seed * 9301 + 49297 ) % 233280;
    return this.g_seed / ( 233280.0 );
}

//min<=result<=max
Random.prototype.randomInt = function(min, max)
{
    if (arguments.length === 1)
    {
        max = min;
        min = 0;
    }
    var range = min + (this.random()*(max - min));
    return Math.round(range);
}

//min<=result<=max
Random.prototype.randomDouble = function(min, max)
{
    if (arguments.length === 1)
    {
        max = min;
        min = 0.0;
    }

    var range = min + (this.random()*(max - min));
    return range;
}

Random.prototype.randomRange = function(range){
    return this.randomInt(0,randomMax) % range;
}

Random.prototype.randomOdds = function(range, odds){
    if(this.randomRange(range) < odds) return 1;
    return 0;
};




