var app = angular.module("tinyurlApp", ["ngRoute", "ngResource"]); //in this app, we control the whole page connected to html
//总的会用到ngRoute这个模块
app.config(function($routeProvider) {//这个$符号对于javascript来说是没有任何特殊的，只是告诉大家这是有一个特殊的变量
    $routeProvider
        .when("/", {
            templateUrl: "./public/views/home.html",
            controller: "homeController",
        })
        .when("/urls/:shortUrl", {
            templateUrl: "./public/views/url.html",
            controller: "urlController"
        });
});//config our router配置前端的router,需要调用app.config这个function，调用这个function，让我们url是/的时候

