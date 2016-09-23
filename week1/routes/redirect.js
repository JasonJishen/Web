//handle shortURL return longURL
var express = require('express');
var router = express.Router();
var urlServices = require('../services/urlServices')
router.get("*" , function(req, res){
    var shortURL = req.originalUrl.slice(1);//we take from the second element
    var longURL = urlServices.getLongUrl(shortURL);
    res.redirect(longURL);//we wanna redirect you to the other page instead of making you copy paste
    //    /0 is what we got
});//*means all

module.exports = router;