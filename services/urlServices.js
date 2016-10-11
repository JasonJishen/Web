//var longToShortHash = {};//in javascript we use objects as map because its represented as key-value pair
//var shortToLongHash = {};

var urlModel = require("../models/urlModels");

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

    urlModel.findOne({longUrl: longUrl}, function(err, data){
        if(data) {//这里不能直接return因为后面还要
            callback(data);
        }else {//如果data不存在
            generateShortUrl(function(shortUrl) {
                var url = new urlModel({
                    shortUrl: shortUrl,
                    longUrl: longUrl
                })
                url.save();//生成了short之后再存在数据库
                callback(url);
            });//加上mongoDB这个func就变成了一个异步的
        }
    });//拿到数据：call back function会被nodeJs调用,如果有错会传回err,如果没有错就空
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
    urlModel.findOne({shortUrl: shortUrl}, function(err, data){
        callback(data);
    });//拿到数据：call back function会被nodeJs调用,如果有错会传回err,如果没有错就空
}

module.exports = {//we can choose what to return
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};