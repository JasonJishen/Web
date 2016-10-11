//handle shortURL return longURL
var express = require('express');
var router = express.Router();
var urlServices = require('../services/urlServices');
var path = require('path');

router.get("*" , function(req, res){

    var shortUrl = req.originalUrl.slice(1);//we take from the second element

    urlServices.getLongUrl(shortUrl, function(url) {
        if(url) {
            res.redirect(url.longUrl);
        }
        else{
            res.sendFile("404.html", {root: path.join(__dirname, '../public/views/')});
        }
    });
});//*means all

module.exports = router;