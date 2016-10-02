//我们创建这个model的原因是为了控制跳转后的页面
angular.module("tinyurlApp")
    .controller("urlController", ["$scope","$http","$routeParams", function($scope, $http, $routeParams){//two way data binding
        $http.get("/api/v1/urls/" + $routeParams.shortUrl)
            .success(function(data) {
                $scope.longUrl = data.longUrl;
                $scope.shortUrl = data.shortUrl;//我们知道后端发回来的是这样两个data
                $scope.shortUrlToShow = "http://localhost:3000/" + data.shortUrl;
            });
    }]);