var express = require('express');//when see require, they check themselves like http/fs, then they check node module,listen and use can be directly used
var app = express();
var restRouter = require("./routes/rest");//they will check routes dir,we wanna get the router
var redirectRouter = require('./routes/redirect');
var indexRouter = require('./routes/index');
//insert

app.use("/public", express.static(__dirname + "/public"));//如果请求的URL是PUBLIC开头的话，那么请求的东西去public文件夹找

app.use("/api/v1", restRouter);//if requested resources start by /api/v1, go to restRouter
//lookup
app.use("/", indexRouter);

app.use("/:shortUrl", redirectRouter)//:means followed by a var, routing means different req deal with different methods
//we set up event handler here
//how can we get restRouter? we required this the rest
//we have a / and a : we assume shortUrl matches what we want
app.listen(3000);
