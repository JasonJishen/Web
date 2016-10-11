//先设计表的结构
var mongoose = require("mongoose");
var Schema = mongoose.Schema;//存取的时候还是有schema

var UrlSchema = new Schema({
    shortUrl: String,
    longUrl: String
});

var urlModel = mongoose.model("urlModel", UrlSchema);
module.exports = urlModel;//输出出去