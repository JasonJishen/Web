var longToShortHash = {};//in javascript we use objects as map because its represented as key-value pair
var shortToLongHash = {};
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

var getShortUrl = function(longUrl) {
    if(longUrl.indexOf('http') === -1) {
        longUrl = "http://" + longUrl;
    }//to make it stronger, we wanna put http:// here
    if(longToShortHash[longUrl] != null){// if exists, do
        return longToShortHash[longUrl];
    } else{
        var shortUrl = generateShortUrl();
        longToShortHash[longUrl] = shortUrl;
        shortToLongHash[shortUrl] = longUrl;//if dosent exists, we wanna save the short and long key value pair
        return shortUrl;
    }
};

var generateShortUrl = function() {
    return convertTo62(Object.keys(longToShortHash).length);//return hash length
}

var convertTo62 = function (num) {
    var result = "";
    do{
        result = encode[num % 62] + result;
        num = Math.floor(num/62);
    }while(num)
    return result;
}

var getLongUrl = function(shortUrl) {
    return shortToLongHash[shortUrl];
}

module.exports = {//we can choose what to return
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};