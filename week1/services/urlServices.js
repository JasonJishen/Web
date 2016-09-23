var longToShortHash = {};//in javascript we use objects as map because its represented as key-value pair
var shortToLongHash = {};
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
    return Object.keys(longToShortHash).length;//return hash length
}

var getLongUrl = function(shortUrl) {
    return shortToLongHash[shortUrl];
}

module.exports = {//we can choose what to return
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};