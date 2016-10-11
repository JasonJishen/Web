//我们创建这个model的原因是为了submitform
angular.module("tinyurlApp")
    .controller("homeController", ["$scope","$http","$location", function($scope, $http, $location){//two way data binding
        $scope.submit = function() {
            $http.post("/api/v1/urls", {
                longUrl: $scope.longUrl
            }).success(function(data){//如果成功了的话，就是调用这个call back function
                $location.path("/urls/" + data.shortUrl);
            } );
        }//我们定义的这个submit function
    }]);