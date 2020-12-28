(function () {
    'use strict';
    angular.module('myFirstApp',[])
    .controller('myFirstController',function ($scope) {
        $scope.name = "Shuwen";
        $scope.sayHello = function () {
            return "Hello Shuwen!"
        }
    });

})();