//handle shortURL return longURL
var express = require('express');
var router = express.Router();
var urlServices = require('../services/urlServices')
var path = require('path');

router.get("/" , function(req, res){
    res.sendFile("index.html", { root: path.join(__dirname, '../public/views/')});//send back index file to user//google express file
    //we create a js directory with two directories because we wanna use view and js(angularjs)
});//*means all

module.exports = router;