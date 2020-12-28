(function () {
    'use strict';
    angular.module('myFirstApp',[])
    .controller('NameCaculatorController',function ($scope) {
        $scope.calName = "";
        $scope.totalValue = 0;

        $scope.displayNumeric = function () {
            var totalNumValue = calculateNumericForString($scope.calName); // get the total value
            $scope.totalValue = totalNumValue;
        };

        function calculateNumericForString(string) {
            var totalStringValue = 0;
            for(var i = 0; i < string.length; i++){
                totalStringValue += string.charCodeAt(i);
            }

            return totalStringValue;
        }
    });
})();