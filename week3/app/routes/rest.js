var express = require('express');
var router = express.Router();//first we wanna use the express Facility to construct router
var bodyParser = require('body-parser');//we have already installed
var jsonParser = bodyParser.json();//we wanna use one of bodyParser called jsonParser,we know it is transmitted using json format
var urlServices = require('../services/urlServices')//using .. to go back twice

 router.post("/urls", jsonParser, function(req, res) {//the stuff in req will gain req.body.longUrl,we wanna parse the HTML body, to ransmit
    var longUrl = req.body.longUrl;//we wanna do following works
    //var shortUrl = urlServices.getShortUrl(longUrl);//we want to get shortUrl actually
    urlServices.getShortUrl(longUrl, function(url){
        res.json(url)
    });//直接调用这个函数。因为我们知道这个longUrl不会立即被拿到，需要一个call back如果拿到了，把url pair发回来
});

router.get("/urls/:shortUrl", function(req, res) {
    var shortUrl = req.params.shortUrl;//get这个变量
    urlServices.getLongUrl(shortUrl, function(url){
        res.json(url);
    });
});
module.exports = router;//return generated router