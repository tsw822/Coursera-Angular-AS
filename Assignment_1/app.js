(function () {
    'use strict';
    angular.module('LunchCheck',[])
    .controller('lunchCheckController',function ($scope) {
        $scope.lunch = "";
        $scope.message = "";
        $scope.warning = "";

        $scope.CheckLunchItems = function () {
            if($scope.lunch==""){
                $scope.message = "Please enter your lunch";
                $scope.message
            }
            else{
                var lunchItems = SplitItems($scope.lunch);
                if(lunchItems.length <= 3){
                    $scope.message = "Enjoy!";
                    $scope.warning = "";
                }
                else{
                    $scope.message = "";
                    $scope.warning = "Too much!";
                }
            }
        };
        

        function SplitItems(string) {
            var rawitems = string.split(',');
            console.log(rawitems);
            var validatedItems = new Array();
            for(var item in rawitems){
                if(/\S/.test(rawitems[item])){
                    validatedItems.push(rawitems[item]);
                    console.log(validatedItems);
                }
            }
            return validatedItems;

        }
    });
})();