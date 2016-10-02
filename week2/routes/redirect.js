//handle shortURL return longURL
var express = require('express');
var router = express.Router();
var urlServices = require('../services/urlServices');
var path = require('path');

router.get("*" , function(req, res){
    var shortURL = req.originalUrl.slice(1);//we take from the second element
    var longURL = urlServices.getLongUrl(shortURL);
    if(longURL) {
        res.redirect(longURL);//we wanna redirect you to the other page instead of making you copy paste
            //    /0 is what we got
    }else {
        res.sendFile("404.html", {root: path.join(__dirname, '../public/views/')});
    }

});//*means all

module.exports = router;