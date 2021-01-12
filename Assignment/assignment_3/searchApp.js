( function () {
    'use strict';

    angular.module('searchMenu',[])
    .controller('SearchMenuController',SearchMenuController)
    .service('SearchMenuService',SearchMenuService)
    // .directive('foundItems', FoundItemsDirective)
    .constant('BasePath','https://davids-restaurant.herokuapp.com/menu_items.json')

    SearchMenuService.$inject = ['$q','$http','BasePath'];
    function SearchMenuService($q,$http,BasePath) {
        var service = this;
        var foundItems = [];

        service.getMenuItems = function () {
            var response = $http ({
                method : "GET",
                url : BasePath
            });

            return response;
        }

        service.getOther = function () {
            return 0;
        }

        service.getFoundItems = function (targetString) {
            var deferred = $q.defer();
            var passedTarget = targetString;
            var menuPromise = service.getMenuItems();

            menuPromise.then(function (response) {
                var allmMenuItems = response.data['menu_items'];
                // console.log(allmMenuItems);
                for(var item in allmMenuItems){
                    // console.log(allmMenuItems[item]['description']);
                        if(allmMenuItems[item]['description'].indexOf(passedTarget) !== -1) 
                        // ||(allmMenuItems[item]['name'].lowercase().indexOf('soup') !== -1))
                        {
                            // console.log(allmMenuItems[item]);
                            foundItems.push(allmMenuItems[item]);
                        }
                    };
                return foundItems;
            })
            .catch(function (error) {
                console.log("Fetch data errors happen.")
                return "Error";
            });
        }

        service.getItems = function () {
            return foundItems;
          };

        service.removeItem = function (itemIndex) {
            foundItems.splice(itemIndex,1);
        };
    }

    SearchMenuController.$inject = ['SearchMenuService'];
    function SearchMenuController(SearchMenuService) {
        var MenuC = this;
        
        MenuC.targetString = "";
        MenuC.message = "message";
        // MenuC.foundItems = [];

        // SearchMenuService.getFoundItems(MenuC.targetString);
        // foundPromise.then(function () {
        //     console.log("ok");
        // })
        
        // foundPromise.then(function (response) {
            // console.log(foundPromise);
        // });
        // console.log(SearchMenuService.getFoundItems(MenuC.targetString));
        // foundPromise.then(function () {
        //     MenuC.foundItems = 
        // })

        MenuC.narrowDown =function () {
            SearchMenuService.getFoundItems(MenuC.targetString);
            MenuC.foundItems =  SearchMenuService.getItems();
            // console.log(MenuC.targetString);
            // var arr=[];
            // if(MenuC.targetString == ""){
            //     MenuC.message = "Please enter what you like to search first!"
            // }
            // else{
            //     var foundPromise = SearchMenuService.getFoundItems(MenuC.targetString);
            //     $q.all([foundPromise]).then(function () {
                    console.log(MenuC.foundItems);
            //     })
            }
        // };

        MenuC.removeItem = function (itemIndex) {
            SearchMenuService.removeItem(itemIndex);
        };
    }

    // function FoundItemsDirective() {
    //     var ddo = {
    //         templateUrl: 'foundItems.html',
    //         scope: {
    //             foundItems : '<',
    //             onRemove : '&'
    //         },
    //         controller: FoundItemsDirectiveController,
    //         controllerAs: 'list',
    //         bindToController: true,
    //         // transclude: true,
    //     };
    //     return ddo;
    // }

    // function FoundItemsDirectiveController(itemIndex) {
    // 
    // }
})();