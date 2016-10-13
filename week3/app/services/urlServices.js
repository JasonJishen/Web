//var longToShortHash = {};//in javascript we use objects as map because its represented as key-value pair
//var shortToLongHash = {};

var urlModel = require("../models/urlModels");
var redis = require("redis");

var port = process.env.REDIS_PORT_6379_TCP_PORT;//nodejs获取环境变量里面的port变量，因为docker会自动帮我们填好.docker compose里面说了
var host = process.env.REDIS_PORT_6379_TCP_ADDR;

var redisClient = redis.createClient(port, host);

var encode = [];
var genCharArray = function (charA, charZ) {
    var arr = [];
    var i = charA.charCodeAt(0);
    var j = charZ.charCodeAt(0);
    for(; i <= j; i++) {
        arr.push(String.fromCharCode(i));
    }
    return arr;
};

encode = encode.concat(genCharArray('a', 'z'));
encode = encode.concat(genCharArray('A', 'Z'));
encode = encode.concat(genCharArray('0', '9'));

var getShortUrl = function(longUrl, callback) {
    if(longUrl.indexOf('http') === -1) {
        longUrl = "http://" + longUrl;
    }//to make it stronger, we wanna put http:// here

    redisClient.get(longUrl, function(err, shortUrl){
        if(shortUrl) {
            console.log("Bye bye");
            callback({
                shortUrl: shortUrl,
                longUrl: longUrl
            });
        }else{
             urlModel.findOne({longUrl: longUrl}, function(err, data){
                    if(data) {//这里不能直接return因为后面还要
                        callback(data);
                        redisClient.set(data.shortUrl, data.longUrl);
                        redisClient.set(data.longUrl, data.shortUrl);
                    }else {//如果data不存在
                        generateShortUrl(function(shortUrl) {
                            var url = new urlModel({
                                shortUrl: shortUrl,
                                longUrl: longUrl
                            })
                            url.save();//生成了short之后再存在数据库
                            callback(url);
                            redisClient.set(shortUrl, longUrl);
                            redisClient.set(longUrl, shortUrl);
                        });//加上mongoDB这个func就变成了一个异步的
                    }
                });//拿到数据：call back function会被nodeJs调用,如果有错会传回err,如果没有错就空
        }
    });


};


var generateShortUrl = function(callback) {

    urlModel.count({}, function(err, num) {
        callback(convertTo62(num));
    });//查数据库的条数

    //return convertTo62(Object.keys(longToShortHash).length);//return hash length
}

var convertTo62 = function (num) {
    var result = "";
    do{
        result = encode[num % 62] + result;
        num = Math.floor(num/62);
    }while(num)
    return result;
}

var getLongUrl = function(shortUrl, callback) {

    redisClient.get(shortUrl, function(err, longUrl){
        if(longUrl) {
            console.log("Bye bye");
            callback({
                 shortUrl: shortUrl,
                 longUrl: longUrl
            });
        }else{
           urlModel.findOne({shortUrl: shortUrl}, function(err, data){
               callback(data);
               redisClient.set(shortUrl, longUrl);
               redisClient.set(longUrl, shortUrl);
           });//拿到数据：call back function会被nodeJs调用,如果有错会传回err,如果没有错就空

        }
    });

}

module.exports = {//we can choose what to return
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};